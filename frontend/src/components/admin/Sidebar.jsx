import React from 'react';
import { Home, Users, BarChart3, Settings, X, LogOut } from 'lucide-react';

const Sidebar = ({ isOpen, onClose, activeMenu, setActiveMenu }) => {
  const menuItems = [
    { id: 'dashboard', name: 'Dashboard', icon: Home },
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

  return (
    <>
      {isOpen && (
        <div 
          className="fixed inset-0 bg-white bg-opacity-50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}
      
      <aside className="fixed top-0 left-0 z-50 w-64 h-screen bg-white shadow-lg border-r border-gray-200 flex flex-col">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">Menu</h2>
          <button 
            onClick={onClose}
            className="p-1 rounded-lg hover:bg-gray-100 lg:hidden focus:outline-none"
          >
            <X className="w-5 h-5" />
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
                      ? 'bg-blue-100 text-blue-700' 
                      : 'text-gray-700 bg-white hover:bg-gray-100'
                  }`}
                >
                  <item.icon className="w-5 h-5" />
                  <span>{item.name}</span>
                </button>
              </li>
            ))}
          </ul>
        </nav>

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
    </>
  );
};

export default Sidebar;