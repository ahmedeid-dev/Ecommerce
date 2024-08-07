import catchError from "../../utils/catchError.js";

// ! deleteOne handler
const deleteOne = (model) => {
    return catchError(async (req, res, next) => {
        const document = await model.findByIdAndDelete(req.params.id);
        res.status(200).json({ status: "document deleted successfully", document });
    })
}

// ! export deleteOne handler
export {
    deleteOne
}