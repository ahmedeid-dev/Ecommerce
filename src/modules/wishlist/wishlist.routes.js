import * as AM from "./../../auth/auth.middleware.js"
import * as WC from "./wishlist.controllers.js"
import { Router } from "express";
// ! creating wishlistRouter
const wishlistRouter = Router();

wishlistRouter.use(AM.protectedRoute, AM.allowedTo('user'))

wishlistRouter.route("/")
    .get(WC.getWishlists)
    .post(WC.addWishlist)

wishlistRouter.route("/:id")
    .get(WC.getWishlist)
    .put(WC.updateWishlist)
    .delete(WC.deleteWishlist)

// ! exporting wishlistRouter
export default wishlistRouter;