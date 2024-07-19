const bootstrap = (app) => {

    // ! handling root route
    app.use("/", (req, res, next) => {
        res.status(200).json({ message: "Welcome to Ecommerce" })
    })

    // ! handling All routes
    

    // !  handling any wrong routes
    app.use("*", (req, res, next) => {
        res.status(404).json({ message: "Not Found" })
    })
}
export default bootstrap