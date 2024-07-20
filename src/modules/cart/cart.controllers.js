import Cart from './../../../database/models/carts.model.js';

// ! getCart controller
const getCarts = async (req, res, next) => {
    const carts = await Cart.find();
    res.status(200).json({ status: "success", count: carts.length, carts });
}

// ! getCart controller
const getCart = async (req, res, next) => {
    const cart = await Cart.findById(req.params.id);
    res.status(200).json({ status: "success", cart });
}

// ! addCart controller
const addCart = async (req, res, next) => {
    const cart = await Cart.create(req.body);
    res.status(201).json({ status: "cart added successfully", cart });
}

// ! updateCart controller
const updateCart = async (req, res, next) => {
    const cart = await Cart.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        // runValidators: true
    });
    res.status(200).json({ status: "cart updated successfully", cart });
}

// ! deleteCart controller
const deleteCart = async (req, res, next) => {
    const cart = await Cart.findByIdAndDelete(req.params.id);
    res.status(200).json({ status: "cart deleted successfully", cart });
}

// ! export controllers
export {
    getCarts,
    getCart,
    addCart,
    updateCart,
    deleteCart
}