import * as PC from "./product.controllers.js"
import { Router } from "express";

// ! creating productRouter
const productRouter = Router();

productRouter.route("/")
    .get(PC.getProducts)
    .post(PC.addProduct)

productRouter.route("/:id")
    .get(PC.getProduct)
    .put(PC.updateProduct)
    .delete(PC.deleteProduct)

// ! exporting productRouter
export default productRouter;