import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts';

const UserActivityChart = () => {
  // Data statis untuk aktivitas pengguna per hari
  const data = [
    { name: 'Sen', total: 35 },
    { name: 'Sel', total: 42 },
    { name: 'Rab', total: 38 },
    { name: 'Kam', total: 45 },
    { name: 'Jum', total: 48 },
    { name: 'Sab', total: 25 },
    { name: 'Min', total: 20 }
  ];

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 border border-gray-200 rounded-lg shadow-lg">
          <p className="font-medium text-gray-900">{`${label}`}</p>
          <p className="text-sm text-blue-600">
            Total: {payload[0].value} pengguna
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" vertical={false} />
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
        <Bar 
          dataKey="total" 
          fill="#3B82F6" 
          radius={[4, 4, 0, 0]}
          maxBarSize={50}
        />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default UserActivityChart;