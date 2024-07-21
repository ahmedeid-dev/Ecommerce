import joi from "joi"

// ! addProductValidation Schema
const addProductValidation = joi.object({
    title: joi.string()
        .min(2)
        .max(200)
        .required()
        .messages({
            "string.empty": "Title is required",
            "string.min": "Title must be at least 2 characters long",
            "string.max": "Title must be at most 200 characters long",
        }),
    slug: joi.string()
        .min(2)
        .max(400)
        .required()
        .messages({
            "string.empty": "slug is required",
            "string.min": "slug must be at least 2 characters long",
            "string.max": "slug must be at most 400 characters long",
        }),
    description: joi.string()
        .min(10)
        .max(2000)
        .required()
        .messages({
            "string.empty": "Description is required",
            "string.min": "Description must be at least 10 characters long",
            "string.max": "Description must be at most 2000 characters long",
        }),
    imageCover: joi.string()
        .required()
        .messages({
            "string.empty": "Image is required",
        }),
    images: joi.array()
        .required()
        .messages({
            "string.empty": "Images are required",
        }),
    price: joi.number()
        .required()
        .messages({
            "string.empty": "Price is required",
        }),
    discount: joi.number()
        .min(0)
        .max(100)
        .messages({
            "string.empty": "Discount is required",
        }),
    quantity: joi.number()
        .required()
        .messages({
            "string.empty": "Quantity is required",
        }),
    sold: joi.number()
        .messages({
            "string.empty": "Sold is required",
        }),
    rateAvg: joi.number()
        .messages({
            "string.empty": "RateAvg is required",
        }),
    rateCount: joi.number()
        .messages({
            "string.empty": "RateCount is required",
        }),
    categoryId: joi.string()
        .hex()
        .required()
        .messages({
            "string.empty": "CategoryId is required",
        }),
    subcategoryId: joi.string()
        .hex()
        .required()
        .messages({
            "string.empty": "SubcategoryId is required",
        }),
    brandId: joi.string()
        .hex()
        .required()
        .messages({
            "string.empty": "BrandId is required",
        }),
})

// ! updateProductValidation Schema
const updateProductValidation = joi.object({
    title: joi.string()
        .min(2)
        .max(200)
        .messages({
            "string.empty": "Title is required",
            "string.min": "Title must be at least 2 characters long",
            "string.max": "Title must be at most 200 characters long",
        }),
    slug: joi.string()
        .min(2)
        .max(400)
        .messages({
            "string.empty": "slug is required",
            "string.min": "slug must be at least 2 characters long",
            "string.max": "slug must be at most 400 characters long",
        }),
    description: joi.string()
        .min(10)
        .max(2000)
        .messages({
            "string.empty": "Description is required",
            "string.min": "Description must be at least 10 characters long",
            "string.max": "Description must be at most 2000 characters long",
        }),
    imageCover: joi.string()
        .messages({
            "string.empty": "Image is required",
        }),
    images: joi.array()
        .messages({
            "string.empty": "Images are required",
        }),
    price: joi.number()
        .messages({
            "string.empty": "Price is required",
        }),
    discount: joi.number()
        .min(0)
        .max(100)
        .messages({
            "string.empty": "Discount is required",
        }),
    quantity: joi.number()
        .messages({
            "string.empty": "Quantity is required",
        }),
    sold: joi.number()
        .messages({
            "string.empty": "Sold is required",
        }),
    rateAvg: joi.number()
        .messages({
            "string.empty": "RateAvg is required",
        }),
    rateCount: joi.number()
        .messages({
            "string.empty": "RateCount is required",
        }),
    categoryId: joi.string()
        .hex()
        .messages({
            "string.empty": "CategoryId is required",
        }),
    subcategoryId: joi.string()
        .hex()
        .messages({
            "string.empty": "SubcategoryId is required",
        }),
    brandId: joi.string()
        .hex()
        .messages({
            "string.empty": "BrandId is required",
        }),
})

// ! export validations
export {
    addProductValidation,
    updateProductValidation
}