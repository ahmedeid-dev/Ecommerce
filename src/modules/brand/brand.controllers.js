import Brand from './../../../database/models/brands.model.js';
import slugify from 'slugify';

// ! getBrands controller
const getBrands = async (req, res, next) => {
    const brands = await Brand.find();
    res.status(200).json({ status: "success", count: brands.length, brands });
}

// ! getBrand controller
const getBrand = async (req, res, next) => {
    const brand = await Brand.findById(req.params.id);
    res.status(200).json({ status: "success", brand });
}

// ! addBrand controller
const addBrand = async (req, res, next) => {
    req.body.slug = slugify(req.body.name)
    const brand = await Brand.create(req.body);
    res.status(201).json({ status: "brand added successfully", brand });
}

// ! updateBrand controller
const updateBrand = async (req, res, next) => {
    if (req.body.name) req.body.slug = slugify(req.body.name);
    const brand = await Brand.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        // runValidators: true
    });
    res.status(200).json({ status: "brand updated successfully", brand });
}

// ! deleteBrand controller
const deleteBrand = async (req, res, next) => {
    const brand = await Brand.findByIdAndDelete(req.params.id);
    res.status(200).json({ status: "brand deleted successfully", brand });
}

// ! exporting controllers
export {
    getBrands,
    getBrand,
    addBrand,
    updateBrand,
    deleteBrand
}