import validate from "../../middleware/validate.js";
import * as SC from "./subcategory.controllers.js"
import * as SV from "./subcategory.validations.js"
import { Router } from "express";

// ! creating subcategoryRouter
const subcategoryRouter = Router();

subcategoryRouter.route("/")
    .get(SC.getSubcategories)
    .post(validate(SV.addSubcategoryValidation),SC.addSubcategory)

subcategoryRouter.route("/:id")
    .get(SC.getSubcategory)
    .put(validate(SV.updateSubcategoryValidation),SC.updateSubcategory)
    .delete(SC.deleteSubcategory)

// ! exporting subcategoryRouter
export default subcategoryRouter;