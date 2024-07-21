import { upload } from './../../../utils/fileUpload.js';
import validate from "../../middleware/validate.js";
import * as BC from "./brand.controllers.js";
import * as BV from "./brand.validations.js";
import { Router } from "express";

// ! creating brandRouter
const brandRouter = Router()
brandRouter.route("/")
    .get(BC.getBrands)
    .post(validate(BV.addBrandValidation), upload.single("logo"), BC.addBrand)
    .put(validate(BV.updateBrandValidation), upload.single("logo"), BC.updateBrand)
    .delete(BC.deleteBrand)

// brandRouter.route("/:id/products")

brandRouter.route("/:id")
    .get(BC.getBrand)

// ! exporting brandRouter  
export default brandRouter