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
  Pie,  // Tambahkan import Pie
  Cell,
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer 
} from 'recharts';

const AnalyticsContent = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('monthly');
  const [selectedMetric, setSelectedMetric] = useState('borrowing');

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

  // Updated data for TIK infrastructure
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
    const colors = {
      blue: 'text-blue-600 bg-blue-100',
      green: 'text-green-600 bg-green-100',
      purple: 'text-purple-600 bg-purple-100',
      yellow: 'text-yellow-600 bg-yellow-100'
    };
    return colors[color] || 'text-gray-600 bg-gray-100';
  };

  const getStatusColor = (status) => {
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
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Analytics</h1>
          <p className="text-gray-600">Analisis mendalam tentang aktivitas peminjaman sarana & prasarana TIK</p>
        </div>
        
        <div className="flex flex-wrap items-center gap-3">
          <select 
            value={selectedPeriod}
            onChange={(e) => setSelectedPeriod(e.target.value)}
            className="px-3 py-2 border bg-white border-gray-300 rounded-lg text-sm text-black focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
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
          <div key={index} className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
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
              <h3 className="text-2xl font-bold text-gray-900">{metric.value}</h3>
              <p className="text-sm text-gray-600 mt-1">{metric.title}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Main Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Borrowing Trend Chart */}
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 lg:col-span-2">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">Tren Peminjaman & Pengembalian</h3>
            <div className="flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-gray-400" />
            </div>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={borrowingTrendData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
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
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">Distribusi Kategori Peminjaman</h3>
            <PieChart className="w-5 h-5 text-gray-400" />
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
              <Tooltip />
              <Legend />
            </RechartsPieChart>
          </ResponsiveContainer>
        </div>

        {/* User Activity by Time */}
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">Aktivitas Pengguna per Waktu</h3>
            <Activity className="w-5 h-5 text-gray-400" />
          </div>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={userActivityData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="day" />
              <YAxis />
              <Tooltip />
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
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">Peralatan TIK Terpopuler</h3>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {topEquipmentData.map((equipment, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="flex-shrink-0 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                      <span className="text-sm font-medium text-blue-600">{index + 1}</span>
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{equipment.name}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <p className="text-sm text-gray-500">{equipment.category}</p>
                        <span className={`text-xs px-2 py-1 rounded-full ${getStatusColor(equipment.status)}`}>
                          {equipment.status}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-gray-900">{equipment.borrowCount}</p>
                    <p className="text-xs text-gray-500">peminjaman</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Equipment Status Overview */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">Status Ketersediaan Peralatan</h3>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {equipmentStatusData.map((category, index) => (
                <div key={index} className="p-4 border border-gray-200 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium text-gray-900">{category.category}</h4>
                    <span className="text-sm text-gray-500">Total: {category.total}</span>
                  </div>
                  <div className="grid grid-cols-3 gap-3 text-sm">
                    <div className="text-center">
                      <div className="text-lg font-semibold text-green-600">{category.available}</div>
                      <div className="text-gray-500">Tersedia</div>
                    </div>
                    <div className="text-center">
                      <div className="text-lg font-semibold text-blue-600">{category.inUse}</div>
                      <div className="text-gray-500">Digunakan</div>
                    </div>
                    <div className="text-center">
                      <div className="text-lg font-semibold text-red-600">{category.maintenance}</div>
                      <div className="text-gray-500">Maintenance</div>
                    </div>
                  </div>
                  <div className="mt-3 bg-gray-200 rounded-full h-2">
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

      {/* Recent Insights - Updated for TIK Infrastructure */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Insights & Rekomendasi</h3>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <TrendingUp className="w-4 h-4 text-blue-600" />
                <span className="font-medium text-blue-900">Peningkatan Penggunaan</span>
              </div>
              <p className="text-sm text-blue-800">
                Permintaan peralatan Audio Visual meningkat 23% bulan ini. Pertimbangkan menambah inventory projector dan speaker.
              </p>
            </div>
            
            <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <AlertTriangle className="w-4 h-4 text-yellow-600" />
                <span className="font-medium text-yellow-900">Peringatan Maintenance</span>
              </div>
              <p className="text-sm text-yellow-800">
                5 unit peralatan memerlukan maintenance rutin. Jadwalkan pemeliharaan untuk mencegah kerusakan.
              </p>
            </div>
            
            <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <CheckCircle className="w-4 h-4 text-green-600" />
                <span className="font-medium text-green-900">Pencapaian Target</span>
              </div>
              <p className="text-sm text-green-800">
                Tingkat ketersediaan peralatan mencapai 87.3%, melampaui target minimal 85%. Excellent performance!
              </p>
            </div>
            
            <div className="p-4 bg-purple-50 border border-purple-200 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <Wifi className="w-4 h-4 text-purple-600" />
                <span className="font-medium text-purple-900">Optimasi Jaringan</span>
              </div>
              <p className="text-sm text-purple-800">
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