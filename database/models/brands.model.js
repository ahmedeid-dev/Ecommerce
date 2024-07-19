import { model, Schema } from "mongoose";

// ! creating BrandSchema
const brandSchema = Schema({
    name: {
        type: String,
        unique: true,
        required: true
    },
    slug: {
        type: String,
        unique: true,
        required: true
    },
    logo: {
        type: String
    }
})

// ! creating Brandmodel
const Brand = model("Brand", brandSchema)

// ! exporting Brandmodel
export default Brand