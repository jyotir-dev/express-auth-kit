// Dependencies
const bcrypt = require('bcrypt');

// Models
const User = require('../models/user.model');

// Security
const JWT = require('../security/jwt');
const Token = require('../security/token');

// Mailers
const authMailer = require('../mailers/auth.mailer');

// Errors
const {
    BadRequestError,
    UnauthorizedError,
    ConflictError
} = require('../errors/http.errors');

// Constants
const TOKEN_BYTES = 32;
const BCRYPT_ROUNDS = 12;
const RESET_TOKEN_TTL = 60 * 60 * 1000;
const VERIFICATION_TOKEN_TTL = 24 * 60 * 60 * 1000;

// Dummy Hash
const DUMMY_HASH = bcrypt.hashSync('authkit-dummy-password', BCRYPT_ROUNDS);

// Signup
exports.signup = async (body) => {

    const username = body.username.trim();
    const email = body.email.trim().toLowerCase();
    const password = body.password;

    const existingUser = await User.findOne({
        $or: [
            { username },
            { email }
        ]
    });

    if (existingUser) {
        throw new ConflictError('Username or email already exists.', 'USER_ALREADY_EXISTS');
    }

    const passwordHash = await bcrypt.hash(password, BCRYPT_ROUNDS);
    const rawToken = Token.generate(TOKEN_BYTES);
    const tokenHash = Token.hash(rawToken);

    const user = await User.create({
        username,
        email,
        passwordHash,
        emailVerificationTokenHash: tokenHash,
        emailVerificationExpires: new Date(Date.now() + VERIFICATION_TOKEN_TTL)
    });

    authMailer.sendVerificationEmail(user, rawToken);

    const token = JWT.signToken(user);

    return {
        token,
        response: {
            success: true,
            message: 'Account created successfully.',
            user: {
                id: user._id,
                username: user.username,
                email: user.email,
                emailVerified: user.emailVerified,
                createdAt: user.createdAt
            }
        }
    };
};

// Login
exports.login = async (body) => {

    const username = body.username.trim();
    const password = body.password;

    const user = await User.findOne({ username }).select('+passwordHash');
    const passwordMatch = await bcrypt.compare(password, user ? user.passwordHash : DUMMY_HASH);

    if (!user) {
        throw new UnauthorizedError('Invalid username or password.', 'INVALID_CREDENTIALS');
    }

    if (!passwordMatch) {
        throw new UnauthorizedError('Invalid username or password.', 'INVALID_CREDENTIALS');
    }

    const token = JWT.signToken(user);

    return {
        token,
        response: {
            success: true,
            message: 'Logged in successfully.',
            user: {
                id: user._id,
                username: user.username,
                email: user.email,
                emailVerified: user.emailVerified,
                createdAt: user.createdAt
            }
        }
    };
};

// Me
exports.me = async (user) => {
    console.log(user)
    return {
        response: {
            success: true,
            user: {
                id: user._id,
                username: user.username,
                email: user.email,
                emailVerified: user.emailVerified,
                createdAt: user.createdAt
            }
        }
    };
};

// Logout
exports.logout = async () => {
    return {
        response: {
            success: true,
            message: 'Logged out successfully.'
        }
    };
};

// Change Password
exports.changePassword = async (user, body) => {

    const currentPassword = body.currentPassword;
    const newPassword = body.newPassword;

    const account = await User.findById(user._id).select('+passwordHash');

    if (!account) {
        throw new UnauthorizedError('User no longer exists.', 'USER_NOT_FOUND');
    }

    const passwordMatch = await bcrypt.compare(currentPassword, account.passwordHash);

    if (!passwordMatch) {
        throw new BadRequestError('Current password is incorrect.', 'INVALID_CURRENT_PASSWORD');
    }

    const samePassword = await bcrypt.compare(newPassword, account.passwordHash);

    if (samePassword) {
        throw new BadRequestError('New password must be different from the current password.', 'PASSWORD_REUSED');
    }

    const passwordHash = await bcrypt.hash(newPassword, BCRYPT_ROUNDS);

    const updatedUser = await User.findOneAndUpdate(
        {
            _id: account._id,
            passwordHash: account.passwordHash
        },
        {
            $set: { passwordHash },
            $inc: { tokenVersion: 1 },
            $unset: {
                passwordResetTokenHash: 1,
                passwordResetExpires: 1
            }
        },
        { returnDocument: 'after' }
    );

    if (!updatedUser) {
        throw new ConflictError('Your password was changed by another request. Please try again.', 'PASSWORD_CHANGED');
    }

    authMailer.sendSecurityEmail(updatedUser);

    return {
        response: {
            success: true,
            message: 'Password changed successfully. Please log in again.'
        }
    };
};

// Verify Email
exports.verifyEmail = async (body) => {

    const token = body.token;
    const tokenHash = Token.hash(token);

    const user = await User.findOneAndUpdate(
        {
            emailVerificationTokenHash: tokenHash,
            emailVerificationExpires: { $gt: new Date() }
        },
        {
            $set: { emailVerified: true },
            $unset: {
                emailVerificationTokenHash: 1,
                emailVerificationExpires: 1
            }
        },
        { returnDocument: 'after' }
    );

    if (!user) {
        throw new BadRequestError('Invalid or expired verification link.', 'INVALID_VERIFICATION_TOKEN');
    }

    return {
        response: {
            success: true,
            message: 'Email verified successfully.'
        }
    };
};

// Resend Verification Email
exports.resendVerification = async (user) => {

    if (user.emailVerified) {
        throw new ConflictError('Email is already verified.', 'EMAIL_ALREADY_VERIFIED');
    }

    const rawToken = Token.generate(TOKEN_BYTES);
    const tokenHash = Token.hash(rawToken);

    await User.updateOne(
        { _id: user._id },
        {
            $set: {
                emailVerificationTokenHash: tokenHash,
                emailVerificationExpires: new Date(Date.now() + VERIFICATION_TOKEN_TTL)
            }
        }
    );

    authMailer.sendVerificationEmail(user, rawToken);

    return {
        response: {
            success: true,
            message: 'Verification email sent.'
        }
    };
};

// Forgot Password
exports.forgotPassword = async (body) => {

    const email = body.email.trim().toLowerCase();

    const rawToken = Token.generate(TOKEN_BYTES);
    const tokenHash = Token.hash(rawToken);

    const user = await User.findOneAndUpdate(
        { email },
        {
            $set: {
                passwordResetTokenHash: tokenHash,
                passwordResetExpires: new Date(Date.now() + RESET_TOKEN_TTL)
            }
        },
        { returnDocument: 'after' }
    );

    if (!user) {
        return {
            response: {
                success: true,
                message: 'If an account exists for that email, a password reset link has been sent.'
            }
        };
    }

    authMailer.sendResetEmail(user, rawToken);

    return {
        response: {
            success: true,
            message: 'If an account exists for that email, a password reset link has been sent.'
        }
    };
};

// Reset Password
exports.resetPassword = async (body) => {

    const token = body.token;
    const password = body.password;

    const tokenHash = Token.hash(token);
    const passwordHash = await bcrypt.hash(password, BCRYPT_ROUNDS);

    const user = await User.findOneAndUpdate(
        {
            passwordResetTokenHash: tokenHash,
            passwordResetExpires: { $gt: new Date() }
        },
        {
            $set: { passwordHash },
            $inc: { tokenVersion: 1 },
            $unset: {
                passwordResetTokenHash: 1,
                passwordResetExpires: 1
            }
        },
        { returnDocument: 'after' }
    );

    if (!user) {
        throw new BadRequestError('Invalid or expired reset link.', 'INVALID_RESET_TOKEN');
    }

    authMailer.sendSecurityEmail(user);

    return {
        response: {
            success: true,
            message: 'Password reset successfully. You can now log in with your new password.'
        }
    };
};

// Verify Reset Token
exports.verifyResetToken = async (body) => {

    const token = body.token;

    const tokenHash = Token.hash(token);

    const user = await User.findOne({
        passwordResetTokenHash: tokenHash,
        passwordResetExpires: { $gt: new Date() }
    });

    if (!user) {
        throw new BadRequestError('Invalid or expired reset link.', 'INVALID_RESET_TOKEN');
    }

    return {
        response: {
            success: true,
            valid: true
        }
    };
};