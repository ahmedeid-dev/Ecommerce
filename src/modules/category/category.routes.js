import * as CC from "./category.controllers.js"
import { Router } from "express";

// ! creating categoryRouter
const categoryRouter = Router();

categoryRouter.route("/")
    .get(CC.getCategories)
    .post(CC.addCategory)

categoryRouter.route("/:id")
    .get(CC.getCategory)
    .put(CC.updateCategory)
    .delete(CC.deleteCategory)

// ! exporting categoryRouter
export default categoryRouter;