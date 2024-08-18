import * as AM from "./../../middleware/auth/authMiddleware.js"
import validate from "../../middleware/auth/validate.js";
import { upload } from './../../../utils/fileUpload.js';
import * as PC from "./product.controllers.js"
import * as PV from "./product.validations.js"
import { Router } from "express";

// ! creating productRouter
const productRouter = Router();

productRouter.route("/")
    .get(PC.getProducts)
    .post(AM.protectedRoute, AM.allowedTo('admin'), validate(PV.addProductValidation), upload.fields([
        { name: "imageCover", maxCount: 1 },
        { name: "images", maxCount: 10 }
    ]), PC.addProduct)

productRouter.route("/:id")
    .get(PC.getProduct)
    .put(AM.protectedRoute, AM.allowedTo('admin'), validate(PV.updateProductValidation), upload.fields([
        { name: "imageCover", maxCount: 1 },
        { name: "images", maxCount: 10 }
    ]), PC.updateProduct)
    .delete(AM.protectedRoute, AM.allowedTo('admin'), PC.deleteProduct)

// ! exporting productRouter
export default productRouter;