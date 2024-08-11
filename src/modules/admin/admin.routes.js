import * as AM from "../../middleware/auth/authMiddleware.js";
import validate from "../../middleware/auth/validate.js";
import * as AC from "./auth.controllers.js"
import * as AV from "./auth.validations.js"
import { Router } from "express";

// ! creating adminRouter
const adminRouter = Router()

adminRouter.use(AM.protectedRoute, AM.allowedTo('admin'))

adminRouter.route("/")
    .get(AC.getUsers)
    .post(validate(AV.addUserValidation), AC.addUser)

adminRouter.route("/:id")
    .get(AC.getUser)
    .put(validate(AV.updateUserValidation), AC.updateUser)
    .delete(AC.deleteUser)
// ! exporting adminRouter
export default adminRouter