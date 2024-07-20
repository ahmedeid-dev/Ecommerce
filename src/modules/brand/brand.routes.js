import validate from "../../middleware/validate.js";
import * as BC from "./brand.controllers.js";
import * as BV from "./brand.validations.js";
import { Router } from "express";

// ! creating brandRouter
const brandRouter = Router()
brandRouter.route("/")
    .get(BC.getBrands)
    .post(validate(BV.addBrandValidation),BC.addBrand)

// brandRouter.route("/:id/products")

brandRouter.route("/:id")
    .get(BC.getBrand)
    .put(validate(BV.updateBrandValidation),BC.updateBrand)
    .delete(BC.deleteBrand)

// ! exporting brandRouter  
export default brandRouter