// Errors
const ApiError = require('../errors/api.error');
const { BadRequestError } = require('../errors/http.errors');

// Validate Request
function validateRequest(validator) {
    return function validateRequest(req, res, next) {
        try {
            validator(req.params, req.body, req.query);
            next();
        } catch (error) {
            next(error instanceof ApiError ? error : new BadRequestError('Invalid request data.'));
        }
    };
}

// Export Middleware
module.exports = validateRequest;