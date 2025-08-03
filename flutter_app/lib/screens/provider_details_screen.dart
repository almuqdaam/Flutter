import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import '../services/provider_service.dart';
import '../services/booking_service.dart';
import '../models/service_provider.dart';
import '../models/booking.dart';
import '../config/theme.dart';
import '../config/routes.dart';

class ProviderDetailsScreen extends StatefulWidget {
  @override
  _ProviderDetailsScreenState createState() => _ProviderDetailsScreenState();
}

class _ProviderDetailsScreenState extends State<ProviderDetailsScreen> {
  int _currentImageIndex = 0;
  
  @override
  Widget build(BuildContext context) {
    final providerService = Provider.of<ProviderService>(context);
    final provider = providerService.selectedProvider;
    
    if (provider == null) {
      return Scaffold(
        appBar: AppBar(
          title: Text('Provider Details'),
        ),
        body: Center(
          child: Text('Provider not found'),
        ),
      );
    }
    
    return Scaffold(
      body: CustomScrollView(
        slivers: [
          // App bar with provider image
          SliverAppBar(
            expandedHeight: 200,
            pinned: true,
            flexibleSpace: FlexibleSpaceBar(
              background: provider.images.isNotEmpty
                  ? PageView.builder(
                      itemCount: provider.images.length,
                      onPageChanged: (index) {
                        setState(() {
                          _currentImageIndex = index;
                        });
                      },
                      itemBuilder: (context, index) {
                        return Image.network(
                          provider.images[index],
                          fit: BoxFit.cover,
                          errorBuilder: (context, error, stackTrace) {
                            return Container(
                              color: Colors.grey[200],
                              child: Center(
                                child: Icon(
                                  _getServiceIcon(provider.serviceType),
                                  size: 64,
                                  color: Colors.grey[400],
                                ),
                              ),
                            );
                          },
                        );
                      },
                    )
                  : Container(
                      color: Colors.grey[200],
                      child: Center(
                        child: Icon(
                          _getServiceIcon(provider.serviceType),
                          size: 64,
                          color: Colors.grey[400],
                        ),
                      ),
                    ),
            ),
          ),
          
          // Provider details
          SliverToBoxAdapter(
            child: Padding(
              padding: const EdgeInsets.all(16.0),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  // Provider name and rating
                  Row(
                    mainAxisAlignment: MainAxisAlignment.spaceBetween,
                    children: [
                      Expanded(
                        child: Text(
                          provider.name,
                          style: TextStyle(
                            fontSize: 24,
                            fontWeight: FontWeight.bold,
                          ),
                        ),
                      ),
                      Container(
                        padding: EdgeInsets.symmetric(horizontal: 8, vertical: 4),
                        decoration: BoxDecoration(
                          color: Colors.amber,
                          borderRadius: BorderRadius.circular(16),
                        ),
                        child: Row(
                          children: [
                            Icon(
                              Icons.star,
                              size: 16,
                              color: Colors.white,
                            ),
                            SizedBox(width: 4),
                            Text(
                              provider.rating.toStringAsFixed(1),
                              style: TextStyle(
                                color: Colors.white,
                                fontWeight: FontWeight.bold,
                              ),
                            ),
                          ],
                        ),
                      ),
                    ],
                  ),
                  SizedBox(height: 8),
                  
                  // Service type
                  Row(
                    children: [
                      Icon(
                        _getServiceIcon(provider.serviceType),
                        size: 16,
                        color: Colors.grey[600],
                      ),
                      SizedBox(width: 4),
                      Text(
                        provider.serviceType.name,
                        style: TextStyle(
                          color: Colors.grey[600],
                        ),
                      ),
                    ],
                  ),
                  SizedBox(height: 4),
                  
                  // Coverage area
                  Row(
                    children: [
                      Icon(
                        Icons.location_on_outlined,
                        size: 16,
                        color: Colors.grey[600],
                      ),
                      SizedBox(width: 4),
                      Text(
                        'Covers up to ${provider.coverageArea.radiusKm} km',
                        style: TextStyle(
                          color: Colors.grey[600],
                        ),
                      ),
                    ],
                  ),
                  SizedBox(height: 16),
                  
                  // Description
                  Text(
                    'About',
                    style: TextStyle(
                      fontSize: 18,
                      fontWeight: FontWeight.bold,
                    ),
                  ),
                  SizedBox(height: 8),
                  Text(
                    provider.description,
                    style: TextStyle(
                      color: Colors.grey[800],
                    ),
                  ),
                  SizedBox(height: 24),
                  
                  // Pricing
                  Text(
                    'Pricing',
                    style: TextStyle(
                      fontSize: 18,
                      fontWeight: FontWeight.bold,
                    ),
                  ),
                  SizedBox(height: 8),
                  Card(
                    child: Padding(
                      padding: const EdgeInsets.all(16.0),
                      child: Column(
                        children: [
                          Row(
                            mainAxisAlignment: MainAxisAlignment.spaceBetween,
                            children: [
                              Text('Base Price'),
                              Text(
                                '${provider.pricing.currency} ${provider.pricing.basePrice.toStringAsFixed(2)}',
                                style: TextStyle(
                                  fontWeight: FontWeight.bold,
                                ),
                              ),
                            ],
                          ),
                          if (provider.pricing.pricePerKm != null) ...[
                            SizedBox(height: 8),
                            Row(
                              mainAxisAlignment: MainAxisAlignment.spaceBetween,
                              children: [
                                Text('Price per km'),
                                Text(
                                  '${provider.pricing.currency} ${provider.pricing.pricePerKm!.toStringAsFixed(2)}',
                                  style: TextStyle(
                                    fontWeight: FontWeight.bold,
                                  ),
                                ),
                              ],
                            ),
                          ],
                          if (provider.pricing.pricePerUnit != null) ...[
                            SizedBox(height: 8),
                            Row(
                              mainAxisAlignment: MainAxisAlignment.spaceBetween,
                              children: [
                                Text('Price per unit'),
                                Text(
                                  '${provider.pricing.currency} ${provider.pricing.pricePerUnit!.toStringAsFixed(2)}',
                                  style: TextStyle(
                                    fontWeight: FontWeight.bold,
                                  ),
                                ),
                              ],
                            ),
                          ],
                        ],
                      ),
                    ),
                  ),
                  SizedBox(height: 24),
                  
                  // Reviews
                  Row(
                    mainAxisAlignment: MainAxisAlignment.spaceBetween,
                    children: [
                      Text(
                        'Reviews',
                        style: TextStyle(
                          fontSize: 18,
                          fontWeight: FontWeight.bold,
                        ),
                      ),
                      Text(
                        '${provider.totalRatings} reviews',
                        style: TextStyle(
                          color: Colors.grey[600],
                        ),
                      ),
                    ],
                  ),
                  SizedBox(height: 8),
                  
                  // Mock reviews
                  _buildReviewCard(
                    name: 'Ahmed S.',
                    rating: 5.0,
                    comment: 'Great service! Arrived on time and was very professional.',
                    date: '2 days ago',
                  ),
                  _buildReviewCard(
                    name: 'Fatima M.',
                    rating: 4.0,
                    comment: 'Good service but arrived a bit late.',
                    date: '1 week ago',
                  ),
                  _buildReviewCard(
                    name: 'Mohammed A.',
                    rating: 5.0,
                    comment: 'Excellent service, will definitely use again!',
                    date: '2 weeks ago',
                  ),
                  SizedBox(height: 100), // Space for the bottom button
                ],
              ),
            ),
          ),
        ],
      ),
      bottomSheet: Container(
        padding: EdgeInsets.all(16),
        decoration: BoxDecoration(
          color: Colors.white,
          boxShadow: [
            BoxShadow(
              color: Colors.black.withOpacity(0.05),
              blurRadius: 10,
              offset: Offset(0, -5),
            ),
          ],
        ),
        child: Row(
          children: [
            Column(
              mainAxisSize: MainAxisSize.min,
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
            SizedBox(width: 16),
            Expanded(
              child: ElevatedButton(
                onPressed: () {
                  Navigator.pushNamed(
                    context,
                    AppRoutes.locationSelection,
                  );
                },
                child: Text('Book Service'),
                style: ElevatedButton.styleFrom(
                  padding: EdgeInsets.symmetric(vertical: 16),
                ),
              ),
            ),
          ],
        ),
      ),
    );
  }
  
  Widget _buildReviewCard({
    required String name,
    required double rating,
    required String comment,
    required String date,
  }) {
    return Card(
      margin: EdgeInsets.only(bottom: 8),
      child: Padding(
        padding: const EdgeInsets.all(16.0),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                Text(
                  name,
                  style: TextStyle(
                    fontWeight: FontWeight.bold,
                  ),
                ),
                Row(
                  children: [
                    Icon(
                      Icons.star,
                      size: 16,
                      color: Colors.amber,
                    ),
                    SizedBox(width: 4),
                    Text(
                      rating.toStringAsFixed(1),
                      style: TextStyle(
                        fontWeight: FontWeight.bold,
                      ),
                    ),
                  ],
                ),
              ],
            ),
            SizedBox(height: 8),
            Text(comment),
            SizedBox(height: 4),
            Text(
              date,
              style: TextStyle(
                color: Colors.grey[600],
                fontSize: 12,
              ),
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
}
