class User {
  final String uid;
  final String name;
  final String email;
  final String phone;
  final Address address;
  final String profileImage;
  final DateTime createdAt;
  final DateTime lastLogin;

  User({
    required this.uid,
    required this.name,
    required this.email,
    required this.phone,
    required this.address,
    this.profileImage = '',
    required this.createdAt,
    required this.lastLogin,
  });

  // Convert User object to a map for Firestore
  Map<String, dynamic> toMap() {
    return {
      'uid': uid,
      'name': name,
      'email': email,
      'phone': phone,
      'address': address.toMap(),
      'profileImage': profileImage,
      'createdAt': createdAt,
      'lastLogin': lastLogin,
    };
  }

  // Create User object from Firestore document
  factory User.fromMap(Map<String, dynamic> map) {
    return User(
      uid: map['uid'],
      name: map['name'],
      email: map['email'],
      phone: map['phone'],
      address: Address.fromMap(map['address']),
      profileImage: map['profileImage'] ?? '',
      createdAt: map['createdAt'].toDate(),
      lastLogin: map['lastLogin'].toDate(),
    );
  }
}

class Address {
  final double latitude;
  final double longitude;
  final String formattedAddress;

  Address({
    required this.latitude,
    required this.longitude,
    required this.formattedAddress,
  });

  // Convert Address object to a map for Firestore
  Map<String, dynamic> toMap() {
    return {
      'latitude': latitude,
      'longitude': longitude,
      'formattedAddress': formattedAddress,
    };
  }

  // Create Address object from Firestore document
  factory Address.fromMap(Map<String, dynamic> map) {
    return Address(
      latitude: map['latitude'],
      longitude: map['longitude'],
      formattedAddress: map['formattedAddress'],
    );
  }
}
