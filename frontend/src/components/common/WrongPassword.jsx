import React from 'react';
import { X, AlertTriangle } from 'lucide-react';

const AlertModal = ({ isOpen, onClose, message = "Password salah. Silakan coba lagi." }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl max-w-sm w-full mx-4 transform transition-all">
        {/* Modal Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="flex-shrink-0 w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
              <AlertTriangle className="w-5 h-5 text-red-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900">Pemberitahuan</h3>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-blue-50 bg-white rounded-full outline outline-2 outline-gray-200 focus:outline-none transition-colors"
          >
            <X className="w-8 h-8 text-gray-400" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6">
          <div className="text-center">
            <div className="mx-auto flex items-center justify-center w-16 h-16 bg-red-100 rounded-full mb-4">
              <AlertTriangle className="w-8 h-8 text-red-600" />
            </div>
            <h4 className="text-lg font-medium text-gray-900 mb-2">
              {message}
            </h4>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="flex items-center justify-end px-6 py-4 bg-gray-50 rounded-b-xl">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
          >
            Tutup
          </button>
        </div>
      </div>
    </div>
  );
};

export default AlertModal;