// Services
const emailService = require('../services/email.service');

// Emails
const resetEmail = require('../emails/reset.email');
const securityEmail = require('../emails/security.email');
const verificationEmail = require('../emails/verification.email');

// Send Verification Email
exports.sendVerificationEmail = (user, rawToken) => {

    const verificationURL = `${process.env.CLIENT_URL}/verify-email?token=${rawToken}`;

    emailService.sendEmail({
        to: user.email,
        ...verificationEmail({ user, verificationURL })
    });
};

// Send Reset Email
exports.sendResetEmail = (user, rawToken) => {

    const resetURL = `${process.env.CLIENT_URL}/reset-password?token=${rawToken}`;

    emailService.sendEmail({
        to: user.email,
        ...resetEmail({ user, resetURL })
    });
};

// Send Security Email
exports.sendSecurityEmail = (user) => {

    const secureAccountURL = `${process.env.CLIENT_URL}/forgot-password`;

    emailService.sendEmail({
        to: user.email,
        ...securityEmail({ user, secureAccountURL })
    });
};