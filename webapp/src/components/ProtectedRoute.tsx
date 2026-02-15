import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const location = useLocation();
  const authToken = sessionStorage.getItem('authToken');

  if (!authToken) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  try {
    const tokenData = JSON.parse(atob(authToken.split('.')[1]));
    const now = Date.now() / 1000;
    
    if (tokenData.exp && tokenData.exp < now) {
      sessionStorage.removeItem('authToken');
      sessionStorage.removeItem('iduser');
      return <Navigate to="/login" state={{ from: location }} replace />;
    }
  } catch (error) {
    sessionStorage.removeItem('authToken');
    sessionStorage.removeItem('iduser');
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;