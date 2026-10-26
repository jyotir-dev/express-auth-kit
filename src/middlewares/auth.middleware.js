// Security
const JWT = require('../security/jwt');

// Models
const User = require('../models/user.model');

// Errors
const { UnauthorizedError } = require('../errors/http.errors');

// Auth Middleware
module.exports = async (req, res, next) => {

    try {
        const token = req.cookies?.token;

        if (!token) {
            throw new UnauthorizedError('Authentication required.', 'AUTH_REQUIRED');
        }

        let decoded;

        try {
            decoded = JWT.verifyToken(token);
        } catch {
            throw new UnauthorizedError('Invalid or expired authentication token.', 'INVALID_TOKEN');
        }

        const user = await User.findById(decoded.id);

        if (!user || user.tokenVersion !== decoded.version) {
            throw new UnauthorizedError('Your session has expired. Please log in again.', 'SESSION_EXPIRED');
        }

        req.user = user;
        next();
    } catch (error) {
        next(error);
    }
};