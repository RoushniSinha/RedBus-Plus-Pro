const express = require('express');
const router = express.Router();
const rateLimit = require('express-rate-limit');
const reviewController = require('../controller/review');
const { verifyToken } = require('../controller/auth');

const reviewReadLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 60,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: 'Too many requests, please try again later.' }
});

const reviewWriteLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 20,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: 'Too many requests, please try again later.' }
});

// Submit a review (authenticated)
router.post('/reviews', reviewWriteLimiter, verifyToken, reviewController.submitReview);

// Get all reviews for a bus (public)
router.get('/reviews/bus/:busId', reviewReadLimiter, reviewController.getBusReviews);

// Request review via SMS after journey ends (internal / webhook)
router.post('/reviews/request-sms', reviewWriteLimiter, reviewController.requestReviewBySms);

module.exports = router;
