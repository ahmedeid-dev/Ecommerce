import joi from 'joi';

// ! addCategoryValidation Schema
const addCategoryValidation = joi.object({
    name: joi.string()
        .min(2)
        .max(200)
        .required()
        .messages({
            "string.empty": "Name is required",
            "string.min": "Name must be at least 2 characters long",
            "string.max": "Name must be at most 200 characters long",
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
    image: joi.string()
        .required()
        .messages({
            "string.empty": "Image is required",
        }),
})

// ! updateCategoryValidation Schema
const updateCategoryValidation = joi.object({
    name: joi.string()
        .min(2)
        .max(200)
        .messages({
            "string.empty": "Name is required",
            "string.min": "Name must be at least 2 characters long",
            "string.max": "Name must be at most 200 characters long",
        }),
    slug: joi.string()
        .min(2)
        .max(400)
        .messages({
            "string.empty": "slug is required",
            "string.min": "slug must be at least 2 characters long",
            "string.max": "slug must be at most 400 characters long",
        }),
    image: joi.string()
        .messages({
            "string.empty": "Image is required",
        }),
})

// ! export validations
export {
    addCategoryValidation,
    updateCategoryValidation
}