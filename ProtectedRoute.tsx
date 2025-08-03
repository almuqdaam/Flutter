import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../lib/store';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuthStore();
  
  React.useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);
  
  if (!isAuthenticated) {
    return null;
  }
  
  return <>{children}</>;
};

export default ProtectedRoute;
