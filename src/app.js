// Dependencies
const cors = require('cors');
const helmet = require('helmet');
const express = require('express');
const cookieParser = require('cookie-parser');

// Routes
const authRoutes = require('./routes/auth.routes');
const healthRoutes = require('./routes/health.routes');

// Middlewares
const errorMiddleware = require('./middlewares/error.middleware');
const loggerMiddleware = require('./middlewares/logger.middleware');
const fallbackMiddleware = require('./middlewares/fallback.middleware');

// Express App
const app = express();

// Trust Proxy
if (process.env.NODE_ENV === 'production') {
    app.set('trust proxy', 1);
}

// Security Headers
app.use(helmet());

// Express Middleware
app.use(express.json({ limit: '10kb' }));

// Cookie Parser
app.use(cookieParser());

// CORS Policy
app.use(cors({
    origin: process.env.CLIENT_URL,
    credentials: true
}));

// Logger Middleware
app.use(loggerMiddleware);

// Health
app.use('/api/health', healthRoutes);

// Routes
app.use('/api/v1/auth', authRoutes);

// Fallback Middleware
app.use(fallbackMiddleware);

// Global Error Middleware
app.use(errorMiddleware);

// Export Express Application
module.exports = app;