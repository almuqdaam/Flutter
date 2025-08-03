import { create } from 'zustand';
import { ServiceType, User, ServiceProvider, Address } from './types';

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<boolean>;
  register: (name: string, email: string, phone: string, password: string, address: Address) => Promise<boolean>;
  logout: () => void;
}

interface ProviderState {
  providers: ServiceProvider[];
  selectedProvider: ServiceProvider | null;
  isLoading: boolean;
  error: string | null;
  fetchProviders: (serviceType: ServiceType) => Promise<void>;
  selectProvider: (providerId: string) => void;
}

// Mock data for providers
const mockProviders: ServiceProvider[] = [
  {
    id: '1',
    name: 'Muscat Gas Services',
    description: 'Fast and reliable gas delivery service across Muscat. We provide LPG cylinders for residential and commercial use with quick delivery times.',
    serviceType: ServiceType.GAS,
    rating: 4.5,
    totalRatings: 120,
    isAvailable: true,
    coverageArea: {
      radiusKm: 15,
      center: {
        latitude: 23.5880,
        longitude: 58.3829
      }
    },
    pricing: {
      basePrice: 5,
      currency: 'OMR',
      pricePerKm: 0.5
    },
    responseTimeMinutes: 30
  },
  {
    id: '2',
    name: 'Oman Water Supply',
    description: 'Reliable water tanker service for residential and commercial properties. We deliver clean, fresh water when you need it most.',
    serviceType: ServiceType.WATER,
    rating: 4.2,
    totalRatings: 85,
    isAvailable: true,
    coverageArea: {
      radiusKm: 20,
      center: {
        latitude: 23.5880,
        longitude: 58.3829
      }
    },
    pricing: {
      basePrice: 15,
      currency: 'OMR',
      pricePerKm: 0.8
    },
    responseTimeMinutes: 60
  },
  {
    id: '3',
    name: 'Clean Sewage Solutions',
    description: 'Professional sewage services for homes and businesses. Our team ensures clean, efficient, and environmentally friendly waste management.',
    serviceType: ServiceType.SEWAGE,
    rating: 4.0,
    totalRatings: 65,
    isAvailable: false,
    coverageArea: {
      radiusKm: 25,
      center: {
        latitude: 23.5880,
        longitude: 58.3829
      }
    },
    pricing: {
      basePrice: 20,
      currency: 'OMR',
      pricePerKm: 1.0
    },
    responseTimeMinutes: 90
  },
  {
    id: '4',
    name: 'Oman Movers & Packers',
    description: 'Professional furniture moving and relocation services. We handle your belongings with care and ensure a smooth moving experience.',
    serviceType: ServiceType.MOVING,
    rating: 4.7,
    totalRatings: 110,
    isAvailable: true,
    coverageArea: {
      radiusKm: 30,
      center: {
        latitude: 23.5880,
        longitude: 58.3829
      }
    },
    pricing: {
      basePrice: 25,
      currency: 'OMR',
      pricePerKm: 1.2
    },
    responseTimeMinutes: 120
  }
];

// Auth store
export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,
  login: async (email, password) => {
    set({ isLoading: true, error: null });
    
    // Simulate API call
    return new Promise((resolve) => {
      setTimeout(() => {
        if (email === 'demo@logis.com' && password === 'password') {
          const user: User = {
            id: '1',
            name: 'Demo User',
            email: 'demo@logis.com',
            phone: '+968 1234 5678',
            address: {
              city: 'Muscat',
              state: 'Muscat Governorate',
              postalCode: '100',
              country: 'Oman'
            }
          };
          
          set({ user, isAuthenticated: true, isLoading: false, error: null });
          resolve(true);
        } else {
          set({ isLoading: false, error: 'Invalid email or password' });
          resolve(false);
        }
      }, 1000);
    });
  },
  register: async (name, email, phone, password, address) => {
    set({ isLoading: true, error: null });
    
    // Simulate API call
    return new Promise((resolve) => {
      setTimeout(() => {
        const user: User = {
          id: '1',
          name,
          email,
          phone,
          address
        };
        
        set({ user, isAuthenticated: true, isLoading: false, error: null });
        resolve(true);
      }, 1500);
    });
  },
  logout: () => {
    set({ user: null, isAuthenticated: false });
  }
}));

// Provider store
export const useProviderStore = create<ProviderState>((set, get) => ({
  providers: [],
  selectedProvider: null,
  isLoading: false,
  error: null,
  fetchProviders: async (serviceType) => {
    set({ isLoading: true, error: null });
    
    // Simulate API call
    return new Promise((resolve) => {
      setTimeout(() => {
        const filteredProviders = mockProviders.filter(
          provider => provider.serviceType === serviceType
        );
        
        set({ providers: filteredProviders, isLoading: false });
        resolve();
      }, 1000);
    });
  },
  selectProvider: (providerId) => {
    const { providers } = get();
    const provider = providers.find(p => p.id === providerId);
    
    if (provider) {
      set({ selectedProvider: provider });
    }
  }
}));
