import Review from './../../../database/models/review.model.js';
import apiFeatures from '../../../utils/apiFeatures.js';
import catchError from '../../../utils/catchError.js';

// ! getReviews controller
const getReviews = catchError(async (req, res, next) => {
    const features = apiFeatures(Review.find(), req.query)
    let reviews = await features.query;
    res.status(200).json({
        status: "success", meta: {
            page: features.page,
            count: reviews.length,
        }, reviews
    });
}
)
// ! getReview controller
const getReview = catchError(async (req, res, next) => {
    const review = await Review.findById(req.params.id);
    res.status(200).json({ status: "success", review });
})

// ! addReview controller
const addReview = catchError(async (req, res, next) => {
    const review = await Review.create(req.body);
    res.status(200).json({ status: "review added successfully", review });
})

// ! updateReview controller
const updateReview = catchError(async (req, res, next) => {
    const review = await Review.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    res.status(200).json({ status: "review updated successfully", review });
})

// ! deleteReview controller
const deleteReview = catchError(async (req, res, next) => {
    const review = await Review.findByIdAndDelete(req.params.id);
    res.status(200).json({ status: "review deleted successfully", review });
})

// ! exporting controllers
export {
    getReviews,
    getReview,
    addReview,
    updateReview,
    deleteReview
}