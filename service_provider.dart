enum ServiceType {
  gas,
  water,
  sewage,
  moving
}

extension ServiceTypeExtension on ServiceType {
  String get name {
    switch (this) {
      case ServiceType.gas:
        return 'Gas Delivery';
      case ServiceType.water:
        return 'Water Truck';
      case ServiceType.sewage:
        return 'Sewage Service';
      case ServiceType.moving:
        return 'Furniture Moving';
    }
  }

  String get icon {
    switch (this) {
      case ServiceType.gas:
        return 'assets/icons/gas.png';
      case ServiceType.water:
        return 'assets/icons/water.png';
      case ServiceType.sewage:
        return 'assets/icons/sewage.png';
      case ServiceType.moving:
        return 'assets/icons/moving.png';
    }
  }
}

class ServiceProvider {
  final String id;
  final String name;
  final ServiceType serviceType;
  final String phone;
  final String email;
  final String description;
  final double rating;
  final int totalRatings;
  final bool isAvailable;
  final CoverageArea coverageArea;
  final Pricing pricing;
  final List<String> images;
  final DateTime createdAt;
  final DateTime updatedAt;

  ServiceProvider({
    required this.id,
    required this.name,
    required this.serviceType,
    required this.phone,
    required this.email,
    required this.description,
    this.rating = 0.0,
    this.totalRatings = 0,
    this.isAvailable = true,
    required this.coverageArea,
    required this.pricing,
    required this.images,
    required this.createdAt,
    required this.updatedAt,
  });

  // Convert ServiceProvider object to a map for Firestore
  Map<String, dynamic> toMap() {
    return {
      'id': id,
      'name': name,
      'serviceType': serviceType.toString().split('.').last,
      'phone': phone,
      'email': email,
      'description': description,
      'rating': rating,
      'totalRatings': totalRatings,
      'isAvailable': isAvailable,
      'coverageArea': coverageArea.toMap(),
      'pricing': pricing.toMap(),
      'images': images,
      'createdAt': createdAt,
      'updatedAt': updatedAt,
    };
  }

  // Create ServiceProvider object from Firestore document
  factory ServiceProvider.fromMap(Map<String, dynamic> map) {
    return ServiceProvider(
      id: map['id'],
      name: map['name'],
      serviceType: ServiceType.values.firstWhere(
        (e) => e.toString().split('.').last == map['serviceType'],
      ),
      phone: map['phone'],
      email: map['email'],
      description: map['description'],
      rating: map['rating'] ?? 0.0,
      totalRatings: map['totalRatings'] ?? 0,
      isAvailable: map['isAvailable'] ?? true,
      coverageArea: CoverageArea.fromMap(map['coverageArea']),
      pricing: Pricing.fromMap(map['pricing']),
      images: List<String>.from(map['images']),
      createdAt: map['createdAt'].toDate(),
      updatedAt: map['updatedAt'].toDate(),
    );
  }
}

class CoverageArea {
  final double latitude;
  final double longitude;
  final double radiusKm;

  CoverageArea({
    required this.latitude,
    required this.longitude,
    required this.radiusKm,
  });

  // Convert CoverageArea object to a map for Firestore
  Map<String, dynamic> toMap() {
    return {
      'latitude': latitude,
      'longitude': longitude,
      'radiusKm': radiusKm,
    };
  }

  // Create CoverageArea object from Firestore document
  factory CoverageArea.fromMap(Map<String, dynamic> map) {
    return CoverageArea(
      latitude: map['latitude'],
      longitude: map['longitude'],
      radiusKm: map['radiusKm'],
    );
  }
}

class Pricing {
  final double basePrice;
  final String currency;
  final double? pricePerKm;
  final double? pricePerUnit;

  Pricing({
    required this.basePrice,
    required this.currency,
    this.pricePerKm,
    this.pricePerUnit,
  });

  // Convert Pricing object to a map for Firestore
  Map<String, dynamic> toMap() {
    return {
      'basePrice': basePrice,
      'currency': currency,
      'pricePerKm': pricePerKm,
      'pricePerUnit': pricePerUnit,
    };
  }

  // Create Pricing object from Firestore document
  factory Pricing.fromMap(Map<String, dynamic> map) {
    return Pricing(
      basePrice: map['basePrice'],
      currency: map['currency'],
      pricePerKm: map['pricePerKm'],
      pricePerUnit: map['pricePerUnit'],
    );
  }
}
