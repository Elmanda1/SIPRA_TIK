import React, { useState } from 'react';
import { Bell, CheckCircle, AlertCircle, Info, Clock, Search, Filter, Eye, Trash2 } from 'lucide-react';
import { useTheme } from '../../context/SettingsContext';

const NotificationsPage = () => {
  const { themeClasses } = useTheme();
  const [filter, setFilter] = useState('all');
  const [selectedNotifs, setSelectedNotifs] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [confirmAction, setConfirmAction] = useState(null);
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: 'success',
      title: 'Peminjaman Berhasil Divalidasi',
      message: 'Peminjaman ID #123 oleh John Doe telah divalidasi dan disetujui',
      time: '2 menit yang lalu',
      icon: CheckCircle,
      color: 'text-green-600',
      bgColor: 'bg-green-50',
      isRead: false
    },
    {
      id: 2,
      type: 'warning',
      title: 'Menunggu Validasi Peminjaman',
      message: 'Ada 3 peminjaman baru yang membutuhkan validasi dari admin',
      time: '1 jam yang lalu',
      icon: Clock,
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-50',
      isRead: false
    },
    {
      id: 3,
      type: 'info',
      title: 'Pembaruan Sistem',
      message: 'Sistem SIPRATIK telah diperbarui ke versi 2.1.0 dengan fitur baru',
      time: '3 jam yang lalu',
      icon: Info,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
      isRead: true
    },
    {
      id: 4,
      type: 'alert',
      title: 'Keterlambatan Pengembalian',
      message: 'Peminjaman ID #456 dan #789 telah melewati batas waktu pengembalian',
      time: '5 jam yang lalu',
      icon: AlertCircle,
      color: 'text-red-600',
      bgColor: 'bg-red-50',
      isRead: false
    },
    {
      id: 5,
      type: 'success',
      title: 'Pengembalian Barang Berhasil',
      message: 'Pengembalian ID #321 telah berhasil diproses dan dicatat',
      time: '1 hari yang lalu',
      icon: CheckCircle,
      color: 'text-green-600',
      bgColor: 'bg-green-50',
      isRead: true
    },
    {
      id: 6,
      type: 'info',
      title: 'Maintenance Sistem',
      message: 'Akan ada maintenance sistem pada tanggal 20 Juni 2025 pukul 23:00 WIB',
      time: '1 hari yang lalu',
      icon: Info,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
      isRead: true
    },
    {
      id: 7,
      type: 'warning',
      title: 'Stok Barang Menipis',
      message: 'Beberapa item inventaris sudah mencapai batas minimum stok',
      time: '2 hari yang lalu',
      icon: AlertCircle,
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-50',
      isRead: true
    },
    {
      id: 8,
      type: 'alert',
      title: 'Perangkat Rusak',
      message: 'Ada laporan kerusakan pada Proyektor ruang Meeting A1',
      time: '2 hari yang lalu',
      icon: AlertCircle,
      color: 'text-red-600',
      bgColor: 'bg-red-50',
      isRead: true
    },
    {
      id: 9,
      type: 'success',
      title: 'Inventaris Baru Ditambahkan',
      message: '5 unit laptop baru telah ditambahkan ke sistem inventaris',
      time: '3 hari yang lalu',
      icon: CheckCircle,
      color: 'text-green-600',
      bgColor: 'bg-green-50',
      isRead: true
    },
    {
      id: 10,
      type: 'info',
      title: 'Backup Data Berhasil',
      message: 'Backup data sistem berhasil dilakukan secara otomatis',
      time: '3 hari yang lalu',
      icon: Info,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
      isRead: true
    }
  ]);

  // Stats calculation
  const stats = {
    total: notifications.length,
    unread: notifications.filter(n => !n.isRead).length,
    today: notifications.filter(n => n.time.includes('menit') || n.time.includes('jam')).length
  };

  const filterOptions = [
    { value: 'all', label: 'Semua Notifikasi', count: stats.total },
    { value: 'unread', label: 'Belum Dibaca', count: stats.unread },
    { value: 'success', label: 'Sukses', count: notifications.filter(n => n.type === 'success').length },
    { value: 'warning', label: 'Peringatan', count: notifications.filter(n => n.type === 'warning').length },
    { value: 'info', label: 'Informasi', count: notifications.filter(n => n.type === 'info').length },
    { value: 'alert', label: 'Penting', count: notifications.filter(n => n.type === 'alert').length }
  ];

  // Filter notifications
  const filteredNotifications = notifications.filter(notif => {
    const matchesFilter = filter === 'all' ? true : 
                         filter === 'unread' ? !notif.isRead : 
                         notif.type === filter;
    
    const matchesSearch = searchQuery === '' ? true :
      notif.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      notif.message.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesFilter && matchesSearch;
  });

  // Handlers
  const handleSelectNotif = (id) => {
    setSelectedNotifs(prev => 
      prev.includes(id) ? prev.filter(nId => nId !== id) : [...prev, id]
    );
  };

  const handleNotificationClick = (notification) => {
    setSelectedNotifs(prev => {
      if (prev.includes(notification.id)) {
        return prev.filter(id => id !== notification.id);
      } else {
        return [...prev, notification.id];
      }
    });
  };

  const handleMarkAsRead = async () => {
    if (selectedNotifs.length === 0) return;
    
    setLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      setNotifications(prev => 
        prev.map(notif => 
          selectedNotifs.includes(notif.id) ? { ...notif, isRead: true } : notif
        )
      );
      setSelectedNotifs([]);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (selectedNotifs.length === 0) return;

    setLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      setNotifications(prev => 
        prev.filter(notif => !selectedNotifs.includes(notif.id))
      );
      setSelectedNotifs([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-full w-full">
      {/* Main Content Container */}
      <div className="p-4 md:p-6 space-y-6">
        {/* Page Header */}
        <div className="flex flex-col lg:flex-row justify-between gap-4 items-start lg:items-center">
            <h1 className={`text-4xl font-bold ${themeClasses.textPrimary}`}>
              Notifikasi
            </h1>

          <div className="flex flex-wrap items-center gap-3 w-full lg:w-auto">
            <div className="relative flex-1 lg:flex-none">
              <input
                type="text"
                placeholder="Cari notifikasi..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={`w-full lg:w-64 pl-9 pr-4 py-2 rounded-lg border ${themeClasses.bgCard} ${themeClasses.border}`}
              />
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            </div>

            <div className="relative w-full lg:w-auto">
              <select
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                className={`w-full lg:w-auto pl-9 pr-4 py-2 rounded-lg border ${themeClasses.bgCard} ${themeClasses.border}`}
              >
                {filterOptions.map(option => (
                  <option key={option.value} value={option.value}>
                    {`${option.label} (${option.count})`}
                  </option>
                ))}
              </select>
              <Filter className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { label: 'Total Notifikasi', value: stats.total, color: 'blue' },
            { label: 'Belum Dibaca', value: stats.unread, color: 'yellow' },
            { label: 'Hari Ini', value: stats.today, color: 'green' }
          ].map((stat, index) => (
            <div 
              key={index}
              className={`p-4 rounded-lg border ${themeClasses.bgCard} ${themeClasses.border}`}
            >
              <div className={`text-${stat.color}-600 text-2xl font-bold`}>
                {stat.value}
              </div>
              <div className={`${themeClasses.textSecondary} text-sm`}>
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        {/* Bulk Actions */}
        {selectedNotifs.length > 0 && (
          <div className="flex items-center justify-between p-4 bg-white rounded-lg border">
            <span className={`${themeClasses.textSecondary}`}>
              {selectedNotifs.length} notifikasi dipilih
            </span>
            <div className="flex gap-2">
              <button
                onClick={handleMarkAsRead}
                disabled={loading}
                className="px-4 py-2 text-sm rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-100 
                  flex items-center gap-2 disabled:opacity-50"
              >
                <Eye className="w-4 h-4" />
                Tandai Dibaca
              </button>
              <button
                onClick={handleDelete}
                disabled={loading}
                className="px-4 py-2 text-sm rounded-lg bg-red-50 text-red-600 hover:bg-red-100 
                  flex items-center gap-2 disabled:opacity-50"
              >
                <Trash2 className="w-4 h-4" />
                Hapus
              </button>
            </div>
          </div>
        )}

        {/* Notifications List */}
        <div className="space-y-4 px-2"> {/* Changed from bg-white rounded-lg border to space-y-4 px-2 */}
          {filteredNotifications.map((notification) => ( // Removed index parameter
            <NotificationItem
              key={notification.id}
              notification={notification}
              isSelected={selectedNotifs.includes(notification.id)}
              onClick={() => handleNotificationClick(notification)}
              themeClasses={themeClasses}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

const NotificationItem = ({ notification, isSelected, onClick, themeClasses }) => {
  const IconComponent = notification.icon;
  
  return (
    <div
      onClick={onClick}
      className={`p-4 transition-all relative w-full
        cursor-pointer select-none group
        transform transition-transform duration-200 ease-in-out
        rounded-xl mx-2 my-1.5
        ${isSelected 
          ? 'ring-2 ring-blue-500 ring-inset scale-[1.01] shadow-md bg-blue-50/30' 
          : 'hover:bg-gray-50/80 hover:scale-[1.005] hover:shadow-sm border-2 border-gray-100'
        }`}
      style={{
        transition: 'all 0.2s ease-in-out',
      }}
    >
      <div className="flex items-start gap-4">
        <div className={`p-2.5 rounded-full transition-all duration-200
          ${notification.bgColor} 
          ${isSelected ? 'scale-110' : 'group-hover:scale-105'}`}
        >
          <IconComponent className={`w-6 h-6 ${notification.color} 
            transition-all duration-200
            ${isSelected ? 'rotate-12' : 'group-hover:rotate-6'}`} 
          />
        </div>
        <div className="flex-1 min-w-0"> {/* Added min-w-0 for text truncation */}
          <div className="flex items-center gap-2">
            <h3 className={`font-semibold ${themeClasses.textPrimary} 
              transition-all duration-200 truncate
              ${isSelected ? 'text-blue-600' : ''}`}
            >
              {notification.title}
            </h3>
            {!notification.isRead && (
              <span className={`w-2 h-2 flex-shrink-0 rounded-full bg-blue-500
                transition-all duration-200
                ${isSelected ? 'scale-125' : ''}`} 
              />
            )}
          </div>
          <p className={`text-sm mt-1 ${themeClasses.textSecondary}
            transition-all duration-200 line-clamp-2
            ${isSelected ? 'text-blue-600/80' : ''}`}
          >
            {notification.message}
          </p>
          <span className={`text-xs mt-2 block ${themeClasses.textMuted}`}>
            {notification.time}
          </span>
        </div>
      </div>
    </div>
  );
};

export default NotificationsPage;