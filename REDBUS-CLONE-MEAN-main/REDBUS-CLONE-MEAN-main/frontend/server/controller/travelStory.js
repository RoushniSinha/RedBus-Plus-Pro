'use strict';

const cloudinary = require('cloudinary').v2;
const TravelStory = require('../models/travelStory');
const { broadcastPushToAll } = require('../services/NotificationService');

// Cloudinary is configured via environment variables:
// CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

/**
 * POST /stories
 * Create a new travel story. Images are expected as Base64 strings in req.body.images[].
 */
exports.createStory = async (req, res) => {
  try {
    const { title, content, route, tags, images = [] } = req.body;
    const authorId = req.user.id;

    if (!title || !content) {
      return res.status(400).json({ error: 'Title and content are required' });
    }

    // Upload images to Cloudinary
    const uploadedImages = [];
    for (const imageData of images) {
      if (!imageData) continue;
      const result = await cloudinary.uploader.upload(imageData, {
        folder: 'redbus_elite/travel_stories',
        resource_type: 'image'
      });
      uploadedImages.push({ url: result.secure_url, publicId: result.public_id });
    }

    const story = new TravelStory({
      authorId,
      title,
      content,
      route,
      tags: Array.isArray(tags) ? tags : [],
      images: uploadedImages,
      status: 'pending'
    });

    const saved = await story.save();
    res.status(201).json(saved);
  } catch (error) {
    console.error('createStory error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

/**
 * GET /stories
 * List all approved travel stories.
 */
exports.listStories = async (req, res) => {
  try {
    const stories = await TravelStory.find({ status: 'approved' })
      .populate('authorId', 'name profilePicture')
      .sort({ createdAt: -1 })
      .lean()
      .exec();
    res.json(stories);
  } catch (error) {
    console.error('listStories error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

/**
 * GET /stories/:id
 * Get a single travel story by ID.
 */
exports.getStory = async (req, res) => {
  try {
    const story = await TravelStory.findById(req.params.id)
      .populate('authorId', 'name profilePicture')
      .lean()
      .exec();
    if (!story) {
      return res.status(404).json({ error: 'Story not found' });
    }
    res.json(story);
  } catch (error) {
    console.error('getStory error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

/**
 * PATCH /stories/:id/moderate
 * Approve or reject a travel story (admin only).
 * When approved, broadcasts a Firebase Push Notification to all users.
 */
exports.moderateStory = async (req, res) => {
  try {
    const { status, moderationNote } = req.body;
    if (!['approved', 'rejected'].includes(status)) {
      return res.status(400).json({ error: 'Status must be "approved" or "rejected"' });
    }

    const story = await TravelStory.findByIdAndUpdate(
      req.params.id,
      { status, moderationNote: moderationNote || '' },
      { new: true }
    )
      .populate('authorId', 'name')
      .exec();

    if (!story) {
      return res.status(404).json({ error: 'Story not found' });
    }

    // Broadcast push notification to all users when a story is approved
    if (status === 'approved') {
      const authorName = story.authorId ? story.authorId.name : 'A traveller';
      try {
        await broadcastPushToAll(
          'New Travel Story',
          `${authorName} shared a new story: "${story.title}"`,
          { storyId: story._id.toString(), type: 'story_approved' }
        );
      } catch (pushErr) {
        console.error('broadcastPushToAll error:', pushErr.message);
      }
    }

    res.json(story);
  } catch (error) {
    console.error('moderateStory error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

/**
 * DELETE /stories/:id
 * Delete a travel story and its Cloudinary images.
 */
exports.deleteStory = async (req, res) => {
  try {
    const story = await TravelStory.findById(req.params.id).exec();
    if (!story) {
      return res.status(404).json({ error: 'Story not found' });
    }

    // Remove images from Cloudinary
    for (const img of story.images) {
      try {
        await cloudinary.uploader.destroy(img.publicId);
      } catch (imgErr) {
        console.error('Cloudinary delete error:', imgErr.message);
      }
    }

    await story.deleteOne();
    res.json({ message: 'Story deleted' });
  } catch (error) {
    console.error('deleteStory error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
