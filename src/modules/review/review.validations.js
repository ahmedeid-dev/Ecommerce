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
    productId: joi.string()
        .hex()
        .required()
        .messages({
            "string.empty": "ProductId is required",
        }),
    userId: joi.string()
        .hex()
        .required()
        .messages({
            "string.empty": "UserId is required",
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
    productId: joi.string()
        .hex()
        .messages({
            "string.empty": "ProductId is required",
        }),
    userId: joi.string()
        .hex()
        .messages({
            "string.empty": "UserId is required",
        }),
})

// ! exporting validations
export {
    addReviewValidation,
    updateReviewValidation
}