const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Weighted Average Algorithm weights (must sum to 1.0)
const RATING_WEIGHTS = {
  punctuality: 0.4,
  cleanliness: 0.35,
  amenities: 0.25
};

const reviewSchema = new Schema(
  {
    bookingId: {
      type: Schema.Types.ObjectId,
      ref: 'Bookings',
      required: true,
      unique: true
    },
    customerId: {
      type: Schema.Types.ObjectId,
      ref: 'Customers',
      required: true
    },
    busId: {
      type: Schema.Types.ObjectId,
      ref: 'Buses',
      required: true
    },
    punctuality: {
      type: Number,
      required: true,
      min: 1,
      max: 5
    },
    cleanliness: {
      type: Number,
      required: true,
      min: 1,
      max: 5
    },
    amenities: {
      type: Number,
      required: true,
      min: 1,
      max: 5
    },
    weightedScore: {
      type: Number,
      required: false,
      default: 0
    },
    comment: {
      type: String,
      maxlength: 1000,
      required: false
    }
  },
  { timestamps: true }
);

/**
 * Computes the Weighted Average score before saving.
 * Formula: (punctuality × 0.4) + (cleanliness × 0.35) + (amenities × 0.25)
 */
reviewSchema.pre('save', function (next) {
  this.weightedScore =
    this.punctuality * RATING_WEIGHTS.punctuality +
    this.cleanliness * RATING_WEIGHTS.cleanliness +
    this.amenities * RATING_WEIGHTS.amenities;
  next();
});

reviewSchema.statics.RATING_WEIGHTS = RATING_WEIGHTS;

module.exports = mongoose.model('Review', reviewSchema);
