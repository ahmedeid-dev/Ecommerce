import * as AM from "./../../middleware/auth/authMiddleware.js"
import validate from "../../middleware/auth/validate.js";
import orderRouter from "../order/order.routes.js";
import * as UV from "./user.validations.js";
import * as UC from "./user.controllers.js"
import { Router } from "express";
// ! creating userRouter
const userRouter = Router()


userRouter.use("/:user/oders", orderRouter)

userRouter.route("/register")
    .post(validate(UV.registerValidation), UC.register)
userRouter.route("/login")
    .post(validate(UV.loginValidation), UC.login)
userRouter.route("changePassword")
    .put(AM.protectedRoute, AM.allowedTo('user', 'admin'), validate(UV.changePasswordValidation), UC.changePassword)
userRouter.route("forgotPassword")
    .post(AM.protectedRoute, AM.allowedTo('user'), validate(UV.forgetPasswordValidation), UC.forgotPassword)
// userRouter.route("resetPassword")
//     .put(UV.resetPasswordValidaton, UC.resetPassword)
userRouter.route("logout").get(AM.protectedRoute, AM.allowedTo('user'), UC.logout)

// ! exporting userRouter
export default userRouter