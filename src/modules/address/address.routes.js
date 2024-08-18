import * as AM from "./../../middleware/auth/authMiddleware.js"
import * as AC from "./address.controllers.js"
import { Router } from "express";
// ! creating addressRouter
const addressRouter = Router();

addressRouter.use(AM.protectedRoute, AM.allowedTo('user'))

addressRouter.route("/")
    .post(AC.addAddress)
    .get(AC.getLoggedUseraddresses)

addressRouter.route("/:id")
    .delete(AC.removeAddress)

// ! exporting addressRouter
export default addressRouter;