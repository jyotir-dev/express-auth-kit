// Api Error
const ApiError = require('./api.error');

// Bad Request Error
class BadRequestError extends ApiError {
    constructor(message = 'Bad request.', code = 'BAD_REQUEST') {
        super(400, message, code);
    }
}

// Unauthorized Error
class UnauthorizedError extends ApiError {
    constructor(message = 'Authentication required.', code = 'UNAUTHORIZED') {
        super(401, message, code);
    }
}

// Forbidden Error
class ForbiddenError extends ApiError {
    constructor(message = 'Access denied.', code = 'FORBIDDEN') {
        super(403, message, code);
    }
}

// Not Found Error
class NotFoundError extends ApiError {
    constructor(message = 'Resource not found.', code = 'NOT_FOUND') {
        super(404, message, code);
    }
}

// Conflict Error
class ConflictError extends ApiError {
    constructor(message = 'Request conflicts with the current state.', code = 'CONFLICT') {
        super(409, message, code);
    }
}

// Too Many Requests Error
class TooManyRequestsError extends ApiError {
    constructor(message = 'Too many requests. Please try again later.', code = 'TOO_MANY_REQUESTS') {
        super(429, message, code);
    }
}

// Export Http Errors
module.exports = {
    BadRequestError,
    UnauthorizedError,
    ForbiddenError,
    NotFoundError,
    ConflictError,
    TooManyRequestsError
};