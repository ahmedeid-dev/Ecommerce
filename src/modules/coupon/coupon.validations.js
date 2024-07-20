import joi from 'joi';

// ! addCouponValidation Schema
const addCouponValidation = joi.object({
    code: joi.string()
        .min(2)
        .max(200)
        .required()
        .messages({
            "string.empty": "Code is required",
            "string.min": "Code must be at least 2 characters long",
            "string.max": "Code must be at most 200 characters long",
        }),
    discount: joi.number()
        .required()
        .messages({
            "string.empty": "Discount is required",
        }),
    expiry: joi.date()
        .required()
        .messages({
            "string.empty": "Expiry is required",
        }),
})

// ! updateCouponValidation Schema
const updateCouponValidation = joi.object({
    code: joi.string()
        .min(2)
        .max(200)
        .messages({
            "string.empty": "Code is required",
            "string.min": "Code must be at least 2 characters long",
            "string.max": "Code must be at most 200 characters long",
        }),
    discount: joi.number()
        .messages({
            "string.empty": "Discount is required",
        }),
    expiry: joi.date()
        .messages({
            "string.empty": "Expiry is required",
        }),
})

// ! export validations
export {
    addCouponValidation,
    updateCouponValidation
}