import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

// Import komponen user yang sudah ada
import UserDashboard from '../pages/user/UserDashboard';
import Home from '../pages/user/Home';

const UserRoutes = () => (
  <Routes>
    {/* Default user route ke dashboard */}
    <Route index element={<Navigate to="dashboard" replace />} />
    
    {/* User Dashboard - route utama */}
    <Route path="dashboard" element={<UserDashboard />} />
        
    {/* Profile Routes */}
    <Route 
      path="profile" 
      element={
        <div className="p-6">
          <h1 className="text-2xl font-bold mb-4">My Profile</h1>
          <p>Halaman profile user akan segera tersedia.</p>
        </div>
      } 
    />
    
    {/* Tasks/Assignments Routes */}
    <Route 
      path="tasks" 
      element={
        <div className="p-6">
          <h1 className="text-2xl font-bold mb-4">My Tasks</h1>
          <p>Halaman tasks akan segera tersedia.</p>
        </div>
      } 
    />
    
    {/* Assignments Routes */}
    <Route 
      path="assignments" 
      element={
        <div className="p-6">
          <h1 className="text-2xl font-bold mb-4">Assignments</h1>
          <p>Halaman assignments akan segera tersedia.</p>
        </div>
      } 
    />
    
    {/* Submissions Routes */}
    <Route 
      path="submissions" 
      element={
        <div className="p-6">
          <h1 className="text-2xl font-bold mb-4">My Submissions</h1>
          <p>Halaman submissions akan segera tersedia.</p>
        </div>
      } 
    />
    
    {/* Grades Routes */}
    <Route 
      path="grades" 
      element={
        <div className="p-6">
          <h1 className="text-2xl font-bold mb-4">My Grades</h1>
          <p>Halaman grades akan segera tersedia.</p>
        </div>
      } 
    />
    
    {/* Materials Routes */}
    <Route 
      path="materials" 
      element={
        <div className="p-6">
          <h1 className="text-2xl font-bold mb-4">Learning Materials</h1>
          <p>Halaman materials akan segera tersedia.</p>
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
    
    {/* Catch all untuk user routes yang tidak ditemukan */}
    <Route path="*" element={<Navigate to="dashboard" replace />} />
  </Routes>
);

export default UserRoutes;