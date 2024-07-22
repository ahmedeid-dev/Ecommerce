import appError from "../../../utils/appError.js"

// ! checkAdminStatus middleware
const checkAdminStatus = async (req, res, next) => {
    req.user = { id: "1", email: "a.email2260@gmail.com", role: "admin" }
    if (req.user.role !== "admin") return next(new appError("You are not authorized"), 401)
    next()
}

// ! exporting middlewares
export {
    checkAdminStatus
}