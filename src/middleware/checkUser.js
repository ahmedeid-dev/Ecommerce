import User from "../../database/models/users.model.js"
import appError from "../../utils/appError.js"

const checkUserExists = async (req, res, next) => {
    const user = await User.findOne({ $or: [{ email: req.user.email }, { _id: req.params.id }] });
    if (!user) return next(new appError("user not found", 404))
    next()
}
export default checkUserExists