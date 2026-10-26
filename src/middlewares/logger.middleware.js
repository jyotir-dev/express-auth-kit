// Colors
const COLORS = {
    reset: '\x1b[0m',
    gray: '\x1b[90m',
    cyan: '\x1b[36m',
    green: '\x1b[32m',
    yellow: '\x1b[33m',
    red: '\x1b[31m',
    magenta: '\x1b[35m'
};

// Get Status Color
function getStatusColor(status) {
    if (status >= 500) return COLORS.red;
    if (status >= 400) return COLORS.yellow;
    if (status >= 300) return COLORS.cyan;
    if (status >= 200) return COLORS.green;
    return COLORS.magenta;
}

// Logger Middleware
module.exports = (req, res, next) => {

    const start = process.hrtime.bigint();

    res.on('finish', () => {
        const duration = Number(process.hrtime.bigint() - start) / 1_000_000;
        const statusColor = getStatusColor(res.statusCode);
        
        console.log(
            `${COLORS.gray}${new Date().toLocaleTimeString()}${COLORS.reset} ` +
            `${COLORS.cyan}${req.method.padEnd(5)}${COLORS.reset} ` +
            `${req.originalUrl.padEnd(20)} ` +
            `${statusColor}${res.statusCode}${COLORS.reset} ` +
            `${COLORS.gray}${duration.toFixed(2)}ms${COLORS.reset}`
        );

    });

    next();
};