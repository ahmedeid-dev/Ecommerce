import SubCategory from './../../../database/models/subCategories.model.js';
import catchError from '../../../utils/catchError.js';
import slugify from 'slugify';

// ! getSubcategories controller
const getSubcategories = catchError(async (req, res, next) => {
    const subcategories = await SubCategory.find();
    res.status(200).json({ status: "success", subcategories });
}
)
// ! getSubcategory controller
const getSubcategory = catchError(async (req, res, next) => {
    const subcategory = await SubCategory.findById(req.params.id);
    res.status(200).json({ status: "success", subcategory });
}
)
// ! addSubcategory controller
const addSubcategory = catchError(async (req, res, next) => {
    req.body.slug = slugify(req.body.name)
    const subcategory = await SubCategory.create(req.body);
    res.status(200).json({ status: "subcategory added successfully", subcategory });
})

// ! updateSubcategory controller
const updateSubcategory = catchError(async (req, res, next) => {
    if (req.body.name) req.body.slug = slugify(req.body.name);
    const subcategory = await SubCategory.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    res.status(200).json({ status: "subcategory updated successfully", subcategory });
})

// ! deleteSubcategory controller
const deleteSubcategory = catchError(async (req, res, next) => {
    const subcategory = await SubCategory.findByIdAndDelete(req.params.id);
    res.status(200).json({ status: "subcategory deleted successfully", subcategory });
})

// ! exporting controllers
export {
    getSubcategories,
    getSubcategory,
    addSubcategory,
    updateSubcategory,
    deleteSubcategory
}