import React from 'react';
import { UserPlus, ShoppingCart, Users, Settings, TrendingUp } from 'lucide-react';

const ActivityFeed = ({ title = "Recent Activity" }) => {
  const activities = [
    { id: 1, type: 'user_registered', message: 'New user John Doe registered', time: '2 minutes ago', icon: UserPlus, color: 'text-green-500' },
    { id: 2, type: 'order_placed', message: 'Order #1234 placed by Jane Smith', time: '5 minutes ago', icon: ShoppingCart, color: 'text-blue-500' },
    { id: 3, type: 'user_login', message: 'User Bob Johnson logged in', time: '10 minutes ago', icon: Users, color: 'text-gray-500' },
    { id: 4, type: 'settings_updated', message: 'System settings updated', time: '15 minutes ago', icon: Settings, color: 'text-purple-500' },
    { id: 5, type: 'performance', message: 'Server performance improved by 15%', time: '1 hour ago', icon: TrendingUp, color: 'text-orange-500' },
  ];

  return (
    <div className="bg-white rounded-xl shadow-sm p-4 lg:p-6 border border-gray-100">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">{title}</h3>
      <div className="space-y-4">
        {activities.map((activity) => (
          <div key={activity.id} className="flex items-start space-x-3">
            <div className={`p-2 rounded-lg bg-gray-100 ${activity.color}`}>
              <activity.icon className="w-4 h-4" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm text-gray-900">{activity.message}</p>
              <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ActivityFeed;