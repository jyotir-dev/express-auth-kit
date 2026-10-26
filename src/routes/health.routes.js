// Dependencies
const express = require('express');

// Express Router
const router = express.Router();

// Controllers
const healthController = require('../controllers/health.controller');

// Health Routes
router.get(
    '/',
    healthController.health
);

// Export Router
module.exports = router;