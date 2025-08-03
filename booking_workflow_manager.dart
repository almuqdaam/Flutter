import 'package:flutter/material.dart';
import '../models/booking.dart';
import '../config/theme.dart';
import '../utils/constants.dart';

class BookingWorkflowManager {
  // Singleton pattern
  static final BookingWorkflowManager _instance = BookingWorkflowManager._internal();
  factory BookingWorkflowManager() => _instance;
  BookingWorkflowManager._internal();
  
  // Navigation methods for booking flows
  void navigateToBookingConfirmation(BuildContext context, Location location) {
    Navigator.pushNamed(
      context,
      '/booking-confirmation',
      arguments: location,
    );
  }
  
  void navigateToBookingSuccess(BuildContext context, Booking booking) {
    Navigator.pushNamedAndRemoveUntil(
      context,
      '/booking-success',
      (route) => false,
      arguments: booking,
    );
  }
  
  void navigateToBookingDetails(BuildContext context, Booking booking) {
    Navigator.pushNamed(
      context,
      '/booking-details',
      arguments: booking,
    );
  }
  
  // Error handling for booking flows
  void handleBookingError(BuildContext context, String errorMessage) {
    ScaffoldMessenger.of(context).showSnackBar(
      SnackBar(
        content: Text(errorMessage),
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
  
  // Booking data validation
  bool validateBookingData(Booking booking) {
    return booking.providerId.isNotEmpty && 
           booking.userId.isNotEmpty && 
           booking.amount > 0;
  }
  
  // Get mock bookings for testing
  List<Booking> getMockBookings() {
    final DateTime now = DateTime.now();
    
    return [
      Booking(
        id: '1',
        userId: 'user1',
        providerId: 'provider1',
        serviceType: ServiceType.gas,
        status: BookingStatus.completed,
        location: Location(
          latitude: 23.5880,
          longitude: 58.3829,
          formattedAddress: 'Al Khuwair, Muscat, Oman',
        ),
        amount: 7.5,
        currency: 'OMR',
        createdAt: now.subtract(Duration(days: 5)),
        acceptedAt: now.subtract(Duration(days: 5, hours: 1)),
        completedAt: now.subtract(Duration(days: 5, hours: 2)),
        cancelledAt: null,
        scheduledTime: null,
        notes: 'Please bring 2 gas cylinders',
      ),
      Booking(
        id: '2',
        userId: 'user1',
        providerId: 'provider2',
        serviceType: ServiceType.water,
        status: BookingStatus.pending,
        location: Location(
          latitude: 23.6100,
          longitude: 58.4000,
          formattedAddress: 'Ghubra, Muscat, Oman',
        ),
        amount: 25.0,
        currency: 'OMR',
        createdAt: now.subtract(Duration(hours: 3)),
        acceptedAt: null,
        completedAt: null,
        cancelledAt: null,
        scheduledTime: now.add(Duration(days: 1)),
        notes: 'Need water delivery for a 3-bedroom house',
      ),
      Booking(
        id: '3',
        userId: 'user1',
        providerId: 'provider3',
        serviceType: ServiceType.sewage,
        status: BookingStatus.cancelled,
        location: Location(
          latitude: 23.5950,
          longitude: 58.4100,
          formattedAddress: 'Qurum, Muscat, Oman',
        ),
        amount: 35.0,
        currency: 'OMR',
        createdAt: now.subtract(Duration(days: 2)),
        acceptedAt: now.subtract(Duration(days: 2, hours: 1)),
        completedAt: null,
        cancelledAt: now.subtract(Duration(days: 1)),
        scheduledTime: null,
        notes: null,
      ),
      Booking(
        id: '4',
        userId: 'user1',
        providerId: 'provider4',
        serviceType: ServiceType.moving,
        status: BookingStatus.accepted,
        location: Location(
          latitude: 23.6050,
          longitude: 58.3900,
          formattedAddress: 'Madinat Qaboos, Muscat, Oman',
        ),
        amount: 50.0,
        currency: 'OMR',
        createdAt: now.subtract(Duration(days: 1)),
        acceptedAt: now.subtract(Duration(hours: 12)),
        completedAt: null,
        cancelledAt: null,
        scheduledTime: now.add(Duration(days: 2)),
        notes: 'Moving from a 2-bedroom apartment to a villa',
      ),
    ];
  }
}
