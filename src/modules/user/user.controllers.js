import User from './../../../database/models/users.model.js';

// ! getUsers controller
const getUsers = async (req, res, next) => {
    const users = await User.find();
    res.status(200).json({ status: "success", count: users.length, users });
}

// ! addUser controller
const addUser = async (req, res, next) => {
    const user = await User.create(req.body);
    res.status(201).json({ status: "user added successfully", user });
}

// ! getUser controller
const getUser = async (req, res, next) => {
    const user = await User.findById(req.params.id);
    res.status(200).json({ status: "success", user });
}

// ! updateUser Controller
const updateUser = async (req, res, next) => {
    const user = await User.findByIdAndUpdate(req.params.id, req.body,
        { new: true, runValidators: true })
    res.status(200).json({ status: "user updated successfully", user });
}

// ! deleteUser Controller
const deleteUser = async (req, res, next) => {
    const user = await User.findByIdAndDelete(req.params.id);
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