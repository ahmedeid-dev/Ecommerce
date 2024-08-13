import { model, Schema, Types } from "mongoose";

// ! creating CartSchema
const cartSchema = new Schema({
    user: {
        type: Types.ObjectId,
        ref: "User"
    },
    cartItems: [{
        product: {
            type: Types.ObjectId,
            ref: "Product"
        },
        quantity: {
            type: Number,
            default: 1
        },
        price: {
            type: Number,
            required: true
        }
    }],
    totalPrice: {
        type: Number,
        default: 0
    },
    totalQuantity: {
        type: Number,
        default: 0
    },
    discount: {
        type: Number,
        default: 0
    },
    priceAfterDiscount: {
        type: Number,
        default: 0
    }
})

// ! creating Cartmodel
const Cart = model("Cart", cartSchema)

// ! exporting Cartmodel
export default Cart