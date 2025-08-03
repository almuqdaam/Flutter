import 'package:flutter/material.dart';
import '../config/theme.dart';
import '../config/routes.dart';
import '../utils/user_workflow_manager.dart';
import '../utils/provider_workflow_manager.dart';
import '../utils/booking_workflow_manager.dart';

class WorkflowIntegrationManager {
  // Singleton pattern
  static final WorkflowIntegrationManager _instance = WorkflowIntegrationManager._internal();
  factory WorkflowIntegrationManager() => _instance;
  WorkflowIntegrationManager._internal();
  
  // Managers
  final userWorkflow = UserWorkflowManager();
  final providerWorkflow = ProviderWorkflowManager();
  final bookingWorkflow = BookingWorkflowManager();
  
  // App initialization
  void initializeApp(BuildContext context) {
    // Check authentication status and navigate accordingly
    // For MVP, we'll just navigate to onboarding
    Navigator.pushReplacementNamed(context, AppRoutes.onboarding);
  }
  
  // Complete booking flow
  void startBookingFlow(BuildContext context, ServiceType serviceType) {
    // Navigate to service category screen
    providerWorkflow.navigateToServiceCategory(context, serviceType);
  }
  
  // Error handling
  void handleError(BuildContext context, String errorMessage, ErrorType errorType) {
    switch (errorType) {
      case ErrorType.auth:
        userWorkflow.handleAuthError(context, errorMessage);
        break;
      case ErrorType.booking:
        bookingWorkflow.handleBookingError(context, errorMessage);
        break;
      case ErrorType.provider:
        providerWorkflow.handleProviderError(context, errorMessage);
        break;
      case ErrorType.network:
        _handleNetworkError(context, errorMessage);
        break;
      case ErrorType.general:
      default:
        _handleGeneralError(context, errorMessage);
        break;
    }
  }
  
  // Network error handling
  void _handleNetworkError(BuildContext context, String errorMessage) {
    ScaffoldMessenger.of(context).showSnackBar(
      SnackBar(
        content: Text('Network error: $errorMessage'),
        backgroundColor: Colors.red,
        duration: Duration(seconds: 3),
        action: SnackBarAction(
          label: 'Retry',
          textColor: Colors.white,
          onPressed: () {
            // Retry logic would go here
          },
        ),
      ),
    );
  }
  
  // General error handling
  void _handleGeneralError(BuildContext context, String errorMessage) {
    ScaffoldMessenger.of(context).showSnackBar(
      SnackBar(
        content: Text(errorMessage),
        backgroundColor: Colors.red,
        duration: Duration(seconds: 3),
      ),
    );
  }
  
  // Logout flow
  Future<void> logout(BuildContext context) async {
    // Show confirmation dialog
    final bool? confirm = await showDialog<bool>(
      context: context,
      builder: (context) => AlertDialog(
        title: Text('Logout'),
        content: Text('Are you sure you want to logout?'),
        actions: [
          TextButton(
            onPressed: () => Navigator.pop(context, false),
            child: Text('Cancel'),
          ),
          TextButton(
            onPressed: () => Navigator.pop(context, true),
            child: Text('Logout'),
            style: TextButton.styleFrom(
              foregroundColor: Colors.red,
            ),
          ),
        ],
      ),
    );
    
    if (confirm == true) {
      // Navigate to login screen
      userWorkflow.navigateToLogin(context);
    }
  }
}

// Error types
enum ErrorType {
  auth,
  booking,
  provider,
  network,
  general,
}
