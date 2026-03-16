'use strict';

const Review = require('../models/review');
const Booking = require('../models/booking');
const { triggerEliteAlert } = require('../services/NotificationService');

/**
 * POST /reviews
 * Submit a review for a completed journey.
 * Stores the review using the Weighted Average Algorithm (Punctuality 40%, Cleanliness 35%, Amenities 25%).
 */
exports.submitReview = async (req, res) => {
  try {
    const customerId = req.user.id;
    const { bookingId, busId, punctuality, cleanliness, amenities, comment } = req.body;

    if (!bookingId || !busId || punctuality == null || cleanliness == null || amenities == null) {
      return res.status(400).json({
        error: 'bookingId, busId, punctuality, cleanliness and amenities are required'
      });
    }

    // Validate score ranges
    const scores = { punctuality, cleanliness, amenities };
    for (const [field, value] of Object.entries(scores)) {
      const num = Number(value);
      if (!Number.isFinite(num) || num < 1 || num > 5) {
        return res.status(400).json({ error: `${field} must be a number between 1 and 5` });
      }
    }

    // Verify booking belongs to this customer
    const booking = await Booking.findById(bookingId).lean().exec();
    if (!booking) {
      return res.status(404).json({ error: 'Booking not found' });
    }
    if (String(booking.customerId) !== String(customerId)) {
      return res.status(403).json({ error: 'Not authorized to review this booking' });
    }

    // Prevent duplicate reviews
    const existing = await Review.findOne({ bookingId }).lean().exec();
    if (existing) {
      return res.status(409).json({ error: 'Review already submitted for this booking' });
    }

    const review = new Review({
      bookingId,
      customerId,
      busId,
      punctuality: Number(punctuality),
      cleanliness: Number(cleanliness),
      amenities: Number(amenities),
      comment: comment || ''
    });

    const saved = await review.save();
    res.status(201).json(saved);
  } catch (error) {
    console.error('submitReview error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

/**
 * GET /reviews/bus/:busId
 * Get all reviews for a specific bus along with the aggregate weighted score.
 */
exports.getBusReviews = async (req, res) => {
  try {
    const reviews = await Review.find({ busId: req.params.busId })
      .populate('customerId', 'name profilePicture')
      .sort({ createdAt: -1 })
      .lean()
      .exec();

    const total = reviews.length;
    const aggregateScore =
      total > 0
        ? reviews.reduce((sum, r) => sum + r.weightedScore, 0) / total
        : 0;

    res.json({ reviews, total, aggregateScore: Number(aggregateScore.toFixed(2)) });
  } catch (error) {
    console.error('getBusReviews error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

/**
 * POST /reviews/request-sms
 * Triggered when a bus journey ends. Sends an SMS to the passenger via Twilio
 * with a direct link to the Rate & Review component.
 */
exports.requestReviewBySms = async (req, res) => {
  try {
    const { userId, bookingId, route } = req.body;

    if (!userId || !bookingId) {
      return res.status(400).json({ error: 'userId and bookingId are required' });
    }

    const reviewLink = `${process.env.APP_BASE_URL || 'https://redbuselite.vercel.app'}/review/${bookingId}`;

    await triggerEliteAlert(userId, 'journey_ended', { route: route || '', reviewLink });

    res.json({ message: 'Review request sent' });
  } catch (error) {
    console.error('requestReviewBySms error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
