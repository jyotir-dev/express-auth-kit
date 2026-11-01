// Errors
const { ForbiddenError } = require('../errors/http.errors');

// Require Verified
function requireVerified() {
    return function requireVerified(req, res, next) {
        
        if (!req.user.emailVerified) {
            return next(new ForbiddenError('Please verify your email address to continue.', 'EMAIL_NOT_VERIFIED'));
        }

        next();
    };
}

// Export Middleware
module.exports = requireVerified;