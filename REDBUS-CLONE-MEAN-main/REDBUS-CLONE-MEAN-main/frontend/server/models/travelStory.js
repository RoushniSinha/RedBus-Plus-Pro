const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const travelStorySchema = new Schema(
  {
    authorId: {
      type: Schema.Types.ObjectId,
      ref: 'Customers',
      required: true
    },
    title: {
      type: String,
      required: true,
      maxlength: 200
    },
    content: {
      type: String,
      required: true,
      maxlength: 5000
    },
    images: [
      {
        url: { type: String, required: true },
        publicId: { type: String, required: true }
      }
    ],
    route: {
      type: String,
      required: false
    },
    tags: {
      type: [String],
      default: []
    },
    status: {
      type: String,
      enum: ['pending', 'approved', 'rejected'],
      default: 'pending'
    },
    moderationNote: {
      type: String,
      required: false
    },
    likes: {
      type: Number,
      default: 0
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model('TravelStory', travelStorySchema);
