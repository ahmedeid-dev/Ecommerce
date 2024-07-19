import { model, Schema, Types } from "mongoose";

// ! creating ReviewSchema
const reviewSchema = Schema({
    comment: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        required: true
    },
    productId: {
        type: Types.ObjectId,
        required: true,
        ref: "Product"
    },
    userId: {
        type: Types.ObjectId,
        required: true,
        ref: "User"
    }
})

// ! creating Reviewmodel
const Review = model("Review", reviewSchema)

// ! exporting Reviewmodel
export default Review