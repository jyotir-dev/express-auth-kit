// Dependencies
const mongoose = require('mongoose');

// Enums
const { USER_ROLE } = require('../enums/user.enums');

// User Schema
const userSchema = new mongoose.Schema({

    // Username
    username: {
        type: String,
        required: true,
        unique: true,
    },

    // Email
    email: {
        type: String,
        required: true,
        unique: true,
    },

    // Password Hash
    passwordHash: {
        type: String,
        required: true,
        select: false
    },

    // Email Verified
    emailVerified: {
        type: Boolean,
        default: false
    },

    role: {
        type: String,
        default: USER_ROLE.USER
    },

    // Token Version
    tokenVersion: {
        type: Number,
        default: 0
    },

    // Email Verification Token Hash
    emailVerificationTokenHash: {
        type: String,
        select: false
    },

    // Email Verification Expiry
    emailVerificationExpires: {
        type: Date,
        select: false
    },

    // Password Reset Token Hash
    passwordResetTokenHash: {
        type: String,
        select: false
    },

    // Password Reset Expiry
    passwordResetExpires: {
        type: Date,
        select: false
    }

}, {
    timestamps: true
});

// User Model
const User = mongoose.model('User', userSchema);

// Export User Model
module.exports = User;