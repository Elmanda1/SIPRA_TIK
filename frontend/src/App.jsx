import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/routing/ProtectedRoute';
import { PeminjamanProvider } from './context/PeminjamanContext';
import { ThemeProvider } from './context/SettingsContext';
import './index.css'
import LoginPage from './components/auth/LoginPage';
import ResetPasswordPage from './components/auth/ResetPasswordPage';
import AdminRoutes from './routes/AdminRoutes';
import UserRoutes from './routes/UserRoutes';

function App() {
  return (
    <ThemeProvider>
    <AuthProvider>
      <PeminjamanProvider>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/reset-password" element={<ResetPasswordPage />} />
            
            <Route
              path="/admin/*"
              element={
                <ProtectedRoute allowedRoles={['admin']}>
                  <AdminRoutes />
                </ProtectedRoute>
              }
            />
            
            <Route
              path="/user/*"
              element={
                <ProtectedRoute allowedRoles={['mahasiswa', 'dosen']}>
                  <UserRoutes />
                </ProtectedRoute>
              }
            />
            
            <Route path="/" element={<Navigate to="/login" replace />} />
          </Routes>
        </BrowserRouter>
      </div>
      </PeminjamanProvider>
    </AuthProvider>
    </ThemeProvider>
  );
}

export default App;