import User from '../../../database/models/users.model.js';
import catchError from '../../../utils/catchError.js';
import appError from '../../../utils/appError.js';

// ! addToaddress controller
const addAddress = catchError(async (req, res, next) => {
    const address = await User.findByIdAndUpdate(req.user._id, { $push: { addresses: req.body } }, { new: true });
    !address && next(new appError("address not found", 404));
    res.status(201).json({ status: "address added successfully", address: address.addresses });
})

// ! removeaddress controller
const removeAddress = catchError(async (req, res, next) => {
    const address = await User.findByIdAndUpdate(req.user._id, { $pull: { addresses: { _id: req.params.id } } }, { new: true });
    !address && next(new appError("address not found", 404));
    res.status(200).json({ status: "address deleted successfully", address: address.addresses });
})

// ! getLoggedUseraddresses controller
const getLoggedUseraddresses = catchError(async (req, res, next) => {
    const address = await User.findById(req.user._id);
    !address && next(new appError("address not found", 404));
    res.status(200).json({ status: "success", address: address.addresses });
}
)

// ! exporting controllers
export {
    addAddress,
    removeAddress,
    getLoggedUseraddresses,
}