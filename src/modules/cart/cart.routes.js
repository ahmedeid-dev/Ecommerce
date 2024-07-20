import validate from "../../middleware/validate.js";
import * as CC from "./cart.controllers.js"
import * as CV from "./cart.validations.js"
import { Router } from "express";

// ! creating cartRouter
const cartRouter = Router();

cartRouter.route("/")
    .get(CC.getCarts)
    .post(validate(CV.addCartValidation),CC.addCart)

cartRouter.route("/:id")
    .get(CC.getCart)
    .put(validate(CV.updateCartValidation),CC.updateCart)
    .delete(CC.deleteCart)

// ! exporting cartRouter
export default cartRouter