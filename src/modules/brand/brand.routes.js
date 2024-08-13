import productRouter from './../produst/product.routes.js';
import validate from "../../middleware/auth/validate.js";
import { upload } from './../../../utils/fileUpload.js';
import * as AM from "./../../auth/auth.middleware.js"
import * as BC from "./brand.controllers.js";
import * as BV from "./brand.validations.js";
import { Router } from "express";

// ! creating brandRouter
const brandRouter = Router()
brandRouter.route("/")
    .get(BC.getBrands)
    .post(AM.protectedRoute, AM.allowedTo('admin'), validate(BV.addBrandValidation), upload.single("logo"), BC.addBrand)
    .put(AM.protectedRoute, AM.allowedTo('admin'), validate(BV.updateBrandValidation), upload.single("logo"), BC.updateBrand)
    .delete(AM.protectedRoute, AM.allowedTo('admin'), BC.deleteBrand)

brandRouter.route("/:brand/products", productRouter)

brandRouter.route("/:id")
    .get(BC.getBrand)

// ! exporting brandRouter  
export default brandRouter