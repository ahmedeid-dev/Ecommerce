import * as AM from "./../../middleware/auth/authMiddleware.js"
import * as WC from "./wishlist.controllers.js"
import { Router } from "express";
// ! creating wishlistRouter
const wishlistRouter = Router();

wishlistRouter.use(AM.protectedRoute, AM.allowedTo('user'))

wishlistRouter.route("/")
    .post(WC.addToWishlist)
    .get(WC.getLoggedUserWishlist)

wishlistRouter.route("/:id")
    .delete(WC.removeFromWishlist)

// ! exporting wishlistRouter
export default wishlistRouter;