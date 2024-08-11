import validate from "../../middleware/auth/validate.js";
import * as AM from "./../../auth/auth.middleware.js"
import * as RC from "./review.controllers.js"
import * as RV from "./review.validations.js"
import { Router } from "express";
// ! creating reviewRouter
const reviewRouter = Router();

reviewRouter.route("/")
    .get(RC.getReviews)
    .post(AM.productRouter, AM.allowedTo('user'), validate(RV.addReviewValidation), RC.addReview)

reviewRouter.route("/:id")
    .get(RC.getReview)
    .put(AM.productRouter, AM.allowedTo('user'), validate(RV.updateReviewValidation), RC.updateReview)
    .delete(AM.productRouter, AM.allowedTo('admin', 'user'), RC.deleteReview)

// ! exporting reviewRouter
export default reviewRouter;