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
import { useTheme } from '../../context/SettingsContext';

const DashboardContent = ({ setActiveMenu }) => {
  const { themeClasses, isDark } = useTheme();
  
  // Hitung statistik pengguna real-time
  const userStats = calculateUserStats();

  // Enhanced navigation handlers untuk quick actions dengan smooth scroll
  const handleNavigationWithScroll = (menuId) => {
    setActiveMenu(menuId);
    setTimeout(() => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
      const mainContent = document.querySelector('main');
      if (mainContent) {
        mainContent.scrollTo({
          top: 0,
          behavior: 'smooth'
        });
      }
    }, 50);
  };

  const handleValidasiSaranaPrasarana = () => handleNavigationWithScroll('validasi-barang');
  const handleKelolaPengguna = () => handleNavigationWithScroll('users');
  const handleLihatLaporan = () => handleNavigationWithScroll('analytics');

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
    if (isDark) {
      switch (status) {
        case 'approved': return 'text-green-400 bg-green-900/30';
        case 'pending': return 'text-yellow-400 bg-yellow-900/30';
        case 'returned': return 'text-blue-400 bg-blue-900/30';
        case 'active': return 'text-purple-400 bg-purple-900/30';
        case 'cancelled': return 'text-red-400 bg-red-900/30';
        default: return 'text-gray-400 bg-gray-800';
      }
    } else {
      switch (status) {
        case 'approved': return 'text-green-600 bg-green-100';
        case 'pending': return 'text-yellow-600 bg-yellow-100';
        case 'returned': return 'text-blue-600 bg-blue-100';
        case 'active': return 'text-purple-600 bg-purple-100';
        case 'cancelled': return 'text-red-600 bg-red-100';
        default: return 'text-gray-600 bg-gray-100';
      }
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'approved': return <CheckCircle className="w-4 h-4" />;
      case 'pending': return <Clock className="w-4 h-4" />;
      case 'returned': return <BookOpen className="w-4 h-4" />;
      case 'active': return <Users className="w-4 h-4" />;
      default: return <XCircle className="w-4 h-4" />;
    }
  };

  const getQuickActionHoverClass = (color) => {
    return isDark 
      ? `hover:border-${color}-400 hover:bg-${color}-900/20`
      : `hover:border-${color}-500 hover:bg-${color}-50`;
  };

  return (
    <div className={`min-h-screen w-full space-y-6 p-6 ${themeClasses.bgPrimary}`}>
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className={`text-4xl font-bold ${themeClasses.textPrimary} mb-2`}>Dashboard</h1>
          <p className={`text-xl ${themeClasses.textSecondary}`}>Selamat datang kembali! Berikut ringkasan aktivitas hari ini.</p>
        </div>
        <div className={`text-sm ${themeClasses.textMuted}`}>
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
        <div className={`p-6 rounded-lg shadow-sm border ${themeClasses.border} ${themeClasses.bgCard}`}>
          <div className="flex items-center justify-between">
            <div>
              <p className={`text-sm font-medium ${themeClasses.textSecondary}`}>Pengguna Aktif Hari Ini</p>
              <p className={`text-2xl font-bold ${themeClasses.textPrimary}`}>{userStatistics.activeUsersToday}</p>
            </div>
            <div className={`p-3 ${isDark ? 'bg-green-900/30' : 'bg-green-100'} rounded-full`}>
              <Users className={`w-6 h-6 ${isDark ? 'text-green-400' : 'text-green-600'}`} />
            </div>
          </div>
          <p className={`text-xs ${themeClasses.textMuted} mt-2`}>Tingkat keaktifan: {userStatistics.activeRate}</p>
        </div>

        <div className={`p-6 rounded-lg shadow-sm border ${themeClasses.border} ${themeClasses.bgCard}`}>
          <div className="flex items-center justify-between">
            <div>
              <p className={`text-sm font-medium ${themeClasses.textSecondary}`}>Pengguna Baru Minggu Ini</p>
              <p className={`text-2xl font-bold ${themeClasses.textPrimary}`}>{userStats.totalNewThisWeek}</p>
            </div>
            <div className={`p-3 ${isDark ? 'bg-blue-900/30' : 'bg-blue-100'} rounded-full`}>
              <TrendingUp className={`w-6 h-6 ${isDark ? 'text-blue-400' : 'text-blue-600'}`} />
            </div>
          </div>
          <p className={`text-xs ${themeClasses.textMuted} mt-2`}>Rata-rata: {userStats.averageNewPerDay}/hari</p>
        </div>

        <div className={`p-6 rounded-lg shadow-sm border ${themeClasses.border} ${themeClasses.bgCard}`}>
          <div className="flex items-center justify-between">
            <div>
              <p className={`text-sm font-medium ${themeClasses.textSecondary}`}>Rata-rata Aktif/Hari</p>
              <p className={`text-2xl font-bold ${themeClasses.textPrimary}`}>{userStats.averageActivePerDay}</p>
            </div>
            <div className={`p-3 ${isDark ? 'bg-purple-900/30' : 'bg-purple-100'} rounded-full`}>
              <BarChart3 className={`w-6 h-6 ${isDark ? 'text-purple-400' : 'text-purple-600'}`} />
            </div>
          </div>
          <p className={`text-xs ${themeClasses.textMuted} mt-2`}>Total minggu ini: {userStats.totalActiveThisWeek}</p>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Borrowing Chart */}
        <div className={`p-6 rounded-lg shadow-sm border ${themeClasses.border} ${themeClasses.bgCard}`}>
          <div className="flex items-center justify-between mb-4">
            <h3 className={`text-lg font-semibold ${themeClasses.textPrimary}`}>Statistik Peminjaman</h3>
            <TrendingUp className={`w-5 h-5 ${themeClasses.textMuted}`} />
          </div>
          <SalesChart data={borrowingChartData} darkMode={isDark} />
        </div>

        {/* User Activity Chart */}
        <div className={`p-6 rounded-lg shadow-sm border ${themeClasses.border} ${themeClasses.bgCard}`}>
          <div className="flex items-center justify-between mb-4">
            <h3 className={`text-lg font-semibold ${themeClasses.textPrimary}`}>Aktivitas Pengguna</h3>
            <Users className={`w-5 h-5 ${themeClasses.textMuted}`} />
          </div>
          <UserActivityChart darkMode={isDark} />
          <div className={`mt-4 text-center text-sm ${themeClasses.textMuted}`}>
            <span>Total Aktivitas Pengguna per Hari</span>
          </div>
        </div>
      </div>

      {/* Recent Activities */}
      <div className={`rounded-lg shadow-sm border ${themeClasses.border} ${themeClasses.bgCard}`}>
        <div className={`p-6 border-b ${themeClasses.border}`}>
          <h3 className={`text-lg font-semibold ${themeClasses.textPrimary}`}>Aktivitas Terbaru</h3>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            {recentActivities.map((activity) => (
              <div key={activity.id} className={`flex items-center justify-between p-4 rounded-lg ${isDark ? 'bg-zinc-800' : 'bg-gray-50'}`}>
                <div className="flex items-center space-x-4">
                  <div className={`p-2 rounded-full ${getStatusColor(activity.status)}`}>
                    {getStatusIcon(activity.status)}
                  </div>
                  <div>
                    <p className={`font-medium ${themeClasses.textPrimary}`}>{activity.user}</p>
                    <p className={`text-sm ${themeClasses.textSecondary}`}>
                      {activity.action} {activity.item !== '-' && `- ${activity.item}`}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className={`text-sm ${themeClasses.textMuted}`}>{activity.time}</p>
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(activity.status)}`}>
                    {activity.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Actions with Enhanced Navigation */}
      <div className={`rounded-lg shadow-sm border ${themeClasses.border} ${themeClasses.bgCard}`}>
        <div className={`p-6 border-b ${themeClasses.border}`}>
          <h3 className={`text-lg font-semibold ${themeClasses.textPrimary}`}>Aksi Cepat</h3>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Validasi Sarana Prasarana Button */}
            <button 
              onClick={handleValidasiSaranaPrasarana}
              className={`group flex items-center justify-center p-4 border-2 border-dashed rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 cursor-pointer transform hover:scale-105
                ${isDark ? 'border-zinc-600 bg-zinc-800 hover:border-blue-400 hover:bg-blue-900/20 focus:ring-blue-500 focus:ring-offset-zinc-800' : 'border-gray-300 bg-white hover:border-blue-500 hover:bg-blue-50 focus:ring-blue-500 focus:ring-offset-white'}`}
            >
              <div className="text-center">
                <BookOpen className={`w-8 h-8 mx-auto mb-2 transition-colors ${isDark ? 'text-gray-400 group-hover:text-blue-400' : 'text-gray-400 group-hover:text-blue-500'}`} />
                <p className={`font-medium ${themeClasses.textPrimary}`}>Validasi Sarana Prasarana</p>
                <p className={`text-sm ${themeClasses.textMuted}`}>Kelola koleksi Sarana Prasarana TIK</p>
              </div>
            </button>

            {/* Kelola Pengguna Button */}
            <button 
              onClick={handleKelolaPengguna}
              className={`group flex items-center justify-center p-4 border-2 border-dashed rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 cursor-pointer transform hover:scale-105
                ${isDark ? 'border-zinc-600 bg-zinc-800 hover:border-green-400 hover:bg-green-900/20 focus:ring-green-500 focus:ring-offset-zinc-800' : 'border-gray-300 bg-white hover:border-green-500 hover:bg-green-50 focus:ring-green-500 focus:ring-offset-white'}`}
            >
              <div className="text-center">
                <Users className={`w-8 h-8 mx-auto mb-2 transition-colors ${isDark ? 'text-gray-400 group-hover:text-green-400' : 'text-gray-400 group-hover:text-green-500'}`} />
                <p className={`font-medium ${themeClasses.textPrimary}`}>Kelola Pengguna</p>
                <p className={`text-sm ${themeClasses.textMuted}`}>Manajemen akun pengguna</p>
              </div>
            </button>

            {/* Lihat Laporan Button */}
            <button 
              onClick={handleLihatLaporan}
              className={`group flex items-center justify-center p-4 border-2 border-dashed rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 cursor-pointer transform hover:scale-105
                ${isDark ? 'border-zinc-600 bg-zinc-800 hover:border-purple-400 hover:bg-purple-900/20 focus:ring-purple-500 focus:ring-offset-zinc-800' : 'border-gray-300 bg-white hover:border-purple-500 hover:bg-purple-50 focus:ring-purple-500 focus:ring-offset-white'}`}
            >
              <div className="text-center">
                <TrendingUp className={`w-8 h-8 mx-auto mb-2 transition-colors ${isDark ? 'text-gray-400 group-hover:text-purple-400' : 'text-gray-400 group-hover:text-purple-500'}`} />
                <p className={`font-medium ${themeClasses.textPrimary}`}>Lihat Laporan</p>
                <p className={`text-sm ${themeClasses.textMuted}`}>Analisis dan statistik</p>
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardContent;