import { model, Schema } from "mongoose";

// ! creating orderSchema
const orderSchema = new Schema({})

// ! creating ordermodel
const Order = model("Order", orderSchema)

// ! exporting ordermodel
export default Order