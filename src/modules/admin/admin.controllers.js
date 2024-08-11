import User from '../../../database/models/users.model.js';
import apiFeatures from '../../../utils/apiFeatures.js';
import appError from '../../../utils/appError.js';
import bcryptjs from 'bcryptjs';

// ! getUsers controller
const getUsers = async (req, res, next) => {
    const features = apiFeatures(User.find(), req.query)
    let users = await features.query;
    users.map(user => user.password = undefined);
    res.status(200).json({
        status: "success", meta: {
            page: features.page,
            count: users.length,
        }, users
    });
}

// ! addUser controller
const addUser = async (req, res, next) => {
    const user = (await User.create(req.body));
    res.status(201).json({ status: "user added successfully", user });
}

// ! getUser controller
const getUser = async (req, res, next) => {
    const user = await User.findById(req.params.id);
    user.password = undefined;
    res.status(200).json({ status: "success", user });
}

// ! updateUser Controller
const updateUser = async (req, res, next) => {
    const user = await User.findById(req.params.id);
    if (req.body.password) {
        const match = bcryptjs.compareSync(req.body.password, user.password);
        if (match) return next(new appError("password can't be same as old password", 400));
        req.body.password = bcryptjs.hashSync(req.body.password, 8);
    }

    const userUpdated = await User.findByIdAndUpdate(req.params.id, { ...req.body, updatedAt: new Date() },
        {
            new: true,
            runValidators: true
        }
    );

    userUpdated.password = undefined;

    res.status(200).json({ status: "user updated successfully", userUpdated });
}

// ! deleteUser Controller
const deleteUser = async (req, res, next) => {
    const user = await User.findByIdAndDelete(req.params.id);
    // if (!user) return next(new appError("user not found", 404));
    if (user.password) user.password = undefined;
    res.status(200).json({ status: "user deleted successfully", user });
}

// ! exporting controllers
export {
    getUsers,
    getUser,
    addUser,
    updateUser,
    deleteUser
}