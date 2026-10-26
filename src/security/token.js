// Dependencies
const crypto = require('crypto');

// Hash Token
exports.hash = (token) => {
    return crypto.createHash('sha256').update(token).digest('hex');
};

// Generate Token
exports.generate = (bytes = 32) => {
    return crypto.randomBytes(bytes).toString('hex');
};