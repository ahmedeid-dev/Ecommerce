import { model, Schema } from "mongoose";

// ! creating CouponSchema
const couponSchema = Schema({
    code: {
        type: String,
        unique: true,
        required: true
    },
    discount: {
        type: Number,
        required: true
    },
    expiry: {
        type: Date,
        required: true
    }
})

// ! creating Couponmodel
const Coupon = model("Coupon", couponSchema)

// ! exporting Couponmodel
export default Coupon