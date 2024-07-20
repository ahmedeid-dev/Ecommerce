import appError from './appError.js';

// ! catchError middleware function for handling errors
function catchError(callback) {
    return (req, res, next) => {
        callback(req, res, next)
            .catch(err => next(new appError(err.message, err.statusCode)))
    }
}

// ! catchError middleware
export default catchError