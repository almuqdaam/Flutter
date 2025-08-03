enum BookingStatus {
  pending,
  accepted,
  in_progress,
  completed,
  cancelled
}

extension BookingStatusExtension on BookingStatus {
  String get name {
    switch (this) {
      case BookingStatus.pending:
        return 'Pending';
      case BookingStatus.accepted:
        return 'Accepted';
      case BookingStatus.in_progress:
        return 'In Progress';
      case BookingStatus.completed:
        return 'Completed';
      case BookingStatus.cancelled:
        return 'Cancelled';
    }
  }

  String get color {
    switch (this) {
      case BookingStatus.pending:
        return '#F59E0B'; // Amber
      case BookingStatus.accepted:
        return '#0891B2'; // Teal
      case BookingStatus.in_progress:
        return '#0891B2'; // Teal
      case BookingStatus.completed:
        return '#10B981'; // Green
      case BookingStatus.cancelled:
        return '#EF4444'; // Red
    }
  }
}

class Booking {
  final String id;
  final String userId;
  final String providerId;
  final ServiceType serviceType;
  final BookingStatus status;
  final Location location;
  final DateTime? scheduledTime;
  final DateTime createdAt;
  final DateTime? acceptedAt;
  final DateTime? completedAt;
  final DateTime? cancelledAt;
  final double amount;
  final String currency;
  final String? notes;

  Booking({
    required this.id,
    required this.userId,
    required this.providerId,
    required this.serviceType,
    required this.status,
    required this.location,
    this.scheduledTime,
    required this.createdAt,
    this.acceptedAt,
    this.completedAt,
    this.cancelledAt,
    required this.amount,
    required this.currency,
    this.notes,
  });

  // Convert Booking object to a map for Firestore
  Map<String, dynamic> toMap() {
    return {
      'id': id,
      'userId': userId,
      'providerId': providerId,
      'serviceType': serviceType.toString().split('.').last,
      'status': status.toString().split('.').last,
      'location': location.toMap(),
      'scheduledTime': scheduledTime,
      'createdAt': createdAt,
      'acceptedAt': acceptedAt,
      'completedAt': completedAt,
      'cancelledAt': cancelledAt,
      'amount': amount,
      'currency': currency,
      'notes': notes,
    };
  }

  // Create Booking object from Firestore document
  factory Booking.fromMap(Map<String, dynamic> map) {
    return Booking(
      id: map['id'],
      userId: map['userId'],
      providerId: map['providerId'],
      serviceType: ServiceType.values.firstWhere(
        (e) => e.toString().split('.').last == map['serviceType'],
      ),
      status: BookingStatus.values.firstWhere(
        (e) => e.toString().split('.').last == map['status'],
      ),
      location: Location.fromMap(map['location']),
      scheduledTime: map['scheduledTime']?.toDate(),
      createdAt: map['createdAt'].toDate(),
      acceptedAt: map['acceptedAt']?.toDate(),
      completedAt: map['completedAt']?.toDate(),
      cancelledAt: map['cancelledAt']?.toDate(),
      amount: map['amount'],
      currency: map['currency'],
      notes: map['notes'],
    );
  }

  // Create a copy of the booking with updated fields
  Booking copyWith({
    String? id,
    String? userId,
    String? providerId,
    ServiceType? serviceType,
    BookingStatus? status,
    Location? location,
    DateTime? scheduledTime,
    DateTime? createdAt,
    DateTime? acceptedAt,
    DateTime? completedAt,
    DateTime? cancelledAt,
    double? amount,
    String? currency,
    String? notes,
  }) {
    return Booking(
      id: id ?? this.id,
      userId: userId ?? this.userId,
      providerId: providerId ?? this.providerId,
      serviceType: serviceType ?? this.serviceType,
      status: status ?? this.status,
      location: location ?? this.location,
      scheduledTime: scheduledTime ?? this.scheduledTime,
      createdAt: createdAt ?? this.createdAt,
      acceptedAt: acceptedAt ?? this.acceptedAt,
      completedAt: completedAt ?? this.completedAt,
      cancelledAt: cancelledAt ?? this.cancelledAt,
      amount: amount ?? this.amount,
      currency: currency ?? this.currency,
      notes: notes ?? this.notes,
    );
  }
}

class Location {
  final double latitude;
  final double longitude;
  final String formattedAddress;

  Location({
    required this.latitude,
    required this.longitude,
    required this.formattedAddress,
  });

  // Convert Location object to a map for Firestore
  Map<String, dynamic> toMap() {
    return {
      'latitude': latitude,
      'longitude': longitude,
      'formattedAddress': formattedAddress,
    };
  }

  // Create Location object from Firestore document
  factory Location.fromMap(Map<String, dynamic> map) {
    return Location(
      latitude: map['latitude'],
      longitude: map['longitude'],
      formattedAddress: map['formattedAddress'],
    );
  }
}
