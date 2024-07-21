import User from './../../../database/models/users.model.js';
import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';

// ! register controller
const register = async (req, res, next) => {
    const user = await User.create(req.body);
    const token = jwt.sign({
        _id: user._id,
        role: user.role,
        name: user.name,
        email: user.email
    }, "authToken")
    res.status(201).json({ status: "user added successfully", user, token });
}

// ! login controller
const login = async (req, res, next) => {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
        return res.status(401).json({ status: "error", error: "invalid credentials" });
    }
    const isMatch = await user.isValidPassword(req.body.password);
    if (!isMatch) {
        return res.status(401).json({ status: "error", error: "invalid credentials" });
    }
    const token = jwt.sign({
        _id: user._id,
        role: user.role,
        name: user.name,
        email: user.email
    }, "authToken")
    res.status(200).json({ status: "success", user, token });
}

// ! changePassword controller
const changePassword = async (req, res, next) => {
    const user = await User.findById(req.user._id);
    const match = await bcryptjs.compareSync(req.body.oldPassword, user.password);
    // const isMatch = await user.isValidPassword(req.body.password);
    if (!match) return res.status(401).json({ status: "error", error: "invalid credentials" });
    user.password = req.body.newPassword;
    const token = jwt.sign({
        _id: user._id,
        role: user.role,
        name: user.name,
        email: user.email
    }, "authToken")
    await user.save();
    res.status(200).json({ status: "password changed successfully", user, token });
}

// ! forgetPassword controller
const forgotPassword = async (req, res, next) => {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
        return res.status(401).json({ status: "error", error: "invalid credentials" });
    }
    const token = jwt.sign({
        _id: user._id,
        role: user.role,
        name: user.name,
        email: user.email
    }, "authToken")
    res.status(200).json({ status: "success", user, token });
}

// ! resetPassword controller
const resetPassword = async (req, res, next) => {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
        return res.status(401).json({ status: "error", error: "invalid credentials" });
    }
    const token = jwt.sign({
        _id: user._id,
        role: user.role,
        name: user.name,
        email: user.email
    }, "authToken")
    res.status(200).json({ status: "success", user, token });
}

// ! logout controller
const logout = async (req, res, next) => {
    res.status(200).json({ status: "success", message: "user logged out successfully" });
}


// ! export controllers
export {
    register,
    login,
    changePassword,
    forgotPassword,
    resetPassword,
    logout
}