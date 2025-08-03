import 'package:flutter/material.dart';
import 'package:cloud_firestore/cloud_firestore.dart';
import '../models/service_provider.dart';
import '../models/booking.dart';

class ProviderService extends ChangeNotifier {
  final FirebaseFirestore _firestore = FirebaseFirestore.instance;
  
  // State variables
  List<ServiceProvider> _providers = [];
  ServiceProvider? _selectedProvider;
  bool _isLoading = false;
  String? _error;
  
  // Getters
  List<ServiceProvider> get providers => _providers;
  ServiceProvider? get selectedProvider => _selectedProvider;
  bool get isLoading => _isLoading;
  String? get error => _error;
  
  // Get all service providers
  Future<void> getAllProviders() async {
    try {
      _isLoading = true;
      _error = null;
      notifyListeners();
      
      final QuerySnapshot snapshot = await _firestore
          .collection('serviceProviders')
          .get();
      
      _providers = snapshot.docs
          .map((doc) => ServiceProvider.fromMap(doc.data() as Map<String, dynamic>))
          .toList();
      
      _isLoading = false;
      notifyListeners();
    } catch (e) {
      _error = e.toString();
      _isLoading = false;
      notifyListeners();
    }
  }
  
  // Get providers by service type
  Future<void> getProvidersByType(ServiceType type) async {
    try {
      _isLoading = true;
      _error = null;
      notifyListeners();
      
      final QuerySnapshot snapshot = await _firestore
          .collection('serviceProviders')
          .where('serviceType', isEqualTo: type.toString().split('.').last)
          .get();
      
      _providers = snapshot.docs
          .map((doc) => ServiceProvider.fromMap(doc.data() as Map<String, dynamic>))
          .toList();
      
      _isLoading = false;
      notifyListeners();
    } catch (e) {
      _error = e.toString();
      _isLoading = false;
      notifyListeners();
    }
  }
  
  // Get nearby providers
  Future<void> getNearbyProviders(double latitude, double longitude, double radiusKm) async {
    try {
      _isLoading = true;
      _error = null;
      notifyListeners();
      
      // This is a simplified version. In a real app, you would use geohashing or
      // a more sophisticated approach for location-based queries
      final QuerySnapshot snapshot = await _firestore
          .collection('serviceProviders')
          .get();
      
      final List<ServiceProvider> allProviders = snapshot.docs
          .map((doc) => ServiceProvider.fromMap(doc.data() as Map<String, dynamic>))
          .toList();
      
      // Filter providers based on distance
      _providers = allProviders.where((provider) {
        final double distance = _calculateDistance(
          latitude, 
          longitude, 
          provider.coverageArea.latitude, 
          provider.coverageArea.longitude
        );
        return distance <= radiusKm;
      }).toList();
      
      _isLoading = false;
      notifyListeners();
    } catch (e) {
      _error = e.toString();
      _isLoading = false;
      notifyListeners();
    }
  }
  
  // Get provider by ID
  Future<void> getProviderById(String providerId) async {
    try {
      _isLoading = true;
      _error = null;
      notifyListeners();
      
      final DocumentSnapshot doc = await _firestore
          .collection('serviceProviders')
          .doc(providerId)
          .get();
      
      if (doc.exists) {
        _selectedProvider = ServiceProvider.fromMap(doc.data() as Map<String, dynamic>);
      } else {
        _error = 'Provider not found';
      }
      
      _isLoading = false;
      notifyListeners();
    } catch (e) {
      _error = e.toString();
      _isLoading = false;
      notifyListeners();
    }
  }
  
  // Set selected provider
  void setSelectedProvider(ServiceProvider provider) {
    _selectedProvider = provider;
    notifyListeners();
  }
  
  // Clear selected provider
  void clearSelectedProvider() {
    _selectedProvider = null;
    notifyListeners();
  }
  
  // Helper method to calculate distance between two coordinates
  // This is a simplified version using the Haversine formula
  double _calculateDistance(double lat1, double lon1, double lat2, double lon2) {
    const double p = 0.017453292519943295; // Math.PI / 180
    const double earthRadiusKm = 6371.0;
    
    final double a = 0.5 - 
        (((lat2 - lat1) * p) / 2).cos() / 2 + 
        ((lat1 * p).cos() * (lat2 * p).cos() * (1 - ((lon2 - lon1) * p).cos())) / 2;
    
    return 2 * earthRadiusKm * (a * 0.5).asin();
  }
  
  // Clear error
  void clearError() {
    _error = null;
    notifyListeners();
  }
}
