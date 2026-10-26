const ApiError = require('../errors/api.error');

// Error Middleware
module.exports = (error, req, res, next) => {

    if (res.headersSent) {
        return next(error);
    }

    if (error instanceof ApiError) {
        return res.status(error.statusCode).json({
            success: false,
            code: error.code,
            message: error.message
        });
    }

    console.error(`[ERROR] ${req.method} ${req.originalUrl}`, error);
    
    return res.status(500).json({
        success: false,
        code: 'INTERNAL_SERVER_ERROR',
        message: 'Internal server error.'
    });
};