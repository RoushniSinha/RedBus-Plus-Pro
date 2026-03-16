const express = require('express');
const router = express.Router();
const rateLimit = require('express-rate-limit');
const routePlanningController = require('../controller/routePlanning');
const { verifyToken } = require('../controller/auth');

const routePlanLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 60,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: 'Too many requests, please try again later.' }
});

// Route planning with optional booking-confirmed notification
router.get(
  '/route-planning/:departure/:arrival/:date',
  routePlanLimiter,
  verifyToken,
  routePlanningController.getRoutePlan
);

module.exports = router;
