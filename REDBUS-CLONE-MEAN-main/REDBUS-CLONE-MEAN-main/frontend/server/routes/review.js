const express = require('express');
const router = express.Router();
const reviewController = require('../controller/review');
const { verifyToken } = require('../controller/auth');

// Submit a review (authenticated)
router.post('/reviews', verifyToken, reviewController.submitReview);

// Get all reviews for a bus (public)
router.get('/reviews/bus/:busId', reviewController.getBusReviews);

// Request review via SMS after journey ends (internal / webhook)
router.post('/reviews/request-sms', reviewController.requestReviewBySms);

module.exports = router;
