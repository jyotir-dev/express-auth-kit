// Dependencies
const nodemailer = require('nodemailer');

// Log
const log = require('../lib/log')

// Transporter
const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT),
    secure: process.env.SMTP_PORT === '465',
    pool: true,
    connectionTimeout: 10000,
    socketTimeout: 20000,
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS
    }
});

// Send Email
exports.sendEmail = ({ to, subject, html, text }) => {

    transporter.sendMail({
        from: process.env.EMAIL_FROM,
        to,
        subject,
        html,
        text
    })
    .catch((error) => {
        log.error('EMAIL', `Failed to send "${subject}"`, error.message);
    });
};