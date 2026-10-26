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
const limitRequests = require('../middlewares/limiter.middleware');
const validateRequest = require('../middlewares/validate.middleware');

// Authentication Routes
router.post(
    '/signup',
    limitRequests(authLimits.signup),
    validateRequest(authValidator.signup),
    authController.signup
);

router.post(
    '/login',
    limitRequests(authLimits.login),
    validateRequest(authValidator.login),
    authController.login
);

router.get(
    '/me',
    requireAuth,
    authController.me
);

router.post(
    '/logout',
    authController.logout
);

router.patch(
    '/password',
    limitRequests(authLimits.changePassword),
    requireAuth,
    validateRequest(authValidator.changePassword),
    authController.changePassword
);

router.post(
    '/verify-email',
    limitRequests(authLimits.token),
    validateRequest(authValidator.verifyEmail),
    authController.verifyEmail
);

router.post(
    '/verify-email/resend',
    limitRequests(authLimits.email),
    requireAuth,
    authController.resendVerification
);

router.post(
    '/forgot-password',
    limitRequests(authLimits.email),
    validateRequest(authValidator.forgotPassword),
    authController.forgotPassword
);

router.post(
    '/reset-password',
    limitRequests(authLimits.token),
    validateRequest(authValidator.resetPassword),
    authController.resetPassword
);

router.post(
    '/reset-password/verify',
    limitRequests(authLimits.token),
    validateRequest(authValidator.verifyResetToken),
    authController.verifyResetToken
);

// Export Router
module.exports = router;