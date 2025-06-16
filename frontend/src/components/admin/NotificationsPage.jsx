import React, { useState } from 'react';
import { Bell, CheckCircle, AlertCircle, Info, Clock, Search, Filter, Eye, Trash2 } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

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

  const handleMarkAsRead = async () => {
    setLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      setNotifications(prev => 
        prev.map(notif => 
          selectedNotifs.includes(notif.id) ? { ...notif, isRead: true } : notif
        )
      );
      setSelectedNotifs([]);
      setShowConfirmDialog(false);
    } catch (error) {
      console.error('Error marking as read:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    setLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      setNotifications(prev => 
        prev.filter(notif => !selectedNotifs.includes(notif.id))
      );
      setSelectedNotifs([]);
      setShowConfirmDialog(false);
    } catch (error) {
      console.error('Error deleting:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-full w-full">
      {/* Main Content Container */}
      <div className="p-4 md:p-6 space-y-6 max-w-full">
        {/* Page Header */}
        <div className="flex flex-col lg:flex-row justify-between gap-4 items-start lg:items-center">
          <div className="flex items-center gap-3">
            <Bell className="w-8 h-8 text-blue-600" />
            <h1 className={`text-2xl font-bold ${themeClasses.textPrimary}`}>
              Notifikasi
            </h1>
          </div>

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

        {/* Notifications List */}
        <div className="space-y-3">
          {selectedNotifs.length > 0 && (
            <div className="flex items-center gap-2 mb-4">
              <button
                onClick={() => {
                  setConfirmAction('read');
                  setShowConfirmDialog(true);
                }}
                className="px-4 py-2 text-sm rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-100 flex items-center gap-2"
              >
                <Eye className="w-4 h-4" />
                Tandai Dibaca ({selectedNotifs.length})
              </button>
              <button
                onClick={() => {
                  setConfirmAction('delete');
                  setShowConfirmDialog(true);
                }}
                className="px-4 py-2 text-sm rounded-lg bg-red-50 text-red-600 hover:bg-red-100 flex items-center gap-2"
              >
                <Trash2 className="w-4 h-4" />
                Hapus ({selectedNotifs.length})
              </button>
            </div>
          )}

          {filteredNotifications.length === 0 ? (
            <div className={`text-center py-8 ${themeClasses.textSecondary}`}>
              {searchQuery ? 'Tidak ada notifikasi yang sesuai dengan pencarian' : 'Tidak ada notifikasi'}
            </div>
          ) : (
            <div className="bg-white rounded-lg border">
              {filteredNotifications.map((notification, index) => (
                <React.Fragment key={notification.id}>
                  <NotificationItem
                    notification={notification}
                    isSelected={selectedNotifs.includes(notification.id)}
                    onSelect={handleSelectNotif}
                    themeClasses={themeClasses}
                  />
                  {index < filteredNotifications.length - 1 && (
                    <hr className={themeClasses.border} />
                  )}
                </React.Fragment>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Confirmation Dialog */}
      {showConfirmDialog && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className={`${themeClasses.bgCard} p-6 rounded-lg max-w-md w-full mx-4`}>
            <h3 className={`text-lg font-medium ${themeClasses.textPrimary} mb-2`}>
              {confirmAction === 'delete' ? 'Hapus Notifikasi' : 'Tandai Dibaca'}
            </h3>
            <p className={`${themeClasses.textSecondary} mb-4`}>
              {confirmAction === 'delete' 
                ? 'Apakah Anda yakin ingin menghapus notifikasi yang dipilih?' 
                : 'Tandai notifikasi yang dipilih sebagai telah dibaca?'}
            </p>
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setShowConfirmDialog(false)}
                className={`px-4 py-2 rounded-lg ${themeClasses.bgHover}`}
              >
                Batal
              </button>
              <button
                onClick={confirmAction === 'delete' ? handleDelete : handleMarkAsRead}
                disabled={loading}
                className={`px-4 py-2 rounded-lg ${
                  confirmAction === 'delete' 
                    ? 'bg-red-600 text-white hover:bg-red-700' 
                    : 'bg-blue-600 text-white hover:bg-blue-700'
                }`}
              >
                {loading ? 'Loading...' : confirmAction === 'delete' ? 'Hapus' : 'Tandai Dibaca'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const NotificationItem = ({ notification, isSelected, onSelect, themeClasses }) => {
  const IconComponent = notification.icon;
  
  return (
    <div
      className={`${notification.bgColor} border rounded-lg p-4 transition-all hover:shadow-md relative ${
        isSelected ? 'ring-2 ring-blue-500' : ''
      }`}
      onClick={() => onSelect(notification.id)}
    >
      <div className="flex items-start gap-4">
        <input
          type="checkbox"
          checked={isSelected}
          onChange={() => onSelect(notification.id)}
          className="mt-2"
        />
        <div className={`p-2 rounded-full ${notification.bgColor}`}>
          <IconComponent className={`w-6 h-6 ${notification.color}`} />
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <h3 className={`font-medium ${themeClasses.textPrimary}`}>
              {notification.title}
            </h3>
            {!notification.isRead && (
              <span className="w-2 h-2 rounded-full bg-blue-500" />
            )}
          </div>
          <p className={`text-sm mt-1 ${themeClasses.textSecondary}`}>
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