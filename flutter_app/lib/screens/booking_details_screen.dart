import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import '../services/booking_service.dart';
import '../models/booking.dart';
import '../config/theme.dart';
import '../config/routes.dart';

class BookingDetailsScreen extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    final bookingService = Provider.of<BookingService>(context);
    final booking = bookingService.selectedBooking;
    
    if (booking == null) {
      return Scaffold(
        appBar: AppBar(
          title: Text('Booking Details'),
        ),
        body: Center(
          child: Text('Booking not found'),
        ),
      );
    }
    
    return Scaffold(
      appBar: AppBar(
        title: Text('Booking Details'),
      ),
      body: SingleChildScrollView(
        child: Padding(
          padding: const EdgeInsets.all(16.0),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              // Status card
              Card(
                color: _getStatusColor(booking.status).withOpacity(0.1),
                child: Padding(
                  padding: const EdgeInsets.all(16.0),
                  child: Row(
                    children: [
                      Icon(
                        _getStatusIcon(booking.status),
                        color: _getStatusColor(booking.status),
                      ),
                      SizedBox(width: 16),
                      Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          Text(
                            'Status',
                            style: TextStyle(
                              color: Colors.grey[600],
                            ),
                          ),
                          Text(
                            booking.status.name,
                            style: TextStyle(
                              fontSize: 18,
                              fontWeight: FontWeight.bold,
                              color: _getStatusColor(booking.status),
                            ),
                          ),
                        ],
                      ),
                    ],
                  ),
                ),
              ),
              SizedBox(height: 24),
              
              // Booking details
              Text(
                'Booking Information',
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
                      _buildDetailRow('Booking ID', booking.id.substring(0, 8)),
                      SizedBox(height: 8),
                      _buildDetailRow('Service Type', booking.serviceType.name),
                      SizedBox(height: 8),
                      _buildDetailRow('Date', _formatDate(booking.scheduledTime ?? booking.createdAt)),
                      SizedBox(height: 8),
                      _buildDetailRow('Time', booking.scheduledTime != null
                          ? _formatTime(booking.scheduledTime!)
                          : 'As soon as possible'),
                      SizedBox(height: 8),
                      _buildDetailRow('Amount', '${booking.currency} ${booking.amount.toStringAsFixed(2)}'),
                      if (booking.notes != null && booking.notes!.isNotEmpty) ...[
                        SizedBox(height: 8),
                        _buildDetailRow('Notes', booking.notes!),
                      ],
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
                        child: Text(
                          booking.location.formattedAddress,
                          style: TextStyle(
                            fontWeight: FontWeight.bold,
                          ),
                        ),
                      ),
                    ],
                  ),
                ),
              ),
              SizedBox(height: 24),
              
              // Timeline
              Text(
                'Booking Timeline',
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
                      _buildTimelineItem(
                        'Booking Created',
                        _formatDateTime(booking.createdAt),
                        true,
                        isFirst: true,
                      ),
                      if (booking.acceptedAt != null)
                        _buildTimelineItem(
                          'Booking Accepted',
                          _formatDateTime(booking.acceptedAt!),
                          true,
                        ),
                      if (booking.status == BookingStatus.in_progress)
                        _buildTimelineItem(
                          'Service In Progress',
                          'Now',
                          true,
                        ),
                      if (booking.completedAt != null)
                        _buildTimelineItem(
                          'Service Completed',
                          _formatDateTime(booking.completedAt!),
                          true,
                        ),
                      if (booking.cancelledAt != null)
                        _buildTimelineItem(
                          'Booking Cancelled',
                          _formatDateTime(booking.cancelledAt!),
                          true,
                        ),
                      if (booking.status == BookingStatus.pending)
                        _buildTimelineItem(
                          'Waiting for Provider',
                          'Pending',
                          false,
                        ),
                      if (booking.status == BookingStatus.accepted && booking.acceptedAt != null)
                        _buildTimelineItem(
                          'Service Scheduled',
                          booking.scheduledTime != null
                              ? _formatDateTime(booking.scheduledTime!)
                              : 'As soon as possible',
                          false,
                        ),
                    ],
                  ),
                ),
              ),
              SizedBox(height: 32),
              
              // Action buttons
              if (booking.status == BookingStatus.pending) ...[
                SizedBox(
                  width: double.infinity,
                  child: ElevatedButton.icon(
                    onPressed: () async {
                      // For demo purposes, we'll simulate booking completion
                      await bookingService.completeBooking(booking.id);
                    },
                    icon: Icon(Icons.check_circle_outline),
                    label: Text('Complete Booking (Demo)'),
                    style: ElevatedButton.styleFrom(
                      padding: EdgeInsets.symmetric(vertical: 16),
                      backgroundColor: Colors.green,
                    ),
                  ),
                ),
                SizedBox(height: 16),
                SizedBox(
                  width: double.infinity,
                  child: OutlinedButton.icon(
                    onPressed: () async {
                      // Show confirmation dialog
                      final bool? confirm = await showDialog<bool>(
                        context: context,
                        builder: (context) => AlertDialog(
                          title: Text('Cancel Booking'),
                          content: Text('Are you sure you want to cancel this booking?'),
                          actions: [
                            TextButton(
                              onPressed: () => Navigator.pop(context, false),
                              child: Text('No'),
                            ),
                            TextButton(
                              onPressed: () => Navigator.pop(context, true),
                              child: Text('Yes'),
                            ),
                          ],
                        ),
                      );
                      
                      if (confirm == true) {
                        await bookingService.cancelBooking(booking.id);
                      }
                    },
                    icon: Icon(Icons.cancel_outlined),
                    label: Text('Cancel Booking'),
                    style: OutlinedButton.styleFrom(
                      padding: EdgeInsets.symmetric(vertical: 16),
                      foregroundColor: Colors.red,
                    ),
                  ),
                ),
              ],
            ],
          ),
        ),
      ),
    );
  }
  
  Widget _buildDetailRow(String label, String value) {
    return Row(
      mainAxisAlignment: MainAxisAlignment.spaceBetween,
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text(
          label,
          style: TextStyle(
            color: Colors.grey[600],
          ),
        ),
        Flexible(
          child: Text(
            value,
            style: TextStyle(
              fontWeight: FontWeight.bold,
            ),
            textAlign: TextAlign.right,
          ),
        ),
      ],
    );
  }
  
  Widget _buildTimelineItem(
    String title,
    String time,
    bool isCompleted, {
    bool isFirst = false,
  }) {
    return Row(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Column(
          children: [
            Container(
              width: 20,
              height: 20,
              decoration: BoxDecoration(
                shape: BoxShape.circle,
                color: isCompleted ? Colors.green : Colors.grey[300],
                border: Border.all(
                  color: isCompleted ? Colors.green : Colors.grey[300]!,
                  width: 3,
                ),
              ),
              child: isCompleted
                  ? Icon(
                      Icons.check,
                      size: 12,
                      color: Colors.white,
                    )
                  : null,
            ),
            if (!isFirst)
              Container(
                width: 2,
                height: 30,
                color: isCompleted ? Colors.green : Colors.grey[300],
                margin: EdgeInsets.symmetric(vertical: 4),
              ),
          ],
        ),
        SizedBox(width: 16),
        Expanded(
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Text(
                title,
                style: TextStyle(
                  fontWeight: FontWeight.bold,
                ),
              ),
              SizedBox(height: 4),
              Text(
                time,
                style: TextStyle(
                  color: Colors.grey[600],
                  fontSize: 12,
                ),
              ),
              SizedBox(height: 16),
            ],
          ),
        ),
      ],
    );
  }
  
  Color _getStatusColor(BookingStatus status) {
    switch (status) {
      case BookingStatus.pending:
        return Colors.amber;
      case BookingStatus.accepted:
      case BookingStatus.in_progress:
        return AppTheme.primaryColor;
      case BookingStatus.completed:
        return Colors.green;
      case BookingStatus.cancelled:
        return Colors.red;
    }
  }
  
  IconData _getStatusIcon(BookingStatus status) {
    switch (status) {
      case BookingStatus.pending:
        return Icons.hourglass_empty;
      case BookingStatus.accepted:
        return Icons.check_circle_outline;
      case BookingStatus.in_progress:
        return Icons.directions_car_outlined;
      case BookingStatus.completed:
        return Icons.task_alt;
      case BookingStatus.cancelled:
        return Icons.cancel_outlined;
    }
  }
  
  String _formatDate(DateTime dateTime) {
    return '${dateTime.day}/${dateTime.month}/${dateTime.year}';
  }
  
  String _formatTime(DateTime dateTime) {
    return '${dateTime.hour}:${dateTime.minute.toString().padLeft(2, '0')}';
  }
  
  String _formatDateTime(DateTime dateTime) {
    return '${_formatDate(dateTime)} ${_formatTime(dateTime)}';
  }
}
