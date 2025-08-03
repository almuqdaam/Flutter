import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { theme } from './lib/theme';

// Pages
import LoginScreen from './pages/LoginScreen';
import RegisterScreen from './pages/RegisterScreen';
import HomeScreen from './pages/HomeScreen';
import ServiceCategoryScreen from './pages/ServiceCategoryScreen';
import ProviderDetailsScreen from './pages/ProviderDetailsScreen';
import LocationSelectionScreen from './pages/LocationSelectionScreen';
import BookingConfirmationScreen from './pages/BookingConfirmationScreen';
import BookingSuccessScreen from './pages/BookingSuccessScreen';
import BookingDetailsScreen from './pages/BookingDetailsScreen';
import BookingsListScreen from './pages/BookingsListScreen';
import ProfileScreen from './pages/ProfileScreen';
import SettingsScreen from './pages/SettingsScreen';

// Components
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Routes>
          {/* Public Routes */}
          <Route path="/login" element={<LoginScreen />} />
          <Route path="/register" element={<RegisterScreen />} />
          
          {/* Protected Routes */}
          <Route path="/home" element={
            <ProtectedRoute>
              <HomeScreen />
            </ProtectedRoute>
          } />
          <Route path="/service-category/:type" element={
            <ProtectedRoute>
              <ServiceCategoryScreen />
            </ProtectedRoute>
          } />
          <Route path="/provider/:id" element={
            <ProtectedRoute>
              <ProviderDetailsScreen />
            </ProtectedRoute>
          } />
          <Route path="/location-selection" element={
            <ProtectedRoute>
              <LocationSelectionScreen />
            </ProtectedRoute>
          } />
          <Route path="/booking-confirmation" element={
            <ProtectedRoute>
              <BookingConfirmationScreen />
            </ProtectedRoute>
          } />
          <Route path="/booking-success" element={
            <ProtectedRoute>
              <BookingSuccessScreen />
            </ProtectedRoute>
          } />
          <Route path="/booking/:id" element={
            <ProtectedRoute>
              <BookingDetailsScreen />
            </ProtectedRoute>
          } />
          <Route path="/bookings" element={
            <ProtectedRoute>
              <BookingsListScreen />
            </ProtectedRoute>
          } />
          <Route path="/profile" element={
            <ProtectedRoute>
              <ProfileScreen />
            </ProtectedRoute>
          } />
          <Route path="/settings" element={
            <ProtectedRoute>
              <SettingsScreen />
            </ProtectedRoute>
          } />
          
          {/* Default Route */}
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
