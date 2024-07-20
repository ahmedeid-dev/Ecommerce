import Review from './../../../database/models/review.model.js';

// ! getReviews controller
const getReviews = async (req, res, next) => {
    const reviews = await Review.find();
    res.status(200).json({ status: "success", count: reviews.length, reviews });
}

// ! getReview controller
const getReview = async (req, res, next) => {
    const review = await Review.findById(req.params.id);
    res.status(200).json({ status: "success", review });
}

// ! addReview controller
const addReview = async (req, res, next) => {
    const review = await Review.create(req.body);
    res.status(200).json({ status: "review added successfully", review });
}

// ! updateReview controller
const updateReview = async (req, res, next) => {
    const review = await Review.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    res.status(200).json({ status: "review updated successfully", review });
}

// ! deleteReview controller
const deleteReview = async (req, res, next) => {
    const review = await Review.findByIdAndDelete(req.params.id);
    res.status(200).json({ status: "review deleted successfully", review });
}

// ! exporting controllers
export {
    getReviews,
    getReview,
    addReview,
    updateReview,
    deleteReview
}