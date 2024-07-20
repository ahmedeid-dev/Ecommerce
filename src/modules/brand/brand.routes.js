import * as BC from "./brand.controllers.js";
import { Router } from "express";

// ! creating brandRouter
const brandRouter = Router()
brandRouter.route("/")
    .get(BC.getBrands)
    .post(BC.addBrand)

// brandRouter.route("/:id/products")

brandRouter.route("/:id")
    .get(BC.getBrand)
    .put(BC.updateBrand)
    .delete(BC.deleteBrand)

// ! exporting brandRouter  
export default brandRouter