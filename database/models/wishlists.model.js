import { model, Schema } from "mongoose";

// ! creating wishlistSchema
const wishlistSchema = new Schema({})

// ! creating wishlistmodel
const Wishlist = model("Wishlist", wishlistSchema)

// ! exporting wishlistmodel
export default Wishlist