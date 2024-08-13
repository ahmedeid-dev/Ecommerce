import joi from "joi"

// ! addReviewValidation Schema
const addReviewValidation = joi.object({

    comment: joi.string()
        .required()
        .messages({
            "string.empty": "Comment is required",
        }),
    rating: joi.number()
        .required()
        .messages({
            "string.empty": "Rating is required",
        }),
    product: joi.string()
        .hex()
        .required()
        .messages({
            "string.empty": "product is required",
        }),
    user: joi.string()
        .hex()
        .required()
        .messages({
            "string.empty": "user is required",
        }),
})

// ! updateReviewValidation Schema
const updateReviewValidation = joi.object({
    comment: joi.string()
        .messages({
            "string.empty": "Comment is required",
        }),
    rating: joi.number()
        .messages({
            "string.empty": "Rating is required",
        }),
    product: joi.string()
        .hex()
        .messages({
            "string.empty": "product is required",
        }),
    user: joi.string()
        .hex()
        .messages({
            "string.empty": "user is required",
        }),
})

// ! exporting validations
export {
    addReviewValidation,
    updateReviewValidation
}