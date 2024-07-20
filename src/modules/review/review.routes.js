import validate from "../../middleware/validate.js";
import * as RC from "./review.controllers.js"
import * as RV from "./review.validations.js"
import { Router } from "express";

// ! creating reviewRouter
const reviewRouter = Router();

reviewRouter.route("/")
    .get(RC.getReviews)
    .post(validate(RV.addReviewValidation),RC.addReview)

reviewRouter.route("/:id")
    .get(RC.getReview)
    .put(validate(RV.updateReviewValidation),RC.updateReview)
    .delete(RC.deleteReview)

// ! exporting reviewRouter
export default reviewRouter;