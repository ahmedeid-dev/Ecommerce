import * as AM from "./../../middleware/auth/authMiddleware.js"
import validate from "../../middleware/auth/validate.js";
import * as CC from "./cart.controllers.js"
import * as CV from "./cart.validations.js"
import { Router } from "express";

// ! creating cartRouter
const cartRouter = Router();

cartRouter.use(AM.protectedRoute, AM.allowedTo('user'))

cartRouter.route("/")
    .delete(CC.clearCart)
    .get(CC.getLoggedUserCart)
    .patch(CC.removeProductFromCart)
    .post(validate(CV.addCartValidation), CC.addToCart)
    .put(validate(CV.updateCartValidation), CC.updateProductQuantity)

// ! exporting cartRouter
export default cartRouter