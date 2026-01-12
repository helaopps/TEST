const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  serviceId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Post', // Assuming services are stored as posts
    required: true
  },
  serviceProviderId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  travelerInfo: {
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true }
  },
  bookingDate: {
    type: Date,
    required: true
  },
  startTime: {
    type: String,
    required: true
  },
  endTime: {
    type: String
  },
  duration: {
    type: String // e.g., "half day", "full day", "hourly"
  },
  extras: [{
    name: String,
    price: {
      amount: { type: Number, min: 0 },
      currency: { type: String, default: 'USD' }
    }
  }],
  totalPrice: {
    amount: { type: Number, required: true, min: 0 },
    currency: { type: String, default: 'USD' }
  },
  paymentStatus: {
    type: String,
    enum: ['pending', 'paid', 'refunded', 'failed'],
    default: 'pending'
  },
  paymentIntentId: String, // Stripe payment intent ID
  bookingStatus: {
    type: String,
    enum: ['pending', 'confirmed', 'in_progress', 'completed', 'cancelled', 'rejected'],
    default: 'pending'
  },
  specialRequests: String,
  meetingPoint: String,
  meetingPointLocation: {
    type: {
      type: String,
      default: 'Point'
    },
    coordinates: {
      type: [Number], // [longitude, latitude]
      index: '2dsphere'
    },
    address: String
  },
  cancellationReason: String,
  rating: {
    score: { type: Number, min: 1, max: 5 },
    comment: String
  },
  isReviewed: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
});

// Indexes for efficient querying
bookingSchema.index({ userId: 1 });
bookingSchema.index({ serviceProviderId: 1 });
bookingSchema.index({ bookingDate: 1 });
bookingSchema.index({ bookingStatus: 1 });
bookingSchema.index({ createdAt: -1 });

// Method to calculate total price
bookingSchema.methods.calculateTotalPrice = function() {
  let total = this.totalPrice.amount;
  
  if (this.extras && Array.isArray(this.extras)) {
    this.extras.forEach(extra => {
      if (extra.price && extra.price.amount) {
        total += extra.price.amount;
      }
    });
  }
  
  return total;
};

// Method to update booking status
bookingSchema.methods.updateStatus = async function(newStatus) {
  this.bookingStatus = newStatus;
  return await this.save();
};

module.exports = mongoose.model('Booking', bookingSchema);