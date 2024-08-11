import { model, Schema } from "mongoose";

// ! creating CategorySchema
const categorySchema = new Schema({
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
    image: {
        type: String
    }
});

// ! adding image url
const baseUrl = process.env.BASE_URL + "category/"
categorySchema.post("init", function (doc) {
    if (doc.image) doc.image = baseUrl + doc.image
})

// ! creating Categorymodel
const Category = model("Category", categorySchema);

// ! exporting Categorymodel
export default Category