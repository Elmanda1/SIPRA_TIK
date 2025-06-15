import React from 'react';
import { useTheme } from '../../context/ThemeContext';

const StatCard = ({ title, value, icon: Icon, change, changeType = 'positive' }) => {
  // Menggunakan theme context
  const { themeClasses, isDark } = useTheme();

  const getChangeColor = () => {
    if (changeType === 'positive') return 'text-green-600';
    if (changeType === 'negative') return 'text-red-600';
    return isDark ? 'text-gray-400' : 'text-gray-600';
  };

  const getChangeIcon = () => {
    if (changeType === 'positive') return '↗';
    if (changeType === 'negative') return '↘';
    return '→';
  };

  const getIconBgColor = () => {
    return isDark ? 'bg-blue-900/30' : 'bg-blue-100';
  };

  const getIconColor = () => {
    return isDark ? 'text-blue-400' : 'text-blue-600';
  };

  return (
    <div className={`rounded-lg shadow p-6 ${themeClasses.bgCard} ${themeClasses.border} border`}>
      <div className="flex items-center">
        <div className="flex-shrink-0">
          <div className={`w-12 h-12 ${getIconBgColor()} rounded-lg flex items-center justify-center`}>
            <Icon className={`w-6 h-6 ${getIconColor()}`} />
          </div>
        </div>
        <div className="ml-4 flex-1">
          <p className={`text-sm font-medium ${themeClasses.textSecondary}`}>{title}</p>
          <div className="flex items-center">
            <p className={`text-2xl font-semibold ${themeClasses.textPrimary}`}>{value}</p>
            {change && (
              <div className={`ml-2 flex items-center text-sm ${getChangeColor()}`}>
                <span className="mr-1">{getChangeIcon()}</span>
                <span>{change}</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatCard;