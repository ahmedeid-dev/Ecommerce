
// ! appError class for handling errors
class appError extends Error {
    constructor(message, statusCode) {
        super(message);
        this.statusCode = statusCode;
    }
}

// ! export appError class
export default appError