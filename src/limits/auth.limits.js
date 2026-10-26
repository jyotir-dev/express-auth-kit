// Login
exports.login = {
    windowMs: 15 * 60 * 1000,
    limit: 10,
    message: 'Too many failed login attempts. Please try again in 15 minutes.',
    skipSuccessfulRequests: true
};

// Signup
exports.signup = {
    windowMs: 60 * 60 * 1000,
    limit: 5,
    message: 'Too many accounts created. Please try again in an hour.'
};

// Email
exports.email = {
    windowMs: 60 * 60 * 1000,
    limit: 5,
    message: 'Too many email requests. Please try again in an hour.'
};

// Change Password
exports.changePassword = {
    windowMs: 15 * 60 * 1000,
    limit: 5,
    message: 'Too many password change attempts. Please try again in 15 minutes.',
    skipSuccessfulRequests: true
};

// Token
exports.token = {
    windowMs: 15 * 60 * 1000,
    limit: 10,
    message: 'Too many attempts. Please try again in 15 minutes.'
};