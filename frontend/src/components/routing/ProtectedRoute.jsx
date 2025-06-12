import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import LoadingSpinner from '../common/LoadingSpinner';

const ProtectedRoute = ({ children, requiredRole }) => {
  const { user, isAuthenticated, isLoading } = useAuth();

  console.log('Protected Route Check:', {
    user,
    requiredRole,
    isAuthenticated
  });

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // Perbaiki pengecekan role
  if (requiredRole) {
    const userRole = user.role === 'mahasiswa' ? 'user' : user.role;
    if (userRole !== requiredRole) {
      // Redirect ke dashboard sesuai role
      const redirectPath = userRole === 'admin' ? '/admin/dashboard' : '/user/dashboard';
      return <Navigate to={redirectPath} replace />;
    }
  }

  return children;
};

export default ProtectedRoute;