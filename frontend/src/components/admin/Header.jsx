import React, { useState } from 'react';
import { Menu, Bell, User, Search, Settings, LogOut } from 'lucide-react';
import { useTheme } from '../../context/SettingsContext';

// Tambahkan import untuk navigasi
const Header = ({ onMenuClick, sidebarOpen, onNavigate }) => {
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  
  // Menggunakan theme context
  const { themeClasses, isDark } = useTheme();

  const notifications = [
    { id: 1, title: "Laporan baru diterima", time: "2 menit lalu" },
    { id: 2, title: "Update sistem berhasil", time: "1 jam lalu" },
    { id: 3, title: "Backup data selesai", time: "3 jam lalu" },
  ];

  // Handler untuk navigasi
  const handleNavigation = (page) => {
    onNavigate(page);
    setShowUserMenu(false);
  };

  return (
    <header className={`shadow-sm border-b px-4 lg:px-6 py-4 ${themeClasses.bgCard} ${themeClasses.border}`}>
      <div className="flex h-[56px] items-center justify-between">
        {/* Left Section */}
        <div className="flex items-center space-x-4">
          <button
            onClick={onMenuClick}
            className={`p-2 rounded-lg lg:hidden ${themeClasses.hoverCard}`}
          >
            <Menu className="w-5 h-5" />
          </button>
          <h1 className={`text-[38px] font-extrabold ${themeClasses.textPrimary}`}>Admin SIPRATIK</h1>
        </div>

        {/* Right Section */}
        <div className="flex items-center space-x-2">
          {/* Search */}
          <div className="relative">
            <button
              onClick={() => setShowSearch(!showSearch)}
              className={`p-2 rounded-lg relative focus:outline-none ${themeClasses.bgCard} ${themeClasses.hoverCard}`}
            >
              <Search className={`w-5 h-5 ${themeClasses.textSecondary}`} />
            </button>
            
            {showSearch && (
              <div className={`absolute right-0 mt-2 w-80 rounded-lg shadow-lg border z-50 ${themeClasses.bgCard} ${themeClasses.border}`}>
                <div className="p-3">
                  <input
                    type="text"
                    placeholder="Cari data, laporan, atau dokumen..."
                    className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${themeClasses.bgInput} ${themeClasses.borderInput} ${themeClasses.textPrimary} placeholder-gray-400`}
                    autoFocus
                  />
                </div>
              </div>
            )}
          </div>

          {/* User Profile */}
          <div className="relative">
            <button
              onClick={() => setShowUserMenu(!showUserMenu)}
              className={`p-2 rounded-lg relative focus:outline-none ${themeClasses.bgCard} ${themeClasses.hoverCard}`}
            >
              <User className={`w-5 h-5 ${themeClasses.textSecondary}`} />
            </button>

            {showUserMenu && (
              <div className={`absolute right-0 mt-2 w-56 rounded-lg shadow-lg border z-50 ${themeClasses.bgCard} ${themeClasses.border}`}>
                <div className={`p-4 border-b ${themeClasses.border}`}>
                  <p className={`font-medium ${themeClasses.textPrimary}`}>Admin User</p>
                  <p className={`text-sm ${themeClasses.textSecondary}`}>admin@sipratik.go.id</p>
                </div>
                <div className="p-2">
                  <button 
                    onClick={() => handleNavigation('profile')} 
                    className={`w-full flex items-center space-x-2 px-3 py-2 text-left rounded-lg ${themeClasses.bgCard} ${themeClasses.hoverCard}`}
                  >
                    <User className={`w-4 h-4 ${themeClasses.textMuted}`} />
                    <span className={`text-sm ${themeClasses.textSecondary}`}>Dashboard Admin</span>
                  </button>
                  <button 
                    onClick={() => handleNavigation('settings')} 
                    className={`w-full flex items-center space-x-2 px-3 py-2 text-left rounded-lg ${themeClasses.bgCard} ${themeClasses.hoverCard}`}
                  >
                    <Settings className={`w-4 h-4 ${themeClasses.textMuted}`} />
                    <span className={`text-sm ${themeClasses.textSecondary}`}>Pengaturan</span>
                  </button>
                  <hr className={`my-2 ${isDark ? 'border-zinc-600' : 'border-gray-200'}`} />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      
      {/* Click outside to close dropdowns */}
      {(showUserMenu || showNotifications || showSearch) && (
        <div 
          className="fixed inset-0 z-40" 
          onClick={() => {
            setShowUserMenu(false);
            setShowNotifications(false);
            setShowSearch(false);
          }}
        ></div>
      )}
    </header>
  );
};

export default Header;