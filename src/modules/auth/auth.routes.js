import * as AM from "../../middleware/auth/authMiddleware.js";
import checkUserExists from "../../middleware/checkUser.js";
import * as UC from "./auth.controllers.js"
import { Router } from "express";

// ! creating authRouter
const authRouter = Router()

authRouter.use(AM.checkAdminStatus)
authRouter.use(checkUserExists)

authRouter.route("/")
    .get(UC.getUsers)
    .post(UC.addUser)

authRouter.route("/:id")
    .get(UC.getUser)
    .put(UC.updateUser)
    .delete(UC.deleteUser)
// ! exporting authRouter
export default authRouter