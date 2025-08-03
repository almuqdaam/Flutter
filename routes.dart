import 'package:flutter/material.dart';

class AppRoutes {
  // Private constructor to prevent instantiation
  AppRoutes._();

  // Route names
  static const String splash = '/';
  static const String onboarding = '/onboarding';
  static const String login = '/login';
  static const String register = '/register';
  static const String forgotPassword = '/forgot-password';
  static const String home = '/home';
  static const String serviceCategory = '/service-category';
  static const String providerDetails = '/provider-details';
  static const String locationSelection = '/location-selection';
  static const String bookingConfirmation = '/booking-confirmation';
  static const String bookingSuccess = '/booking-success';
  static const String bookingsList = '/bookings-list';
  static const String bookingDetails = '/booking-details';
  static const String profile = '/profile';
  static const String editProfile = '/edit-profile';
  static const String settings = '/settings';

  // Route map
  static final Map<String, WidgetBuilder> routes = {
    splash: (context) => SplashScreen(),
    onboarding: (context) => OnboardingScreen(),
    login: (context) => LoginScreen(),
    register: (context) => RegisterScreen(),
    forgotPassword: (context) => ForgotPasswordScreen(),
    home: (context) => HomeScreen(),
    serviceCategory: (context) => ServiceCategoryScreen(),
    providerDetails: (context) => ProviderDetailsScreen(),
    locationSelection: (context) => LocationSelectionScreen(),
    bookingConfirmation: (context) => BookingConfirmationScreen(),
    bookingSuccess: (context) => BookingSuccessScreen(),
    bookingsList: (context) => BookingsListScreen(),
    bookingDetails: (context) => BookingDetailsScreen(),
    profile: (context) => ProfileScreen(),
    editProfile: (context) => EditProfileScreen(),
    settings: (context) => SettingsScreen(),
  };
}

// Import statements for all screens
// These are placeholders that will be replaced with actual imports
// when the screen files are created
class SplashScreen extends StatelessWidget {
  @override
  Widget build(BuildContext context) => Scaffold();
}

class OnboardingScreen extends StatelessWidget {
  @override
  Widget build(BuildContext context) => Scaffold();
}

class LoginScreen extends StatelessWidget {
  @override
  Widget build(BuildContext context) => Scaffold();
}

class RegisterScreen extends StatelessWidget {
  @override
  Widget build(BuildContext context) => Scaffold();
}

class ForgotPasswordScreen extends StatelessWidget {
  @override
  Widget build(BuildContext context) => Scaffold();
}

class HomeScreen extends StatelessWidget {
  @override
  Widget build(BuildContext context) => Scaffold();
}

class ServiceCategoryScreen extends StatelessWidget {
  @override
  Widget build(BuildContext context) => Scaffold();
}

class ProviderDetailsScreen extends StatelessWidget {
  @override
  Widget build(BuildContext context) => Scaffold();
}

class LocationSelectionScreen extends StatelessWidget {
  @override
  Widget build(BuildContext context) => Scaffold();
}

class BookingConfirmationScreen extends StatelessWidget {
  @override
  Widget build(BuildContext context) => Scaffold();
}

class BookingSuccessScreen extends StatelessWidget {
  @override
  Widget build(BuildContext context) => Scaffold();
}

class BookingsListScreen extends StatelessWidget {
  @override
  Widget build(BuildContext context) => Scaffold();
}

class BookingDetailsScreen extends StatelessWidget {
  @override
  Widget build(BuildContext context) => Scaffold();
}

class ProfileScreen extends StatelessWidget {
  @override
  Widget build(BuildContext context) => Scaffold();
}

class EditProfileScreen extends StatelessWidget {
  @override
  Widget build(BuildContext context) => Scaffold();
}

class SettingsScreen extends StatelessWidget {
  @override
  Widget build(BuildContext context) => Scaffold();
}
