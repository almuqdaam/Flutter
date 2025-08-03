import 'package:flutter/material.dart';
import 'package:firebase_auth/firebase_auth.dart' as firebase_auth;
import 'package:cloud_firestore/cloud_firestore.dart';
import '../models/user.dart' as app_models;

class AuthService extends ChangeNotifier {
  final firebase_auth.FirebaseAuth _auth = firebase_auth.FirebaseAuth.instance;
  final FirebaseFirestore _firestore = FirebaseFirestore.instance;
  
  // Current user state
  app_models.User? _user;
  bool _isLoading = false;
  String? _error;
  
  // Getters
  app_models.User? get user => _user;
  bool get isLoading => _isLoading;
  String? get error => _error;
  bool get isAuthenticated => _user != null;
  
  // Constructor - check if user is already logged in
  AuthService() {
    _auth.authStateChanges().listen((firebase_auth.User? firebaseUser) {
      if (firebaseUser != null) {
        _getUserData(firebaseUser.uid);
      } else {
        _user = null;
        notifyListeners();
      }
    });
  }
  
  // Register a new user
  Future<bool> register({
    required String name,
    required String email,
    required String phone,
    required String password,
    required app_models.Address address,
  }) async {
    try {
      _isLoading = true;
      _error = null;
      notifyListeners();
      
      // Create user in Firebase Auth
      final firebase_auth.UserCredential userCredential = 
          await _auth.createUserWithEmailAndPassword(
        email: email,
        password: password,
      );
      
      final firebase_auth.User? firebaseUser = userCredential.user;
      
      if (firebaseUser != null) {
        // Create user document in Firestore
        final app_models.User newUser = app_models.User(
          uid: firebaseUser.uid,
          name: name,
          email: email,
          phone: phone,
          address: address,
          profileImage: '',
          createdAt: DateTime.now(),
          lastLogin: DateTime.now(),
        );
        
        await _firestore
            .collection('users')
            .doc(firebaseUser.uid)
            .set(newUser.toMap());
        
        _user = newUser;
        _isLoading = false;
        notifyListeners();
        return true;
      } else {
        _error = 'Failed to create user';
        _isLoading = false;
        notifyListeners();
        return false;
      }
    } catch (e) {
      _error = e.toString();
      _isLoading = false;
      notifyListeners();
      return false;
    }
  }
  
  // Login with email and password
  Future<bool> login({
    required String email,
    required String password,
  }) async {
    try {
      _isLoading = true;
      _error = null;
      notifyListeners();
      
      final firebase_auth.UserCredential userCredential = 
          await _auth.signInWithEmailAndPassword(
        email: email,
        password: password,
      );
      
      final firebase_auth.User? firebaseUser = userCredential.user;
      
      if (firebaseUser != null) {
        // Update last login time
        await _firestore
            .collection('users')
            .doc(firebaseUser.uid)
            .update({'lastLogin': DateTime.now()});
        
        await _getUserData(firebaseUser.uid);
        _isLoading = false;
        notifyListeners();
        return true;
      } else {
        _error = 'Failed to login';
        _isLoading = false;
        notifyListeners();
        return false;
      }
    } catch (e) {
      _error = e.toString();
      _isLoading = false;
      notifyListeners();
      return false;
    }
  }
  
  // Logout
  Future<void> logout() async {
    try {
      await _auth.signOut();
      _user = null;
      notifyListeners();
    } catch (e) {
      _error = e.toString();
      notifyListeners();
    }
  }
  
  // Reset password
  Future<bool> resetPassword(String email) async {
    try {
      _isLoading = true;
      _error = null;
      notifyListeners();
      
      await _auth.sendPasswordResetEmail(email: email);
      
      _isLoading = false;
      notifyListeners();
      return true;
    } catch (e) {
      _error = e.toString();
      _isLoading = false;
      notifyListeners();
      return false;
    }
  }
  
  // Update user profile
  Future<bool> updateProfile({
    required String name,
    required String phone,
    required app_models.Address address,
    String? profileImage,
  }) async {
    try {
      if (_user == null) return false;
      
      _isLoading = true;
      _error = null;
      notifyListeners();
      
      final Map<String, dynamic> updates = {
        'name': name,
        'phone': phone,
        'address': address.toMap(),
      };
      
      if (profileImage != null) {
        updates['profileImage'] = profileImage;
      }
      
      await _firestore
          .collection('users')
          .doc(_user!.uid)
          .update(updates);
      
      // Update local user object
      _user = app_models.User(
        uid: _user!.uid,
        name: name,
        email: _user!.email,
        phone: phone,
        address: address,
        profileImage: profileImage ?? _user!.profileImage,
        createdAt: _user!.createdAt,
        lastLogin: _user!.lastLogin,
      );
      
      _isLoading = false;
      notifyListeners();
      return true;
    } catch (e) {
      _error = e.toString();
      _isLoading = false;
      notifyListeners();
      return false;
    }
  }
  
  // Get user data from Firestore
  Future<void> _getUserData(String uid) async {
    try {
      final DocumentSnapshot doc = 
          await _firestore.collection('users').doc(uid).get();
      
      if (doc.exists) {
        _user = app_models.User.fromMap(doc.data() as Map<String, dynamic>);
        notifyListeners();
      }
    } catch (e) {
      _error = e.toString();
      notifyListeners();
    }
  }
  
  // Clear error
  void clearError() {
    _error = null;
    notifyListeners();
  }
}
