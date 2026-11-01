// Catch Async
function catchAsync(handler) {
    return async function catchAsync(req, res, next) {
        try {
            await handler(req, res, next);
        } catch (error) {
            next(error);
        }
    };
}

// Export Utility
module.exports = catchAsync;