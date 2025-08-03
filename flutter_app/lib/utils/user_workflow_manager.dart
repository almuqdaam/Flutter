import 'package:flutter/material.dart';
import '../models/user.dart';
import '../config/theme.dart';
import '../utils/constants.dart';

class UserWorkflowManager {
  // Singleton pattern
  static final UserWorkflowManager _instance = UserWorkflowManager._internal();
  factory UserWorkflowManager() => _instance;
  UserWorkflowManager._internal();
  
  // Navigation methods for user flows
  void navigateToLogin(BuildContext context) {
    Navigator.pushNamedAndRemoveUntil(
      context,
      '/login',
      (route) => false,
    );
  }
  
  void navigateToRegister(BuildContext context) {
    Navigator.pushNamed(
      context,
      '/register',
    );
  }
  
  void navigateToForgotPassword(BuildContext context) {
    Navigator.pushNamed(
      context,
      '/forgot-password',
    );
  }
  
  void navigateToHome(BuildContext context) {
    Navigator.pushNamedAndRemoveUntil(
      context,
      '/home',
      (route) => false,
    );
  }
  
  void navigateToEditProfile(BuildContext context) {
    Navigator.pushNamed(
      context,
      '/edit-profile',
    );
  }
  
  void navigateToSettings(BuildContext context) {
    Navigator.pushNamed(
      context,
      '/settings',
    );
  }
  
  // Error handling for user flows
  void handleAuthError(BuildContext context, String errorMessage) {
    ScaffoldMessenger.of(context).showSnackBar(
      SnackBar(
        content: Text(errorMessage),
        backgroundColor: Colors.red,
        duration: Duration(seconds: 3),
      ),
    );
  }
  
  // User data validation
  bool validateUserData(User user) {
    return user.name.isNotEmpty && 
           user.email.isNotEmpty && 
           user.phone.isNotEmpty;
  }
  
  bool validatePassword(String password) {
    // Password must be at least 8 characters long
    // and contain at least one letter and one number
    return password.length >= 8 && 
           password.contains(RegExp(r'[A-Za-z]')) && 
           password.contains(RegExp(r'[0-9]'));
  }
  
  bool validateEmail(String email) {
    // Simple email validation
    return RegExp(r'^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$').hasMatch(email);
  }
  
  bool validatePhone(String phone) {
    // Simple phone validation for Oman numbers
    return RegExp(r'^\+968\s?[0-9]{4}\s?[0-9]{4}$').hasMatch(phone) || 
           RegExp(r'^[0-9]{8}$').hasMatch(phone);
  }
  
  // Get mock user for testing
  User getMockUser() {
    return User(
      uid: 'user1',
      name: 'Ahmed Al Balushi',
      email: 'ahmed@example.com',
      phone: '+968 1234 5678',
      address: Address(
        latitude: 23.5880,
        longitude: 58.3829,
        formattedAddress: 'Al Khuwair, Muscat, Oman',
      ),
      createdAt: DateTime.now().subtract(Duration(days: 30)),
    );
  }
}
