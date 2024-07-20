import { model, Schema } from "mongoose";

// ! creating CartSchema
const cartSchema = new Schema({})

// ! creating Cartmodel
const Cart = model("Cart", cartSchema)

// ! exporting Cartmodel
export default Cart