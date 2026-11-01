// Errors
const { ForbiddenError } = require('../errors/http.errors');

// Require Role
function requireRole(...roles) {
    return function requireRole(req, res, next) {

        if (!roles.includes(req.user.role)) {
            return next(new ForbiddenError('You do not have access to this resource.', 'AUTH_FORBIDDEN_ROLE'));
        }

        next();
    };
}

// Export Middleware
module.exports = requireRole;