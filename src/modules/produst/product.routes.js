import validate from "../../middleware/validate.js";
import * as PC from "./product.controllers.js"
import * as PV from "./product.validations.js"
import { Router } from "express";

// ! creating productRouter
const productRouter = Router();

productRouter.route("/")
    .get(PC.getProducts)
    .post(validate(PV.addProductValidation),PC.addProduct)

productRouter.route("/:id")
    .get(PC.getProduct)
    .put(validate(PV.updateProductValidation),PC.updateProduct)
    .delete(PC.deleteProduct)

// ! exporting productRouter
export default productRouter;