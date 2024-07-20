import joi from "joi"

// ! addSubcategoryValidation Schema
const addSubcategoryValidation = joi.object({

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
    categoryId: joi.string()
        .hex()
        .required()
        .messages({
            "string.empty": "CategoryId is required",
        })
})

// ! updateSubcategoryValidation Schema
const updateSubcategoryValidation = joi.object({

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
    categoryId: joi.string()
        .hex()
        .messages({
            "string.empty": "CategoryId is required",
        })
})

// ! export validations
export {
    addSubcategoryValidation,
    updateSubcategoryValidation
}