import validate from "../../middleware/auth/validate.js";
import * as AM from "./../../auth/auth.middleware.js"
import * as CC from "./cart.controllers.js"
import * as CV from "./cart.validations.js"
import { Router } from "express";

// ! creating cartRouter
const cartRouter = Router();

cartRouter.use(AM.protectedRoute, AM.allowedTo('user'))

cartRouter.route("/")
    .get(CC.getCarts)
    .post(validate(CV.addCartValidation),CC.addCart)

cartRouter.route("/:id")
    .get(CC.getCart)
    .put(validate(CV.updateCartValidation),CC.updateCart)
    .delete(AM.allowedTo('user','admin'),CC.deleteCart)

// ! exporting cartRouter
export default cartRouter