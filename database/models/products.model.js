import { model, Schema, Types } from "mongoose";

// ! creating ProductSchema
const productSchema =new Schema({
    title: {
        type: String,
        unique: true,
        required: true
    },
    slug: {
        type: String,
        unique: true,
        required: true
    },
    description: {
        type: String,
        required: true,
        minLength: 10,
        maxLength: 2000
    },
    imgcover: {
        type: String
    },
    images: [String],
    price: {
        type: Number,
        required: true,
        min: 0
    },
    discount: {
        type: Number,
        min: 0
    },
    quantity: {
        type: Number,
        required: true,
        min: 0
    },
    sold: {
        type: Number,
        default: 0
    },
    rateAvg: {
        type: Number,
        default: 0
    },
    rateCount: {
        type: Number,
        default: 0
    },
    categoryId: {
        type: Types.ObjectId,
        required: true,
        ref: "Category"
    },
    subcategoryId: {
        type: Types.ObjectId,
        required: true,
        ref: "Subcategory"
    },
    brandId: {
        type: Types.ObjectId,
        required: true,
        ref: "Brand"
    }
})

// ! creating Productmodel
const Product = model("Product", productSchema)

// ! exporting Productmodel
export default Product