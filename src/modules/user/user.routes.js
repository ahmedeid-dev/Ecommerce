import * as AC from "./user.controllers.js"
import { Router } from "express";

// ! creating userRouter
const userRouter = Router()

userRouter.route("/register").post(AC.register)
userRouter.route("/login").post(AC.login)
userRouter.route("changePassword").put(AC.changePassword)
userRouter.route("forgotPassword").post(AC.forgotPassword)
userRouter.route("resetPassword").put(AC.resetPassword)
userRouter.route("logout").get(AC.logout)

// ! exporting userRouter
export default userRouter