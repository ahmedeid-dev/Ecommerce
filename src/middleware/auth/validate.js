import appError from '../../../utils/appError.js';

// ! validate middleware 
const validate = (schema) => {
    return (req, res, next) => {
        const { error } = schema.validate(
            { ...req.body, ...req.query, ...req.params, ...req.params.id },
            { abortEarly: false });
        if (error) {
            const errorArray = error?.details?.map(err => err.message = err.message.replace(/['"]+/g, ''));
            return next(new appError(errorArray, 400));
        }
        next();
    }
}

// ! export middleware
export default validate