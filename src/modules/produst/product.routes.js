import validate from "../../middleware/validate.js";
import * as PC from "./product.controllers.js"
import * as PV from "./product.validations.js"
import { Router } from "express";
import { upload } from './../../../utils/fileUpload';

// ! creating productRouter
const productRouter = Router();

productRouter.route("/")
    .get(PC.getProducts)
    .post(validate(PV.addProductValidation), upload.fields([
        { name: "imageCover", maxCount: 1 },
        { name: "images", maxCount: 10 }
    ]), PC.addProduct)

productRouter.route("/:id")
    .get(PC.getProduct)
    .put(validate(PV.updateProductValidation), upload.fields([
        { name: "imageCover", maxCount: 1 },
        { name: "images", maxCount: 10 }
    ]), PC.updateProduct)
    .delete(PC.deleteProduct)

// ! exporting productRouter
export default productRouter;