// Colors
const COLORS = {
    reset: '\x1b[0m',
    gray: '\x1b[90m',
    green: '\x1b[32m',
    yellow: '\x1b[33m',
    red: '\x1b[31m',
    magenta: '\x1b[35m'
};

// Write
const write = (color, scope, message, detail) => {

    const time = `${COLORS.gray}${new Date().toLocaleTimeString()}${COLORS.reset}`;
    const tag = `${COLORS.magenta}${scope.padEnd(8)}${COLORS.reset}`;
    const extra = detail ? ` ${COLORS.gray}${detail}${COLORS.reset}` : '';

    console.log(`${time} ${tag} ${COLORS[color]}${message}${COLORS.reset}${extra}`);
};

// Exports
exports.info = (scope, message, detail) => write('reset', scope, message, detail);
exports.success = (scope, message, detail) => write('green', scope, message, detail);
exports.warn = (scope, message, detail) => write('yellow', scope, message, detail);
exports.error = (scope, message, detail) => write('red', scope, message, detail);