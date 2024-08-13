import User from './../../../database/models/users.model.js';
import catchError from './../../../utils/catchError.js';
import appError from "../../../utils/appError.js"
import jwt from "jsonwebtoken"

// // ! checkAdminStatus middleware
// const checkAdminStatus = async (req, res, next) => {
//     req.user = { id: "1", email: "a.email2260@gmail.com", role: "admin" }
//     if (req.user.role !== "admin") return next(new appError("You are not authorized"), 401)
//     next()
// }

// ! protectedRoute middleware
const protectedRoute = async (req, res, next) => {
    // ? checking token exist
    const token = req.headers.token
    !token && next(new appError("You are not authorized"), 401)
    // ? verifying token
    const decoded = jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        err && next(new appError("You are not authorized"), 401)
        return decoded
    })
    // ? checking user exist
    const user = await User.findById(decoded.id)
    !user && next(new appError("You are not authorized"), 401)
    // ? checking token is valid
    user.passwordChangedAt && user.passwordChangedAt.getTime() * 100 > decoded.iat && next(new appError("You are not authorized"), 401)
    next()
}

// ! allowedTo middleware
const allowedTo = (...roles) => {
    return catchError(async (req, res, next) => {
        if (!roles.includes(req.user.role)) return next(new appError("You are not authorized"), 401)
        next()
    })
}
// ! exporting middlewares
export {
    allowedTo,
    protectedRoute,
    // checkAdminStatus,
}