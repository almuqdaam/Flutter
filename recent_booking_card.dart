import 'package:flutter/material.dart';
import '../models/booking.dart';
import '../config/theme.dart';
import '../config/routes.dart';

class RecentBookingCard extends StatelessWidget {
  final Booking booking;
  final VoidCallback onTap;

  const RecentBookingCard({
    Key? key,
    required this.booking,
    required this.onTap,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Card(
      margin: EdgeInsets.only(bottom: 12),
      child: InkWell(
        onTap: onTap,
        borderRadius: BorderRadius.circular(8),
        child: Padding(
          padding: const EdgeInsets.all(16.0),
          child: Row(
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
                      booking.location.formattedAddress,
                      style: TextStyle(
                        color: Colors.grey[600],
                        fontSize: 14,
                      ),
                      maxLines: 1,
                      overflow: TextOverflow.ellipsis,
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
              SizedBox(width: 8),
              _getStatusChip(booking.status),
            ],
          ),
        ),
      ),
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
