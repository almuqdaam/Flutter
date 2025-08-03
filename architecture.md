# Logis MVP Architecture & Technology Stack

## 1. Technology Stack Selection

### Mobile App Development
- **Framework**: Flutter
  - *Rationale*: Cross-platform development for Android, iOS, and Harmony OS with a single codebase
  - *Benefits*: Fast development, native-like performance, hot reload for rapid iteration
  - *Language*: Dart

### Backend
- **Framework**: Firebase
  - *Rationale*: Serverless architecture for rapid MVP development
  - *Components*:
    - Firebase Authentication (user registration)
    - Cloud Firestore (database)
    - Firebase Storage (images)
    - Firebase Cloud Functions (business logic)
    - Firebase Hosting (admin panel)

### Maps & Location
- **Service**: Google Maps API
  - *Features*: Location tracking, distance calculation, ETA

## 2. System Architecture

### High-Level Architecture
```
┌─────────────────┐     ┌─────────────────┐     ┌─────────────────┐
│                 │     │                 │     │                 │
│  Mobile Client  │◄───►│  Firebase APIs  │◄───►│  Admin Portal   │
│  (Flutter App)  │     │  (Backend)      │     │  (Web-based)    │
│                 │     │                 │     │                 │
└─────────────────┘     └─────────────────┘     └─────────────────┘
        ▲                       ▲                       ▲
        │                       │                       │
        ▼                       ▼                       ▼
┌─────────────────┐     ┌─────────────────┐     ┌─────────────────┐
│                 │     │                 │     │                 │
│  Google Maps    │     │  Firebase       │     │  Push           │
│  API            │     │  Storage        │     │  Notifications  │
│                 │     │                 │     │                 │
└─────────────────┘     └─────────────────┘     └─────────────────┘
```

## 3. Database Schema

### Collections

#### Users
```
users {
  uid: string (primary key)
  name: string
  email: string
  phone: string
  address: {
    latitude: number
    longitude: number
    formattedAddress: string
  }
  profileImage: string (URL)
  createdAt: timestamp
  lastLogin: timestamp
}
```

#### Service Providers
```
serviceProviders {
  id: string (primary key)
  name: string
  serviceType: string (enum: "gas", "water", "sewage", "moving")
  phone: string
  email: string
  description: string
  rating: number
  totalRatings: number
  isAvailable: boolean
  coverageArea: {
    latitude: number
    longitude: number
    radiusKm: number
  }
  pricing: {
    basePrice: number
    currency: string
    pricePerKm: number (optional)
    pricePerUnit: number (optional)
  }
  images: [string] (URLs)
  createdAt: timestamp
  updatedAt: timestamp
}
```

#### Bookings
```
bookings {
  id: string (primary key)
  userId: string (foreign key)
  providerId: string (foreign key)
  serviceType: string (enum: "gas", "water", "sewage", "moving")
  status: string (enum: "pending", "accepted", "in_progress", "completed", "cancelled")
  location: {
    latitude: number
    longitude: number
    formattedAddress: string
  }
  scheduledTime: timestamp (optional)
  createdAt: timestamp
  acceptedAt: timestamp (optional)
  completedAt: timestamp (optional)
  cancelledAt: timestamp (optional)
  amount: number
  currency: string
  notes: string (optional)
}
```

#### Reviews
```
reviews {
  id: string (primary key)
  bookingId: string (foreign key)
  userId: string (foreign key)
  providerId: string (foreign key)
  rating: number (1-5)
  comment: string
  createdAt: timestamp
}
```

## 4. API Endpoints

### Authentication
- `POST /auth/register` - Register new user
- `POST /auth/login` - User login
- `POST /auth/logout` - User logout
- `GET /auth/user` - Get current user

### Service Providers
- `GET /providers` - List all providers (with filters)
- `GET /providers/{id}` - Get provider details
- `GET /providers/nearby` - Get nearby providers

### Bookings
- `POST /bookings` - Create new booking
- `GET /bookings` - List user bookings
- `GET /bookings/{id}` - Get booking details
- `PUT /bookings/{id}/cancel` - Cancel booking
- `PUT /bookings/{id}/complete` - Complete booking

### Reviews
- `POST /reviews` - Create new review
- `GET /providers/{id}/reviews` - Get provider reviews

## 5. Core Features Implementation

### User Authentication
- Registration with email/phone
- Login with email/password
- Profile management

### Service Provider Listings
- Categorized listings (gas, water, sewage, moving)
- Search and filter functionality
- Provider details view
- Ratings and reviews

### Booking System
- Service selection
- Location selection
- Booking confirmation
- Booking status tracking
- Booking history

## 6. Future Scalability Considerations

- Payment gateway integration
- Real-time tracking
- Push notifications
- Chat functionality
- Analytics dashboard
- Multi-language support

This architecture is designed to support rapid MVP development while allowing for future scalability and feature expansion.
