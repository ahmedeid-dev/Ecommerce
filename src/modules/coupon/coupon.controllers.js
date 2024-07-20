import Coupon from './../../../database/models/coupons.model.js';
import catchError from '../../../utils/catchError.js';

// ! getCoupons controller
const getCoupons = catchError(async (req, res, next) => {
    const coupons = await Coupon.find();
    res.status(200).json({ status: "success", count: coupons.length, coupons });
})

// ! getCoupon controller
const getCoupon = catchError(async (req, res, next) => {
    const coupon = await Coupon.findById(req.params.id);
    res.status(200).json({ status: "success", coupon });
})

// ! addCoupon controller
const addCoupon = catchError(async (req, res, next) => {
    const coupon = await Coupon.create(req.body);
    res.status(201).json({ status: "coupon added successfully", coupon });
})

// ! updateCoupon controller
const updateCoupon = catchError(async (req, res, next) => {
    const coupon = await Coupon.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    res.status(200).json({ status: "coupon updated successfully", coupon });
})

// ! deleteCoupon controller    
const deleteCoupon = catchError(async (req, res, next) => {
    const coupon = await Coupon.findByIdAndDelete(req.params.id);
    res.status(200).json({ status: "coupon deleted successfully", coupon });
})

export {
    getCoupons,
    getCoupon,
    addCoupon,
    updateCoupon,
    deleteCoupon
}