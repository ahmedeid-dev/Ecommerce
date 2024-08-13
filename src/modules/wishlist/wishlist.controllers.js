import User from '../../../database/models/users.model.js';
import catchError from '../../../utils/catchError.js';
import appError from '../../../utils/appError.js';

// ! addToWishlist controller
const addToWishlist = catchError(async (req, res, next) => {
    const wishlist = await User.findByIdAndUpdate(req.user._id, { $addToSet: { wishlist: req.body.product } }, { new: true });
    !wishlist && next(new appError("wishlist not found", 404));
    res.status(201).json({ status: "wishlist added successfully", wishlist: wishlist.wishlist });
})

// ! removeFromWishlist controller
const removeFromWishlist = catchError(async (req, res, next) => {
    const wishlist = await User.findByIdAndUpdate(req.user._id, { $pull: { wishlist: req.params.id } }, { new: true });
    !wishlist && next(new appError("wishlist not found", 404));
    res.status(200).json({ status: "wishlist deleted successfully", wishlist: wishlist.wishlist });
})

// ! getLoggedUserWishlist controller
const getLoggedUserWishlist = catchError(async (req, res, next) => {
    const wishlist = await User.findById(req.user._id);
    !wishlist && next(new appError("wishlist not found", 404));
    res.status(200).json({ status: "success", wishlist: wishlist.wishlist });
}
)

// ! exporting controllers
export {
    addToWishlist,
    removeFromWishlist,
    getLoggedUserWishlist,
}