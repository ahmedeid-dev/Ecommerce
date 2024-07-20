import Wishlist from './../../../database/models/wishlists.model.js';

// ! getWishlists controller
const getWishlists = async (req, res, next) => {
    const wishlists = await Wishlist.find();
    res.status(200).json({ status: "success", count: wishlists.length, wishlists });
}

// ! getWishlist controller
const getWishlist = async (req, res, next) => {
    const wishlist = await Wishlist.findById(req.params.id);
    res.status(200).json({ status: "success", wishlist });
}

// ! addWishlist controller
const addWishlist = async (req, res, next) => {
    const wishlist = await Wishlist.create(req.body);
    res.status(200).json({ status: "wishlist added successfully", wishlist });
}

// ! updateWishlist controller
const updateWishlist = async (req, res, next) => {
    const wishlist = await Wishlist.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json({ status: "wishlist updated successfully", wishlist });
}

// ! deleteWishlist controller
const deleteWishlist = async (req, res, next) => {
    const wishlist = await Wishlist.findByIdAndDelete(req.params.id);
    res.status(200).json({ status: "wishlist deleted successfully", wishlist });
}

// ! exporting controllers
export {
    getWishlists,
    getWishlist,
    addWishlist,
    updateWishlist,
    deleteWishlist
}