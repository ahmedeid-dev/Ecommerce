import Order from './../../../database/models/order.model.js';
import Cart from './../../../database/models/carts.model.js';
import apiFeatures from '../../../utils/apiFeatures.js';
import catchError from '../../../utils/catchError.js';
import appError from '../../../utils/appError.js';
import User from '../../../database/models/users.model.js';
import Product from '../../../database/models/products.model.js';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

// ! getAllOrders controller
const getAllOrders = catchError(async (req, res, next) => {
    const features = apiFeatures(Order.find(), req.query)
    let orders = await features.query;
    !orders && next(new appError("orders not found", 404));
    res.status(200).json({
        status: "success",
        meta: {
            page: features.page,
            count: orders.length,
        },
        orders
    });
})

// ! getUserOrders controller
const getUserOrders = catchError(async (req, res, next) => {
    const orders = await Order.findOne({ user: req.user._id })
    !orders && next(new appError("orders not found", 404));
    res.status(200).json({ status: "success", orders });
}
)

// ! createCashOrder controller
const createCashOrder = catchError(async (req, res, next) => {
    // ? 1- getting user info && Cart
    const cart = await Cart.findOne({ user: req.user._id })
    !cart && next(new appError("Cart not found", 404));
    const user = await User.findById(req.user._id)
    !user && next(new appError("User not found", 404));
    // ? 2- calculating total price
    const totalPrice = cart.discount ? cart.priceAfterDiscount : cart.totalPrice
    // ? 3- creating order
    const order = await Order.create({
        user: req.user._id,
        orderItems: cart.cartItems,
        totalPrice,
        shippingAddress: req.body.shippingAddress || user.addresses[0],
        paymentType: "cash",
        isPaid: false,
        paidAt: null,
        isDelivered: false,
        deliveredAt: null
    })
    await order.save();
    // ? 4- inc sold && dec stock
    const options = cart.cartItems.map(item => {
        return ({
            updateOne: {
                filter: { _id: item.product },
                update: { $inc: { sold: item.quantity, stock: -item.quantity } }
            }
        })
    })
    Product.bulkWrite(options)
    // ? 5- clear cart
    await Cart.findByIdAndDelete(cart._id)
    // const order = await Order.create(req.body);
    res.status(200).json({ status: "order added successfully", order });
})


// ! createSessionOrder controller
const createSessionOrder = catchError(async (req, res, next) => {
    const cart = await Cart.findOne({ user: req.user._id })
    !cart && next(new appError("Cart not found", 404));
    const user = await User.findById(req.user._id)
    !user && next(new appError("User not found", 404));
    const totalPrice = cart.discount ? cart.priceAfterDiscount : cart.totalPrice
    const session = await stripe.checkout.sessions.create({
        line_items: [
            {
                price_data: {
                    currency: 'egp',
                    unit_amount: totalPrice * 100,
                    product_data: {
                        name: req.user.name,
                    },
                },
                quantity: 1,
            },
        ],
        mode: 'payment',
        success_url: `${process.env.BASE_URL}?success=true`,
        cancel_url: `${process.env.BASE_URL}?canceled=true`,
        customer_email: req.user.email,
        client_reference_id: cart._id,
        metadata: req.body || user.addresses[0]
    });
    res.status(200).json({ status: "success", session });
})

// ! webhook controller
const webhook = catchError(async (req, res, next) => {
    const signature = req.headers['stripe-signature'].toString();
    let event = stripe.webhooks.constructEvent(req.body, signature, process.env.STRIPE_WEBHOOK_SIGNING_SECRET);
    let session;
    if (event.type === 'checkout.session.completed') {
        session = event.data.object;
        const user = await User.findOne({ email: session.customer_email })
        !user && next(new appError("user not found", 404));
        const cart = await Cart.findById(session.client_reference_id);
        !cart && next(new appError("cart not found", 404));
        const order = new Order({
            user: user._id,
            orderItems: cart.cartItems,
            shippingAddress: session.metadata || session.shipping.address,
            totalPrice: session.amount_total / 100,
            paymentType: "card",
            isPaid: true,
            paidAt: Date.now(),
            isDelivered: false,
            deliveredAt: null
        });
        !order && next(new appError("order not found", 404));
        await order.save();
    }
    res.status(200).json({ received: true, session });
})

// ! exporting controllers
export {
    webhook,
    getAllOrders,
    getUserOrders,
    createCashOrder,
    createSessionOrder,
}