import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import LoadingSpinner from '../components/common/LoadingSpinner';

const AuthRedirect = () => {
  const { isAuthenticated, user, isLoading } = useAuth();
  
  if (isLoading) {
    return <LoadingSpinner />;
  }
  
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  
  // Redirect berdasarkan role user
  const redirectPath = user?.role === 'admin' ? '/admin/dashboard' : '/user/dashboard';
  return <Navigate to={redirectPath} replace />;
};

export default AuthRedirect;