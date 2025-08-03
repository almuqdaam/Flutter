import 'package:flutter/material.dart';
import 'package:cloud_firestore/cloud_firestore.dart';
import '../models/booking.dart';
import '../models/service_provider.dart';
import '../models/user.dart' as app_models;

class BookingService extends ChangeNotifier {
  final FirebaseFirestore _firestore = FirebaseFirestore.instance;
  
  // State variables
  List<Booking> _bookings = [];
  Booking? _selectedBooking;
  bool _isLoading = false;
  String? _error;
  
  // Getters
  List<Booking> get bookings => _bookings;
  Booking? get selectedBooking => _selectedBooking;
  bool get isLoading => _isLoading;
  String? get error => _error;
  
  // Create a new booking
  Future<bool> createBooking({
    required String userId,
    required String providerId,
    required ServiceType serviceType,
    required Location location,
    DateTime? scheduledTime,
    required double amount,
    required String currency,
    String? notes,
  }) async {
    try {
      _isLoading = true;
      _error = null;
      notifyListeners();
      
      // Create a new document reference
      final DocumentReference bookingRef = _firestore.collection('bookings').doc();
      
      // Create booking object
      final Booking newBooking = Booking(
        id: bookingRef.id,
        userId: userId,
        providerId: providerId,
        serviceType: serviceType,
        status: BookingStatus.pending,
        location: location,
        scheduledTime: scheduledTime,
        createdAt: DateTime.now(),
        acceptedAt: null,
        completedAt: null,
        cancelledAt: null,
        amount: amount,
        currency: currency,
        notes: notes,
      );
      
      // Save to Firestore
      await bookingRef.set(newBooking.toMap());
      
      _selectedBooking = newBooking;
      _isLoading = false;
      notifyListeners();
      return true;
    } catch (e) {
      _error = e.toString();
      _isLoading = false;
      notifyListeners();
      return false;
    }
  }
  
  // Get user bookings
  Future<void> getUserBookings(String userId) async {
    try {
      _isLoading = true;
      _error = null;
      notifyListeners();
      
      final QuerySnapshot snapshot = await _firestore
          .collection('bookings')
          .where('userId', isEqualTo: userId)
          .orderBy('createdAt', descending: true)
          .get();
      
      _bookings = snapshot.docs
          .map((doc) => Booking.fromMap(doc.data() as Map<String, dynamic>))
          .toList();
      
      _isLoading = false;
      notifyListeners();
    } catch (e) {
      _error = e.toString();
      _isLoading = false;
      notifyListeners();
    }
  }
  
  // Get booking by ID
  Future<void> getBookingById(String bookingId) async {
    try {
      _isLoading = true;
      _error = null;
      notifyListeners();
      
      final DocumentSnapshot doc = await _firestore
          .collection('bookings')
          .doc(bookingId)
          .get();
      
      if (doc.exists) {
        _selectedBooking = Booking.fromMap(doc.data() as Map<String, dynamic>);
      } else {
        _error = 'Booking not found';
      }
      
      _isLoading = false;
      notifyListeners();
    } catch (e) {
      _error = e.toString();
      _isLoading = false;
      notifyListeners();
    }
  }
  
  // Cancel booking
  Future<bool> cancelBooking(String bookingId) async {
    try {
      _isLoading = true;
      _error = null;
      notifyListeners();
      
      // Get the booking
      final DocumentSnapshot doc = await _firestore
          .collection('bookings')
          .doc(bookingId)
          .get();
      
      if (!doc.exists) {
        _error = 'Booking not found';
        _isLoading = false;
        notifyListeners();
        return false;
      }
      
      final Booking booking = Booking.fromMap(doc.data() as Map<String, dynamic>);
      
      // Check if booking can be cancelled
      if (booking.status != BookingStatus.pending) {
        _error = 'Only pending bookings can be cancelled';
        _isLoading = false;
        notifyListeners();
        return false;
      }
      
      // Update booking status
      await _firestore
          .collection('bookings')
          .doc(bookingId)
          .update({
            'status': BookingStatus.cancelled.toString().split('.').last,
            'cancelledAt': DateTime.now(),
          });
      
      // Update local booking
      if (_selectedBooking?.id == bookingId) {
        _selectedBooking = _selectedBooking!.copyWith(
          status: BookingStatus.cancelled,
          cancelledAt: DateTime.now(),
        );
      }
      
      // Update bookings list
      _bookings = _bookings.map((b) {
        if (b.id == bookingId) {
          return b.copyWith(
            status: BookingStatus.cancelled,
            cancelledAt: DateTime.now(),
          );
        }
        return b;
      }).toList();
      
      _isLoading = false;
      notifyListeners();
      return true;
    } catch (e) {
      _error = e.toString();
      _isLoading = false;
      notifyListeners();
      return false;
    }
  }
  
  // Complete booking (for demo purposes)
  Future<bool> completeBooking(String bookingId) async {
    try {
      _isLoading = true;
      _error = null;
      notifyListeners();
      
      // Get the booking
      final DocumentSnapshot doc = await _firestore
          .collection('bookings')
          .doc(bookingId)
          .get();
      
      if (!doc.exists) {
        _error = 'Booking not found';
        _isLoading = false;
        notifyListeners();
        return false;
      }
      
      // Update booking status
      await _firestore
          .collection('bookings')
          .doc(bookingId)
          .update({
            'status': BookingStatus.completed.toString().split('.').last,
            'completedAt': DateTime.now(),
          });
      
      // Update local booking
      if (_selectedBooking?.id == bookingId) {
        _selectedBooking = _selectedBooking!.copyWith(
          status: BookingStatus.completed,
          completedAt: DateTime.now(),
        );
      }
      
      // Update bookings list
      _bookings = _bookings.map((b) {
        if (b.id == bookingId) {
          return b.copyWith(
            status: BookingStatus.completed,
            completedAt: DateTime.now(),
          );
        }
        return b;
      }).toList();
      
      _isLoading = false;
      notifyListeners();
      return true;
    } catch (e) {
      _error = e.toString();
      _isLoading = false;
      notifyListeners();
      return false;
    }
  }
  
  // Get active bookings
  List<Booking> getActiveBookings() {
    return _bookings.where((booking) => 
      booking.status == BookingStatus.pending || 
      booking.status == BookingStatus.accepted || 
      booking.status == BookingStatus.in_progress
    ).toList();
  }
  
  // Get completed bookings
  List<Booking> getCompletedBookings() {
    return _bookings.where((booking) => 
      booking.status == BookingStatus.completed
    ).toList();
  }
  
  // Get cancelled bookings
  List<Booking> getCancelledBookings() {
    return _bookings.where((booking) => 
      booking.status == BookingStatus.cancelled
    ).toList();
  }
  
  // Set selected booking
  void setSelectedBooking(Booking booking) {
    _selectedBooking = booking;
    notifyListeners();
  }
  
  // Clear selected booking
  void clearSelectedBooking() {
    _selectedBooking = null;
    notifyListeners();
  }
  
  // Clear error
  void clearError() {
    _error = null;
    notifyListeners();
  }
}
