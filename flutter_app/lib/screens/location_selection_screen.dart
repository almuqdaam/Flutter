import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import '../services/provider_service.dart';
import '../services/auth_service.dart';
import '../models/booking.dart';
import '../config/theme.dart';
import '../config/routes.dart';

class LocationSelectionScreen extends StatefulWidget {
  @override
  _LocationSelectionScreenState createState() => _LocationSelectionScreenState();
}

class _LocationSelectionScreenState extends State<LocationSelectionScreen> {
  final _formKey = GlobalKey<FormState>();
  final _addressController = TextEditingController();
  double _latitude = 23.5880; // Default coordinates for Muscat, Oman
  double _longitude = 58.3829;
  bool _isCurrentLocation = true;
  
  @override
  void dispose() {
    _addressController.dispose();
    super.dispose();
  }
  
  @override
  void initState() {
    super.initState();
    _loadUserAddress();
  }
  
  Future<void> _loadUserAddress() async {
    final authService = Provider.of<AuthService>(context, listen: false);
    if (authService.isAuthenticated && authService.user != null) {
      setState(() {
        _addressController.text = authService.user!.address.formattedAddress;
        _latitude = authService.user!.address.latitude;
        _longitude = authService.user!.address.longitude;
      });
    }
  }
  
  @override
  Widget build(BuildContext context) {
    final providerService = Provider.of<ProviderService>(context);
    
    return Scaffold(
      appBar: AppBar(
        title: Text('Select Location'),
      ),
      body: SingleChildScrollView(
        child: Padding(
          padding: const EdgeInsets.all(16.0),
          child: Form(
            key: _formKey,
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(
                  'Where do you need the service?',
                  style: TextStyle(
                    fontSize: 20,
                    fontWeight: FontWeight.bold,
                  ),
                ),
                SizedBox(height: 24),
                
                // Map placeholder
                Container(
                  height: 200,
                  width: double.infinity,
                  decoration: BoxDecoration(
                    color: Colors.grey[200],
                    borderRadius: BorderRadius.circular(12),
                  ),
                  child: Center(
                    child: Column(
                      mainAxisAlignment: MainAxisAlignment.center,
                      children: [
                        Icon(
                          Icons.map_outlined,
                          size: 64,
                          color: Colors.grey[400],
                        ),
                        SizedBox(height: 16),
                        Text(
                          'Map View',
                          style: TextStyle(
                            color: Colors.grey[600],
                          ),
                        ),
                        SizedBox(height: 8),
                        Text(
                          'In the full app, this would be an interactive map',
                          style: TextStyle(
                            fontSize: 12,
                            color: Colors.grey[500],
                          ),
                        ),
                      ],
                    ),
                  ),
                ),
                SizedBox(height: 24),
                
                // Location options
                Card(
                  child: Padding(
                    padding: const EdgeInsets.all(16.0),
                    child: Column(
                      children: [
                        Row(
                          children: [
                            Radio<bool>(
                              value: true,
                              groupValue: _isCurrentLocation,
                              onChanged: (value) {
                                setState(() {
                                  _isCurrentLocation = value!;
                                  _loadUserAddress();
                                });
                              },
                              activeColor: AppTheme.primaryColor,
                            ),
                            Expanded(
                              child: Text('Use my current location'),
                            ),
                          ],
                        ),
                        Row(
                          children: [
                            Radio<bool>(
                              value: false,
                              groupValue: _isCurrentLocation,
                              onChanged: (value) {
                                setState(() {
                                  _isCurrentLocation = value!;
                                });
                              },
                              activeColor: AppTheme.primaryColor,
                            ),
                            Expanded(
                              child: Text('Enter a different address'),
                            ),
                          ],
                        ),
                      ],
                    ),
                  ),
                ),
                SizedBox(height: 24),
                
                // Address input
                TextFormField(
                  controller: _addressController,
                  enabled: !_isCurrentLocation,
                  maxLines: 3,
                  decoration: InputDecoration(
                    labelText: 'Address',
                    hintText: 'Enter your full address',
                    border: OutlineInputBorder(
                      borderRadius: BorderRadius.circular(8),
                    ),
                    prefixIcon: Icon(Icons.location_on_outlined),
                  ),
                  validator: (value) {
                    if (!_isCurrentLocation && (value == null || value.isEmpty)) {
                      return 'Please enter an address';
                    }
                    return null;
                  },
                ),
                SizedBox(height: 32),
                
                // Continue button
                SizedBox(
                  width: double.infinity,
                  child: ElevatedButton(
                    onPressed: () {
                      if (_formKey.currentState!.validate()) {
                        // Create location object
                        final location = Location(
                          latitude: _latitude,
                          longitude: _longitude,
                          formattedAddress: _addressController.text,
                        );
                        
                        // Navigate to booking confirmation
                        Navigator.pushNamed(
                          context,
                          AppRoutes.bookingConfirmation,
                          arguments: location,
                        );
                      }
                    },
                    child: Text('Continue'),
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
}
