import { model, Schema, Types } from "mongoose";

// ! creating SubCategorySchema
const subCategorySchema = Schema({
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
    categoryId: {
        type: Types.ObjectId,
        required: true,
        ref: "Category"
    }
});

// ! creating SubCategorymodel
const SubCategory = model("SubCategory", subCategorySchema);

// ! exporting SubCategorymodel
export default SubCategory