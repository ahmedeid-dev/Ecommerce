import { sendEmailService } from '../../email/sendEmail.js';
import User from '../../../database/models/users.model.js';
import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { nanoid } from 'nanoid';

// ! register controller
const register = async (req, res, next) => {
    const user = await User.create(req.body);
    const token = jwt.sign({
        _id: user._id,
        role: user.role,
        name: user.name,
        email: user.email
    }, "authToken")
    const otp = nanoid(6)
    await User.updateOne({ email: user.email }, { otp, otpExpireAt: Date.now() })
    user.save();
    sendEmailService({ to: user.email, otp, textMessage: "Verify Email" })
    user.password = undefined
    res.status(201).json({ status: "user added successfully", user, token });
}

// ! login controller
const login = async (req, res, next) => {
    const user = await User.findOne({ email: req.body.email });
    if (!user || !bcryptjs.compareSync(req.body.oldPassword, user.password)) return res.status(401).json({ status: "error", error: "invalid credentials" });
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
    if (!user || !bcryptjs.compareSync(req.body.oldPassword, user.password)) return res.status(401).json({ status: "error", error: "invalid credentials" });
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
    if (!user) return res.status(401).json({ status: "error", error: "invalid credentials" });
    const otp = nanoid(6)
    await User.updateOne({ email: user.email }, { otp, otpExpireAt: Date.now() })
    user.save()
    res.status(200).json({ status: "Otp Sent Successfully, Check Your Email ...", user });
}

// ! resetPassword controller
const resetPassword = async (req, res, next) => {
    const user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(401).json({ status: "error", error: "invalid credentials" });
    if (user.otp !== req.body.otp || user.otpExpireAt < Date.now()) return res.status(401).json({ message: "invalid Credintals" })
    const newUser = await User.findByIdAndUpdate({ email: req.body.email }, { password: req.body.newPassword })
    const token = jwt.sign({
        _id: user._id,
        role: user.role,
        name: user.name,
        email: user.email
    }, "authToken")
    res.status(200).json({ status: "password Updated Successfully", newUser, token });
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