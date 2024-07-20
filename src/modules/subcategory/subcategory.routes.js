import * as SC from "./subcategory.controllers.js"
import { Router } from "express";

// ! creating subcategoryRouter
const subcategoryRouter = Router();

subcategoryRouter.route("/")
    .get(SC.getSubcategories)
    .post(SC.addSubcategory)

subcategoryRouter.route("/:id")
    .get(SC.getSubcategory)
    .put(SC.updateSubcategory)
    .delete(SC.deleteSubcategory)

// ! exporting subcategoryRouter
export default subcategoryRouter;