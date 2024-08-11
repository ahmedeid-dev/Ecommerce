import * as AM from "./../../auth/auth.middleware.js"
import * as OC from "./order.controllers.js"
import { Router } from "express";

// ! creating orderRouter
const orderRouter = Router();

couponRouter.use(AM.protectedRoute, AM.allowedTo('user'))

orderRouter.route("/")
    .get(OC.getOrders)
    .post(OC.addOrder)

orderRouter.route("/:id")
    .get(OC.getOrder)
    .put(OC.updateOrder)
    .delete(OC.deleteOrder)

// ! exporting orderRouter
export default orderRouter;