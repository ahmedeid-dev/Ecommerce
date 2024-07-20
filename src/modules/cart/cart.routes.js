import * as CC from "./cart.controllers.js"
import { Router } from "express";

// ! creating cartRouter
const cartRouter = Router();

cartRouter.route("/")
    .get(CC.getCarts)
    .post(CC.addCart)

cartRouter.route("/:id")
    .get(CC.getCart)
    .put(CC.updateCart)
    .delete(CC.deleteCart)

// ! exporting cartRouter
export default cartRouter