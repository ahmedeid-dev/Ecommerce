import * as AM from "./../../middleware/auth/authMiddleware.js"
import validate from "../../middleware/auth/validate.js";
import * as SC from "./subcategory.controllers.js"
import * as SV from "./subcategory.validations.js"
import { Router } from "express";
// ! creating subcategoryRouter
const subcategoryRouter = Router({ mergeParams: true, caseSensitive: false });

subcategoryRouter.route("/")
    .get(SC.getSubcategories)
    .post(AM.protectedRoute, AM.allowedTo('admin'), validate(SV.addSubcategoryValidation), SC.addSubcategory)

subcategoryRouter.route("/:id")
    .get(SC.getSubcategory)
    .put(AM.protectedRoute, AM.allowedTo('admin'), validate(SV.updateSubcategoryValidation), SC.updateSubcategory)
    .delete(AM.protectedRoute, AM.allowedTo('admin'), SC.deleteSubcategory)

// ! exporting subcategoryRouter
export default subcategoryRouter;