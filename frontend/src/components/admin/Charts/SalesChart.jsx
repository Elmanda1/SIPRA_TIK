// src/components/admin/Charts/SalesChart.jsx
import React from 'react';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  AreaChart,
  Area
} from 'recharts';

const SalesChart = ({ 
  data = [],  
  showReturned = false,
  height = 300 
}) => {
  // Default data jika tidak ada data yang dikirim
  const defaultData = [
    { name: 'Jan', value: 45, returned: 40 },
    { name: 'Feb', value: 52, returned: 48 },
    { name: 'Mar', value: 38, returned: 35 },
    { name: 'Apr', value: 65, returned: 58 },
    { name: 'May', value: 72, returned: 65 },
    { name: 'Jun', value: 58, returned: 52 },
    { name: 'Jul', value: 85, returned: 78 },
    { name: 'Aug', value: 92, returned: 85 },
    { name: 'Sep', value: 78, returned: 70 },
    { name: 'Oct', value: 65, returned: 58 },
    { name: 'Nov', value: 88, returned: 82 },
    { name: 'Dec', value: 95, returned: 88 }
  ];

  const chartData = data.length > 0 ? data : defaultData;

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 border border-gray-200 rounded-lg shadow-lg">
          <p className="font-medium text-gray-900">{`Bulan: ${label}`}</p>
          {payload.map((entry, index) => (
            <p key={index} className="text-sm" style={{ color: entry.color }}>
              {entry.dataKey === 'value' ? 'Peminjaman' : 'Dikembalikan'}: {entry.value}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="w-full">
      <ResponsiveContainer width="100%" height={height}>
        <AreaChart data={chartData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
          <defs>
            <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.3}/>
              <stop offset="95%" stopColor="#3B82F6" stopOpacity={0}/>
            </linearGradient>
            {showReturned && (
              <linearGradient id="colorReturned" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#10B981" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#10B981" stopOpacity={0}/>
              </linearGradient>
            )}
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
          <XAxis 
            dataKey="name" 
            axisLine={false}
            tickLine={false}
            tick={{ fill: '#6B7280', fontSize: 12 }}
          />
          <YAxis 
            axisLine={false}
            tickLine={false}
            tick={{ fill: '#6B7280', fontSize: 12 }}
          />
          <Tooltip content={<CustomTooltip />} />
          <Area
            type="monotone"
            dataKey="value"
            stroke="#3B82F6"
            strokeWidth={2}
            fillOpacity={1}
            fill="url(#colorValue)"
          />
          {showReturned && (
            <Area
              type="monotone"
              dataKey="returned"
              stroke="#10B981"
              strokeWidth={2}
              fillOpacity={1}
              fill="url(#colorReturned)"
            />
          )}
        </AreaChart>
      </ResponsiveContainer>
      
      {/* Legend */}
      <div className="flex items-center justify-center gap-6 mt-4">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
          <span className="text-sm text-gray-600">Peminjaman</span>
        </div>
        {showReturned && (
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            <span className="text-sm text-gray-600">Dikembalikan</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default SalesChart;