import Product from './../../../database/models/products.model.js';

// ! getProducts controller
const getProducts = async (req, res, next) => {
    const products = await Product.find();
    res.status(200).json({ status: "success", count: products.length, products });
}

// ! getProduct controller
const getProduct = async (req, res, next) => {
    const product = await Product.findById(req.params.id);
    res.status(200).json({ status: "success", product });
}

// ! addProduct controller
const addProduct = async (req, res, next) => {
    req.body.slug = slugify(req.body.title)
    const product = await Product.create(req.body);
    res.status(200).json({ status: "product added successfully", product });
}

// ! updateProduct controller
const updateProduct = async (req, res, next) => {
    if (req.body.title) req.body.slug = slugify(req.body.title)
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        // runValidators: true
    });
    res.status(200).json({ status: "product updated successfully", product });
}

// ! deleteProduct controller
const deleteProduct = async (req, res, next) => {
    const product = await Product.findByIdAndDelete(req.params.id);
    res.status(200).json({ status: "product deleted successfully", product });
}

// ! exporting controllers
export {
    getProducts,
    getProduct,
    addProduct,
    updateProduct,
    deleteProduct
}