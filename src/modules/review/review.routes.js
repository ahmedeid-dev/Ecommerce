import * as AM from "./../../middleware/auth/authMiddleware.js"
import validate from "../../middleware/auth/validate.js";
import * as RC from "./review.controllers.js"
import * as RV from "./review.validations.js"
import { Router } from "express";
// ! creating reviewRouter
const reviewRouter = Router();

reviewRouter.route("/")
    .get(RC.getReviews)
    .post(AM.protectedRoute, AM.allowedTo('user'), validate(RV.addReviewValidation), RC.addReview)

reviewRouter.route("/:id")
    .get(RC.getReview)
    .put(AM.protectedRoute, AM.allowedTo('user'), validate(RV.updateReviewValidation), RC.updateReview)
    .delete(AM.protectedRoute, AM.allowedTo('admin', 'user'), RC.deleteReview)

// ! exporting reviewRouter
export default reviewRouter;