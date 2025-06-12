import React, { useState } from 'react';
import { Menu, Bell, User, Search, Settings, LogOut } from 'lucide-react';

const Header = ({ onMenuClick, sidebarOpen }) => {
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showSearch, setShowSearch] = useState(false);

  const notifications = [
    { id: 1, title: "Laporan baru diterima", time: "2 menit lalu" },
    { id: 2, title: "Update sistem berhasil", time: "1 jam lalu" },
    { id: 3, title: "Backup data selesai", time: "3 jam lalu" },
  ];

  return (
    <header className="bg-white shadow-sm border-b border-gray-200 px-4 lg:px-6 py-4">
      <div className="flex h-[56px] items-center justify-between">
        {/* Left Section */}
        <div className="flex items-center space-x-4">
          <button
            onClick={onMenuClick}
            className="p-2 rounded-lg hover:bg-gray-100 lg:hidden"
          >
            <Menu className="w-5 h-5" />
          </button>
          <h1 className="text-[38px] font-extrabold text-gray-900 ">Admin SIPRATIK</h1>
        </div>

        {/* Right Section */}
        <div className="flex items-center space-x-2">
          {/* Search */}
          <div className="relative">
            <button
              onClick={() => setShowSearch(!showSearch)}
              className="p-2 rounded-lg bg-white hover:bg-gray-100 relative focus:outline-none"
            >
              <Search className="w-5 h-5 text-gray-600" />
            </button>
            
            {showSearch && (
              <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
                <div className="p-3">
                  <input
                    type="text"
                    placeholder="Cari data, laporan, atau dokumen..."
                    className="w-full px-3 py-2 border bg-white border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    autoFocus
                  />
                </div>
              </div>
            )}
          </div>

          {/* Notifications */}
          <div className="relative">
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className="p-2 rounded-lg bg-white hover:bg-gray-100 relative focus:outline-none"
            >
              <Bell className="w-5 h-5 text-gray-600" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>

            {showNotifications && (
              <div className="absolute right-0 mt-2 w-72 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
                <div className="p-3 border-b border-gray-100">
                  <h3 className="font-medium text-gray-900">Notifikasi</h3>
                </div>
                <div className="max-h-64 overflow-y-auto">
                  {notifications.map((notif) => (
                    <div key={notif.id} className="p-3 hover:bg-gray-50 border-b border-gray-50 last:border-b-0">
                      <p className="text-sm font-medium text-gray-900">{notif.title}</p>
                      <p className="text-xs text-gray-500 mt-1">{notif.time}</p>
                    </div>
                  ))}
                </div>
                <div className="p-3 border-t border-gray-100">
                  <button className="w-full text-center text-sm bg-white text-blue-600 hover:text-blue-700">
                    Lihat semua
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* User Profile */}
          <div className="relative">
            <button
              onClick={() => setShowUserMenu(!showUserMenu)}
              className="p-2 rounded-lg bg-white hover:bg-gray-100 relative focus:outline-none"
            >
              <User className="w-5 h-5 text-gray-600" />
            </button>

            {showUserMenu && (
              <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
                <div className="p-4 border-b border-gray-100">
                  <p className="font-medium text-gray-900">Admin User</p>
                  <p className="text-sm text-gray-500">admin@sipratik.go.id</p>
                </div>
                <div className="p-2">
                  <button className="w-full flex items-center space-x-2 px-3 py-2 text-left bg-white hover:bg-gray-50 rounded-lg">
                    <User className="w-4 h-4 text-gray-500" />
                    <span className="text-sm text-gray-700">Profil Saya</span>
                  </button>
                  <button className="w-full flex items-center space-x-2 px-3 py-2 text-left bg-white hover:bg-gray-50 rounded-lg">
                    <Settings className="w-4 h-4 text-gray-500" />
                    <span className="text-sm text-gray-700">Pengaturan</span>
                  </button>
                  <hr className="my-2" />
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