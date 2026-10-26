// Errors
const { NotFoundError } = require('../errors/http.errors')

// Fallback Middleware
module.exports = (req, res, next) => {
    next(new NotFoundError(`Route not found: ${req.method} ${req.originalUrl}`, 'ROUTE_NOT_FOUND'));
};