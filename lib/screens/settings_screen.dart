import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import '../services/auth_service.dart';
import '../services/provider_service.dart';
import '../services/booking_service.dart';
import '../models/booking.dart';
import '../config/theme.dart';
import '../config/routes.dart';

class SettingsScreen extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    final authService = Provider.of<AuthService>(context);
    
    return Scaffold(
      appBar: AppBar(
        title: Text('Settings'),
      ),
      body: ListView(
        children: [
          // Account settings
          _buildSectionHeader('Account Settings'),
          _buildSettingItem(
            icon: Icons.person_outline,
            title: 'Profile Information',
            onTap: () {
              Navigator.pushNamed(context, AppRoutes.editProfile);
            },
          ),
          _buildSettingItem(
            icon: Icons.lock_outline,
            title: 'Change Password',
            onTap: () {
              // For MVP, we'll just show a dialog
              showDialog(
                context: context,
                builder: (context) => AlertDialog(
                  title: Text('Change Password'),
                  content: Text('This feature will be available in the full version.'),
                  actions: [
                    TextButton(
                      onPressed: () => Navigator.pop(context),
                      child: Text('OK'),
                    ),
                  ],
                ),
              );
            },
          ),
          
          // App settings
          _buildSectionHeader('App Settings'),
          _buildSettingItem(
            icon: Icons.notifications_outlined,
            title: 'Notifications',
            trailing: Switch(
              value: true,
              onChanged: (value) {
                // For MVP, this is just a UI element
              },
              activeColor: AppTheme.primaryColor,
            ),
          ),
          _buildSettingItem(
            icon: Icons.language_outlined,
            title: 'Language',
            subtitle: 'English',
            onTap: () {
              // For MVP, we'll just show a dialog
              showDialog(
                context: context,
                builder: (context) => AlertDialog(
                  title: Text('Language'),
                  content: Text('This feature will be available in the full version.'),
                  actions: [
                    TextButton(
                      onPressed: () => Navigator.pop(context),
                      child: Text('OK'),
                    ),
                  ],
                ),
              );
            },
          ),
          _buildSettingItem(
            icon: Icons.dark_mode_outlined,
            title: 'Dark Mode',
            trailing: Switch(
              value: false,
              onChanged: (value) {
                // For MVP, this is just a UI element
              },
              activeColor: AppTheme.primaryColor,
            ),
          ),
          
          // Support
          _buildSectionHeader('Support'),
          _buildSettingItem(
            icon: Icons.help_outline,
            title: 'Help Center',
            onTap: () {
              // For MVP, we'll just show a dialog
              showDialog(
                context: context,
                builder: (context) => AlertDialog(
                  title: Text('Help Center'),
                  content: Text('This feature will be available in the full version.'),
                  actions: [
                    TextButton(
                      onPressed: () => Navigator.pop(context),
                      child: Text('OK'),
                    ),
                  ],
                ),
              );
            },
          ),
          _buildSettingItem(
            icon: Icons.chat_outlined,
            title: 'Contact Support',
            onTap: () {
              // For MVP, we'll just show a dialog
              showDialog(
                context: context,
                builder: (context) => AlertDialog(
                  title: Text('Contact Support'),
                  content: Text('This feature will be available in the full version.'),
                  actions: [
                    TextButton(
                      onPressed: () => Navigator.pop(context),
                      child: Text('OK'),
                    ),
                  ],
                ),
              );
            },
          ),
          _buildSettingItem(
            icon: Icons.info_outline,
            title: 'About Logis',
            onTap: () {
              showAboutDialog(
                context: context,
                applicationName: 'Logis',
                applicationVersion: '1.0.0 (MVP)',
                applicationIcon: Icon(
                  Icons.local_shipping_outlined,
                  size: 40,
                  color: AppTheme.primaryColor,
                ),
                children: [
                  Text(
                    'Logis is a mobile-first platform that consolidates logistics and utility services into a single app. It enables users to quickly request nearby service providers for gas, water, sewage, and moving services—trackable, rated, and localized.',
                  ),
                ],
              );
            },
          ),
          
          // Logout
          _buildSectionHeader(''),
          _buildSettingItem(
            icon: Icons.logout,
            title: 'Logout',
            textColor: Colors.red,
            onTap: () async {
              // Show confirmation dialog
              final bool? confirm = await showDialog<bool>(
                context: context,
                builder: (context) => AlertDialog(
                  title: Text('Logout'),
                  content: Text('Are you sure you want to logout?'),
                  actions: [
                    TextButton(
                      onPressed: () => Navigator.pop(context, false),
                      child: Text('Cancel'),
                    ),
                    TextButton(
                      onPressed: () => Navigator.pop(context, true),
                      child: Text('Logout'),
                      style: TextButton.styleFrom(
                        foregroundColor: Colors.red,
                      ),
                    ),
                  ],
                ),
              );
              
              if (confirm == true) {
                await authService.logout();
                Navigator.pushNamedAndRemoveUntil(
                  context,
                  AppRoutes.login,
                  (route) => false,
                );
              }
            },
          ),
          
          // Version info
          Padding(
            padding: const EdgeInsets.all(16.0),
            child: Center(
              child: Text(
                'Version 1.0.0 (MVP)',
                style: TextStyle(
                  color: Colors.grey[500],
                  fontSize: 12,
                ),
              ),
            ),
          ),
        ],
      ),
    );
  }
  
  Widget _buildSectionHeader(String title) {
    return Padding(
      padding: const EdgeInsets.fromLTRB(16, 24, 16, 8),
      child: Text(
        title,
        style: TextStyle(
          color: Colors.grey[600],
          fontWeight: FontWeight.bold,
          fontSize: 14,
        ),
      ),
    );
  }
  
  Widget _buildSettingItem({
    required IconData icon,
    required String title,
    String? subtitle,
    Widget? trailing,
    Color? textColor,
    VoidCallback? onTap,
  }) {
    return ListTile(
      leading: Icon(
        icon,
        color: textColor ?? Colors.grey[700],
      ),
      title: Text(
        title,
        style: TextStyle(
          color: textColor,
        ),
      ),
      subtitle: subtitle != null ? Text(subtitle) : null,
      trailing: trailing ?? Icon(Icons.chevron_right),
      onTap: onTap,
    );
  }
}
