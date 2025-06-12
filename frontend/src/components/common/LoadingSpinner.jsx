import React from 'react';

const LoadingSpinner = () => {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-indigo-500 to-purple-600">
      <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-white"></div>
    </div>
  );
};

export default LoadingSpinner;