import React from 'react';
import { Home, Users, BarChart3, Settings, X, LogOut, PackageCheck } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

const Sidebar = ({ isOpen, onClose, activeMenu, setActiveMenu }) => {
  const { themeClasses, isDark } = useTheme();
  
  const menuItems = [
    { id: 'dashboard', name: 'Dashboard', icon: Home },
    { id: 'validasi-barang', name: 'Validasi Barang Pinjaman', icon: PackageCheck },
    { id: 'users', name: 'Users', icon: Users },
    { id: 'analytics', name: 'Analytics', icon: BarChart3 },
    { id: 'settings', name: 'Settings', icon: Settings },
  ];

  const handleLogout = () => {
    if (window.confirm('Apakah Anda yakin ingin logout?')) {
      alert('Logout berhasil!');
      onClose();
    }
  };

  const getActiveMenuClasses = () => {
    return isDark 
      ? 'bg-blue-900/30 text-blue-400' 
      : 'bg-blue-100 text-blue-700';
  };

  const getInactiveMenuClasses = () => {
    return isDark
      ? 'text-gray-300 hover:bg-gray-700'
      : 'text-gray-700 hover:bg-gray-100';
  };

  const getLogoutButtonClasses = () => {
    return isDark
      ? 'bg-gray-800 text-red-400 hover:bg-red-900/30 hover:text-red-300'
      : 'bg-white text-red-600 hover:bg-red-50 hover:text-red-700';
  };

  return (
    <>
      {isOpen && (
        <div 
          className={`fixed inset-0 ${isDark ? 'bg-black/50' : 'bg-white/50'} z-40 lg:hidden`}
          onClick={onClose}
        />
      )}
      
      <aside className={`fixed top-0 left-0 z-50 w-64 h-screen shadow-lg border-r flex flex-col ${themeClasses.bgPrimary} ${themeClasses.border}`}>
        <div className={`flex items-center justify-between p-6 border-b ${themeClasses.border}`}>
          <h2 className={`text-lg font-semibold ${themeClasses.textPrimary}`}>Menu</h2>
          <button 
            onClick={onClose}
            className={`p-1 rounded-lg ${isDark ? 'hover:bg-gray-700' : 'hover:bg-gray-100'} lg:hidden focus:outline-none`}
          >
            <X className={`w-5 h-5 ${themeClasses.textPrimary}`} />
          </button>
        </div>
        
        <nav className="flex-1 p-4">
          <ul className="space-y-2">
            {menuItems.map((item) => (
              <li key={item.id}>
                <button
                  onClick={() => {
                    setActiveMenu(item.id);
                    onClose();
                  }}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-colors focus:outline-none ${
                    activeMenu === item.id 
                      ? getActiveMenuClasses()
                      : getInactiveMenuClasses()
                  }`}
                >
                  <item.icon className="w-5 h-5" />
                  <span>{item.name}</span>
                </button>
              </li>
            ))}
          </ul>
        </nav>

        <div className={`p-4 border-t ${themeClasses.border}`}>
          <button
            onClick={handleLogout}
            className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-colors focus:outline-none hover:outline-none ${getLogoutButtonClasses()}`}
          >
            <LogOut className="w-5 h-5" />
            <span>Logout</span>
          </button>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;