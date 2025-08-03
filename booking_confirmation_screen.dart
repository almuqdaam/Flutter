import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import '../services/provider_service.dart';
import '../services/booking_service.dart';
import '../services/auth_service.dart';
import '../models/service_provider.dart';
import '../models/booking.dart';
import '../models/user.dart' as app_models;
import '../config/theme.dart';
import '../config/routes.dart';

class BookingConfirmationScreen extends StatefulWidget {
  @override
  _BookingConfirmationScreenState createState() => _BookingConfirmationScreenState();
}

class _BookingConfirmationScreenState extends State<BookingConfirmationScreen> {
  final _formKey = GlobalKey<FormState>();
  final _notesController = TextEditingController();
  DateTime? _scheduledTime;
  bool _isNow = true;
  
  @override
  void dispose() {
    _notesController.dispose();
    super.dispose();
  }
  
  @override
  Widget build(BuildContext context) {
    final providerService = Provider.of<ProviderService>(context);
    final authService = Provider.of<AuthService>(context);
    final bookingService = Provider.of<BookingService>(context);
    
    final provider = providerService.selectedProvider;
    final location = ModalRoute.of(context)!.settings.arguments as Location;
    
    if (provider == null || authService.user == null) {
      return Scaffold(
        appBar: AppBar(
          title: Text('Booking Confirmation'),
        ),
        body: Center(
          child: Text('Provider or user information not found'),
        ),
      );
    }
    
    // Calculate estimated price
    final double basePrice = provider.pricing.basePrice;
    final double? pricePerKm = provider.pricing.pricePerKm;
    final double distance = _calculateDistance(
      location.latitude,
      location.longitude,
      provider.coverageArea.latitude,
      provider.coverageArea.longitude,
    );
    
    final double estimatedPrice = basePrice + (pricePerKm != null ? pricePerKm * distance : 0);
    
    return Scaffold(
      appBar: AppBar(
        title: Text('Booking Confirmation'),
      ),
      body: SingleChildScrollView(
        child: Padding(
          padding: const EdgeInsets.all(16.0),
          child: Form(
            key: _formKey,
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                // Provider info
                Card(
                  child: Padding(
                    padding: const EdgeInsets.all(16.0),
                    child: Row(
                      children: [
                        Container(
                          width: 60,
                          height: 60,
                          decoration: BoxDecoration(
                            color: Colors.grey[200],
                            borderRadius: BorderRadius.circular(8),
                          ),
                          child: Icon(
                            _getServiceIcon(provider.serviceType),
                            size: 30,
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
                              Text(
                                provider.serviceType.name,
                                style: TextStyle(
                                  color: Colors.grey[600],
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
                            ],
                          ),
                        ),
                      ],
                    ),
                  ),
                ),
                SizedBox(height: 24),
                
                // Location
                Text(
                  'Service Location',
                  style: TextStyle(
                    fontSize: 18,
                    fontWeight: FontWeight.bold,
                  ),
                ),
                SizedBox(height: 8),
                Card(
                  child: Padding(
                    padding: const EdgeInsets.all(16.0),
                    child: Row(
                      children: [
                        Icon(
                          Icons.location_on_outlined,
                          color: AppTheme.primaryColor,
                        ),
                        SizedBox(width: 16),
                        Expanded(
                          child: Column(
                            crossAxisAlignment: CrossAxisAlignment.start,
                            children: [
                              Text(
                                location.formattedAddress,
                                style: TextStyle(
                                  fontWeight: FontWeight.bold,
                                ),
                              ),
                              SizedBox(height: 4),
                              Text(
                                'Distance: ${distance.toStringAsFixed(1)} km',
                                style: TextStyle(
                                  color: Colors.grey[600],
                                ),
                              ),
                            ],
                          ),
                        ),
                      ],
                    ),
                  ),
                ),
                SizedBox(height: 24),
                
                // Schedule
                Text(
                  'Schedule',
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
                          children: [
                            Radio<bool>(
                              value: true,
                              groupValue: _isNow,
                              onChanged: (value) {
                                setState(() {
                                  _isNow = value!;
                                  _scheduledTime = null;
                                });
                              },
                              activeColor: AppTheme.primaryColor,
                            ),
                            Text('As soon as possible'),
                          ],
                        ),
                        Row(
                          children: [
                            Radio<bool>(
                              value: false,
                              groupValue: _isNow,
                              onChanged: (value) {
                                setState(() {
                                  _isNow = value!;
                                  if (!_isNow && _scheduledTime == null) {
                                    _scheduledTime = DateTime.now().add(Duration(hours: 1));
                                  }
                                });
                              },
                              activeColor: AppTheme.primaryColor,
                            ),
                            Text('Schedule for later'),
                          ],
                        ),
                        if (!_isNow) ...[
                          SizedBox(height: 16),
                          InkWell(
                            onTap: () async {
                              final DateTime? pickedDate = await showDatePicker(
                                context: context,
                                initialDate: _scheduledTime ?? DateTime.now(),
                                firstDate: DateTime.now(),
                                lastDate: DateTime.now().add(Duration(days: 7)),
                              );
                              
                              if (pickedDate != null) {
                                final TimeOfDay? pickedTime = await showTimePicker(
                                  context: context,
                                  initialTime: TimeOfDay.fromDateTime(_scheduledTime ?? DateTime.now()),
                                );
                                
                                if (pickedTime != null) {
                                  setState(() {
                                    _scheduledTime = DateTime(
                                      pickedDate.year,
                                      pickedDate.month,
                                      pickedDate.day,
                                      pickedTime.hour,
                                      pickedTime.minute,
                                    );
                                  });
                                }
                              }
                            },
                            child: Container(
                              padding: EdgeInsets.all(12),
                              decoration: BoxDecoration(
                                border: Border.all(color: Colors.grey[300]!),
                                borderRadius: BorderRadius.circular(8),
                              ),
                              child: Row(
                                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                                children: [
                                  Text(
                                    _scheduledTime != null
                                        ? '${_scheduledTime!.day}/${_scheduledTime!.month}/${_scheduledTime!.year} at ${_scheduledTime!.hour}:${_scheduledTime!.minute.toString().padLeft(2, '0')}'
                                        : 'Select date and time',
                                    style: TextStyle(
                                      color: _scheduledTime != null ? Colors.black : Colors.grey[600],
                                    ),
                                  ),
                                  Icon(
                                    Icons.calendar_today_outlined,
                                    color: Colors.grey[600],
                                  ),
                                ],
                              ),
                            ),
                          ),
                        ],
                      ],
                    ),
                  ),
                ),
                SizedBox(height: 24),
                
                // Notes
                Text(
                  'Additional Notes (Optional)',
                  style: TextStyle(
                    fontSize: 18,
                    fontWeight: FontWeight.bold,
                  ),
                ),
                SizedBox(height: 8),
                TextFormField(
                  controller: _notesController,
                  maxLines: 3,
                  decoration: InputDecoration(
                    hintText: 'Add any special instructions or requirements...',
                  ),
                ),
                SizedBox(height: 24),
                
                // Price summary
                Text(
                  'Price Summary',
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
                              '${provider.pricing.currency} ${basePrice.toStringAsFixed(2)}',
                            ),
                          ],
                        ),
                        if (pricePerKm != null) ...[
                          SizedBox(height: 8),
                          Row(
                            mainAxisAlignment: MainAxisAlignment.spaceBetween,
                            children: [
                              Text('Distance (${distance.toStringAsFixed(1)} km)'),
                              Text(
                                '${provider.pricing.currency} ${(pricePerKm * distance).toStringAsFixed(2)}',
                              ),
                            ],
                          ),
                        ],
                        SizedBox(height: 8),
                        Divider(),
                        SizedBox(height: 8),
                        Row(
                          mainAxisAlignment: MainAxisAlignment.spaceBetween,
                          children: [
                            Text(
                              'Total',
                              style: TextStyle(
                                fontWeight: FontWeight.bold,
                              ),
                            ),
                            Text(
                              '${provider.pricing.currency} ${estimatedPrice.toStringAsFixed(2)}',
                              style: TextStyle(
                                fontWeight: FontWeight.bold,
                                fontSize: 18,
                                color: AppTheme.primaryColor,
                              ),
                            ),
                          ],
                        ),
                      ],
                    ),
                  ),
                ),
                SizedBox(height: 32),
                
                // Book button
                SizedBox(
                  width: double.infinity,
                  child: ElevatedButton(
                    onPressed: bookingService.isLoading
                        ? null
                        : () async {
                            if (_formKey.currentState!.validate()) {
                              if (!_isNow && _scheduledTime == null) {
                                ScaffoldMessenger.of(context).showSnackBar(
                                  SnackBar(
                                    content: Text('Please select a date and time'),
                                    backgroundColor: Colors.red,
                                  ),
                                );
                                return;
                              }
                              
                              final success = await bookingService.createBooking(
                                userId: authService.user!.uid,
                                providerId: provider.id,
                                serviceType: provider.serviceType,
                                location: location,
                                scheduledTime: _isNow ? null : _scheduledTime,
                                amount: estimatedPrice,
                                currency: provider.pricing.currency,
                                notes: _notesController.text.isEmpty ? null : _notesController.text,
                              );
                              
                              if (success) {
                                Navigator.pushReplacementNamed(
                                  context,
                                  AppRoutes.bookingSuccess,
                                );
                              } else {
                                ScaffoldMessenger.of(context).showSnackBar(
                                  SnackBar(
                                    content: Text(bookingService.error ?? 'Failed to create booking'),
                                    backgroundColor: Colors.red,
                                  ),
                                );
                              }
                            }
                          },
                    child: bookingService.isLoading
                        ? SizedBox(
                            height: 20,
                            width: 20,
                            child: CircularProgressIndicator(
                              strokeWidth: 2,
                              valueColor: AlwaysStoppedAnimation<Color>(Colors.white),
                            ),
                          )
                        : Text('Confirm Booking'),
                    style: ElevatedButton.styleFrom(
                      padding: EdgeInsets.symmetric(vertical: 16),
                    ),
                  ),
                ),
              ],
            ),
          ),
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
  double _calculateDistance(double lat1, double lon1, double lat2, double lon2) {
    // In a real app, this would calculate the actual distance
    // For MVP, we'll return a random distance between 1 and 10 km
    return 1 + (lat1 % 9);
  }
}
