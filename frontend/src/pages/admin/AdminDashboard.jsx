// src/pages/admin/AdminDashboard.jsx
import React, { useState, useEffect, useRef } from 'react';
import { useAuth } from '../../context/AuthContext';
import { 
  LayoutDashboard, 
  BarChart3, 
  Users, 
  Settings, 
  LogOut, 
  Menu, 
  X,
  PackageCheck,
  Bell // Tambahkan import Bell
} from 'lucide-react';

// Update imports
import DashboardContent from '../../components/admin/DashboardContent';
import AnalyticsContent from '../../components/admin/AnalyticsContent';
import UsersManagement from '../../components/admin/UsersManagement';
import AdminSettings from '../../components/admin/AdminSettings';
import ValidasiBarang from '../../components/admin/ValidasiBarang'; // Import komponen baru
import NotificationsPage from '../../components/admin/NotificationsPage'; // Import NotificationsPage
import Header from '../../components/admin/Header';
import LogoutModal from '../../components/common/LogoutModal';
import logoImg from '../../assets/SIPRATIK.png';
import { useTheme } from '../../context/SettingsContext';

const AdminDashboard = () => {
  document.title = "Admin SIPRATIK";
  const { logout } = useAuth();
  const { themeClasses, isDark } = useTheme(); // Menggunakan theme context
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [currentPage, setCurrentPage] = useState('dashboard');
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  
  // Ref untuk main content area
  const mainContentRef = useRef(null);

  // Effect untuk scroll to top ketika currentPage berubah
  useEffect(() => {
    if (mainContentRef.current) {
      mainContentRef.current.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [currentPage]);

  // Update menuItems array
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'validasi-barang', label: 'Validasi Barang', icon: PackageCheck },
    { id: 'analytics', label: 'Analytics', icon: BarChart3 },
    { id: 'notifications', label: 'Notifikasi', icon: Bell }, // Tambahkan menu notifikasi
    { id: 'users', label: 'Users', icon: Users },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  // Update renderContent function (pastikan sudah ada)
  const renderContent = () => {
    switch (currentPage) {
      case 'dashboard':
        return <DashboardContent setActiveMenu={setCurrentPage} />;
      case 'validasi-barang':
        return <ValidasiBarang />;
      case 'analytics':
        return <AnalyticsContent />;
      case 'notifications':
        return <NotificationsPage />;
      case 'users':
        return <UsersManagement />;
      case 'settings':
        return <AdminSettings />;
      default:
        return <DashboardContent setActiveMenu={setCurrentPage} />;
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

  // Dynamic classes based on theme
  const getSidebarClasses = () => {
    return isDark 
      ? 'bg-zinc-800 shadow-lg border-r border-gray-700' 
      : 'bg-white shadow-lg border-r border-gray-200';
  };

  const getSidebarHeaderClasses = () => {
    return isDark 
      ? 'border-b border-gray-700' 
      : 'border-b border-gray-200';
  };

  const getMenuItemClasses = (isActive) => {
  return isActive
    ? (isDark 
        ? 'bg-blue-100 text-blue-700'
        : 'bg-blue-100 text-blue-700'
        )
    : (isDark 
        ? 'text-gray-300 bg-zinc-800 hover:bg-zinc-700' 
        : 'text-gray-700 bg-white hover:bg-gray-100');
  };
  
  const getSidebarFooterClasses = () => {
    return isDark 
      ? 'border-t border-gray-700' 
      : 'border-t border-gray-200';
  };

  const getLogoutButtonClasses = () => {
    return isDark 
      ? 'text-red-400 hover:bg-red-900/30 hover:text-red-300' 
      : 'bg-white text-red-600 hover:bg-red-50 hover:text-red-700';
  };

  const getCloseButtonClasses = () => {
    return isDark 
      ? 'hover:bg-gray-700' 
      : 'hover:bg-gray-100';
  };

  const getOverlayClasses = () => {
    return isDark 
      ? 'bg-black bg-opacity-50' 
      : 'bg-white bg-opacity-50';
  };

  return (
    <div className={`h-screen w-screen flex ${themeClasses.bgPrimary} hide-scrollbar overflow-hidden`}>
      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div 
          className={`fixed inset-0 ${getOverlayClasses()} z-40 lg:hidden`}
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar - Fixed position dengan hide scrollbar */}
      <aside className={`fixed top-0 left-0 z-50 w-64 h-screen ${getSidebarClasses()} flex flex-col transition-transform duration-300 ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
      }`}>
        {/* Sidebar Header */}
        <div className={`flex items-center justify-between p-6 ${getSidebarHeaderClasses()}`}>
             <img
                  src={logoImg}
                  alt="Logo"
                  className="w-100 h-10 hover:brightness-110 transition-all duration-200"
             />
          <button 
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className={`p-1 rounded-lg ${getCloseButtonClasses()} lg:hidden focus:outline-none`}
          >
            <X className={`w-5 h-5 ${themeClasses.textSecondary}`} />
          </button>
        </div>
        
        {/* Navigation Menu dengan hide scrollbar */}
        <nav className="flex-1 p-4 hide-scrollbar overflow-y-auto">
          <ul className="space-y-2">
            {menuItems.map((item) => {
              const IconComponent = item.icon;
              return (
                <li key={item.id}>
                  <button
                    onClick={() => setCurrentPage(item.id)}
                    className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-colors focus:outline-none ${getMenuItemClasses(currentPage === item.id)}`}
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
        <div className={`p-4 ${getSidebarFooterClasses()}`}>
          <button
            onClick={handleLogout}
            className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-colors focus:outline-none hover:outline-none ${getLogoutButtonClasses()}`}
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
          onMenuClick={() => setSidebarOpen(!sidebarOpen)}
          sidebarOpen={sidebarOpen}
          onNavigate={(page) => setCurrentPage(page)} 
        />
        
        {/* Main Content dengan hide scrollbar */}
        <main ref={mainContentRef} className={`flex-1 ${themeClasses.bgPrimary} hide-scrollbar overflow-auto`}>
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