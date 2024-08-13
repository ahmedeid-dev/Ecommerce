import Coupon from './../../../database/models/coupons.model.js';
import apiFeatures from '../../../utils/apiFeatures.js';
import catchError from '../../../utils/catchError.js';
import appError from '../../../utils/appError.js';

// ! getCoupons controller
const getCoupons = catchError(async (req, res, next) => {
    const features = apiFeatures(Coupon.find(), req.query)
    let coupons = await features.query;
    !coupons && next(new appError("coupons not found", 404));
    res.status(200).json({
        status: "success", meta: {
            page: features.page,
            count: coupons.length,
        }, coupons
    });
})

// ! getCoupon controller
const getCoupon = catchError(async (req, res, next) => {
    const coupon = await Coupon.findById(req.params.id);
    !coupon && next(new appError("coupon not found", 404));
    res.status(200).json({ status: "success", coupon });
})

// ! addCoupon controller
const addCoupon = catchError(async (req, res, next) => {
    const coupon = await Coupon.create({
        code: req.body.code,
        discount: req.body.discount,
        expiry: req.body.expiry
    });
    res.status(201).json({ status: "coupon added successfully", coupon });
})

// ! updateCoupon controller
const updateCoupon = catchError(async (req, res, next) => {
    const coupon = await Coupon.findById(req.params.id)
    !coupon && next(new appError("coupon not found", 404));
    req.body.code && (coupon.code = req.body.code);
    req.body.discount && (coupon.discount = req.body.discount);
    req.body.expiry && (coupon.expiry = req.body.expiry);
    await coupon.save();
    res.status(200).json({ status: "coupon updated successfully", coupon });
})

// ! deleteCoupon controller    
const deleteCoupon = catchError(async (req, res, next) => {
    const coupon = await Coupon.findByIdAndDelete(req.params.id);
    !coupon && next(new appError("coupon not found", 404));
    res.status(200).json({ status: "coupon deleted successfully", coupon });
})

export {
    getCoupons,
    getCoupon,
    addCoupon,
    updateCoupon,
    deleteCoupon,
}