// src/components/common/LogoutModal.jsx
import React, { useState } from 'react';
import { LogOut, X, AlertTriangle } from 'lucide-react';

const LogoutModal = ({ isOpen, onClose, onConfirm, userRole = 'Admin' }) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleConfirm = async () => {
    setIsLoading(true);
    
    // Simulate logout process (you can adjust this)
    await new Promise(resolve => setTimeout(resolve, 800));
    
    onConfirm();
    setIsLoading(false);
  };

  // Don't render if modal is not open
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl max-w-md w-full mx-4 transform transition-all">
        {/* Modal Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="flex-shrink-0 w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
              <AlertTriangle className="w-5 h-5 text-red-600" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Konfirmasi Logout</h3>
              <p className="text-sm text-gray-500">{userRole} Dashboard SIPRATIK</p>
            </div>
          </div>
          <button
            onClick={onClose}
            disabled={isLoading}
            className="p-2 hover:bg-blue-50 bg-white rounded-full outline outline-2 outline-gray-200 focus:outline-none transition-colors disabled:opacity-50"
          >
            <X className="w-8 h-8 text-gray-400" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6">
          <div className="text-center">
            <div className="mx-auto flex items-center justify-center w-16 h-16 bg-red-100 rounded-full mb-4">
              <LogOut className="w-8 h-8 text-red-600" />
            </div>
            <h4 className="text-lg font-medium text-gray-900 mb-2">
              Apakah Anda yakin ingin logout?
            </h4>
            <p className="text-gray-600 mb-6">
              Anda akan keluar dari sesi {userRole.toLowerCase()} dan akan dialihkan ke halaman login.
            </p>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="flex items-center justify-end space-x-3 px-6 py-4 bg-gray-50 rounded-b-xl">
          <button
            onClick={onClose}
            disabled={isLoading}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 transition-colors"
          >
            Batal
          </button>
          <button
            onClick={handleConfirm}
            disabled={isLoading}
            className="px-4 py-2 text-sm font-medium text-white bg-red-600 border border-transparent rounded-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 disabled:opacity-50 transition-colors flex items-center space-x-2"
          >
            {isLoading ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                <span>Logging out...</span>
              </>
            ) : (
              <>
                <LogOut className="w-4 h-4" />
                <span>Ya, Logout</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default LogoutModal;