import * as AM from "./../../auth/auth.middleware.js"
import * as OC from "./order.controllers.js"
import { Router } from "express";

// ! creating orderRouter
const orderRouter = Router({ mergeParams: true, caseSensitive: false });

couponRouter.use(AM.protectedRoute)

orderRouter.route("/")
    .get(AM.allowedTo('user', 'admin'), OC.getUserOrders)
    .post(AM.allowedTo('user'), OC.createCashOrder)

orderRouter.post('session', AM.allowedTo('user'), OC.createCashOrder)

orderRouter.get('/all', AM.allowedTo('admin'), OC.getAllOrders)

// ! exporting orderRouter
export default orderRouter;