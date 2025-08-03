import 'package:flutter/material.dart';
import '../models/service_provider.dart';
import '../config/theme.dart';
import '../utils/constants.dart';

class ProviderWorkflowManager {
  // Singleton pattern
  static final ProviderWorkflowManager _instance = ProviderWorkflowManager._internal();
  factory ProviderWorkflowManager() => _instance;
  ProviderWorkflowManager._internal();
  
  // Navigation methods for provider flows
  void navigateToServiceCategory(BuildContext context, ServiceType type) {
    Navigator.pushNamed(
      context,
      '/service-category',
      arguments: type,
    );
  }
  
  void navigateToProviderDetails(BuildContext context, ServiceProvider provider) {
    Navigator.pushNamed(
      context,
      '/provider-details',
      arguments: provider,
    );
  }
  
  void navigateToLocationSelection(BuildContext context, ServiceProvider provider) {
    Navigator.pushNamed(
      context,
      '/location-selection',
      arguments: provider,
    );
  }
  
  // Error handling for provider flows
  void handleProviderError(BuildContext context, String errorMessage) {
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
  
  // Provider data validation
  bool validateProviderData(ServiceProvider provider) {
    return provider.name.isNotEmpty && 
           provider.phone.isNotEmpty && 
           provider.email.isNotEmpty && 
           provider.description.isNotEmpty;
  }
  
  // Get mock providers for testing
  List<ServiceProvider> getMockProviders(ServiceType type) {
    final DateTime now = DateTime.now();
    
    return [
      ServiceProvider(
        id: '1',
        name: 'Oman Gas Services',
        serviceType: ServiceType.gas,
        phone: '+968 1234 5678',
        email: 'info@omangasservices.com',
        description: 'Fast and reliable gas delivery service across Muscat. We provide both residential and commercial gas cylinders with prompt delivery.',
        rating: 4.8,
        totalRatings: 120,
        isAvailable: true,
        coverageArea: CoverageArea(
          latitude: 23.5880,
          longitude: 58.3829,
          radiusKm: 15.0,
        ),
        pricing: Pricing(
          basePrice: 5.0,
          currency: 'OMR',
          pricePerKm: 0.5,
          pricePerUnit: null,
        ),
        images: [],
        createdAt: now.subtract(Duration(days: 100)),
        updatedAt: now.subtract(Duration(days: 5)),
      ),
      ServiceProvider(
        id: '2',
        name: 'Muscat Water Supply',
        serviceType: ServiceType.water,
        phone: '+968 2345 6789',
        email: 'info@muscatwater.com',
        description: 'Clean and fresh water delivery for homes and businesses. Our tankers are regularly inspected and maintained to ensure water quality.',
        rating: 4.5,
        totalRatings: 85,
        isAvailable: true,
        coverageArea: CoverageArea(
          latitude: 23.6100,
          longitude: 58.4000,
          radiusKm: 20.0,
        ),
        pricing: Pricing(
          basePrice: 15.0,
          currency: 'OMR',
          pricePerKm: 0.8,
          pricePerUnit: 5.0,
        ),
        images: [],
        createdAt: now.subtract(Duration(days: 150)),
        updatedAt: now.subtract(Duration(days: 10)),
      ),
      ServiceProvider(
        id: '3',
        name: 'Oman Sewage Solutions',
        serviceType: ServiceType.sewage,
        phone: '+968 3456 7890',
        email: 'info@omansewage.com',
        description: 'Professional sewage services for residential and commercial properties. We use modern equipment and follow environmental guidelines.',
        rating: 4.3,
        totalRatings: 65,
        isAvailable: true,
        coverageArea: CoverageArea(
          latitude: 23.5950,
          longitude: 58.4100,
          radiusKm: 18.0,
        ),
        pricing: Pricing(
          basePrice: 25.0,
          currency: 'OMR',
          pricePerKm: 1.0,
          pricePerUnit: null,
        ),
        images: [],
        createdAt: now.subtract(Duration(days: 200)),
        updatedAt: now.subtract(Duration(days: 15)),
      ),
      ServiceProvider(
        id: '4',
        name: 'Muscat Movers',
        serviceType: ServiceType.moving,
        phone: '+968 4567 8901',
        email: 'info@muscatmovers.com',
        description: 'Reliable furniture moving and relocation services. Our team is experienced in handling all types of furniture with care.',
        rating: 4.7,
        totalRatings: 95,
        isAvailable: true,
        coverageArea: CoverageArea(
          latitude: 23.6050,
          longitude: 58.3900,
          radiusKm: 25.0,
        ),
        pricing: Pricing(
          basePrice: 30.0,
          currency: 'OMR',
          pricePerKm: 1.2,
          pricePerUnit: null,
        ),
        images: [],
        createdAt: now.subtract(Duration(days: 180)),
        updatedAt: now.subtract(Duration(days: 8)),
      ),
    ].where((provider) => provider.serviceType == type).toList();
  }
}
