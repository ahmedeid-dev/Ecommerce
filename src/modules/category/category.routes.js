import subcategoryRouter from '../subcategory/subcategory.routes.js';
import * as AM from "./../../middleware/auth/authMiddleware.js"
import validate from "../../middleware/auth/validate.js";
import { upload } from './../../../utils/fileUpload.js';
import * as CC from "./category.controllers.js"
import * as CV from "./category.validations.js"
import { Router } from "express";

// ! creating categoryRouter
const categoryRouter = Router();

categoryRouter.use("/:category/subcategories", subcategoryRouter)

categoryRouter.route("/")
    .get(CC.getCategories)
    .post(AM.protectedRoute, AM.allowedTo('admin'), validate(CV.addCategoryValidation), upload.single("image"), CC.addCategory)

categoryRouter.route("/:id")
    .get(CC.getCategory)
    .put(AM.protectedRoute, AM.allowedTo('admin'), validate(CV.updateCategoryValidation), CC.updateCategory)
    .delete(AM.protectedRoute, AM.allowedTo('admin'), CC.deleteCategory)

// ! exporting categoryRouter
export default categoryRouter;