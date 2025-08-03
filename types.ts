// User types
export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: Address;
  profilePicture?: string;
}

export interface Address {
  city: string;
  state: string;
  postalCode: string;
  country: string;
  coordinates?: {
    latitude: number;
    longitude: number;
  };
}

// Service types
export enum ServiceType {
  GAS = 'gas',
  WATER = 'water',
  SEWAGE = 'sewage',
  MOVING = 'moving'
}

export interface ServiceProvider {
  id: string;
  name: string;
  description: string;
  serviceType: ServiceType;
  rating: number;
  totalRatings: number;
  isAvailable: boolean;
  coverageArea: {
    radiusKm: number;
    center: {
      latitude: number;
      longitude: number;
    };
  };
  pricing: Pricing;
  responseTimeMinutes: number; // Average response time in minutes
}

export interface Pricing {
  basePrice: number;
  currency: string;
  pricePerKm: number;
}

// Booking types
export enum BookingStatus {
  PENDING = 'pending',
  CONFIRMED = 'confirmed',
  IN_PROGRESS = 'in_progress',
  COMPLETED = 'completed',
  CANCELLED = 'cancelled'
}

export interface Booking {
  id: string;
  userId: string;
  providerId: string;
  serviceType: ServiceType;
  status: BookingStatus;
  location: {
    address: string;
    coordinates: {
      latitude: number;
      longitude: number;
    };
  };
  scheduledTime: Date | null; // null means immediate service
  createdAt: Date;
  totalPrice: number;
  currency: string;
}
