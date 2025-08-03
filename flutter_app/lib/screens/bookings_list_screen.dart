import 'package:flutter/material.dart';
import '../models/booking.dart';
import '../models/service_provider.dart';
import '../config/theme.dart';

class BookingsListScreen extends StatelessWidget {
  final List<Booking> bookings;
  final Function(Booking) onBookingTap;

  const BookingsListScreen({
    Key? key,
    required this.bookings,
    required this.onBookingTap,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    if (bookings.isEmpty) {
      return Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            Icon(
              Icons.receipt_long_outlined,
              size: 64,
              color: Colors.grey[400],
            ),
            SizedBox(height: 16),
            Text(
              'No bookings found',
              style: TextStyle(
                fontSize: 18,
                fontWeight: FontWeight.bold,
                color: Colors.grey[600],
              ),
            ),
            SizedBox(height: 8),
            Text(
              'Your bookings will appear here',
              style: TextStyle(
                color: Colors.grey[500],
              ),
            ),
          ],
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
          child: InkWell(
            onTap: () => onBookingTap(booking),
            borderRadius: BorderRadius.circular(8),
            child: Padding(
              padding: const EdgeInsets.all(16.0),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Row(
                    children: [
                      _getServiceIcon(booking.serviceType),
                      SizedBox(width: 16),
                      Expanded(
                        child: Column(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: [
                            Text(
                              booking.serviceType.name,
                              style: TextStyle(
                                fontWeight: FontWeight.bold,
                                fontSize: 16,
                              ),
                            ),
                            SizedBox(height: 4),
                            Text(
                              _formatDateTime(booking.createdAt),
                              style: TextStyle(
                                color: Colors.grey[500],
                                fontSize: 12,
                              ),
                            ),
                          ],
                        ),
                      ),
                      _getStatusChip(booking.status),
                    ],
                  ),
                  SizedBox(height: 12),
                  Divider(),
                  SizedBox(height: 8),
                  Row(
                    children: [
                      Icon(
                        Icons.location_on_outlined,
                        size: 16,
                        color: Colors.grey[600],
                      ),
                      SizedBox(width: 8),
                      Expanded(
                        child: Text(
                          booking.location.formattedAddress,
                          style: TextStyle(
                            color: Colors.grey[600],
                            fontSize: 14,
                          ),
                          maxLines: 1,
                          overflow: TextOverflow.ellipsis,
                        ),
                      ),
                    ],
                  ),
                  SizedBox(height: 8),
                  Row(
                    children: [
                      Icon(
                        Icons.attach_money,
                        size: 16,
                        color: Colors.grey[600],
                      ),
                      SizedBox(width: 8),
                      Text(
                        '${booking.currency} ${booking.amount.toStringAsFixed(2)}',
                        style: TextStyle(
                          color: Colors.grey[600],
                          fontSize: 14,
                        ),
                      ),
                    ],
                  ),
                ],
              ),
            ),
          ),
        );
      },
    );
  }

  Widget _getServiceIcon(ServiceType type) {
    Color bgColor;
    Color iconColor;
    IconData icon;

    switch (type) {
      case ServiceType.gas:
        bgColor = Colors.orange[100]!;
        iconColor = Colors.orange;
        icon = Icons.local_gas_station_outlined;
        break;
      case ServiceType.water:
        bgColor = Colors.blue[100]!;
        iconColor = Colors.blue;
        icon = Icons.water_drop_outlined;
        break;
      case ServiceType.sewage:
        bgColor = Colors.green[100]!;
        iconColor = Colors.green;
        icon = Icons.plumbing_outlined;
        break;
      case ServiceType.moving:
        bgColor = Colors.purple[100]!;
        iconColor = Colors.purple;
        icon = Icons.local_shipping_outlined;
        break;
    }

    return CircleAvatar(
      radius: 24,
      backgroundColor: bgColor,
      child: Icon(
        icon,
        color: iconColor,
        size: 24,
      ),
    );
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

  String _formatDateTime(DateTime dateTime) {
    return '${dateTime.day}/${dateTime.month}/${dateTime.year} ${dateTime.hour}:${dateTime.minute.toString().padLeft(2, '0')}';
  }
}
