import React, { createContext, useContext, useState, useEffect } from 'react';

// Theme Context
const ThemeContext = createContext();

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

export const ThemeProvider = ({ children }) => {
  const [settings, setSettings] = useState({
    general: {
      siteName: 'SIPRA TIK',
      siteDescription: 'Dashboard untuk mengelola peminjaman sarana dan prasarana PNJ jurusan TIK',
      language: 'id',
      timezone: 'Asia/Jakarta',
      dateFormat: 'DD/MM/YYYY',
      currency: 'IDR'
    },
    notifications: {
      emailNotifications: true,
      pushNotifications: true,
      smsNotifications: false,
      orderNotifications: true,
      stockAlerts: true,
      systemUpdates: false
    },
    security: {
      twoFactorAuth: false,
      sessionTimeout: '30',
      passwordExpiry: '90',
      loginAttempts: '5',
      ipWhitelist: false
    },
    email: {
      smtpServer: 'smtp.gmail.com',
      smtpPort: '587',
      smtpUsername: 'admin@example.com',
      smtpPassword: '••••••••',
      fromEmail: 'noreply@example.com',
      fromName: 'Admin Dashboard'
    },
    appearance: {
      theme: 'light',
      primaryColor: '#7C3AED',
      sidebarCollapsed: false,
      showAnimations: true,
      compactMode: false
    }
  });

  const updateSettings = (category, key, value) => {
    setSettings(prev => ({
      ...prev,
      [category]: {
        ...prev[category],
        [key]: value
      }
    }));
  };

  const theme = settings.appearance.theme;
  const isDark = theme === 'dark';

  const themeClasses = {
    // Backgrounds
    bgPrimary: isDark ? 'bg-zinc-900' : 'bg-gray-50',
    bgSecondary: isDark ? 'bg-zinc-800' : 'bg-white',
    bgCard: isDark ? 'bg-zinc-800' : 'bg-white',
    bgInput: isDark ? 'bg-zinc-700' : 'bg-white',
    
    // Text Colors
    textPrimary: isDark ? 'text-white' : 'text-gray-900',
    textSecondary: isDark ? 'text-gray-300' : 'text-gray-600',
    textMuted: isDark ? 'text-gray-400' : 'text-gray-500',
    
    // Borders
    border: isDark ? 'border-zinc-700' : 'border-gray-200',
    borderInput: isDark ? 'border-zinc-600' : 'border-gray-300',
    
    // Hover States
    hoverCard: isDark ? 'hover:bg-zinc-700' : 'hover:bg-gray-50',
    hoverButton: isDark ? 'hover:bg-zinc-600' : 'hover:bg-gray-100',
  };

  return (
    <ThemeContext.Provider value={{
      theme,
      isDark,
      settings,
      updateSettings,
      themeClasses
    }}>
      {children}
    </ThemeContext.Provider>
  );
};