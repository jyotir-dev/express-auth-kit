// Dependencies
const express = require('express');

// Express Router
const router = express.Router();

// Limits
const authLimits = require('../limits/auth.limits');

// Validators
const authValidator = require('../validators/auth.validator');

// Controllers
const authController = require('../controllers/auth.controller');

// Middlewares
const requireAuth = require('../middlewares/auth.middleware');
const rateLimit = require('../middlewares/ratelimit.middleware');
const validateRequest = require('../middlewares/validation.middleware');

// Authentication Routes
router.post(
    '/signup',
    rateLimit(authLimits.signup),
    validateRequest(authValidator.signup),
    authController.signup
);

router.post(
    '/login',
    rateLimit(authLimits.login),
    validateRequest(authValidator.login),
    authController.login
);

router.get(
    '/me',
    requireAuth(),
    authController.me
);

router.post(
    '/logout',
    authController.logout
);

router.patch(
    '/password',
    rateLimit(authLimits.changePassword),
    requireAuth(),
    validateRequest(authValidator.changePassword),
    authController.changePassword
);

router.post(
    '/verify-email',
    rateLimit(authLimits.token),
    validateRequest(authValidator.verifyEmail),
    authController.verifyEmail
);

router.post(
    '/verify-email/resend',
    rateLimit(authLimits.email),
    requireAuth(),
    authController.resendVerification
);

router.post(
    '/forgot-password',
    rateLimit(authLimits.email),
    validateRequest(authValidator.forgotPassword),
    authController.forgotPassword
);

router.post(
    '/reset-password',
    rateLimit(authLimits.token),
    validateRequest(authValidator.resetPassword),
    authController.resetPassword
);

router.post(
    '/reset-password/verify',
    rateLimit(authLimits.token),
    validateRequest(authValidator.verifyResetToken),
    authController.verifyResetToken
);

// Export Router
module.exports = router;