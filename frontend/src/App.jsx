import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './components/auth/LoginPage';
import ResetPasswordPage from './components/auth/ResetPasswordPage';
import AdminDashboard from './pages/admin/AdminDashboard';
import UserDashboard from './pages/user/UserDashboard';
import AuthRedirect from './components/AuthRedirect';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/routing/ProtectedRoute';
import { PeminjamanProvider } from './context/PeminjamanContext';

const App = () => {
  return (
    <AuthProvider>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
        <BrowserRouter>
          <Routes>
            {/* Public Routes */}
            <Route path="/login" element={<LoginPage />} />
            <Route path="/reset-password" element={<ResetPasswordPage />} />
            
            {/* Auth Redirect */}
            <Route path="/auth-redirect" element={<AuthRedirect />} />
            
            {/* Protected Admin Routes */}
            <Route 
              path="/admin/*" 
              element={
                <ProtectedRoute requiredRole="admin">
                  <PeminjamanProvider>
                    <AdminDashboard />
                  </PeminjamanProvider>
                </ProtectedRoute>
              } 
            />
            
            {/* Protected User Routes */}
            <Route 
              path="/user/*" 
              element={
                <ProtectedRoute requiredRole="user">
                  <PeminjamanProvider>
                    <UserDashboard />
                  </PeminjamanProvider>
                </ProtectedRoute>
              } 
            />
            
            {/* Default redirect */}
            <Route path="/" element={<Navigate to="/login" replace />} />
            <Route path="*" element={<Navigate to="/login" replace />} />
          </Routes>
        </BrowserRouter>
      </div>
    </AuthProvider>
  );
};

export default App;