import * as AM from "../../middleware/auth/authMiddleware.js";
import checkUserExists from "../../middleware/checkUser.js";
import validate from "../../middleware/validate.js";
import * as AC from "./auth.controllers.js"
import * as AV from "./auth.validations.js"
import { Router } from "express";

// ! creating authRouter
const authRouter = Router()

authRouter.use(AM.checkAdminStatus)
authRouter.use(checkUserExists)

authRouter.route("/")
    .get(AC.getUsers)
    .post(validate(AV.addUserValidation), AC.addUser)

authRouter.route("/:id")
    .get(AC.getUser)
    .put(validate(AV.updateUserValidation), AC.updateUser)
    .delete(AC.deleteUser)
// ! exporting authRouter
export default authRouter