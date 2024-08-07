import Brand from './../../../database/models/brands.model.js';
import apiFeatures from '../../../utils/apiFeatures.js';
import catchError from '../../../utils/catchError.js'
import slugify from 'slugify';

// ! getBrands controller
const getBrands = catchError(async (req, res, next) => {
    const features = apiFeatures(Brand.find(), req.query)
    let brands = await features.query;
    res.status(200).json({
        status: "success", meta: {
            page: features.page,
            count: brands.length,
        }, brands
    });
})

// ! getBrand controller
const getBrand = catchError(async (req, res, next) => {
    const brand = await Brand.findById(req.user._id);
    res.status(200).json({ status: "success", brand });
})

// ! addBrand controller
const addBrand = catchError(async (req, res, next) => {
    req.body.slug = slugify(req.body.name)
    const brand = await Brand.create(req.body);
    res.status(201).json({ status: "brand added successfully", brand });
})

// ! updateBrand controller
const updateBrand = catchError(async (req, res, next) => {
    if (req.body.name) req.body.slug = slugify(req.body.name);
    const brand = await Brand.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        // runValidators: true
    });
    res.status(200).json({ status: "brand updated successfully", brand });
})

// ! deleteBrand controller
const deleteBrand = catchError(async (req, res, next) => {
    const brand = await Brand.findByIdAndDelete(req.user._id);
    res.status(200).json({ status: "brand deleted successfully", brand });
})

// ! exporting controllers
export {
    getBrands,
    getBrand,
    addBrand,
    updateBrand,
    deleteBrand
}