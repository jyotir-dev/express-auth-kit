// Dependencies
const expressRateLimit = require('express-rate-limit');

// Errors
const { TooManyRequestsError } = require('../errors/http.errors');

// Handle Rate Limited
function handleRateLimited(req, res, next, options) {
    next(new TooManyRequestsError(options.message));
}

// Rate Limit
function rateLimit({ windowMs, limit, message, skipSuccessfulRequests = false }) {
    return expressRateLimit({
        windowMs,
        limit,
        message,
        skipSuccessfulRequests,
        standardHeaders: 'draft-8',
        legacyHeaders: false,
        handler: handleRateLimited
    });
}

// Export Middleware
module.exports = rateLimit;