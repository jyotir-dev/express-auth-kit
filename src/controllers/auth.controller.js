// Auth Cookie
const authCookie = require('../utils/auth-cookie');

// Catch Async
const catchAsync = require('../utils/catch-async');

// Services
const authService = require('../services/auth.service');

// Signup
exports.signup = catchAsync(async (req, res) => {
    const result = await authService.signup(req.body);
    authCookie.setAuthCookie(res, result.token);
    res.status(201).json(result.response);
});

// Login
exports.login = catchAsync(async (req, res) => {
    const result = await authService.login(req.body);
    authCookie.setAuthCookie(res, result.token);
    res.status(200).json(result.response);
});

// Me
exports.me = catchAsync(async (req, res) => {
    const result = await authService.me(req.user);
    res.status(200).json(result.response);
});

// Logout
exports.logout = catchAsync(async (req, res) => {
    const result = await authService.logout();
    authCookie.clearAuthCookie(res);
    res.status(200).json(result.response);
});

// Change Password
exports.changePassword = catchAsync(async (req, res) => {
    const result = await authService.changePassword(req.user, req.body);
    authCookie.clearAuthCookie(res);
    res.status(200).json(result.response);
});

// Verify Email
exports.verifyEmail = catchAsync(async (req, res) => {
    const result = await authService.verifyEmail(req.body);
    res.status(200).json(result.response);
});

// Resend Verification Email
exports.resendVerification = catchAsync(async (req, res) => {
    const result = await authService.resendVerification(req.user);
    res.status(200).json(result.response);
});

// Forgot Password
exports.forgotPassword = catchAsync(async (req, res) => {
    const result = await authService.forgotPassword(req.body);
    res.status(200).json(result.response);
});

// Reset Password
exports.resetPassword = catchAsync(async (req, res) => {
    const result = await authService.resetPassword(req.body);
    authCookie.clearAuthCookie(res);
    res.status(200).json(result.response);
});

// Verify Reset Token
exports.verifyResetToken = catchAsync(async (req, res) => {
    const result = await authService.verifyResetToken(req.body);
    res.status(200).json(result.response);
});