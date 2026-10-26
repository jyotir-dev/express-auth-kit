// Cookie Name
const COOKIE_NAME = 'token';

// Cookie Options
const COOKIE_OPTIONS = {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 7 * 24 * 60 * 60 * 1000
};

// Set Auth Cookie
exports.setAuthCookie = (res, token) => {
    res.cookie(COOKIE_NAME, token, COOKIE_OPTIONS);
};

// Clear Auth Cookie
exports.clearAuthCookie = (res) => {
    res.clearCookie(COOKIE_NAME, COOKIE_OPTIONS);
};