import Wishlist from './../../../database/models/wishlists.model.js';
import apiFeatures from '../../../utils/apiFeatures.js';
import catchError from '../../../utils/catchError.js';

// ! getWishlists controller
const getWishlists = catchError(async (req, res, next) => {
    const features = apiFeatures(Wishlist.find(), req.query)
    let wishlists = await features.query;
    res.status(200).json({
        status: "success", meta: {
            page: features.page,
            count: wishlists.length,
        }, wishlists
    });
})

// ! getWishlist controller
const getWishlist = catchError(async (req, res, next) => {
    const wishlist = await Wishlist.findById(req.params.id);
    res.status(200).json({ status: "success", wishlist });
}
)
// ! addWishlist controller
const addWishlist = catchError(async (req, res, next) => {
    const wishlist = await Wishlist.create(req.body);
    res.status(200).json({ status: "wishlist added successfully", wishlist });
})

// ! updateWishlist controller
const updateWishlist = catchError(async (req, res, next) => {
    const wishlist = await Wishlist.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json({ status: "wishlist updated successfully", wishlist });
})

// ! deleteWishlist controller
const deleteWishlist = catchError(async (req, res, next) => {
    const wishlist = await Wishlist.findByIdAndDelete(req.params.id);
    res.status(200).json({ status: "wishlist deleted successfully", wishlist });
})

// ! exporting controllers
export {
    getWishlists,
    getWishlist,
    addWishlist,
    updateWishlist,
    deleteWishlist
}