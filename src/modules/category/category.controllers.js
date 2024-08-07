import Category from './../../../database/models/categories.model.js';
import apiFeatures from '../../../utils/apiFeatures.js';
import catchError from '../../../utils/catchError.js';
import slugify from 'slugify';

// ! getCategories controller
const getCategories = catchError(async (req, res, next) => {
    const features = apiFeatures(Category.find(), req.query)
    let categories = await features.query;
    res.status(200).json({
        status: "success", meta: {
            page: features.page,
            count: categories.length,
        }, categories
    });
}
)
// ! getCategory controller
const getCategory = catchError(async (req, res, next) => {
    const category = await Category.findById(req.params.id);
    res.status(200).json({ status: "success", category });
}
)
// ! addCategory controller
const addCategory = catchError(async (req, res, next) => {
    req.body.slug = slugify(req.body.name)
    const category = await Category.create(req.body);
    res.status(201).json({ status: "category added successfully", category });
})

// ! updateCategory controller
const updateCategory = catchError(async (req, res, next) => {
    if (req.body.name) req.body.slug = slugify(req.body.name);
    const category = await Category.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        // runValidators: true
    });
    res.status(200).json({ status: "category updated successfully", category });
})

// ! deleteCategory controller
const deleteCategory = catchError(async (req, res, next) => {
    const category = await Category.findByIdAndDelete(req.params.id);
    res.status(200).json({ status: "category deleted successfully", category });
})

// ! export controllers
export {
    getCategories,
    getCategory,
    addCategory,
    updateCategory,
    deleteCategory
}