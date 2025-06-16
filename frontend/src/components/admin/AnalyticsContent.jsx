// src/components/admin/AnalyticsContent.jsx
import React, { useState } from 'react';
import { 
  TrendingUp, 
  Users, 
  BookOpen, 
  Calendar, 
  Download,
  Filter,
  BarChart3,
  PieChart,
  Activity,
  Clock,
  Award,
  Target,
  AlertTriangle,
  CheckCircle,
  Monitor,
  Wifi
} from 'lucide-react';
import { 
  LineChart, 
  Line, 
  AreaChart,
  Area,
  BarChart, 
  Bar, 
  PieChart as RechartsPieChart,
  Pie,
  Cell,
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer 
} from 'recharts';
import { useTheme } from '../../context/SettingsContext';

const AnalyticsContent = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('monthly');
  const [selectedMetric, setSelectedMetric] = useState('borrowing');

  // Menggunakan theme context
  const { themeClasses, isDark } = useTheme();

  // Data untuk berbagai charts
  const borrowingTrendData = [
    { month: 'Jan', peminjaman: 45, pengembalian: 42, terlambat: 3 },
    { month: 'Feb', peminjaman: 52, pengembalian: 48, terlambat: 4 },
    { month: 'Mar', peminjaman: 38, pengembalian: 35, terlambat: 3 },
    { month: 'Apr', peminjaman: 65, pengembalian: 61, terlambat: 4 },
    { month: 'May', peminjaman: 72, pengembalian: 68, terlambat: 4 },
    { month: 'Jun', peminjaman: 58, pengembalian: 55, terlambat: 3 },
    { month: 'Jul', peminjaman: 85, pengembalian: 80, terlambat: 5 },
    { month: 'Aug', peminjaman: 92, pengembalian: 87, terlambat: 5 },
    { month: 'Sep', peminjaman: 78, pengembalian: 74, terlambat: 4 },
    { month: 'Oct', peminjaman: 65, pengembalian: 62, terlambat: 3 },
    { month: 'Nov', peminjaman: 88, pengembalian: 84, terlambat: 4 },
    { month: 'Dec', peminjaman: 95, pengembalian: 90, terlambat: 5 }
  ];

  const categoryData = [
    { name: 'Ruang Kelas', value: 120, color: '#3B82F6' },
    { name: 'Pel. Audio Visual', value: 85, color: '#10B981' },
    { name: 'Pel. Komputer', value: 95, color: '#F59E0B' },
    { name: 'Pel. Jaringan', value: 60, color: '#EF4444' },
    { name: 'Pel. Listrik', value: 45, color: '#8B5CF6' },
    { name: 'Lainnya', value: 35, color: '#6B7280' }
  ];

  const userActivityData = [
    { day: 'Sen', morning: 25, afternoon: 45, evening: 20 },
    { day: 'Sel', morning: 30, afternoon: 50, evening: 25 },
    { day: 'Rab', morning: 20, afternoon: 40, evening: 18 },
    { day: 'Kam', morning: 35, afternoon: 55, evening: 30 },
    { day: 'Jum', morning: 40, afternoon: 60, evening: 35 },
    { day: 'Sab', morning: 45, afternoon: 35, evening: 15 },
    { day: 'Min', morning: 35, afternoon: 25, evening: 12 }
  ];

  const topEquipmentData = [
    { name: 'Projector Epson EB-X05', borrowCount: 45, category: 'Audio Visual', status: 'Baik' },
    { name: 'Laptop Dell Inspiron 15', borrowCount: 38, category: 'Komputer', status: 'Baik' },
    { name: 'Speaker Aktif JBL EON615', borrowCount: 32, category: 'Audio Visual', status: 'Baik' },
    { name: 'Wireless Microphone Shure', borrowCount: 28, category: 'Audio Visual', status: 'Perlu Servis' },
    { name: 'Switch Cisco 24-Port', borrowCount: 25, category: 'Jaringan', status: 'Baik' }
  ];

  const equipmentStatusData = [
    { category: 'Ruang Kelas', total: 120, available: 95, inUse: 20, maintenance: 5 },
    { category: 'Audio Visual', total: 85, available: 68, inUse: 15, maintenance: 2 },
    { category: 'Komputer', total: 95, available: 72, inUse: 20, maintenance: 3 },
    { category: 'Jaringan', total: 60, available: 48, inUse: 10, maintenance: 2 },
    { category: 'Listrik', total: 45, available: 40, inUse: 4, maintenance: 1 }
  ];

  const performanceMetrics = [
    { 
      title: 'Rata-rata Peminjaman/Hari',
      value: '24.3',
      change: '+5.2%',
      trend: 'up',
      icon: Monitor,
      color: 'blue'
    },
    {
      title: 'Tingkat Pengembalian Tepat Waktu',
      value: '94.2%',
      change: '+2.1%',
      trend: 'up',
      icon: Clock,
      color: 'green'
    },
    {
      title: 'Tingkat Ketersediaan Peralatan',
      value: '87.3%',
      change: '+1.8%',
      trend: 'up',
      icon: CheckCircle,
      color: 'purple'
    },
    {
      title: 'Equipment Utilization Rate',
      value: '73.5%',
      change: '+4.2%',
      trend: 'up',
      icon: Activity,
      color: 'yellow'
    }
  ];

  const getMetricColor = (color) => {
    if (isDark) {
      const darkColors = {
        blue: 'text-blue-400 bg-blue-900/30',
        green: 'text-green-400 bg-green-900/30',
        purple: 'text-purple-400 bg-purple-900/30',
        yellow: 'text-yellow-400 bg-yellow-900/30'
      };
      return darkColors[color] || 'text-gray-400 bg-gray-800/30';
    } else {
      const lightColors = {
        blue: 'text-blue-600 bg-blue-100',
        green: 'text-green-600 bg-green-100',
        purple: 'text-purple-600 bg-purple-100',
        yellow: 'text-yellow-600 bg-yellow-100'
      };
      return lightColors[color] || 'text-gray-600 bg-gray-100';
    }
  };

  const getStatusColor = (status) => {
    if (isDark) {
      switch (status) {
        case 'Baik':
          return 'bg-green-900/30 text-green-400';
        case 'Perlu Servis':
          return 'bg-yellow-900/30 text-yellow-400';
        case 'Rusak':
          return 'bg-red-900/30 text-red-400';
        default:
          return 'bg-gray-800/30 text-gray-400';
      }
    } else {
      switch (status) {
        case 'Baik':
          return 'bg-green-100 text-green-800';
        case 'Perlu Servis':
          return 'bg-yellow-100 text-yellow-800';
        case 'Rusak':
          return 'bg-red-100 text-red-800';
        default:
          return 'bg-gray-100 text-gray-800';
      }
    }
  };

  const getInsightBgColor = (type) => {
    if (isDark) {
      const darkInsights = {
        blue: 'bg-blue-900/20 border-blue-800/30',
        yellow: 'bg-yellow-900/20 border-yellow-800/30',
        green: 'bg-green-900/20 border-green-800/30',
        purple: 'bg-purple-900/20 border-purple-800/30'
      };
      return darkInsights[type] || 'bg-gray-800/20 border-gray-700/30';
    } else {
      const lightInsights = {
        blue: 'bg-blue-50 border-blue-200',
        yellow: 'bg-yellow-50 border-yellow-200',
        green: 'bg-green-50 border-green-200',
        purple: 'bg-purple-50 border-purple-200'
      };
      return lightInsights[type] || 'bg-gray-50 border-gray-200';
    }
  };

  const getInsightTextColor = (type) => {
    if (isDark) {
      const darkText = {
        blue: { title: 'text-blue-400', content: 'text-blue-300' },
        yellow: { title: 'text-yellow-400', content: 'text-yellow-300' },
        green: { title: 'text-green-400', content: 'text-green-300' },
        purple: { title: 'text-purple-400', content: 'text-purple-300' }
      };
      return darkText[type] || { title: 'text-gray-400', content: 'text-gray-300' };
    } else {
      const lightText = {
        blue: { title: 'text-blue-900', content: 'text-blue-800' },
        yellow: { title: 'text-yellow-900', content: 'text-yellow-800' },
        green: { title: 'text-green-900', content: 'text-green-800' },
        purple: { title: 'text-purple-900', content: 'text-purple-800' }
      };
      return lightText[type] || { title: 'text-gray-900', content: 'text-gray-800' };
    }
  };

  // Custom Tooltip for charts
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className={`p-3 rounded-lg shadow-lg border ${themeClasses.bgCard} ${themeClasses.border}`}>
          <p className={`font-medium ${themeClasses.textPrimary}`}>{label}</p>
          {payload.map((entry, index) => (
            <p key={index} style={{ color: entry.color }} className="text-sm">
              {entry.name}: {entry.value}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className={`space-y-6 p-6 min-h-screen ${themeClasses.bgPrimary}`}>
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-8">
        <div>
          <h1 className={`text-4xl font-bold mb-2 ${themeClasses.textPrimary}`}>Analytics</h1>
          <p className={`text-xl ${themeClasses.textSecondary}`}>Analisis mendalam tentang aktivitas peminjaman sarana & prasarana TIK</p>
        </div>
        
        <div className="flex flex-wrap items-center gap-3">
          <select 
            value={selectedPeriod}
            onChange={(e) => setSelectedPeriod(e.target.value)}
            className={`px-3 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${themeClasses.bgInput} ${themeClasses.borderInput} ${themeClasses.textPrimary}`}
          >
            <option value="weekly">7 Hari Terakhir</option>
            <option value="monthly">30 Hari Terakhir</option>
            <option value="quarterly">3 Bulan Terakhir</option>
            <option value="yearly">1 Tahun Terakhir</option>
          </select>
          
          <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            <Download className="w-4 h-4" />
            Export
          </button>
        </div>
      </div>

      {/* Performance Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {performanceMetrics.map((metric, index) => (
          <div key={index} className={`p-6 rounded-lg shadow-sm border ${themeClasses.bgCard} ${themeClasses.border}`}>
            <div className="flex items-center justify-between">
              <div className={`p-3 rounded-lg ${getMetricColor(metric.color)}`}>
                <metric.icon className="w-6 h-6" />
              </div>
              <span className={`text-sm font-medium ${
                metric.trend === 'up' ? 'text-green-600' : 'text-red-600'
              }`}>
                {metric.change}
              </span>
            </div>
            <div className="mt-4">
              <h3 className={`text-2xl font-bold ${themeClasses.textPrimary}`}>{metric.value}</h3>
              <p className={`text-sm mt-1 ${themeClasses.textSecondary}`}>{metric.title}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Main Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Borrowing Trend Chart */}
        <div className={`p-6 rounded-lg shadow-sm border lg:col-span-2 ${themeClasses.bgCard} ${themeClasses.border}`}>
          <div className="flex items-center justify-between mb-6">
            <h3 className={`text-lg font-semibold ${themeClasses.textPrimary}`}>Tren Peminjaman & Pengembalian</h3>
            <div className="flex items-center gap-2">
              <BarChart3 className={`w-5 h-5 ${themeClasses.textMuted}`} />
            </div>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={borrowingTrendData}>
              <CartesianGrid strokeDasharray="3 3" stroke={isDark ? '#374151' : '#e5e7eb'} />
              <XAxis 
                dataKey="month" 
                tick={{ fill: isDark ? '#9ca3af' : '#6b7280', fontSize: 12 }}
                axisLine={{ stroke: isDark ? '#4b5563' : '#d1d5db' }}
              />
              <YAxis 
                tick={{ fill: isDark ? '#9ca3af' : '#6b7280', fontSize: 12 }}
                axisLine={{ stroke: isDark ? '#4b5563' : '#d1d5db' }}
              />
              <Tooltip content={<CustomTooltip />} />
              <Legend />
              <Area 
                type="monotone" 
                dataKey="peminjaman" 
                stackId="1"
                stroke="#3B82F6" 
                fill="#3B82F6" 
                fillOpacity={0.6}
                name="Peminjaman"
              />
              <Area 
                type="monotone" 
                dataKey="pengembalian" 
                stackId="2"
                stroke="#10B981" 
                fill="#10B981" 
                fillOpacity={0.6}
                name="Pengembalian"
              />
              <Area 
                type="monotone" 
                dataKey="terlambat" 
                stackId="3"
                stroke="#EF4444" 
                fill="#EF4444" 
                fillOpacity={0.6}
                name="Terlambat"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Category Distribution */}
        <div className={`p-6 rounded-lg shadow-sm border ${themeClasses.bgCard} ${themeClasses.border}`}>
          <div className="flex items-center justify-between mb-6">
            <h3 className={`text-lg font-semibold ${themeClasses.textPrimary}`}>Distribusi Kategori Peminjaman</h3>
            <PieChart className={`w-5 h-5 ${themeClasses.textMuted}`} />
          </div>
          <ResponsiveContainer width="100%" height={250}>
            <RechartsPieChart>
              <Pie
                data={categoryData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                paddingAngle={5}
                dataKey="value"
              >
                {categoryData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
              <Legend />
            </RechartsPieChart>
          </ResponsiveContainer>
        </div>

        {/* User Activity by Time */}
        <div className={`p-6 rounded-lg shadow-sm border ${themeClasses.bgCard} ${themeClasses.border}`}>
          <div className="flex items-center justify-between mb-6">
            <h3 className={`text-lg font-semibold ${themeClasses.textPrimary}`}>Aktivitas Pengguna per Waktu</h3>
            <Activity className={`w-5 h-5 ${themeClasses.textMuted}`} />
          </div>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={userActivityData}>
              <CartesianGrid strokeDasharray="3 3" stroke={isDark ? '#374151' : '#e5e7eb'} />
              <XAxis 
                dataKey="day" 
                tick={{ fill: isDark ? '#9ca3af' : '#6b7280', fontSize: 12 }}
                axisLine={{ stroke: isDark ? '#4b5563' : '#d1d5db' }}
              />
              <YAxis 
                tick={{ fill: isDark ? '#9ca3af' : '#6b7280', fontSize: 12 }}
                axisLine={{ stroke: isDark ? '#4b5563' : '#d1d5db' }}
              />
              <Tooltip content={<CustomTooltip />} />
              <Legend />
              <Bar dataKey="morning" fill="#F59E0B" name="Pagi" />
              <Bar dataKey="afternoon" fill="#3B82F6" name="Siang" />
              <Bar dataKey="evening" fill="#8B5CF6" name="Sore" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Tables Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Equipment */}
        <div className={`rounded-lg shadow-sm border ${themeClasses.bgCard} ${themeClasses.border}`}>
          <div className={`p-6 border-b ${themeClasses.border}`}>
            <h3 className={`text-lg font-semibold ${themeClasses.textPrimary}`}>Peralatan TIK Terpopuler</h3>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {topEquipmentData.map((equipment, index) => (
                <div key={index} className={`flex items-center justify-between p-3 rounded-lg ${themeClasses.hoverCard}`}>
                  <div className="flex items-center space-x-3">
                    <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${isDark ? 'bg-blue-900/30' : 'bg-blue-100'}`}>
                      <span className={`text-sm font-medium ${isDark ? 'text-blue-400' : 'text-blue-600'}`}>{index + 1}</span>
                    </div>
                    <div>
                      <p className={`font-medium ${themeClasses.textPrimary}`}>{equipment.name}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <p className={`text-sm ${themeClasses.textSecondary}`}>{equipment.category}</p>
                        <span className={`text-xs px-2 py-1 rounded-full ${getStatusColor(equipment.status)}`}>
                          {equipment.status}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className={`font-semibold ${themeClasses.textPrimary}`}>{equipment.borrowCount}</p>
                    <p className={`text-xs ${themeClasses.textSecondary}`}>peminjaman</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Equipment Status Overview */}
        <div className={`rounded-lg shadow-sm border ${themeClasses.bgCard} ${themeClasses.border}`}>
          <div className={`p-6 border-b ${themeClasses.border}`}>
            <h3 className={`text-lg font-semibold ${themeClasses.textPrimary}`}>Status Ketersediaan Peralatan</h3>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {equipmentStatusData.map((category, index) => (
                <div key={index} className={`p-4 border rounded-lg ${themeClasses.border}`}>
                  <div className="flex items-center justify-between mb-2">
                    <h4 className={`font-medium ${themeClasses.textPrimary}`}>{category.category}</h4>
                    <span className={`text-sm ${themeClasses.textSecondary}`}>Total: {category.total}</span>
                  </div>
                  <div className="grid grid-cols-3 gap-3 text-sm">
                    <div className="text-center">
                      <div className="text-lg font-semibold text-green-600">{category.available}</div>
                      <div className={themeClasses.textSecondary}>Tersedia</div>
                    </div>
                    <div className="text-center">
                      <div className="text-lg font-semibold text-blue-600">{category.inUse}</div>
                      <div className={themeClasses.textSecondary}>Digunakan</div>
                    </div>
                    <div className="text-center">
                      <div className="text-lg font-semibold text-red-600">{category.maintenance}</div>
                      <div className={themeClasses.textSecondary}>Maintenance</div>
                    </div>
                  </div>
                  <div className={`mt-3 rounded-full h-2 ${isDark ? 'bg-gray-700' : 'bg-gray-200'}`}>
                    <div 
                      className="bg-green-500 h-2 rounded-full" 
                      style={{ width: `${(category.available / category.total) * 100}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Recent Insights */}
      <div className={`rounded-lg shadow-sm border ${themeClasses.bgCard} ${themeClasses.border}`}>
        <div className={`p-6 border-b ${themeClasses.border}`}>
          <h3 className={`text-lg font-semibold ${themeClasses.textPrimary}`}>Insights & Rekomendasi</h3>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className={`p-4 border rounded-lg ${getInsightBgColor('blue')}`}>
              <div className="flex items-center gap-2 mb-2">
                <TrendingUp className={`w-4 h-4 ${isDark ? 'text-blue-400' : 'text-blue-600'}`} />
                <span className={`font-medium ${getInsightTextColor('blue').title}`}>Peningkatan Penggunaan</span>
              </div>
              <p className={`text-sm ${getInsightTextColor('blue').content}`}>
                Permintaan peralatan Audio Visual meningkat 23% bulan ini. Pertimbangkan menambah inventory projector dan speaker.
              </p>
            </div>
            
            <div className={`p-4 border rounded-lg ${getInsightBgColor('yellow')}`}>
              <div className="flex items-center gap-2 mb-2">
                <AlertTriangle className={`w-4 h-4 ${isDark ? 'text-yellow-400' : 'text-yellow-600'}`} />
                <span className={`font-medium ${getInsightTextColor('yellow').title}`}>Peringatan Maintenance</span>
              </div>
              <p className={`text-sm ${getInsightTextColor('yellow').content}`}>
                5 unit peralatan memerlukan maintenance rutin. Jadwalkan pemeliharaan untuk mencegah kerusakan.
              </p>
            </div>
            
            <div className={`p-4 border rounded-lg ${getInsightBgColor('green')}`}>
              <div className="flex items-center gap-2 mb-2">
                <CheckCircle className={`w-4 h-4 ${isDark ? 'text-green-400' : 'text-green-600'}`} />
                <span className={`font-medium ${getInsightTextColor('green').title}`}>Pencapaian Target</span>
              </div>
              <p className={`text-sm ${getInsightTextColor('green').content}`}>
                Tingkat ketersediaan peralatan mencapai 87.3%, melampaui target minimal 85%. Excellent performance!
              </p>
            </div>
            
            <div className={`p-4 border rounded-lg ${getInsightBgColor('purple')}`}>
              <div className="flex items-center gap-2 mb-2">
                <Wifi className={`w-4 h-4 ${isDark ? 'text-purple-400' : 'text-purple-600'}`} />
                <span className={`font-medium ${getInsightTextColor('purple').title}`}>Optimasi Jaringan</span>
              </div>
              <p className={`text-sm ${getInsightTextColor('purple').content}`}>
                Peralatan jaringan memiliki utilization rate tertinggi (85%). Pertimbangkan upgrade infrastruktur network.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsContent;