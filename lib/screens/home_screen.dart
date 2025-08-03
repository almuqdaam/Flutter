import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import '../services/auth_service.dart';
import '../services/provider_service.dart';
import '../services/booking_service.dart';
import '../models/service_provider.dart';
import '../config/theme.dart';
import '../config/routes.dart';
import '../widgets/service_category_card.dart';
import '../widgets/recent_booking_card.dart';

class HomeScreen extends StatefulWidget {
  @override
  _HomeScreenState createState() => _HomeScreenState();
}

class _HomeScreenState extends State<HomeScreen> {
  int _selectedIndex = 0;
  
  @override
  void initState() {
    super.initState();
    _loadData();
  }
  
  Future<void> _loadData() async {
    final authService = Provider.of<AuthService>(context, listen: false);
    final bookingService = Provider.of<BookingService>(context, listen: false);
    
    if (authService.isAuthenticated) {
      await bookingService.getUserBookings(authService.user!.uid);
    }
  }
  
  @override
  Widget build(BuildContext context) {
    final authService = Provider.of<AuthService>(context);
    final bookingService = Provider.of<BookingService>(context);
    
    return Scaffold(
      body: _selectedIndex == 0
          ? _buildHomeTab()
          : _selectedIndex == 1
              ? _buildBookingsTab()
              : _buildProfileTab(),
      bottomNavigationBar: BottomNavigationBar(
        currentIndex: _selectedIndex,
        onTap: (index) {
          setState(() {
            _selectedIndex = index;
          });
        },
        items: [
          BottomNavigationBarItem(
            icon: Icon(Icons.home_outlined),
            label: 'Home',
          ),
          BottomNavigationBarItem(
            icon: Icon(Icons.receipt_long_outlined),
            label: 'Bookings',
          ),
          BottomNavigationBarItem(
            icon: Icon(Icons.person_outline),
            label: 'Profile',
          ),
        ],
      ),
    );
  }
  
  Widget _buildHomeTab() {
    final authService = Provider.of<AuthService>(context);
    final bookingService = Provider.of<BookingService>(context);
    
    return SafeArea(
      child: SingleChildScrollView(
        child: Padding(
          padding: const EdgeInsets.all(16.0),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              // Header
              Row(
                children: [
                  CircleAvatar(
                    radius: 24,
                    backgroundColor: AppTheme.primaryColor.withOpacity(0.1),
                    child: Icon(
                      Icons.person_outline,
                      color: AppTheme.primaryColor,
                    ),
                  ),
                  SizedBox(width: 12),
                  Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Text(
                        'Hello, ${authService.user?.name.split(' ')[0] ?? 'User'}',
                        style: TextStyle(
                          fontSize: 18,
                          fontWeight: FontWeight.bold,
                        ),
                      ),
                      Text(
                        'What service do you need today?',
                        style: TextStyle(
                          fontSize: 14,
                          color: Colors.grey[600],
                        ),
                      ),
                    ],
                  ),
                  Spacer(),
                  IconButton(
                    icon: Icon(Icons.notifications_outlined),
                    onPressed: () {
                      // TODO: Implement notifications
                    },
                  ),
                ],
              ),
              SizedBox(height: 24),
              
              // Search bar
              Container(
                decoration: BoxDecoration(
                  color: Colors.grey[100],
                  borderRadius: BorderRadius.circular(12),
                ),
                padding: EdgeInsets.symmetric(horizontal: 16),
                child: Row(
                  children: [
                    Icon(
                      Icons.search,
                      color: Colors.grey[600],
                    ),
                    SizedBox(width: 8),
                    Expanded(
                      child: TextField(
                        decoration: InputDecoration(
                          hintText: 'Search for services...',
                          border: InputBorder.none,
                          hintStyle: TextStyle(
                            color: Colors.grey[500],
                          ),
                        ),
                      ),
                    ),
                  ],
                ),
              ),
              SizedBox(height: 24),
              
              // Service categories
              Text(
                'Services',
                style: TextStyle(
                  fontSize: 20,
                  fontWeight: FontWeight.bold,
                ),
              ),
              SizedBox(height: 16),
              GridView.count(
                crossAxisCount: 2,
                shrinkWrap: true,
                physics: NeverScrollableScrollPhysics(),
                crossAxisSpacing: 16,
                mainAxisSpacing: 16,
                children: [
                  _buildServiceCard(
                    ServiceType.gas,
                    'Gas Delivery',
                    Icons.local_gas_station_outlined,
                    Colors.orange[100]!,
                    Colors.orange,
                  ),
                  _buildServiceCard(
                    ServiceType.water,
                    'Water Truck',
                    Icons.water_drop_outlined,
                    Colors.blue[100]!,
                    Colors.blue,
                  ),
                  _buildServiceCard(
                    ServiceType.sewage,
                    'Sewage Service',
                    Icons.plumbing_outlined,
                    Colors.green[100]!,
                    Colors.green,
                  ),
                  _buildServiceCard(
                    ServiceType.moving,
                    'Furniture Moving',
                    Icons.local_shipping_outlined,
                    Colors.purple[100]!,
                    Colors.purple,
                  ),
                ],
              ),
              SizedBox(height: 24),
              
              // Recent bookings
              Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: [
                  Text(
                    'Recent Bookings',
                    style: TextStyle(
                      fontSize: 20,
                      fontWeight: FontWeight.bold,
                    ),
                  ),
                  TextButton(
                    onPressed: () {
                      setState(() {
                        _selectedIndex = 1; // Switch to bookings tab
                      });
                    },
                    child: Text('View All'),
                  ),
                ],
              ),
              SizedBox(height: 8),
              bookingService.isLoading
                  ? Center(child: CircularProgressIndicator())
                  : bookingService.bookings.isEmpty
                      ? Center(
                          child: Padding(
                            padding: const EdgeInsets.all(24.0),
                            child: Column(
                              children: [
                                Icon(
                                  Icons.receipt_long_outlined,
                                  size: 48,
                                  color: Colors.grey[400],
                                ),
                                SizedBox(height: 16),
                                Text(
                                  'No bookings yet',
                                  style: TextStyle(
                                    fontSize: 16,
                                    color: Colors.grey[600],
                                  ),
                                ),
                                SizedBox(height: 8),
                                Text(
                                  'Your recent bookings will appear here',
                                  style: TextStyle(
                                    fontSize: 14,
                                    color: Colors.grey[500],
                                  ),
                                  textAlign: TextAlign.center,
                                ),
                              ],
                            ),
                          ),
                        )
                      : ListView.builder(
                          shrinkWrap: true,
                          physics: NeverScrollableScrollPhysics(),
                          itemCount: bookingService.bookings.length > 3
                              ? 3
                              : bookingService.bookings.length,
                          itemBuilder: (context, index) {
                            final booking = bookingService.bookings[index];
                            return Card(
                              margin: EdgeInsets.only(bottom: 12),
                              child: ListTile(
                                leading: _getServiceIcon(booking.serviceType),
                                title: Text(
                                  booking.serviceType.name,
                                  style: TextStyle(
                                    fontWeight: FontWeight.bold,
                                  ),
                                ),
                                subtitle: Text(
                                  booking.createdAt.toString().substring(0, 16),
                                ),
                                trailing: _getStatusChip(booking.status),
                                onTap: () {
                                  bookingService.setSelectedBooking(booking);
                                  Navigator.pushNamed(
                                    context,
                                    AppRoutes.bookingDetails,
                                  );
                                },
                              ),
                            );
                          },
                        ),
            ],
          ),
        ),
      ),
    );
  }
  
  Widget _buildBookingsTab() {
    final bookingService = Provider.of<BookingService>(context);
    
    return DefaultTabController(
      length: 3,
      child: Scaffold(
        appBar: AppBar(
          title: Text('My Bookings'),
          bottom: TabBar(
            tabs: [
              Tab(text: 'Active'),
              Tab(text: 'Completed'),
              Tab(text: 'Cancelled'),
            ],
          ),
        ),
        body: TabBarView(
          children: [
            // Active bookings
            _buildBookingsList(bookingService.getActiveBookings()),
            
            // Completed bookings
            _buildBookingsList(bookingService.getCompletedBookings()),
            
            // Cancelled bookings
            _buildBookingsList(bookingService.getCancelledBookings()),
          ],
        ),
      ),
    );
  }
  
  Widget _buildBookingsList(List<Booking> bookings) {
    final bookingService = Provider.of<BookingService>(context);
    
    if (bookingService.isLoading) {
      return Center(child: CircularProgressIndicator());
    }
    
    if (bookings.isEmpty) {
      return Center(
        child: Padding(
          padding: const EdgeInsets.all(24.0),
          child: Column(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              Icon(
                Icons.receipt_long_outlined,
                size: 48,
                color: Colors.grey[400],
              ),
              SizedBox(height: 16),
              Text(
                'No bookings in this category',
                style: TextStyle(
                  fontSize: 16,
                  color: Colors.grey[600],
                ),
              ),
            ],
          ),
        ),
      );
    }
    
    return ListView.builder(
      padding: EdgeInsets.all(16),
      itemCount: bookings.length,
      itemBuilder: (context, index) {
        final booking = bookings[index];
        return Card(
          margin: EdgeInsets.only(bottom: 12),
          child: ListTile(
            leading: _getServiceIcon(booking.serviceType),
            title: Text(
              booking.serviceType.name,
              style: TextStyle(
                fontWeight: FontWeight.bold,
              ),
            ),
            subtitle: Text(
              booking.createdAt.toString().substring(0, 16),
            ),
            trailing: _getStatusChip(booking.status),
            onTap: () {
              bookingService.setSelectedBooking(booking);
              Navigator.pushNamed(
                context,
                AppRoutes.bookingDetails,
              );
            },
          ),
        );
      },
    );
  }
  
  Widget _buildProfileTab() {
    final authService = Provider.of<AuthService>(context);
    
    return SafeArea(
      child: SingleChildScrollView(
        child: Padding(
          padding: const EdgeInsets.all(16.0),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.center,
            children: [
              SizedBox(height: 24),
              // Profile picture
              CircleAvatar(
                radius: 50,
                backgroundColor: AppTheme.primaryColor.withOpacity(0.1),
                child: Icon(
                  Icons.person_outline,
                  size: 50,
                  color: AppTheme.primaryColor,
                ),
              ),
              SizedBox(height: 16),
              Text(
                authService.user?.name ?? 'User',
                style: TextStyle(
                  fontSize: 24,
                  fontWeight: FontWeight.bold,
                ),
              ),
              SizedBox(height: 4),
              Text(
                authService.user?.email ?? 'email@example.com',
                style: TextStyle(
                  fontSize: 16,
                  color: Colors.grey[600],
                ),
              ),
              SizedBox(height: 32),
              
              // Profile options
              _buildProfileOption(
                icon: Icons.person_outline,
                title: 'Edit Profile',
                onTap: () {
                  Navigator.pushNamed(context, AppRoutes.editProfile);
                },
              ),
              _buildProfileOption(
                icon: Icons.location_on_outlined,
                title: 'Saved Addresses',
                onTap: () {
                  // TODO: Implement saved addresses
                },
              ),
              _buildProfileOption(
                icon: Icons.notifications_outlined,
                title: 'Notifications',
                onTap: () {
                  // TODO: Implement notifications
                },
              ),
              _buildProfileOption(
                icon: Icons.help_outline,
                title: 'Help & Support',
                onTap: () {
                  // TODO: Implement help & support
                },
              ),
              _buildProfileOption(
                icon: Icons.info_outline,
                title: 'About',
                onTap: () {
                  // TODO: Implement about
                },
              ),
              SizedBox(height: 24),
              
              // Logout button
              ElevatedButton.icon(
                onPressed: () async {
                  await authService.logout();
                  Navigator.pushReplacementNamed(context, AppRoutes.login);
                },
                icon: Icon(Icons.logout),
                label: Text('Logout'),
                style: ElevatedButton.styleFrom(
                  backgroundColor: Colors.red,
                  foregroundColor: Colors.white,
                  padding: EdgeInsets.symmetric(horizontal: 24, vertical: 12),
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }
  
  Widget _buildServiceCard(
    ServiceType type,
    String title,
    IconData icon,
    Color bgColor,
    Color iconColor,
  ) {
    return GestureDetector(
      onTap: () {
        final providerService = Provider.of<ProviderService>(context, listen: false);
        providerService.getProvidersByType(type);
        Navigator.pushNamed(
          context,
          AppRoutes.serviceCategory,
          arguments: type,
        );
      },
      child: Container(
        decoration: BoxDecoration(
          color: Colors.white,
          borderRadius: BorderRadius.circular(16),
          boxShadow: [
            BoxShadow(
              color: Colors.black.withOpacity(0.05),
              blurRadius: 10,
              offset: Offset(0, 4),
            ),
          ],
        ),
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            Container(
              padding: EdgeInsets.all(16),
              decoration: BoxDecoration(
                color: bgColor,
                shape: BoxShape.circle,
              ),
              child: Icon(
                icon,
                color: iconColor,
                size: 32,
              ),
            ),
            SizedBox(height: 12),
            Text(
              title,
              style: TextStyle(
                fontSize: 16,
                fontWeight: FontWeight.bold,
              ),
            ),
          ],
        ),
      ),
    );
  }
  
  Widget _buildProfileOption({
    required IconData icon,
    required String title,
    required VoidCallback onTap,
  }) {
    return ListTile(
      leading: Icon(
        icon,
        color: AppTheme.primaryColor,
      ),
      title: Text(title),
      trailing: Icon(Icons.chevron_right),
      onTap: onTap,
    );
  }
  
  Widget _getServiceIcon(ServiceType type) {
    switch (type) {
      case ServiceType.gas:
        return CircleAvatar(
          backgroundColor: Colors.orange[100],
          child: Icon(
            Icons.local_gas_station_outlined,
            color: Colors.orange,
          ),
        );
      case ServiceType.water:
        return CircleAvatar(
          backgroundColor: Colors.blue[100],
          child: Icon(
            Icons.water_drop_outlined,
            color: Colors.blue,
          ),
        );
      case ServiceType.sewage:
        return CircleAvatar(
          backgroundColor: Colors.green[100],
          child: Icon(
            Icons.plumbing_outlined,
            color: Colors.green,
          ),
        );
      case ServiceType.moving:
        return CircleAvatar(
          backgroundColor: Colors.purple[100],
          child: Icon(
            Icons.local_shipping_outlined,
            color: Colors.purple,
          ),
        );
    }
  }
  
  Widget _getStatusChip(BookingStatus status) {
    Color color;
    switch (status) {
      case BookingStatus.pending:
        color = Colors.amber;
        break;
      case BookingStatus.accepted:
      case BookingStatus.in_progress:
        color = AppTheme.primaryColor;
        break;
      case BookingStatus.completed:
        color = Colors.green;
        break;
      case BookingStatus.cancelled:
        color = Colors.red;
        break;
    }
    
    return Chip(
      label: Text(
        status.name,
        style: TextStyle(
          color: Colors.white,
          fontSize: 12,
        ),
      ),
      backgroundColor: color,
      padding: EdgeInsets.zero,
      materialTapTargetSize: MaterialTapTargetSize.shrinkWrap,
    );
  }
}
