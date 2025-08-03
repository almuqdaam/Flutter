import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import '../services/provider_service.dart';
import '../models/service_provider.dart';
import '../config/theme.dart';
import '../config/routes.dart';

class ServiceCategoryScreen extends StatefulWidget {
  @override
  _ServiceCategoryScreenState createState() => _ServiceCategoryScreenState();
}

class _ServiceCategoryScreenState extends State<ServiceCategoryScreen> {
  String _sortBy = 'rating'; // 'rating', 'price', 'distance'
  
  @override
  Widget build(BuildContext context) {
    final ServiceType serviceType = ModalRoute.of(context)!.settings.arguments as ServiceType;
    final providerService = Provider.of<ProviderService>(context);
    
    return Scaffold(
      appBar: AppBar(
        title: Text(serviceType.name),
      ),
      body: Column(
        children: [
          // Filter options
          Padding(
            padding: const EdgeInsets.all(16.0),
            child: Row(
              children: [
                Text(
                  'Sort by:',
                  style: TextStyle(
                    fontWeight: FontWeight.bold,
                  ),
                ),
                SizedBox(width: 8),
                _buildSortChip('Rating', 'rating'),
                SizedBox(width: 8),
                _buildSortChip('Price', 'price'),
                SizedBox(width: 8),
                _buildSortChip('Distance', 'distance'),
              ],
            ),
          ),
          
          // Provider list
          Expanded(
            child: providerService.isLoading
                ? Center(child: CircularProgressIndicator())
                : providerService.providers.isEmpty
                    ? Center(
                        child: Column(
                          mainAxisAlignment: MainAxisAlignment.center,
                          children: [
                            Icon(
                              Icons.search_off_outlined,
                              size: 64,
                              color: Colors.grey[400],
                            ),
                            SizedBox(height: 16),
                            Text(
                              'No providers found',
                              style: TextStyle(
                                fontSize: 18,
                                fontWeight: FontWeight.bold,
                                color: Colors.grey[600],
                              ),
                            ),
                            SizedBox(height: 8),
                            Text(
                              'Try changing your filters or check back later',
                              style: TextStyle(
                                color: Colors.grey[500],
                              ),
                              textAlign: TextAlign.center,
                            ),
                          ],
                        ),
                      )
                    : ListView.builder(
                        padding: EdgeInsets.all(16),
                        itemCount: providerService.providers.length,
                        itemBuilder: (context, index) {
                          final provider = _sortProviders(providerService.providers)[index];
                          return _buildProviderCard(provider);
                        },
                      ),
          ),
        ],
      ),
    );
  }
  
  Widget _buildSortChip(String label, String value) {
    return ChoiceChip(
      label: Text(label),
      selected: _sortBy == value,
      onSelected: (selected) {
        if (selected) {
          setState(() {
            _sortBy = value;
          });
        }
      },
      selectedColor: AppTheme.primaryColor.withOpacity(0.2),
      labelStyle: TextStyle(
        color: _sortBy == value ? AppTheme.primaryColor : Colors.black,
        fontWeight: _sortBy == value ? FontWeight.bold : FontWeight.normal,
      ),
    );
  }
  
  Widget _buildProviderCard(ServiceProvider provider) {
    return Card(
      margin: EdgeInsets.only(bottom: 16),
      child: Padding(
        padding: const EdgeInsets.all(16.0),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Row(
              children: [
                // Provider image placeholder
                Container(
                  width: 80,
                  height: 80,
                  decoration: BoxDecoration(
                    color: Colors.grey[200],
                    borderRadius: BorderRadius.circular(8),
                  ),
                  child: Icon(
                    _getServiceIcon(provider.serviceType),
                    size: 40,
                    color: Colors.grey[500],
                  ),
                ),
                SizedBox(width: 16),
                Expanded(
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Text(
                        provider.name,
                        style: TextStyle(
                          fontSize: 18,
                          fontWeight: FontWeight.bold,
                        ),
                      ),
                      SizedBox(height: 4),
                      Row(
                        children: [
                          Icon(
                            Icons.star,
                            size: 16,
                            color: Colors.amber,
                          ),
                          SizedBox(width: 4),
                          Text(
                            '${provider.rating.toStringAsFixed(1)} (${provider.totalRatings})',
                            style: TextStyle(
                              color: Colors.grey[600],
                            ),
                          ),
                        ],
                      ),
                      SizedBox(height: 4),
                      Row(
                        children: [
                          Icon(
                            Icons.location_on_outlined,
                            size: 16,
                            color: Colors.grey[600],
                          ),
                          SizedBox(width: 4),
                          Text(
                            '${_calculateDistance(provider.coverageArea.latitude, provider.coverageArea.longitude).toStringAsFixed(1)} km away',
                            style: TextStyle(
                              color: Colors.grey[600],
                            ),
                          ),
                        ],
                      ),
                    ],
                  ),
                ),
              ],
            ),
            SizedBox(height: 16),
            Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text(
                      'Base Price',
                      style: TextStyle(
                        color: Colors.grey[600],
                      ),
                    ),
                    Text(
                      '${provider.pricing.currency} ${provider.pricing.basePrice.toStringAsFixed(2)}',
                      style: TextStyle(
                        fontSize: 18,
                        fontWeight: FontWeight.bold,
                        color: AppTheme.primaryColor,
                      ),
                    ),
                  ],
                ),
                ElevatedButton(
                  onPressed: () {
                    final providerService = Provider.of<ProviderService>(context, listen: false);
                    providerService.setSelectedProvider(provider);
                    Navigator.pushNamed(
                      context,
                      AppRoutes.providerDetails,
                    );
                  },
                  child: Text('Book Now'),
                ),
              ],
            ),
          ],
        ),
      ),
    );
  }
  
  IconData _getServiceIcon(ServiceType type) {
    switch (type) {
      case ServiceType.gas:
        return Icons.local_gas_station_outlined;
      case ServiceType.water:
        return Icons.water_drop_outlined;
      case ServiceType.sewage:
        return Icons.plumbing_outlined;
      case ServiceType.moving:
        return Icons.local_shipping_outlined;
    }
  }
  
  // Mock function to calculate distance
  double _calculateDistance(double lat, double lng) {
    // In a real app, this would calculate the distance from the user's location
    // For MVP, we'll return a random distance between 1 and 10 km
    return 1 + (lat % 9);
  }
  
  // Sort providers based on selected sort option
  List<ServiceProvider> _sortProviders(List<ServiceProvider> providers) {
    switch (_sortBy) {
      case 'rating':
        return List.from(providers)..sort((a, b) => b.rating.compareTo(a.rating));
      case 'price':
        return List.from(providers)..sort((a, b) => a.pricing.basePrice.compareTo(b.pricing.basePrice));
      case 'distance':
        return List.from(providers)..sort((a, b) => 
          _calculateDistance(a.coverageArea.latitude, a.coverageArea.longitude)
          .compareTo(_calculateDistance(b.coverageArea.latitude, b.coverageArea.longitude)));
      default:
        return providers;
    }
  }
}
