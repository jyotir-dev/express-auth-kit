// Errors
const { ForbiddenError } = require('../errors/http.errors');

// Verified Middleware
module.exports = (req, res, next) => {

    try {
        if (!req.user.emailVerified) {
            throw new ForbiddenError('Please verify your email address to continue.', 'EMAIL_NOT_VERIFIED');
        }

        next();
    } catch (error) {
        next(error);
    }
};