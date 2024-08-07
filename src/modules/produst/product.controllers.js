import Product from './../../../database/models/products.model.js';
import apiFeatures from '../../../utils/apiFeatures.js';
import catchError from '../../../utils/catchError.js';
import { deleteOne } from '../../handler/handlers.js';
import slugify from 'slugify';

// ! getProducts controller
const getProducts = catchError(async (req, res, next) => {
    const features = apiFeatures(Product.find(), req.query)
    let products = await features.query;
    res.status(200).json({
        status: "success", meta: {
            page: features.page,
            count: products.length,
        }, products
    });
})

// ! getProduct controller
const getProduct = catchError(async (req, res, next) => {
    const product = await Product.findById(req.params.id);
    res.status(200).json({ status: "success", product });
})

// ! addProduct controller
const addProduct = catchError(async (req, res, next) => {
    req.body.slug = slugify(req.body.title)
    const product = await Product.create(req.body);
    res.status(200).json({ status: "product added successfully", product });
})

// ! updateProduct controller
const updateProduct = catchError(async (req, res, next) => {
    if (req.body.title) req.body.slug = slugify(req.body.title)
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        // runValidators: true
    });
    res.status(200).json({ status: "product updated successfully", product });
})

// ! deleteProduct controller
const deleteProduct = deleteOne(Product)
// const deleteProduct = catchError(async (req, res, next) => {
//     const product = await Product.findByIdAndDelete(req.params.id);
//     res.status(200).json({ status: "product deleted successfully", product });
// })

// ! exporting controllers
export {
    getProduct,
    addProduct,
    getProducts,
    updateProduct,
    deleteProduct,
}