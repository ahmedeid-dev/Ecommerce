import * as AC from "./auth.controllers.js"
import { Router } from "express";

// ! creating authRouter
const authRouter = Router()

authRouter.route("/register").post(AC.register)
authRouter.route("/login").post(AC.login)
authRouter.route("changePassword").put(AC.changePassword)
authRouter.route("forgotPassword").post(AC.forgotPassword)
authRouter.route("resetPassword").put(AC.resetPassword)
authRouter.route("logout").get(AC.logout)

// ! exporting authRouter
export default authRouter