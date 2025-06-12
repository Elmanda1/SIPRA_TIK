// src/components/admin/UserActivityData.jsx
import React from 'react';

// Data untuk user activity chart - aktivitas pengguna mingguan
export const userActivityData = [
  { name: 'Sen', aktif: 45, baru: 5 },    // Senin: 45 pengguna aktif, 5 pengguna baru
  { name: 'Sel', aktif: 52, baru: 8 },    // Selasa: 52 pengguna aktif, 8 pengguna baru
  { name: 'Rab', aktif: 38, baru: 3 },    // Rabu: 38 pengguna aktif, 3 pengguna baru
  { name: 'Kam', aktif: 65, baru: 12 },   // Kamis: 65 pengguna aktif, 12 pengguna baru
  { name: 'Jum', aktif: 72, baru: 15 },   // Jumat: 72 pengguna aktif, 15 pengguna baru
  { name: 'Sab', aktif: 58, baru: 7 },    // Sabtu: 58 pengguna aktif, 7 pengguna baru
  { name: 'Min', aktif: 42, baru: 4 }     // Minggu: 42 pengguna aktif, 4 pengguna baru
];

// Data untuk statistik pengguna bulanan
export const monthlyUserGrowth = [
  { name: 'Jan', total: 85, baru: 8, aktif: 68 },
  { name: 'Feb', total: 92, baru: 7, aktif: 74 },
  { name: 'Mar', total: 88, baru: 5, aktif: 71 },
  { name: 'Apr', total: 95, baru: 12, aktif: 78 },
  { name: 'May', total: 98, baru: 9, aktif: 82 },
  { name: 'Jun', total: 102, baru: 6, aktif: 85 }
];

// Statistik pengguna keseluruhan
export const userStatistics = {
  totalUsers: 102,              // Total pengguna terdaftar
  activeUsers: 85,              // Pengguna aktif bulan ini
  newUsersThisMonth: 6,         // Pengguna baru bulan ini
  newUsersThisWeek: 54,         // Total pengguna baru minggu ini (5+8+3+12+15+7+4)
  activeUsersToday: 72,         // Pengguna aktif hari ini (Jumat)
  newUsersToday: 15,            // Pengguna baru hari ini
  growthRate: "+3%",            // Pertumbuhan bulanan
  weeklyGrowthRate: "+8%",      // Pertumbuhan mingguan
  activeRate: "83%",            // Tingkat keaktifan (85/102)
  retentionRate: "76%"          // Tingkat retensi pengguna
};

// Data untuk top active users
export const topActiveUsers = [
  { name: "Ibrani Mayasari", logins: 45, lastActive: "2 jam yang lalu" },
  { name: "Taswir Sihotang", logins: 38, lastActive: "4 jam yang lalu" },
  { name: "Raditya Winarsih", logins: 32, lastActive: "1 jam yang lalu" },
  { name: "Yani Sitompul", logins: 28, lastActive: "3 jam yang lalu" },
  { name: "Xanana Handayani", logins: 25, lastActive: "5 jam yang lalu" }
];

// Data untuk user registration trend (7 hari terakhir)
export const registrationTrend = [
  { date: "2025-06-01", registrations: 4 },
  { date: "2025-06-02", registrations: 7 },
  { date: "2025-06-03", registrations: 3 },
  { date: "2025-06-04", registrations: 12 },
  { date: "2025-06-05", registrations: 15 },
  { date: "2025-06-06", registrations: 7 },
  { date: "2025-06-07", registrations: 6 }
];

// Fungsi untuk menghitung statistik
export const calculateUserStats = () => {
  const totalActiveThisWeek = userActivityData.reduce((sum, day) => sum + day.aktif, 0);
  const totalNewThisWeek = userActivityData.reduce((sum, day) => sum + day.baru, 0);
  const averageActivePerDay = Math.round(totalActiveThisWeek / userActivityData.length);
  const averageNewPerDay = Math.round(totalNewThisWeek / userActivityData.length);

  return {
    totalActiveThisWeek,
    totalNewThisWeek,
    averageActivePerDay,
    averageNewPerDay
  };
};

// Export default untuk digunakan di komponen lain
const UserActivityData = {
  userActivityData,
  monthlyUserGrowth,
  userStatistics,
  topActiveUsers,
  registrationTrend,
  calculateUserStats
};

export default UserActivityData;