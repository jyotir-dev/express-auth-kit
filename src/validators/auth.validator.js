// Errors
const { BadRequestError } = require('../errors/http.errors');

// Regex
const TOKEN_REGEX = /^[a-f0-9]{64}$/;
const USERNAME_REGEX = /^[a-zA-Z0-9_]+$/;
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Limits
const EMAIL_MAX = 254;
const USERNAME_MIN = 3;
const USERNAME_MAX = 32;
const PASSWORD_MIN = 8;
const PASSWORD_MAX = 72;

// Signup Validation
exports.signup = (params, body, query) => {

    const username = body.username;
    const email = body.email;
    const password = body.password;

    // Username
    if (typeof username !== 'string' || !username.trim()) {
        throw new BadRequestError('Username is required.');
    }

    if (username.trim().length < USERNAME_MIN || username.trim().length > USERNAME_MAX) {
        throw new BadRequestError(`Username must be between ${USERNAME_MIN} and ${USERNAME_MAX} characters.`);
    }

    if (!USERNAME_REGEX.test(username.trim())) {
        throw new BadRequestError('Username can only contain letters, numbers and underscores.');
    }

    // Email
    if (typeof email !== 'string' || !email.trim()) {
        throw new BadRequestError('Email is required.');
    }

    if (email.trim().length > EMAIL_MAX || !EMAIL_REGEX.test(email.trim())) {
        throw new BadRequestError('Invalid email address.');
    }

    // Password
    if (typeof password !== 'string' || !password) {
        throw new BadRequestError('Password is required.');
    }

    if (password.length < PASSWORD_MIN || Buffer.byteLength(password) > PASSWORD_MAX) {
        throw new BadRequestError(`Password must be between ${PASSWORD_MIN} and ${PASSWORD_MAX} characters.`);
    }
};

// Login Validation
exports.login = (params, body, query) => {

    const username = body.username;
    const password = body.password;

    // Username
    if (typeof username !== 'string' || !username.trim()) {
        throw new BadRequestError('Username is required.');
    }

    if (username.trim().length < USERNAME_MIN || username.trim().length > USERNAME_MAX || !USERNAME_REGEX.test(username.trim())) {
        throw new BadRequestError('Invalid username or password.', 'INVALID_CREDENTIALS');
    }

    // Password
    if (typeof password !== 'string' || !password) {
        throw new BadRequestError('Password is required.');
    }

    if (password.length < PASSWORD_MIN || Buffer.byteLength(password) > PASSWORD_MAX) {
        throw new BadRequestError('Invalid username or password.', 'INVALID_CREDENTIALS');
    }
};

// Change Password Validation
exports.changePassword = (params, body, query) => {

    const currentPassword = body.currentPassword;
    const newPassword = body.newPassword;

    // Current Password
    if (typeof currentPassword !== 'string' || !currentPassword) {
        throw new BadRequestError('Current password is required.');
    }

    if (currentPassword.length < PASSWORD_MIN || Buffer.byteLength(currentPassword) > PASSWORD_MAX) {
        throw new BadRequestError('Current password is incorrect.', 'INVALID_CURRENT_PASSWORD');
    }

    // New Password
    if (typeof newPassword !== 'string' || !newPassword) {
        throw new BadRequestError('New password is required.');
    }

    if (newPassword.length < PASSWORD_MIN || Buffer.byteLength(newPassword) > PASSWORD_MAX) {
        throw new BadRequestError(`New password must be between ${PASSWORD_MIN} and ${PASSWORD_MAX} characters.`);
    }
};

// Verify Email Validation
exports.verifyEmail = (params, body, query) => {

    const token = body.token;

    // Token
    if (typeof token !== 'string' || !TOKEN_REGEX.test(token)) {
        throw new BadRequestError('Invalid or expired verification link.', 'INVALID_VERIFICATION_TOKEN');
    }
};

// Forgot Password Validation
exports.forgotPassword = (params, body, query) => {

    const email = body.email;

    // Email
    if (typeof email !== 'string' || !email.trim()) {
        throw new BadRequestError('Email is required.');
    }

    if (email.trim().length > EMAIL_MAX || !EMAIL_REGEX.test(email.trim())) {
        throw new BadRequestError('Invalid email address.');
    }
};

// Reset Password Validation
exports.resetPassword = (params, body, query) => {

    const token = body.token;
    const password = body.password;

    // Token
    if (typeof token !== 'string' || !TOKEN_REGEX.test(token)) {
        throw new BadRequestError('Invalid or expired reset link.', 'INVALID_RESET_TOKEN');
    }

    // Password
    if (typeof password !== 'string' || !password) {
        throw new BadRequestError('New password is required.');
    }

    if (password.length < PASSWORD_MIN || Buffer.byteLength(password) > PASSWORD_MAX) {
        throw new BadRequestError(`New password must be between ${PASSWORD_MIN} and ${PASSWORD_MAX} characters.`);
    }
};

// Verify Reset Token Validation
exports.verifyResetToken = (params, body, query) => {

    const token = body.token;

    // Token
    if (typeof token !== 'string' || !TOKEN_REGEX.test(token)) {
        throw new BadRequestError('Invalid or expired reset link.', 'INVALID_RESET_TOKEN');
    }
};