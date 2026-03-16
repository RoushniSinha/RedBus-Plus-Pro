const express = require('express');
const router = express.Router();
const travelStoryController = require('../controller/travelStory');
const { verifyToken } = require('../controller/auth');

// Public – list and read approved stories
router.get('/stories', travelStoryController.listStories);
router.get('/stories/:id', travelStoryController.getStory);

// Authenticated – create and delete own stories
router.post('/stories', verifyToken, travelStoryController.createStory);
router.delete('/stories/:id', verifyToken, travelStoryController.deleteStory);

// Admin moderation – approve or reject
router.patch('/stories/:id/moderate', verifyToken, travelStoryController.moderateStory);

module.exports = router;
