// Dependencies
const jwt = require('jsonwebtoken');

const TOKEN_TTL = 7 * 24 * 60 * 60;

// Sign Token
exports.signToken = (user) => {
    return jwt.sign(
        {
            id: user._id,
            version: user.tokenVersion
        },
        process.env.JWT_SECRET,
        { expiresIn: TOKEN_TTL }
    );
};

//  Verify Token
exports.verifyToken = (token) => {
    return jwt.verify(token, process.env.JWT_SECRET);
}