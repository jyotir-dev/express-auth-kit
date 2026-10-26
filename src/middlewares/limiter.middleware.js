// Dependencies
const rateLimit = require('express-rate-limit');

// Errors
const { TooManyRequestsError } = require('../errors/http.errors');

// Handler
const handler = (req, res, next, options) => {
    next(new TooManyRequestsError(options.message));
};

// Limit Requests
module.exports = ({ windowMs, limit, message, skipSuccessfulRequests = false }) => {
    return rateLimit({
        windowMs,
        limit,
        message,
        skipSuccessfulRequests,
        standardHeaders: 'draft-8',
        legacyHeaders: false,
        handler
    });
};