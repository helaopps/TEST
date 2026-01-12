# TravelMate Database Schema

## Overview
This document outlines the database schema for the TravelMate platform, detailing the collections, fields, relationships, and indexes needed to support the multi-role travel platform functionality.

## Collections

### 1. Users Collection
Stores user information and account details.

```javascript
{
  _id: ObjectId,
  name: String,           // Required, max 50 chars
  email: String,          // Required, unique
  phone: String,          // Required, unique
  password: String,       // Required, hashed, not selected by default
  role: String,           // Enum: traveler, local, service_provider, event_manager, volunteer, merchant, admin, moderator, super_admin
  location: {
    type: String,         // Default: "Point"
    coordinates: [Number], // [longitude, latitude], indexed with 2dsphere
    address: String,
    city: String,
    country: String
  },
  bio: String,            // Max 500 chars
  skills: [String],       // Array of skill strings
  ratings: {
    average: Number,      // Default: 0, min: 0, max: 5
    count: Number         // Default: 0
  },
  followers: [ObjectId],  // References to User documents
  following: [ObjectId],  // References to User documents
  profileImage: String,
  coverImage: String,
  isVerified: Boolean,    // Default: false
  isActive: Boolean,      // Default: true
  lastActive: Date,       // Default: Date.now
  joinDate: Date,         // Default: Date.now
  stripeAccountId: String, // For payment processing
  preferences: {
    language: String,     // Default: "en"
    currency: String,     // Default: "USD"
    notifications: {
      email: Boolean,     // Default: true
      push: Boolean,      // Default: true
      sms: Boolean        // Default: false
    }
  },
  createdAt: Date,
  updatedAt: Date
}
```

#### Indexes:
- `email: 1` (unique)
- `phone: 1` (unique)
- `location: "2dsphere"` (geospatial)
- `role: 1` (for role-based queries)
- `isActive: 1` (for active user queries)

---

### 2. Posts Collection
Stores user-generated content including services, events, and announcements.

```javascript
{
  _id: ObjectId,
  userId: ObjectId,       // Reference to User, required
  title: String,          // Required, max 100 chars
  description: String,    // Required, max 2000 chars
  type: String,           // Enum: service, search_partner, join_rent, event, lost_found
  category: String,       // Enum: shopping, rent, volunteer, event, lost_found, accommodation, tour_guide, transport
                           // Required if type === 'service'
  images: [String],       // URLs to uploaded images, max 5
  location: {
    type: String,         // Default: "Point"
    coordinates: [Number], // [longitude, latitude], indexed with 2dsphere
    address: String,
    city: String,
    country: String
  },
  price: {
    amount: Number,       // Min: 0
    currency: String      // Default: "USD"
  },
  status: String,         // Enum: pending, approved, rejected, archived, default: pending
  tags: [String],         // Array of tag strings
  likes: [ObjectId],      // References to User documents
  shares: Number,         // Default: 0
  commentsCount: Number,  // Default: 0
  isFeatured: Boolean,    // Default: false
  eventDetails: {
    startDate: Date,
    endDate: Date,
    maxParticipants: Number,
    currentParticipants: Number // Default: 0
  },
  lostFoundDetails: {
    itemType: String,
    district: String,
    datePosted: Date,
    isFound: Boolean      // Default: false
  },
  serviceDetails: {
    availability: [{
      startDate: Date,
      endDate: Date
    }],
    duration: String,     // e.g., "per day", "per hour"
    rating: {
      average: Number,    // Default: 0, min: 0, max: 5
      count: Number       // Default: 0
    }
  },
  createdAt: Date,
  updatedAt: Date
}
```

#### Indexes:
- `userId: 1` (for user's posts)
- `createdAt: -1` (for sorting by newest)
- `type: 1, status: 1` (for filtering by type and status)
- `location: "2dsphere"` (for geospatial queries)
- `tags: 1` (for tag-based searches)
- `status: 1` (for moderation queries)

---

### 3. Bookings Collection
Manages service bookings and reservations.

```javascript
{
  _id: ObjectId,
  userId: ObjectId,               // Reference to User (traveler), required
  serviceId: ObjectId,            // Reference to Post (service), required
  serviceProviderId: ObjectId,    // Reference to User (service provider), required
  travelerInfo: {
    name: String,                 // Required
    email: String,                // Required
    phone: String                 // Required
  },
  bookingDate: Date,              // Required
  startTime: String,              // Required (HH:MM format)
  endTime: String,                // Optional (HH:MM format)
  duration: String,               // e.g., "half day", "full day", "hourly"
  extras: [{
    name: String,
    price: {
      amount: Number,             // Min: 0
      currency: String            // Default: "USD"
    }
  }],
  totalPrice: {
    amount: Number,               // Required, min: 0
    currency: String              // Default: "USD"
  },
  paymentStatus: String,          // Enum: pending, paid, refunded, failed, default: pending
  paymentIntentId: String,        // Stripe payment intent ID
  bookingStatus: String,          // Enum: pending, confirmed, in_progress, completed, cancelled, rejected, default: pending
  specialRequests: String,
  meetingPoint: String,
  meetingPointLocation: {
    type: String,                 // Default: "Point"
    coordinates: [Number],        // [longitude, latitude], indexed with 2dsphere
    address: String
  },
  cancellationReason: String,
  rating: {
    score: Number,                // Min: 1, max: 5
    comment: String
  },
  isReviewed: Boolean,            // Default: false
  createdAt: Date,
  updatedAt: Date
}
```

#### Indexes:
- `userId: 1` (for user's bookings)
- `serviceProviderId: 1` (for service provider's bookings)
- `bookingDate: 1` (for date-based queries)
- `bookingStatus: 1` (for status-based queries)
- `createdAt: -1` (for sorting by creation date)

---

### 4. Messages Collection
Handles private messaging between users.

```javascript
{
  _id: ObjectId,
  senderId: ObjectId,       // Reference to User, required
  receiverId: ObjectId,     // Reference to User, required
  conversationId: ObjectId, // Combined IDs for conversation grouping, required
  content: String,          // Required
  type: String,             // Enum: text, image, file, default: text
  read: Boolean,            // Default: false
  readAt: Date,             // Timestamp when read
  repliedTo: ObjectId,      // Reference to message being replied to
  attachments: [{
    url: String,
    type: String,           // Enum: image, document, etc.
    size: Number            // File size in bytes
  }],
  createdAt: Date,
  updatedAt: Date
}
```

#### Indexes:
- `senderId: 1` (for sender's messages)
- `receiverId: 1` (for receiver's messages)
- `conversationId: 1` (for conversation queries)
- `createdAt: -1` (for chronological ordering)
- `read: 1` (for unread message queries)

---

### 5. Notifications Collection
Manages user notifications.

```javascript
{
  _id: ObjectId,
  userId: ObjectId,         // Reference to User, required
  type: String,             // Enum: booking, message, post, system, etc.
  title: String,            // Required
  message: String,          // Required
  data: Object,             // Additional data payload
  read: Boolean,            // Default: false
  readAt: Date,             // Timestamp when read
  actionUrl: String,        // Optional URL for notification action
  createdAt: Date,
  updatedAt: Date
}
```

#### Indexes:
- `userId: 1` (for user's notifications)
- `read: 1` (for unread notifications)
- `createdAt: -1` (for chronological ordering)

---

### 6. Reviews Collection
Stores service reviews and ratings.

```javascript
{
  _id: ObjectId,
  userId: ObjectId,         // Reference to User (reviewer), required
  targetUserId: ObjectId,   // Reference to User (reviewee), required
  bookingId: ObjectId,      // Reference to Booking, required
  rating: Number,           // Required, min: 1, max: 5
  comment: String,          // Optional
  anonymous: Boolean,       // Default: false
  createdAt: Date,
  updatedAt: Date
}
```

#### Indexes:
- `targetUserId: 1` (for user's reviews)
- `bookingId: 1` (for booking's reviews)
- `createdAt: -1` (for chronological ordering)

---

### 7. Trips Collection
Manages trip plans and itineraries.

```javascript
{
  _id: ObjectId,
  userId: ObjectId,         // Reference to User, required
  title: String,            // Required
  description: String,      // Optional
  origin: {
    coordinates: [Number],  // [longitude, latitude]
    address: String
  },
  destination: {
    coordinates: [Number],  // [longitude, latitude]
    address: String
  },
  startDate: Date,          // Required
  endDate: Date,            // Required
  travelers: Number,        // Default: 1
  interests: [String],      // e.g., ["food", "culture", "nature"]
  budget: {
    amount: Number,
    currency: String        // Default: "USD"
  },
  itinerary: [{
    day: Number,
    date: Date,
    activities: [{
      title: String,
      time: String,         // HH:MM format
      location: {
        coordinates: [Number],
        address: String
      },
      notes: String
    }]
  }],
  services: [ObjectId],     // References to Posts for booked services
  status: String,           // Enum: draft, planned, in_progress, completed, archived, default: planned
  createdAt: Date,
  updatedAt: Date
}
```

#### Indexes:
- `userId: 1` (for user's trips)
- `status: 1` (for status-based queries)
- `startDate: 1` (for date-based queries)

---

### 8. Announcements Collection
Stores platform-wide announcements.

```javascript
{
  _id: ObjectId,
  createdBy: ObjectId,      // Reference to Admin User, required
  title: String,            // Required
  content: String,          // Required
  priority: String,         // Enum: low, medium, high, critical, default: medium
  audience: String,         // Enum: all, travelers, locals, service_providers, default: all
  expiresAt: Date,          // Optional expiration date
  imageUrl: String,         // Optional image for announcement
  actionButton: {
    text: String,
    url: String
  },
  isActive: Boolean,        // Default: true
  createdAt: Date,
  updatedAt: Date
}
```

#### Indexes:
- `isActive: 1` (for active announcements)
- `expiresAt: 1` (for expiration-based queries)
- `audience: 1` (for targeted announcements)

---

## Relationships

### User Relationships
- One-to-Many: User → Posts (user creates many posts)
- One-to-Many: User → Bookings (user makes many bookings)
- One-to-Many: User → Messages (user sends/receives many messages)
- Many-to-Many: User ↔ User (followers/following relationship)

### Post Relationships
- Many-to-One: Posts → User (many posts belong to one user)
- One-to-Many: Post → Bookings (one post can have many bookings)
- One-to-Many: Post → Reviews (one post can have many reviews)

### Booking Relationships
- Many-to-One: Bookings → User (many bookings for one user)
- Many-to-One: Bookings → Post (many bookings for one service post)
- Many-to-One: Bookings → User (many bookings for one service provider)

### Message Relationships
- Many-to-One: Messages → User (many messages sent by one user)
- Many-to-One: Messages → User (many messages received by one user)

## Data Validation Rules

### User Collection
- Email must be valid email format
- Phone number must be unique
- Password must be at least 6 characters (hashed before storage)
- Role must be one of the defined enum values
- Location coordinates must be valid geoJSON format

### Post Collection
- Title and description are required
- Type must be one of the defined enum values
- Price amount must be >= 0 if present
- Status transitions follow specific rules (pending → approved/rejected → archived)

### Booking Collection
- Dates and times must be logically consistent
- Total price must match calculated sum of base price + extras
- Booking status transitions follow specific rules
- User and service provider cannot be the same person

### Message Collection
- Sender and receiver must be different users
- Content must be present for text messages
- Conversation ID ensures proper grouping of messages

This schema provides a solid foundation for the TravelMate platform, supporting all the required features while maintaining data integrity and enabling efficient querying patterns.