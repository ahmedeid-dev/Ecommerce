import subcategoryRouter from "./modules/subcategory/subcategory.routes.js"
import wishlistRouter from "./modules/wishlist/wishlist.routes.js"
import categoryRouter from "./modules/category/category.routes.js"
import productRouter from "./modules/produst/product.routes.js"
import couponRouter from "./modules/coupon/coupon.routes.js"
import reviewRouter from "./modules/review/review.routes.js"
import brandRouter from "./modules/brand/brand.routes.js"
import orderRouter from "./modules/order/order.routes.js"
import authRouter from "./modules/auth/auth.routes.js"
import cartRouter from "./modules/cart/cart.routes.js"
import userRouter from "./modules/user/user.routes.js"

const bootstrap = (app) => {

    // ! handling root route
    app.use("/", (req, res, next) => {
        res.status(200).json({ message: "Welcome to Ecommerce" })
    })

    // ! handling All routes
    app.use("/subcategories", subcategoryRouter)
    app.use("/categories", categoryRouter)
    app.use("/wishlists", wishlistRouter)
    app.use("/products", productRouter)
    app.use("/coupons", couponRouter)
    app.use("/reviews", reviewRouter)
    app.use("/brands", brandRouter)
    app.use("/orders", orderRouter)
    app.use("/users", userRouter)
    app.use("/carts", cartRouter)
    app.use("/auth", authRouter)


    // !  handling any wrong routes
    app.use("*", (req, res, next) => {
        res.status(404).json({ message: "Not Found" })
    })
}

// ! exporting bootstrap
export default bootstrap