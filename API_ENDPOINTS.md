# TravelMate API Endpoints

## 📋 Table of Contents
1. [Authentication](#authentication)
2. [User Management](#user-management)
3. [Posts Management](#posts-management)
4. [Booking System](#booking-system)
5. [Trip Planning](#trip-planning)
6. [Services Marketplace](#services-marketplace)
7. [Messaging System](#messaging-system)
8. [Admin Panel](#admin-panel)
9. [Notifications](#notifications)

---

## Authentication

### Register User
- **Endpoint**: `POST /api/auth/register`
- **Description**: Register a new user with role selection
- **Request**:
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "+1234567890",
  "password": "securePassword123",
  "role": "traveler"
}
```
- **Response**:
```json
{
  "success": true,
  "message": "User registered successfully",
  "token": "jwt_token_here",
  "data": {
    "id": "user_id",
    "name": "John Doe",
    "email": "john@example.com",
    "phone": "+1234567890",
    "role": "traveler"
  }
}
```

### Login User
- **Endpoint**: `POST /api/auth/login`
- **Description**: Authenticate user and return JWT token
- **Request**:
```json
{
  "email": "john@example.com",
  "password": "securePassword123"
}
```
- **Response**:
```json
{
  "success": true,
  "message": "Login successful",
  "token": "jwt_token_here",
  "data": {
    "id": "user_id",
    "name": "John Doe",
    "email": "john@example.com",
    "phone": "+1234567890",
    "role": "traveler",
    "isVerified": false
  }
}
```

### Get Current User
- **Endpoint**: `GET /api/auth/me`
- **Auth Required**: Bearer Token
- **Description**: Get current authenticated user details
- **Response**:
```json
{
  "success": true,
  "data": {
    "id": "user_id",
    "name": "John Doe",
    "email": "john@example.com",
    "phone": "+1234567890",
    "role": "traveler",
    "location": {
      "coordinates": [longitude, latitude],
      "address": "123 Main St",
      "city": "City",
      "country": "Country"
    },
    "bio": "Sample bio",
    "profileImage": "image_url",
    "isVerified": false,
    "joinDate": "2023-01-01T00:00:00.000Z"
  }
}
```

### Update Profile
- **Endpoint**: `PUT /api/auth/update-profile`
- **Auth Required**: Bearer Token
- **Description**: Update user profile information
- **Request**:
```json
{
  "name": "John Smith",
  "bio": "Updated bio",
  "location": {
    "coordinates": [-74.006, 40.7128],
    "address": "456 New York Ave",
    "city": "New York",
    "country": "USA"
  }
}
```

### Change Password
- **Endpoint**: `PUT /api/auth/change-password`
- **Auth Required**: Bearer Token
- **Description**: Change user password
- **Request**:
```json
{
  "currentPassword": "old_password",
  "newPassword": "new_secure_password"
}
```

---

## User Management

### Get User Profile
- **Endpoint**: `GET /api/users/:userId`
- **Auth Required**: Bearer Token
- **Description**: Get specific user profile by ID

### Search Users
- **Endpoint**: `GET /api/users/search`
- **Auth Required**: Bearer Token
- **Description**: Search users by name, role, location, or skills
- **Query Parameters**:
  - `q` - Search query
  - `role` - Filter by role
  - `location` - Filter by location
  - `skills` - Filter by skills

### Follow User
- **Endpoint**: `POST /api/users/:userId/follow`
- **Auth Required**: Bearer Token
- **Description**: Follow another user

### Unfollow User
- **Endpoint**: `DELETE /api/users/:userId/unfollow`
- **Auth Required**: Bearer Token
- **Description**: Unfollow a user

---

## Posts Management

### Create Post
- **Endpoint**: `POST /api/posts`
- **Auth Required**: Bearer Token
- **Description**: Create a new post (service, event, lost & found, etc.)
- **Request**:
```json
{
  "title": "Tour Guide Service",
  "description": "Experienced local guide offering city tours",
  "type": "service",
  "category": "tour_guide",
  "images": ["image_url_1", "image_url_2"],
  "location": {
    "coordinates": [-74.006, 40.7128],
    "address": "Central Park, New York"
  },
  "price": {
    "amount": 50,
    "currency": "USD"
  },
  "tags": ["tourism", "local", "guide"]
}
```

### Get Posts
- **Endpoint**: `GET /api/posts`
- **Auth Required**: Bearer Token
- **Description**: Get posts with filtering and pagination
- **Query Parameters**:
  - `type` - Filter by post type (service, event, etc.)
  - `category` - Filter by category
  - `location` - Filter by location
  - `radius` - Radius in km for location-based search
  - `page` - Page number
  - `limit` - Number of items per page

### Get Single Post
- **Endpoint**: `GET /api/posts/:postId`
- **Auth Required**: Bearer Token
- **Description**: Get specific post by ID

### Update Post
- **Endpoint**: `PUT /api/posts/:postId`
- **Auth Required**: Bearer Token
- **Description**: Update a post (owner only)

### Delete Post
- **Endpoint**: `DELETE /api/posts/:postId`
- **Auth Required**: Bearer Token
- **Description**: Delete a post (owner or admin only)

### Like Post
- **Endpoint**: `POST /api/posts/:postId/like`
- **Auth Required**: Bearer Token
- **Description**: Like a post

### Comment on Post
- **Endpoint**: `POST /api/posts/:postId/comments`
- **Auth Required**: Bearer Token
- **Description**: Add a comment to a post
- **Request**:
```json
{
  "content": "Great service!"
}
```

---

## Booking System

### Create Booking
- **Endpoint**: `POST /api/bookings`
- **Auth Required**: Bearer Token
- **Description**: Create a new booking for a service
- **Request**:
```json
{
  "serviceId": "service_post_id",
  "bookingDate": "2023-12-25",
  "startTime": "10:00",
  "endTime": "14:00",
  "extras": [
    {
      "name": "Transportation",
      "price": {
        "amount": 25,
        "currency": "USD"
      }
    }
  ],
  "specialRequests": "Pickup from hotel",
  "meetingPoint": "Central Park Entrance",
  "meetingPointLocation": {
    "coordinates": [-74.006, 40.7128],
    "address": "Central Park Entrance, New York"
  }
}
```

### Get User Bookings
- **Endpoint**: `GET /api/bookings`
- **Auth Required**: Bearer Token
- **Description**: Get all bookings for the current user
- **Query Parameters**:
  - `status` - Filter by booking status
  - `type` - "upcoming", "past", "all"

### Get Booking Details
- **Endpoint**: `GET /api/bookings/:bookingId`
- **Auth Required**: Bearer Token
- **Description**: Get specific booking details

### Update Booking Status
- **Endpoint**: `PUT /api/bookings/:bookingId/status`
- **Auth Required**: Bearer Token
- **Description**: Update booking status (service provider only)
- **Request**:
```json
{
  "status": "confirmed"
}
```

### Cancel Booking
- **Endpoint**: `PUT /api/bookings/:bookingId/cancel`
- **Auth Required**: Bearer Token
- **Description**: Cancel a booking
- **Request**:
```json
{
  "reason": "Personal reasons"
}
```

### Submit Review
- **Endpoint**: `POST /api/bookings/:bookingId/review`
- **Auth Required**: Bearer Token
- **Description**: Submit a review for a completed booking
- **Request**:
```json
{
  "rating": 5,
  "comment": "Excellent service!"
}
```

---

## Trip Planning

### Plan Trip
- **Endpoint**: `POST /api/trips/plan`
- **Auth Required**: Bearer Token
- **Description**: Plan a trip with start/end points and get recommendations
- **Request**:
```json
{
  "origin": {
    "coordinates": [-74.006, 40.7128],
    "address": "Times Square, New York"
  },
  "destination": {
    "coordinates": [-73.935242, 40.712776],
    "address": "Brooklyn Bridge, New York"
  },
  "startDate": "2023-12-25",
  "endDate": "2023-12-27",
  "travelers": 2,
  "interests": ["food", "culture", "nature"]
}
```

### Get Recommended Services
- **Endpoint**: `GET /api/trips/:tripId/services`
- **Auth Required**: Bearer Token
- **Description**: Get recommended services along the planned route

### Save Trip
- **Endpoint**: `POST /api/trips/save`
- **Auth Required**: Bearer Token
- **Description**: Save a trip plan to user account

### Get Saved Trips
- **Endpoint**: `GET /api/trips/saved`
- **Auth Required**: Bearer Token
- **Description**: Get all saved trips for the user

---

## Services Marketplace

### Get Services
- **Endpoint**: `GET /api/services`
- **Auth Required**: Bearer Token
- **Description**: Search and filter services
- **Query Parameters**:
  - `category` - Service category (rent, tour_guide, accommodation, etc.)
  - `location` - Location to search around
  - `radius` - Search radius in km
  - `minPrice` - Minimum price
  - `maxPrice` - Maximum price
  - `rating` - Minimum rating
  - `availability` - Date range for availability

### Get Service Details
- **Endpoint**: `GET /api/services/:serviceId`
- **Auth Required**: Bearer Token
- **Description**: Get detailed information about a service

### Create Service
- **Endpoint**: `POST /api/services`
- **Auth Required**: Bearer Token
- **Description**: Create a new service listing
- **Request**:
```json
{
  "title": "Car Rental",
  "description": "Clean sedan available for rent",
  "category": "rent",
  "subCategory": "vehicle",
  "price": {
    "amount": 45,
    "currency": "USD",
    "duration": "per_day"
  },
  "location": {
    "coordinates": [-74.006, 40.7128],
    "address": "Downtown, New York"
  },
  "availability": [
    {
      "startDate": "2023-12-01",
      "endDate": "2023-12-31"
    }
  ],
  "images": ["car_image_url"],
  "vehicleType": "sedan",
  "seats": 4
}
```

---

## Messaging System

### Get Conversations
- **Endpoint**: `GET /api/messages/conversations`
- **Auth Required**: Bearer Token
- **Description**: Get list of conversations

### Get Conversation Messages
- **Endpoint**: `GET /api/messages/conversation/:userId`
- **Auth Required**: Bearer Token
- **Description**: Get messages with a specific user

### Send Message
- **Endpoint**: `POST /api/messages`
- **Auth Required**: Bearer Token
- **Description**: Send a message to another user
- **Request**:
```json
{
  "toUserId": "recipient_user_id",
  "content": "Hello! Are you available for the tour?",
  "type": "text"
}
```

### Mark Messages as Read
- **Endpoint**: `PUT /api/messages/read/:conversationId`
- **Auth Required**: Bearer Token
- **Description**: Mark messages in a conversation as read

---

## Admin Panel

### Get Dashboard Stats
- **Endpoint**: `GET /api/admin/dashboard`
- **Auth Required**: Bearer Token (Admin role)
- **Description**: Get platform statistics and metrics

### Manage Posts
- **Endpoint**: `GET /api/admin/posts`
- **Auth Required**: Bearer Token (Admin/Moderator role)
- **Description**: Get posts for moderation
- **Query Parameters**:
  - `status` - Filter by status (pending, approved, rejected)
  - `type` - Filter by post type

### Approve/Reject Post
- **Endpoint**: `PUT /api/admin/posts/:postId/status`
- **Auth Required**: Bearer Token (Admin/Moderator role)
- **Description**: Approve or reject a post
- **Request**:
```json
{
  "status": "approved",
  "reason": "Content is appropriate and follows guidelines"
}
```

### Manage Users
- **Endpoint**: `GET /api/admin/users`
- **Auth Required**: Bearer Token (Admin role)
- **Description**: Get list of users with filters
- **Query Parameters**:
  - `role` - Filter by user role
  - `status` - Filter by account status
  - `dateRange` - Filter by join date

### Ban User
- **Endpoint**: `PUT /api/admin/users/:userId/ban`
- **Auth Required**: Bearer Token (Admin role)
- **Description**: Ban a user account
- **Request**:
```json
{
  "reason": "Violated terms of service",
  "duration": "permanent" // or number of days
}
```

### Create Announcement
- **Endpoint**: `POST /api/admin/announcements`
- **Auth Required**: Bearer Token (Admin role)
- **Description**: Create a platform announcement
- **Request**:
```json
{
  "title": "New Feature Launch",
  "content": "We're excited to announce our new trip planning feature!",
  "priority": "high",
  "expiresAt": "2023-12-31T23:59:59Z"
}
```

---

## Notifications

### Get User Notifications
- **Endpoint**: `GET /api/notifications`
- **Auth Required**: Bearer Token
- **Description**: Get user's notifications
- **Query Parameters**:
  - `readStatus` - Filter by read status
  - `type` - Filter by notification type

### Mark Notification as Read
- **Endpoint**: `PUT /api/notifications/:notificationId/read`
- **Auth Required**: Bearer Token
- **Description**: Mark a notification as read

### Mark All as Read
- **Endpoint**: `PUT /api/notifications/mark-all-read`
- **Auth Required**: Bearer Token
- **Description**: Mark all notifications as read

### Subscribe to Push Notifications
- **Endpoint**: `POST /api/notifications/subscribe`
- **Auth Required**: Bearer Token
- **Description**: Subscribe to push notifications
- **Request**:
```json
{
  "deviceToken": "push_notification_device_token",
  "platform": "ios" // or android
}
```