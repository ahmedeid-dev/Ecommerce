import * as RC from "./review.controllers.js"
import { Router } from "express";

// ! creating reviewRouter
const reviewRouter = Router();

reviewRouter.route("/")
    .get(RC.getReviews)
    .post(RC.addReview)

reviewRouter.route("/:id")
    .get(RC.getReview)
    .put(RC.updateReview)
    .delete(RC.deleteReview)

// ! exporting reviewRouter
export default reviewRouter;