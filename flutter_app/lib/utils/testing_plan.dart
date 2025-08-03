import 'package:flutter/material.dart';
import '../utils/constants.dart';

class TestingPlan {
  // Test cases for user registration and authentication
  static final List<TestCase> authenticationTests = [
    TestCase(
      name: 'User Registration - Valid Inputs',
      description: 'Test user registration with valid name, email, phone, and password',
      steps: [
        'Navigate to registration screen',
        'Enter valid name, email, phone, and password',
        'Submit registration form',
        'Verify successful registration and navigation to home screen'
      ],
      expectedResult: 'User should be registered successfully and navigated to home screen',
    ),
    TestCase(
      name: 'User Registration - Invalid Email',
      description: 'Test user registration with invalid email format',
      steps: [
        'Navigate to registration screen',
        'Enter valid name, invalid email, valid phone and password',
        'Submit registration form',
        'Verify error message for invalid email'
      ],
      expectedResult: 'Form should show validation error for email field',
    ),
    TestCase(
      name: 'User Login - Valid Credentials',
      description: 'Test user login with valid email and password',
      steps: [
        'Navigate to login screen',
        'Enter valid email and password',
        'Submit login form',
        'Verify successful login and navigation to home screen'
      ],
      expectedResult: 'User should be logged in successfully and navigated to home screen',
    ),
    TestCase(
      name: 'User Login - Invalid Credentials',
      description: 'Test user login with invalid email or password',
      steps: [
        'Navigate to login screen',
        'Enter invalid email or password',
        'Submit login form',
        'Verify error message for invalid credentials'
      ],
      expectedResult: 'Error message should be displayed for invalid credentials',
    ),
    TestCase(
      name: 'Forgot Password Flow',
      description: 'Test forgot password functionality',
      steps: [
        'Navigate to login screen',
        'Click on forgot password link',
        'Enter valid email',
        'Submit forgot password form',
        'Verify success message'
      ],
      expectedResult: 'Success message should be displayed for password reset email',
    ),
  ];

  // Test cases for service provider listings
  static final List<TestCase> providerListingTests = [
    TestCase(
      name: 'Service Category Selection',
      description: 'Test selection of different service categories',
      steps: [
        'Navigate to home screen',
        'Click on each service category (gas, water, sewage, movers)',
        'Verify navigation to respective service provider listings'
      ],
      expectedResult: 'Each category should show relevant service providers',
    ),
    TestCase(
      name: 'Provider Details View',
      description: 'Test viewing service provider details',
      steps: [
        'Navigate to a service category',
        'Click on a service provider',
        'Verify provider details are displayed correctly'
      ],
      expectedResult: 'Provider details should be displayed with all information',
    ),
    TestCase(
      name: 'Provider Filtering',
      description: 'Test filtering providers by rating and availability',
      steps: [
        'Navigate to a service category',
        'Apply filters for rating and availability',
        'Verify filtered results'
      ],
      expectedResult: 'Providers should be filtered according to selected criteria',
    ),
  ];

  // Test cases for booking system
  static final List<TestCase> bookingSystemTests = [
    TestCase(
      name: 'Create Booking - Immediate Service',
      description: 'Test creating a booking for immediate service',
      steps: [
        'Navigate to provider details',
        'Click on book now button',
        'Select current location',
        'Choose "As soon as possible" option',
        'Confirm booking',
        'Verify booking confirmation'
      ],
      expectedResult: 'Booking should be created successfully with pending status',
    ),
    TestCase(
      name: 'Create Booking - Scheduled Service',
      description: 'Test creating a booking for scheduled service',
      steps: [
        'Navigate to provider details',
        'Click on book now button',
        'Select current location',
        'Choose "Schedule for later" option',
        'Select date and time',
        'Confirm booking',
        'Verify booking confirmation'
      ],
      expectedResult: 'Scheduled booking should be created successfully with pending status',
    ),
    TestCase(
      name: 'View Booking Details',
      description: 'Test viewing booking details',
      steps: [
        'Navigate to bookings list',
        'Click on a booking',
        'Verify booking details are displayed correctly'
      ],
      expectedResult: 'Booking details should be displayed with all information',
    ),
    TestCase(
      name: 'Cancel Booking',
      description: 'Test cancelling a booking',
      steps: [
        'Navigate to booking details',
        'Click on cancel booking button',
        'Confirm cancellation',
        'Verify booking status is updated to cancelled'
      ],
      expectedResult: 'Booking should be cancelled and status updated',
    ),
  ];

  // Test cases for user profile and settings
  static final List<TestCase> profileSettingsTests = [
    TestCase(
      name: 'Edit User Profile',
      description: 'Test editing user profile information',
      steps: [
        'Navigate to profile screen',
        'Click on edit profile',
        'Update name, phone, and address',
        'Save changes',
        'Verify profile is updated'
      ],
      expectedResult: 'User profile should be updated with new information',
    ),
    TestCase(
      name: 'App Settings',
      description: 'Test app settings functionality',
      steps: [
        'Navigate to settings screen',
        'Toggle notifications setting',
        'Verify setting is saved'
      ],
      expectedResult: 'Settings should be saved and applied',
    ),
    TestCase(
      name: 'Logout',
      description: 'Test user logout functionality',
      steps: [
        'Navigate to settings screen',
        'Click on logout',
        'Confirm logout',
        'Verify navigation to login screen'
      ],
      expectedResult: 'User should be logged out and navigated to login screen',
    ),
  ];

  // Test cases for error handling and edge cases
  static final List<TestCase> errorHandlingTests = [
    TestCase(
      name: 'Network Error Handling',
      description: 'Test app behavior during network errors',
      steps: [
        'Disable network connection',
        'Attempt to perform network-dependent operations',
        'Verify error messages and retry options'
      ],
      expectedResult: 'App should display appropriate error messages with retry options',
    ),
    TestCase(
      name: 'Form Validation',
      description: 'Test form validation across the app',
      steps: [
        'Test all forms with invalid inputs',
        'Verify validation messages',
        'Test forms with valid inputs',
        'Verify successful submission'
      ],
      expectedResult: 'Forms should validate inputs and display appropriate messages',
    ),
    TestCase(
      name: 'Empty States',
      description: 'Test app behavior with empty data states',
      steps: [
        'Test screens with no data (e.g., no bookings, no providers)',
        'Verify empty state messages and UI'
      ],
      expectedResult: 'App should display appropriate empty state messages and UI',
    ),
  ];

  // Get all test cases
  static List<TestCase> getAllTestCases() {
    return [
      ...authenticationTests,
      ...providerListingTests,
      ...bookingSystemTests,
      ...profileSettingsTests,
      ...errorHandlingTests,
    ];
  }
}

// Test case model
class TestCase {
  final String name;
  final String description;
  final List<String> steps;
  final String expectedResult;
  bool isPassed = false;
  String? notes;

  TestCase({
    required this.name,
    required this.description,
    required this.steps,
    required this.expectedResult,
    this.notes,
  });
}
