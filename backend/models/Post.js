const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  title: {
    type: String,
    required: [true, 'Title is required'],
    trim: true,
    maxlength: [100, 'Title cannot exceed 100 characters']
  },
  description: {
    type: String,
    required: [true, 'Description is required'],
    maxlength: [2000, 'Description cannot exceed 2000 characters']
  },
  type: {
    type: String,
    enum: ['service', 'search_partner', 'join_rent', 'event', 'lost_found'],
    required: true
  },
  category: {
    type: String,
    enum: ['shopping', 'rent', 'volunteer', 'event', 'lost_found', 'accommodation', 'tour_guide', 'transport'],
    required: function() {
      return this.type === 'service';
    }
  },
  images: [{
    type: String, // URLs to uploaded images
    maxlength: [5] // Maximum 5 images
  }],
  location: {
    type: {
      type: String,
      default: 'Point'
    },
    coordinates: {
      type: [Number], // [longitude, latitude]
      index: '2dsphere'
    },
    address: String,
    city: String,
    country: String
  },
  price: {
    amount: { type: Number, min: 0 },
    currency: { type: String, default: 'USD' }
  },
  status: {
    type: String,
    enum: ['pending', 'approved', 'rejected', 'archived'],
    default: 'pending'
  },
  tags: [{
    type: String,
    trim: true
  }],
  likes: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
  shares: {
    type: Number,
    default: 0
  },
  commentsCount: {
    type: Number,
    default: 0
  },
  isFeatured: {
    type: Boolean,
    default: false
  },
  eventDetails: {
    startDate: Date,
    endDate: Date,
    maxParticipants: Number,
    currentParticipants: {
      type: Number,
      default: 0
    }
  },
  lostFoundDetails: {
    itemType: String,
    district: String,
    datePosted: Date,
    isFound: {
      type: Boolean,
      default: false
    }
  },
  serviceDetails: {
    availability: [{
      startDate: Date,
      endDate: Date
    }],
    duration: String, // e.g., "per day", "per hour"
    rating: {
      average: { type: Number, default: 0, min: 0, max: 5 },
      count: { type: Number, default: 0 }
    }
  }
}, {
  timestamps: true
});

// Indexes for efficient querying
postSchema.index({ createdAt: -1 }); // Sort by newest
postSchema.index({ type: 1, status: 1 }); // Filter by type and status
postSchema.index({ location: '2dsphere' }); // Geospatial queries
postSchema.index({ tags: 1 }); // Tag-based searches
postSchema.index({ userId: 1 }); // User's posts

// Virtual for calculating post rating
postSchema.virtual('calculatedRating').get(function() {
  return this.serviceDetails && this.serviceDetails.rating.count > 0 ? 
    (this.serviceDetails.rating.average / this.serviceDetails.rating.count) : 0;
});

// Method to update comments count
postSchema.methods.updateCommentsCount = async function() {
  const Comment = require('./Comment');
  const count = await Comment.countDocuments({ postId: this._id });
  this.commentsCount = count;
  await this.save({ validateBeforeSave: false });
};

module.exports = mongoose.model('Post', postSchema);