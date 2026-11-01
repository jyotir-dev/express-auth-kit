// Errors
const { NotFoundError } = require('../errors/http.errors');

// Handle Not Found
function handleNotFound() {
    return function handleNotFound(req, res, next) {
        next(new NotFoundError(`Route not found: ${req.method} ${req.originalUrl}`, 'ROUTE_NOT_FOUND'));
    };
}

// Export Middleware
module.exports = handleNotFound;