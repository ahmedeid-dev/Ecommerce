import { model, Schema, Types } from "mongoose";

// ! creating orderSchema
const orderSchema = new Schema({
    user: {
        type: Types.ObjectId,
        ref: "User",
    },
    orderItems: [
        {
            product: {
                type: Types.ObjectId,
                ref: "Product",
            },
            quantity: {
                type: Number,
                required: true,
            },
            price: {
                type: Number,
                required: true,
            },
        }
    ],
    totalPrice: {
        type: Number,
        required: true,
    },
    shippingAddress: {
        city: {
            type: String,
            required: true,
        },
        phone: {
            type: String,
            required: true,
        },
        street: {
            type: String,
            required: true,
        },
    },
    paymentType: {
        type: String,
        enum: ["cash", "card"],
        required: true,
    },
    isPaid: {
        type: Boolean,
        default: false,
    },
    paidAt: Date,
    isDelivered: {
        type: Boolean,
        default: false,
    },
    deliveredAt: Date,
}, {
    toJSON: { virtuals: true },
    id: false,
    timestamps: true
})

// ! creating ordermodel
const Order = model("Order", orderSchema)

// ! exporting ordermodel
export default Order