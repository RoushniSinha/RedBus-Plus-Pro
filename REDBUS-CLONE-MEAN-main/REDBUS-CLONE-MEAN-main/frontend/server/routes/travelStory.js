const express = require('express');
const router = express.Router();
const rateLimit = require('express-rate-limit');
const travelStoryController = require('../controller/travelStory');
const { verifyToken } = require('../controller/auth');

const storyReadLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 60,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: 'Too many requests, please try again later.' }
});

const storyWriteLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 20,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: 'Too many requests, please try again later.' }
});

// Public – list and read approved stories
router.get('/stories', storyReadLimiter, travelStoryController.listStories);
router.get('/stories/:id', storyReadLimiter, travelStoryController.getStory);

// Authenticated – create and delete own stories
router.post('/stories', storyWriteLimiter, verifyToken, travelStoryController.createStory);
router.delete('/stories/:id', storyWriteLimiter, verifyToken, travelStoryController.deleteStory);

// Admin moderation – approve or reject
router.patch('/stories/:id/moderate', storyWriteLimiter, verifyToken, travelStoryController.moderateStory);

module.exports = router;
