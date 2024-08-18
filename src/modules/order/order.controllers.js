import Order from './../../../database/models/order.model.js';
import Cart from './../../../database/models/carts.model.js';
import apiFeatures from '../../../utils/apiFeatures.js';
import catchError from '../../../utils/catchError.js';
import appError from '../../../utils/appError.js';
import User from '../../../database/models/users.model.js';
import Product from '../../../database/models/products.model.js';

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
// !كمل هناااااااا
const createSessionOrder = catchError(async (req, res, next) => {
    const order = await Order.create(req.body);
    res.status(200).json({ status: "order added successfully", order });
})

// ! exporting controllers
export {
    getAllOrders,
    getUserOrders,
    createCashOrder,
    createSessionOrder,
}