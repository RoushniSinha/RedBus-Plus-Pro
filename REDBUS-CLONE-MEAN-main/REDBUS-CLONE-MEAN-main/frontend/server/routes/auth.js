const express = require('express');
const router = express.Router();
const rateLimit = require('express-rate-limit');
const authController = require('../controller/auth');

const authRateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 20,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: 'Too many requests, please try again later.' }
});

router.post('/auth/register', authRateLimiter, authController.register);
router.post('/auth/login', authRateLimiter, authController.login);
router.post('/auth/google', authRateLimiter, authController.googleAuth);

module.exports = router;
