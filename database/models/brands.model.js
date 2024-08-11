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
const baseUrl = process.env.BASE_URL + "brand/"
brandSchema.post("init", function (doc) {
    if (doc.logo) doc.logo = baseUrl + doc.logo
})

// ! creating Brandmodel
const Brand = model("Brand", brandSchema)


// ! exporting Brandmodel
export default Brand