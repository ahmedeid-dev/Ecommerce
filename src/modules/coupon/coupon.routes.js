import validate from "../../middleware/validate.js";
import * as CC from "./coupon.controllers.js"
import * as CV from "./coupon.validations.js"
import { Router } from "express";

// ! creating couponRouter
const couponRouter = Router();

couponRouter.route("/")
    .get(CC.getCoupons)
    .post(validate(CV.addCouponValidation),CC.addCoupon)

couponRouter.route("/:id")
    .get(CC.getCoupon)
    .put(validate(CV.updateCouponValidation),CC.updateCoupon)
    .delete(CC.deleteCoupon)

// ! exporting couponRouter
export default couponRouter;