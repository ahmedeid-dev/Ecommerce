import * as AM from "../../middleware/auth/authMiddleware.js";
import checkUserExists from "../../middleware/checkUser.js";
import validate from "../../middleware/validate.js";
import * as UC from "./auth.controllers.js"
import * as UV from "./auth.validations.js"
import { Router } from "express";

// ! creating authRouter
const authRouter = Router()

authRouter.use(AM.checkAdminStatus)
authRouter.use(checkUserExists)

authRouter.route("/")
    .get(UC.getUsers)
    .post(validate(UV.addUserValidation), UC.addUser)

authRouter.route("/:id")
    .get(UC.getUser)
    .put(validate(UV.updateUserValidation), UC.updateUser)
    .delete(UC.deleteUser)
// ! exporting authRouter
export default authRouter