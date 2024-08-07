import Cart from './../../../database/models/carts.model.js';
import apiFeatures from '../../../utils/apiFeatures.js';
import catchError from '../../../utils/catchError.js';

// ! getCart controller
const getCarts = catchError(async (req, res, next) => {
    const features = apiFeatures(Cart.find(), req.query)
    let carts = await features.query;
    res.status(200).json({
        status: "success", meta: {
            page: features.page,
            count: carts.length,
        }, carts
    });
})

// ! getCart controller
const getCart = catchError(async (req, res, next) => {
    const cart = await Cart.findById(req.params.id);
    res.status(200).json({ status: "success", cart });
})

// ! addCart controller
const addCart = catchError(async (req, res, next) => {
    const cart = await Cart.create(req.body);
    res.status(201).json({ status: "cart added successfully", cart });
})

// ! updateCart controller
const updateCart = catchError(async (req, res, next) => {
    const cart = await Cart.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        // runValidators: true
    });
    res.status(200).json({ status: "cart updated successfully", cart });
})

// ! deleteCart controller
const deleteCart = catchError(async (req, res, next) => {
    const cart = await Cart.findByIdAndDelete(req.params.id);
    res.status(200).json({ status: "cart deleted successfully", cart });
})

// ! export controllers
export {
    getCarts,
    getCart,
    addCart,
    updateCart,
    deleteCart
}