// Dependencies
const cors = require('cors');
const helmet = require('helmet');
const express = require('express');
const cookieParser = require('cookie-parser');

// Routes
const authRoutes = require('./routes/auth.routes');
const healthRoutes = require('./routes/health.routes');

// Middlewares
const logRequest = require('./middlewares/logger.middleware');
const handleError = require('./middlewares/error.middleware');
const handleNotFound = require('./middlewares/notfound.middleware');

// Express App
const app = express();

// Trust Proxy
if (process.env.NODE_ENV === 'production') {
    app.set('trust proxy', 1);
}

// Security Headers
app.use(helmet());

// Express JSON
app.use(express.json({ limit: '10kb' }));

// Cookie Parser
app.use(cookieParser());

// CORS Policy
app.use(cors({
    origin: process.env.CLIENT_URL,
    credentials: true
}));

// Request Logger
app.use(logRequest());

// Health
app.use('/api/health', healthRoutes);

// Routes
app.use('/api/v1/auth', authRoutes);

// Not Found Handler
app.use(handleNotFound());

// Error Handler
app.use(handleError());

// Export Express Application
module.exports = app;