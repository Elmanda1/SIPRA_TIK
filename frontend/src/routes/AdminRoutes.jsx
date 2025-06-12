import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

// Import semua komponen admin yang sudah ada
import AdminDashboard from '../pages/admin/AdminDashboard';

const AdminRoutes = () => (
  <Routes>
    {/* Default admin route ke dashboard */}
    <Route index element={<Navigate to="dashboard" replace />} />
    
    {/* Admin Dashboard - route utama */}
    <Route path="dashboard" element={<AdminDashboard />} />
    
    {/* User Management Routes */}
    <Route 
      path="users" 
      element={
        <div className="p-6">
          <h1 className="text-2xl font-bold mb-4">User Management</h1>
          <p>Halaman manajemen user akan segera tersedia.</p>
        </div>
      } 
    />
    
    {/* Analytics Routes */}
    <Route 
      path="analytics" 
      element={
        <div className="p-6">
          <h1 className="text-2xl font-bold mb-4">Analytics</h1>
          <p>Halaman analytics akan segera tersedia.</p>
        </div>
      } 
    />
    
    {/* Reports Routes */}
    <Route 
      path="reports" 
      element={
        <div className="p-6">
          <h1 className="text-2xl font-bold mb-4">Reports</h1>
          <p>Halaman reports akan segera tersedia.</p>
        </div>
      } 
    />
    
    {/* Settings Routes */}
    <Route 
      path="settings" 
      element={
        <div className="p-6">
          <h1 className="text-2xl font-bold mb-4">Settings</h1>
          <p>Halaman settings akan segera tersedia.</p>
        </div>
      } 
    />
    
    {/* Profile Routes */}
    <Route 
      path="profile" 
      element={
        <div className="p-6">
          <h1 className="text-2xl font-bold mb-4">Admin Profile</h1>
          <p>Halaman profile admin akan segera tersedia.</p>
        </div>
      } 
    />
    
    {/* System Management */}
    <Route 
      path="system" 
      element={
        <div className="p-6">
          <h1 className="text-2xl font-bold mb-4">System Management</h1>
          <p>Halaman system management akan segera tersedia.</p>
        </div>
      } 
    />
    
    {/* Catch all untuk admin routes yang tidak ditemukan */}
    <Route path="*" element={<Navigate to="dashboard" replace />} />
  </Routes>
);

export default AdminRoutes;