import Product from './../../../database/models/products.model.js';
import Cart from './../../../database/models/carts.model.js';
import catchError from '../../../utils/catchError.js';
import appError from '../../../utils/appError.js';

// ! calcPrice function
const calcPrice = async (cart, coupon = 0) => {
    cart.discount = coupon;
    cart.totalPrice =
        coupon ?
            cart.cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0) - (cart.cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0) * coupon / 100) :
            cart.cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
    cart.totalQuantity =
        cart.cartItems.reduce((acc, item) => acc + item.quantity, 0);
    cart.priceAfterDiscount = cart.totalPrice - (cart.totalPrice * cart.discount / 100);
}

// ! getLoggedUserCart controller
const getLoggedUserCart = catchError(async (req, res, next) => {
    const cart = await Cart.findOne({ user: req.user._id })
    !cart && next(new appError("Cart not found", 404));
    res.status(200).json({ status: "success", cart });
})

// ! addCart controller
const addToCart = catchError(async (req, res, next) => {
    const { product, quantity = 1, coupon = 0 } = req.body
    const user = req.user._id
    const cart = await Cart.findOne({ user })
    const item = await Product.findById(product)
    !item && next(new appError("Product not found", 404));
    if (!cart) {
        const newCart = await Cart.create({
            user,
            cartItems: [{
                product,
                quantity,
                price: item.priceAfterDiscount
            }],
        })
        await calcPrice(newCart, coupon);
        await newCart.save();
        return res.status(201).json({ status: "cart added successfully", cart: newCart });
    } else {
        const productExist = cart.cartItems.find(item => item.product == req.body.product);
        if (productExist) {
            const updatedCart = await Cart.findOneAndUpdate({ user, "cartItems.product": product }, {
                $inc: { "cartItems.quantity": quantity },
                $set: {
                    "cartItems.price": item.priceAfterDiscount,
                }
            }, {
                new: true
            });
            await calcPrice(updatedCart, coupon);
            await updatedCart.save();
            return res.status(200).json({ status: "cart updated successfully", cart: updatedCart });
        }
        else {
            const updatedCart = await Cart.findOneAndUpdate({ user }, {
                $push: {
                    cartItems: [{
                        product,
                        quantity,
                        price: item.priceAfterDiscount
                    }]
                }
            }, {
                new: true
            });
            await calcPrice(updatedCart, coupon);
            await updatedCart.save();
            return res.status(200).json({ status: "cart updated successfully", cart: updatedCart });
        }
    }
})

// ! updateCart controller
const updateProductQuantity = catchError(async (req, res, next) => {
    const { product, quantity = 1, coupon = 0 } = req.body
    const user = req.user._id
    const cart = await Cart.findOne({ user });
    !cart && next(new appError("Cart not found", 404));
    const item = await Product.findById(product);
    !item && next(new appError("Product not found", 404));
    const updatedCart = await Cart.findOneAndUpdate({ user, "cartItems.product": product }, {
        $set: { "cartItems.quantity": quantity <= item.quantity ? quantity : item.quantity }
    }, {
        new: true
    });

    !updatedCart && next(new appError("Cart not updated", 404));
    await calcPrice(updatedCart, coupon);
    await updatedCart.save();
    res.status(200).json({ status: "cart updated successfully", cart: updatedCart });
})


// ! removeProductFromCart controller
const removeProductFromCart = catchError(async (req, res, next) => {
    const { product, coupon = 0 } = req.body
    const user = req.user._id
    const cart = await Cart.findOne({ user });
    !cart && next(new appError("Cart not found", 404));
    const updatedCart = await Cart.findOneAndUpdate({ user }, {
        $pull: { cartItems: { product } }
    }, {
        new: true
    });
    !updatedCart && next(new appError("Cart not updated", 404));
    await calcPrice(updatedCart, coupon);
    await updatedCart.save();
    res.status(200).json({ status: "cart updated successfully", cart: updatedCart });
})

// ! clearCart controller
const clearCart = catchError(async (req, res, next) => {
    const cart = await Cart.findOneAndDelete({ user: req.user._id });
    !cart && next(new appError("Cart not found", 404));
    res.status(200).json({ status: "cart deleted successfully" });
})

// ! export controllers
export {
    clearCart,
    addToCart,
    getLoggedUserCart,
    updateProductQuantity,
    removeProductFromCart,
}