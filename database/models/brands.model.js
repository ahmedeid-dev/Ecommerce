import { model, Schema } from "mongoose";

// ! creating BrandSchema
const brandSchema = new Schema({
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

// ! adding logo url
const baseUrl = "http://localhost:3000/"
brandSchema.post("init", function (doc) {
    doc.logo = baseUrl + doc.logo
})

// ! creating Brandmodel
const Brand = model("Brand", brandSchema)


// ! exporting Brandmodel
export default Brand