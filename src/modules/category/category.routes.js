import subcategoryRouter from '../subcategory/subcategory.routes.js';
import { upload } from './../../../utils/fileUpload.js';
import validate from "../../middleware/validate.js";
import * as CC from "./category.controllers.js"
import * as CV from "./category.validations.js"
import { Router } from "express";

// ! creating categoryRouter
const categoryRouter = Router();

categoryRouter.use("/:categoryId/subcategories", subcategoryRouter)

categoryRouter.route("/")
    .get(CC.getCategories)
    .post(validate(CV.addCategoryValidation), upload.single("image"), CC.addCategory)

categoryRouter.route("/:id")
    .get(CC.getCategory)
    .put(validate(CV.updateCategoryValidation), CC.updateCategory)
    .delete(CC.deleteCategory)

// ! exporting categoryRouter
export default categoryRouter;