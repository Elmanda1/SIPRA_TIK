// src/pages/admin/AdminDashboard.jsx
import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { 
  LayoutDashboard, 
  BarChart3, 
  Users, 
  Settings, 
  LogOut, 
  Menu, 
  X 
} from 'lucide-react';

// Update imports
import DashboardContent from '../../components/admin/DashboardContent';
import AnalyticsContent from '../../components/admin/AnalyticsContent';
import UsersManagement from '../../components/admin/UsersManagement';
import AdminSettings from '../../components/admin/AdminSettings';
import Header from '../../components/admin/Header';
import LogoutModal from '../../components/common/LogoutModal';
import logoImg from '../../assets/SIPRATIK.png';

const AdminDashboard = () => {
  document.title = "Admin SIPRATIK";
  const { logout } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [currentPage, setCurrentPage] = useState('dashboard');
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'analytics', label: 'Analytics', icon: BarChart3 },
    { id: 'users', label: 'Users', icon: Users },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  const renderContent = () => {
    switch (currentPage) {
      case 'dashboard':
        return <DashboardContent />;
      case 'analytics':
        return <AnalyticsContent />;
      case 'users':
        return <UsersManagement />;
      case 'settings':
        return <AdminSettings />;
      default:
        return <DashboardContent />;
    }
  };

  const handleLogout = () => {
    setShowLogoutModal(true);
  };

  const handleConfirmLogout = () => {
    logout();
    setShowLogoutModal(false);
    // Optional: Show success message or toast notification
    console.log('User logged out successfully');
  };

  const handleMenuClick = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="h-screen w-screen flex bg-gray-50">
      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-white bg-opacity-50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar - Fixed position */}
      <aside className={`fixed top-0 left-0 z-50 w-64 h-screen bg-white shadow-lg border-r border-gray-200 flex flex-col transition-transform duration-300 ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
      }`}>
        {/* Sidebar Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
             <img
                  src={logoImg}
                  alt="Logo"
                  className="w-100 h-10 hover:brightness-110 transition-all duration-200"
             />
          <button 
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-1 rounded-lg hover:bg-gray-100 lg:hidden focus:outline-none"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        
        {/* Navigation Menu */}
        <nav className="flex-1 p-4">
          <ul className="space-y-2">
            {menuItems.map((item) => {
              const IconComponent = item.icon;
              return (
                <li key={item.id}>
                  <button
                    onClick={() => setCurrentPage(item.id)}
                    className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-colors focus:outline-none ${
                      currentPage === item.id
                        ? 'bg-blue-100 text-blue-700' 
                        : 'text-gray-700 bg-white hover:bg-gray-100'
                    }`}
                  >
                    <IconComponent className="w-5 h-5" />
                    <span>{item.label}</span>
                  </button>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Sidebar Footer - Tombol Logout */}
        <div className="p-4 border-t border-gray-200">
          <button
            onClick={handleLogout}
            className="w-full flex items-center bg-white space-x-3 px-4 py-3 rounded-lg text-left transition-colors text-red-600 hover:bg-red-50 hover:text-red-700 focus:outline-none hover:outline-none"
          >
            <LogOut className="w-5 h-5" />
            <span>Logout</span>
          </button>
        </div>
      </aside>
      
      {/* Main Content Area dengan margin left untuk sidebar */}
      <div className={`flex-1 flex flex-col min-h-screen transition-all duration-300 ${
        sidebarOpen ? 'lg:ml-64' : 'lg:ml-64'
      }`}>
        {/* Enhanced Header Component */}
        <Header 
          onMenuClick={handleMenuClick}
          sidebarOpen={sidebarOpen}
        />
        
        {/* Main Content */}
        <main className="flex-1 bg-gray-50">
          <div className="p-4 lg:p-6 h-full w-full">
            {renderContent()}
          </div>
        </main>
      </div>

      {/* Logout Modal */}
      <LogoutModal
        isOpen={showLogoutModal}
        onClose={() => setShowLogoutModal(false)}
        onConfirm={handleConfirmLogout}
        userRole="Admin"
      />
    </div>
  );
};

export default AdminDashboard;