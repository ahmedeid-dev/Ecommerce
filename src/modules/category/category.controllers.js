import Category from './../../../database/models/categories.model.js';
import slugify from 'slugify';

// ! getCategories controller
const getCategories = async (req, res, next) => {
    const categories = await Category.find();
    res.status(200).json({ status: "success", count: categories.length, categories });
}

// ! getCategory controller
const getCategory = async (req, res, next) => {
    const category = await Category.findById(req.params.id);
    res.status(200).json({ status: "success", category });
}

// ! addCategory controller
const addCategory = async (req, res, next) => {
    req.body.slug = slugify(req.body.name)
    const category = await Category.create(req.body);
    res.status(201).json({ status: "category added successfully", category });
}

// ! updateCategory controller
const updateCategory = async (req, res, next) => {
    if (req.body.name) req.body.slug = slugify(req.body.name);
    const category = await Category.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        // runValidators: true
    });
    res.status(200).json({ status: "category updated successfully", category });
}

// ! deleteCategory controller
const deleteCategory = async (req, res, next) => {
    const category = await Category.findByIdAndDelete(req.params.id);
    res.status(200).json({ status: "category deleted successfully", category });
}

// ! export controllers
export {
    getCategories,
    getCategory,
    addCategory,
    updateCategory,
    deleteCategory
}