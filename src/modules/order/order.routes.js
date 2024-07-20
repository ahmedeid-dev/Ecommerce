import * as OC from "./order.controllers.js"
import { Router } from "express";

// ! creating orderRouter
const orderRouter = Router();

orderRouter.route("/")
    .get(OC.getOrders)
    .post(OC.addOrder)

orderRouter.route("/:id")
    .get(OC.getOrder)
    .put(OC.updateOrder)
    .delete(OC.deleteOrder)

// ! exporting orderRouter
export default orderRouter;