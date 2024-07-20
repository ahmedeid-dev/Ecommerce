import * as CC from "./coupon.controllers.js"
import { Router } from "express";

// ! creating couponRouter
const couponRouter = Router();

couponRouter.route("/")
    .get(CC.getCoupons)
    .post(CC.addCoupon)

couponRouter.route("/:id")
    .get(CC.getCoupon)
    .put(CC.updateCoupon)
    .delete(CC.deleteCoupon)

// ! exporting couponRouter
export default couponRouter;