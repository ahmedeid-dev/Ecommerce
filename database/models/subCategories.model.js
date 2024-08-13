import { model, Schema, Types } from "mongoose";

// ! creating SubCategorySchema
const subCategorySchema = new Schema({
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
    category: {
        type: Types.ObjectId,
        required: true,
        ref: "Category"
    }
});

// ! creating SubCategorymodel
const SubCategory = model("SubCategory", subCategorySchema);

// ! exporting SubCategorymodel
export default SubCategory