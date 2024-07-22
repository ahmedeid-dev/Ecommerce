import joi from 'joi';

// ! addUserValidation Schema
const addUserValidation = joi.object({
    name: joi.string()
        .required()
        .messages({
            "string.empty": "Name is required",
        }),
    email: joi.string()
        .email()
        .required()
        .messages({
            "string.empty": "Email is required",
        }),
    password: joi.string()
        .required()
        .messages({
            "string.empty": "Password is required",
        }),
})

// ! updateUserValidation Schema
const updateUserValidation = joi.object({
    id: joi.string()
        .hex()
        .messages({
            "string.hex": "Id is invalid",
        }),
    name: joi.string()
        .messages({
            "string.empty": "Name is required",
        }),
    email: joi.string()
        .email()
        .messages({
            "string.empty": "Email is required",
        }),
    password: joi.string()
        .messages({
            "string.empty": "Password is required",
        }),
})

// ! exporting validations
export {
    addUserValidation,
    updateUserValidation
}
