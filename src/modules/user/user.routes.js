import validate from "../../middleware/validate.js";
import * as UV from "./user.validations.js";
import * as UC from "./user.controllers.js"
import { Router } from "express";

// ! creating userRouter
const userRouter = Router()

userRouter.route("/register")
    .post(validate(UV.registerValidation), UC.register)
userRouter.route("/login")
    .post(validate(UV.loginValidation), UC.login)
userRouter.route("changePassword")
    .put(validate(UV.changePasswordValidation), UC.changePassword)
userRouter.route("forgotPassword")
    .post(validate(UV.forgetPasswordValidation), UC.forgotPassword)
// userRouter.route("resetPassword")
//     .put(UV.resetPasswordValidaton, UC.resetPassword)
userRouter.route("logout").get(UC.logout)

// ! exporting userRouter
export default userRouter