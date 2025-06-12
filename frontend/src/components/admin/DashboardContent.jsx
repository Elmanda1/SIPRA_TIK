import React from 'react';
import { 
  Users, 
  DollarSign, 
  ShoppingCart, 
  TrendingUp, 
  Clock, 
  CheckCircle, 
  XCircle, 
  BookOpen, 
  Calendar,
  BarChart3 
} from 'lucide-react';
import StatCard from './StatCard';
import SalesChart from './Charts/SalesChart';
import UserActivityChart from './Charts/UserActivityChart';
import UserActivityData, { 
  userActivityData, 
  userStatistics, 
  calculateUserStats 
} from './Charts/UserActivityData';

const DashboardContent = () => {
  // Hitung statistik pengguna real-time
  const userStats = calculateUserStats();

  // Updated stats dengan data real dari UserActivityData
  const stats = [
    {
      title: "Total Peminjaman",
      value: "156",
      change: "+12%",
      icon: BookOpen,
      color: "bg-blue-500"
    },
    {
      title: "Pending Approval",
      value: "7",
      change: "+5%",
      icon: Clock,
      color: "bg-yellow-500"
    },
    {
      title: "Approved Today",
      value: "10",
      change: "+8%",
      icon: CheckCircle,
      color: "bg-green-500"
    },
    {
      title: "Total Users",
      value: userStatistics.totalUsers.toString(),
      change: userStatistics.growthRate,
      icon: Users,
      color: "bg-purple-500"
    }
  ];

  // Data untuk chart peminjaman
  const borrowingChartData = [
    { name: 'Jan', value: 45 },
    { name: 'Feb', value: 52 },
    { name: 'Mar', value: 38 },
    { name: 'Apr', value: 65 },
    { name: 'May', value: 72 },
    { name: 'Jun', value: 58 },
    { name: 'Jul', value: 85 },
    { name: 'Aug', value: 92 },
    { name: 'Sep', value: 78 },
    { name: 'Oct', value: 65 },
    { name: 'Nov', value: 88 },
    { name: 'Dec', value: 95 }
  ];

  const recentActivities = [
  {
    id: 1,
    user: "Muhammad Rafif Dwarka",
    action: "Meminjam alat",
    item: "Laptop, Proyektor",
    time: "2 jam yang lalu",
    status: "approved"
  },
  {
    id: 2,
    user: "Falih Elmanda Ghaisan",
    action: "Pembatalan peminjaman",
    item: "Ruang GSG 204",
    time: "4 jam yang lalu",
    status: "cancelled"
  },
  {
    id: 3,
    user: "Hari Bernardo",
    action: "Meminjam ruangan",
    item: "Ruang GSG 211",
    time: "6 jam yang lalu",
    status: "pending"
  },
  {
    id: 4,
    user: "Muhammad Aurakha Ghazy Zackhary",
    action: "Meminjam alat",
    item: "Kamera Digital, Tripod",
    time: "7 jam yang lalu",
    status: "approved"
  },
  {
    id: 5,
    user: "Raden Mas Fidel Khalid Ramadhan",
    action: "Meminjam ruangan",
    item: "Ruang AA 204",
    time: "9 jam yang lalu",
    status: "cancelled"
  },
  {
    id: 6,
    user: "Muhammad Rafif Dwarka",
    action: "Meminjam alat",
    item: "Speaker",
    time: "12 jam yang lalu",
    status: "approved"
  },
  {
    id: 7,
    user: "Falih Elmanda Ghaisan",
    action: "Meminjam ruangan",
    item: "Ruang GSG 202",
    time: "15 jam yang lalu",
    status: "pending"
  },
  {
    id: 8,
    user: "Hari Bernardo",
    action: "Meminjam alat",
    item: "Proyektor",
    time: "1 hari yang lalu",
    status: "approved"
  },
  {
    id: 9,
    user: "Muhammad Aurakha Ghazy Zackhary",
    action: "Pembatalan peminjaman",
    item: "Ruang GSG 208",
    time: "2 hari yang lalu",
    status: "cancelled"
  },
  {
    id: 10,
    user: "Raden Mas Fidel Khalid Ramadhan",
    action: "Meminjam ruangan",
    item: "Ruang GSG 209",
    time: "3 hari yang lalu",
    status: "approved"
  }
];

  const getStatusColor = (status) => {
    switch (status) {
      case 'approved':
        return 'text-green-600 bg-green-100';
      case 'pending':
        return 'text-yellow-600 bg-yellow-100';
      case 'returned':
        return 'text-blue-600 bg-blue-100';
      case 'active':
        return 'text-purple-600 bg-purple-100';
      case 'cancelled':
        return 'text-red-600 bg-red-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'approved':
        return <CheckCircle className="w-4 h-4" />;
      case 'pending':
        return <Clock className="w-4 h-4" />;
      case 'returned':
        return <BookOpen className="w-4 h-4" />;
      case 'active':
        return <Users className="w-4 h-4" />;
      default:
        return <XCircle className="w-4 h-4" />;
    }
  };

  return (
    <div className="min-h-screen w-full space-y-6 bg-gray-50 px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600">Selamat datang kembali! Berikut ringkasan aktivitas hari ini.</p>
        </div>
        <div className="text-sm text-gray-500">
          <Calendar className="inline w-4 h-4 mr-1" />
          {new Date().toLocaleDateString('id-ID', { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
          })}
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <StatCard key={index} {...stat} />
        ))}
      </div>

      {/* Additional User Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Pengguna Aktif Hari Ini</p>
              <p className="text-2xl font-bold text-gray-900">{userStatistics.activeUsersToday}</p>
            </div>
            <div className="p-3 bg-green-100 rounded-full">
              <Users className="w-6 h-6 text-green-600" />
            </div>
          </div>
          <p className="text-xs text-gray-500 mt-2">Tingkat keaktifan: {userStatistics.activeRate}</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Pengguna Baru Minggu Ini</p>
              <p className="text-2xl font-bold text-gray-900">{userStats.totalNewThisWeek}</p>
            </div>
            <div className="p-3 bg-blue-100 rounded-full">
              <TrendingUp className="w-6 h-6 text-blue-600" />
            </div>
          </div>
          <p className="text-xs text-gray-500 mt-2">Rata-rata: {userStats.averageNewPerDay}/hari</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Rata-rata Aktif/Hari</p>
              <p className="text-2xl font-bold text-gray-900">{userStats.averageActivePerDay}</p>
            </div>
            <div className="p-3 bg-purple-100 rounded-full">
              <BarChart3 className="w-6 h-6 text-purple-600" /> {/* Sekarang BarChart3 sudah didefinisikan */}
            </div>
          </div>
          <p className="text-xs text-gray-500 mt-2">Total minggu ini: {userStats.totalActiveThisWeek}</p>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Borrowing Chart */}
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Statistik Peminjaman</h3>
            <TrendingUp className="w-5 h-5 text-gray-400" />
          </div>
          <SalesChart data={borrowingChartData} />
        </div>

        {/* User Activity Chart */}
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Aktivitas Pengguna</h3>
            <Users className="w-5 h-5 text-gray-400" />
          </div>
          <UserActivityChart />
          <div className="mt-4 text-center text-sm text-gray-600">
            <span>Total Aktivitas Pengguna per Hari</span>
          </div>
        </div>
      </div>

      {/* Recent Activities */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Aktivitas Terbaru</h3>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            {recentActivities.map((activity) => (
              <div key={activity.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-4">
                  <div className={`p-2 rounded-full ${getStatusColor(activity.status)}`}>
                    {getStatusIcon(activity.status)}
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{activity.user}</p>
                    <p className="text-sm text-gray-600">
                      {activity.action} {activity.item !== '-' && `- ${activity.item}`}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-500">{activity.time}</p>
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(activity.status)}`}>
                    {activity.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Aksi Cepat</h3>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <button className="group flex items-center justify-center p-4 border-2 border-dashed bg-white border-gray-300 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
              <div className="text-center">
                <BookOpen className="w-8 h-8 text-gray-400 mx-auto mb-2 group-hover:text-blue-500 transition-colors" />
                <p className="font-medium text-gray-900">Validasi Sarana Prasarana</p>
                <p className="text-sm text-gray-500">Kelola koleksi Sarana Prasarana TIK</p>
              </div>
            </button>
            <button className="group flex items-center justify-center p-4 border-2 border-dashed bg-white border-gray-300 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
              <div className="text-center">
                <Users className="w-8 h-8 text-gray-400 mx-auto mb-2 group-hover:text-blue-500 transition-colors" />
                <p className="font-medium text-gray-900">Kelola Pengguna</p>
                <p className="text-sm text-gray-500">Manajemen akun pengguna</p>
              </div>
            </button>
            <button className="group flex items-center justify-center p-4 border-2 border-dashed bg-white border-gray-300 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
              <div className="text-center">
                <TrendingUp className="w-8 h-8 text-gray-400 mx-auto mb-2 group-hover:text-blue-500 transition-colors" />
                <p className="font-medium text-gray-900">Lihat Laporan</p>
                <p className="text-sm text-gray-500">Analisis dan statistik</p>
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardContent;