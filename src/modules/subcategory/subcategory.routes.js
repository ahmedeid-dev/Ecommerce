import validate from "../../middleware/auth/validate.js";
import * as AM from "./../../auth/auth.middleware.js"
import * as SC from "./subcategory.controllers.js"
import * as SV from "./subcategory.validations.js"
import { Router } from "express";
// ! creating subcategoryRouter
const subcategoryRouter = Router({ mergeParams: true, caseSensitive: false });

subcategoryRouter.route("/")
    .get(SC.getSubcategories)
    .post(AM.productRouter, AM.allowedTo('admin'), validate(SV.addSubcategoryValidation), SC.addSubcategory)

subcategoryRouter.route("/:id")
    .get(SC.getSubcategory)
    .put(AM.productRouter, AM.allowedTo('admin'), validate(SV.updateSubcategoryValidation), SC.updateSubcategory)
    .delete(AM.productRouter, AM.allowedTo('admin'), SC.deleteSubcategory)

// ! exporting subcategoryRouter
export default subcategoryRouter;