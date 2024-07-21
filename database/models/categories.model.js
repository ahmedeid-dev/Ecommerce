import { model, Schema } from "mongoose";

// ! creating CategorySchema
const categorySchema =new Schema({
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
const baseUrl = "http://localhost:3000/"
categorySchema.post("init", function (doc) {
    doc.image = baseUrl + doc.image
})

// ! creating Categorymodel
const Category = model("Category", categorySchema);

// ! exporting Categorymodel
export default Category