
// ! global error middleware
const globalError = (err, req, res, next) => {
    res.status(err.statusCode || 500).json({
        success: false,
        message: err.message,
    })
}

// ! export middlewares
export default globalError