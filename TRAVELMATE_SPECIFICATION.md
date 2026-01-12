# TravelMate Platform Specification

## 🎯 Executive Summary

TravelMate is a comprehensive multi-role travel platform designed to connect travelers with locals, service providers, event organizers, and merchants. The platform enables seamless trip planning, service discovery, booking management, and social interactions through role-based dashboards and interactive features.

## 🏗️ Technical Architecture

### Backend Stack
- **Runtime**: Node.js v18+
- **Framework**: Express.js
- **Database**: MongoDB (with Mongoose ODM)
- **Authentication**: JWT with refresh tokens
- **Payment Processing**: Stripe API
- **Maps Integration**: Google Maps API
- **Real-time Communication**: Socket.io
- **File Storage**: Cloudinary or AWS S3

### Frontend Stack
- **Framework**: React.js with Vite
- **State Management**: React Query (TanStack Query) for server state, React Context for UI state
- **Routing**: React Router v6
- **Styling**: Styled Components or Tailwind CSS
- **Forms**: React Hook Form
- **Maps**: React Leaflet or Google Maps React
- **Icons**: React Icons

### Mobile App
- **Technology**: React Native or Flutter
- **Platform Support**: iOS 14+, Android 10+

## 📋 Detailed Feature Specifications

### 1. Authentication & User Management

#### Registration Flow
- Email/phone and password registration
- Role selection during registration (Traveler/Local/Service Provider/Volunteer/Merchant)
- Email verification workflow
- Phone number verification (SMS)

#### Login Flow
- Secure JWT-based authentication
- Session management
- Remember me functionality
- Forgot password with email reset link

#### User Roles & Permissions
| Role | Permissions |
|------|-------------|
| Traveler | Browse, book, post, comment, chat |
| Local/Service Provider | Post services, manage bookings, view inquiries, receive payments |
| Travel Partner | Create group trips, invite others, manage itineraries |
| Event Manager | Create & manage events, accept RSVPs, moderate attendance |
| Volunteer | Offer free services, join community projects |
| Merchant | Sell goods (jewelry, clothes, souvenirs), manage listings |
| Super Admin | Full access, user bans, system settings |
| Admin | Moderate posts, manage announcements, view analytics |
| Moderator | Review flagged content, approve/reject posts |

### 2. Dashboard Flows

#### Traveler Dashboard
- **Announcement Banner**: Tap to view details
- **News Feed**: Social-style posting with like, comment, share
- **My Activities**: Booked trips, joined events, rental history
- **Plan My Trip**: Opens interactive map
- **Search Services**: Filtered by category, price, rating, distance

#### Local Dashboard
- **Post Services**: Dynamic form based on service type
- **My Bookings**: View accepted/rejected bookings
- **Revenue & Payments**: Earnings summary
- **Request Feed**: Incoming service/event requests
- **Direct Messages**: Chat with travelers

#### Admin Panel
- **Dashboard**: Total posts, active users, new bookings
- **Manage Posts**: Filter by status (New, Need Approval, Approved, Rejected, On Hold)
- **Actions per post**: Verify, Edit, View, Delete
- **Manage Announcements**: Create, schedule, edit banners
- **Reporting**: Flagged content, user reports
- **Bookings**: All bookings, filter by status

### 3. Trip Planning Module

#### Interactive Map Features
- Google Maps API integration
- Auto-detect start point
- Destination search with suggestions
- Travel time estimation
- "Find Services Nearby" button
- Service results with clickable detailed views
- Price, availability, contact, and booking options

#### Trip Itinerary Builder
- Day-by-day planning
- Activity scheduling
- Budget tracking
- Interest-based recommendations
- Sharing with travel partners

### 4. Services Marketplace

#### Categories
- **Shopping**: Jewelry, ornaments, clothes (links to Merchet store)
- **Rent**: Vehicle, pet, house (dynamic forms)
- **Volunteer**: Community projects, joining events
- **Lost & Found**: District-wise search, integrates with external site

#### Filters
- Price range
- Rating (1-5 stars)
- Distance from location
- Category
- Availability dates

### 5. Social Feed & Post System

#### Post Creation
- Image upload (max 4 images)
- Optional caption
- Post types: Services, Search Partners, Join Rent, Event, Lost & Found
- Dynamic UI based on post type

#### Interactions
- Like, Comment, Share, Follow
- Moderation queue for admin approval
- Email/SMS notifications for RSVPs, bookings, messages

### 6. Booking & Payment System

#### Booking Process
- Calendar picker for date/time selection
- Toggle switches for extras (Transportation, Photography)
- Price breakdown: Experience, Transport, Tax, Total
- Secure payment gateway integration

#### Payment Processing
- Stripe/PayPal integration
- Secure checkout flow
- Success/failure page redirection
- Calendar integration for scheduling

#### Post-Booking Features
- "My Trips" section in dashboard
- Service reporting capability
- Feedback form with star rating and text review

## 📱 Mobile-First UI/UX Requirements

### Design System
- **Color Scheme**: Blues, whites, orange accents
- **Typography**: Sans-serif, readable fonts
- **Buttons**: Rounded corners, shadows, hover states
- **Responsive**: Mobile & tablet optimized
- **Accessibility**: Text contrast ≥ 4.5:1, tap area ≥ 44x44px, alt text for icons

### Usability Features
- Toast notifications for actions
- Inline validation messages
- Intuitive navigation
- Fast loading times
- Offline capability for essential features

## ⚙️ Non-Functional Requirements

### Performance
- API calls < 2 seconds
- Page load time < 3 seconds
- Image optimization and lazy loading

### Security
- Passwords hashed with bcrypt
- JWT authentication with proper expiration
- Input validation and sanitization
- Rate limiting to prevent abuse
- HTTPS enforcement

### Scalability
- Support 10,000+ concurrent users
- Horizontal scaling capabilities
- Database indexing for performance
- CDN for static assets

### Reliability
- 99% uptime SLA
- Automated backups
- Error monitoring and logging
- Graceful degradation

### Compatibility
- Android 10+ support
- iOS 14+ support
- Modern browsers (Chrome, Firefox, Safari, Edge)

### Localization
- English first
- Extendable for other languages
- Right-to-left language support ready

## 🔌 External Integrations

### Essential APIs
- **Google Maps API**: Trip planning and location services
- **Stripe/PayPal**: Payment processing
- **Calendar API**: iOS/Android calendar integration
- **External Lost & Found Portal**: District-wise item search (lostandfound.lk)

### Third-party Services
- **Cloudinary/AWS S3**: Image and file hosting
- **Twilio**: SMS verification and notifications
- **SendGrid/Mailgun**: Email notifications
- **Push Notification Service**: Real-time alerts

## 🧩 Data Models

### Users Collection
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
  }
}
```

### Posts Collection
```javascript
{
  _id: ObjectId,
  userId: ObjectId,       // Reference to User, required
  title: String,          // Required, max 100 chars
  description: String,    // Required, max 2000 chars
  type: String,           // Enum: service, search_partner, join_rent, event, lost_found
  category: String,       // Enum: shopping, rent, volunteer, event, lost_found, accommodation, tour_guide, transport
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
  }
}
```

### Bookings Collection
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
}
```

## 🛠️ Development Guidelines

### Code Standards
- Follow ESLint and Prettier configurations
- Use descriptive variable and function names
- Write JSDoc comments for functions
- Implement error boundaries in React
- Use TypeScript for better type safety

### Testing Strategy
- Unit tests for utility functions and components
- Integration tests for API endpoints
- End-to-end tests for critical user flows
- Use Jest for backend testing
- Use React Testing Library for frontend testing
- Implement continuous integration with automated tests

### Deployment Pipeline
- Docker containerization
- Environment-specific configurations
- Automated testing before deployment
- Blue-green deployment strategy
- Monitoring and alerting systems

## 🚀 Implementation Roadmap

### Phase 1: Foundation (Weeks 1-4)
- Setup project structure
- Implement authentication system
- Create basic user profiles
- Build core API endpoints
- Design database schema

### Phase 2: Core Features (Weeks 5-8)
- Develop dashboard interfaces
- Implement trip planning module
- Create services marketplace
- Build booking system
- Integrate payment processing

### Phase 3: Advanced Features (Weeks 9-12)
- Social feed and post system
- Messaging functionality
- Admin panel and moderation
- Mobile app development
- Performance optimization

### Phase 4: Polish & Deploy (Weeks 13-16)
- UI/UX refinement
- Comprehensive testing
- Security audit
- Production deployment
- Documentation completion

## 📊 Success Metrics

### Key Performance Indicators
- Monthly Active Users (MAU)
- Average Session Duration
- Conversion Rate (registration to first booking)
- Customer Satisfaction Score (CSAT)
- Revenue Growth
- Platform Uptime

### Analytics Implementation
- User behavior tracking
- Funnel analysis
- A/B testing framework
- Performance monitoring
- Error tracking

## 🤝 Conclusion

The TravelMate platform specification provides a comprehensive roadmap for developing a scalable, multi-role travel platform. With its focus on user experience, security, and performance, the platform is designed to connect travelers with local communities while providing valuable services to all stakeholders.

The modular architecture allows for future enhancements and scalability, while the detailed specifications ensure consistency across development teams. Regular reviews and updates to this specification will ensure the platform continues to meet evolving user needs and market demands.