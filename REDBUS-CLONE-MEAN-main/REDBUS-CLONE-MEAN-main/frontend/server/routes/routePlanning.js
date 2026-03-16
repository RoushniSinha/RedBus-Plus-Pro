const express = require('express');
const router = express.Router();
const routePlanningController = require('../controller/routePlanning');
const { verifyToken } = require('../controller/auth');

// Route planning with optional booking-confirmed notification
router.get(
  '/route-planning/:departure/:arrival/:date',
  verifyToken,
  routePlanningController.getRoutePlan
);

module.exports = router;
