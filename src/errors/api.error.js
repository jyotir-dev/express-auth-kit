// Api Error
class ApiError extends Error {
    // Constructor
    constructor(statusCode, message, code) {
        super(message);
        this.name = this.constructor.name;
        this.statusCode = statusCode;
        this.code = code;
        Error.captureStackTrace(this, this.constructor);
    }
}

// Export Api Error
module.exports = ApiError;