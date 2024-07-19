import { model, Schema } from "mongoose";

// ! creating CategorySchema
const categorySchema = Schema({
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

// ! creating Categorymodel
const Category = model("Category", categorySchema);

// ! exporting Categorymodel
export default Category