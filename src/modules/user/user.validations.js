import joi from "joi"

const registerValidation = joi.object({
    name: joi.string().min(3)
        .max(50).required()
        .messages({
            "string.base": "name is required()"
        }),
    email: joi.string().email().required(),
    password: joi.string().required(),
    role: joi.string()
})

const loginValidation = joi.object({
    email: joi.string().email().required(),
    password: joi.string().required()
})

const changePasswordValidation = joi.object({
    oldPassword: joi.string().required(),
    newPassword: joi.string().required()
})

const forgetPasswordValidation = joi.object({
    email: joi.string().email().required(),
})

const resetPasswordValidaton = joi.object({
    email: joi.string().email().required(),
    otp: joi.string().length(6).required(),
    newPassword: joi.string().required()
})
export {
    loginValidation,
    registerValidation,
    resetPasswordValidaton,
    changePasswordValidation,
    forgetPasswordValidation
}