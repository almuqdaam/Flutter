# Logis MVP - Flutter Application

This repository contains the complete code structure for the Logis MVP mobile application. The app provides a platform for connecting users with essential service providers including gas delivery, water trucks, sewage services, and furniture movers.

## Project Structure

```
logis_app/
├── android/                 # Android-specific files
├── ios/                     # iOS-specific files
├── lib/                     # Dart source code
│   ├── config/              # App configuration
│   ├── constants/           # App constants
│   ├── models/              # Data models
│   ├── screens/             # UI screens
│   ├── services/            # Business logic and API services
│   ├── utils/               # Utility functions
│   ├── widgets/             # Reusable UI components
│   └── main.dart            # App entry point
├── assets/                  # Static assets
│   ├── fonts/               # Custom fonts
│   ├── images/              # Image assets
│   └── icons/               # Icon assets
├── test/                    # Unit and widget tests
└── pubspec.yaml             # Dependencies and app metadata
```

## Features

- User registration and authentication
- Service provider listings for all four categories
- Booking system for requesting services
- User profile management
- Booking history and status tracking

## Setup Instructions

1. **Prerequisites**
   - Flutter SDK (latest stable version)
   - Android Studio or Xcode
   - Firebase account

2. **Firebase Setup**
   - Create a new Firebase project
   - Enable Authentication, Firestore, and Storage
   - Download and add the `google-services.json` (Android) and `GoogleService-Info.plist` (iOS) files

3. **Installation**
   ```bash
   # Clone the repository
   git clone <repository-url>
   
   # Navigate to the project directory
   cd logis_app
   
   # Install dependencies
   flutter pub get
   
   # Run the app
   flutter run
   ```

## Dependencies

The app uses the following key dependencies:

- `firebase_core`, `firebase_auth`, `cloud_firestore` - Firebase integration
- `provider` - State management
- `google_maps_flutter` - Maps and location services
- `flutter_svg` - SVG rendering
- `http` - API requests
- `shared_preferences` - Local storage
- `intl` - Internationalization and formatting

## Implementation Guide

1. **Authentication**
   - Implement the authentication screens using the provided UI components
   - Connect to Firebase Authentication for user management

2. **Service Provider Listings**
   - Populate the service provider data in Firestore
   - Implement the listing screens with filtering and search functionality

3. **Booking System**
   - Implement the booking flow screens
   - Connect to Firestore for storing booking data

4. **Testing**
   - Run the provided tests to ensure functionality
   - Test on multiple devices and screen sizes

## Customization

- Update the color scheme in `lib/constants/colors.dart`
- Modify the app theme in `lib/config/theme.dart`
- Replace placeholder images in the `assets/images/` directory

## License

This project is licensed under the MIT License - see the LICENSE file for details.
