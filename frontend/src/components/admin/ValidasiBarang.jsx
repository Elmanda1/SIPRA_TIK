// src/components/admin/ValidasiBarang.jsx
import React, { useState, useEffect } from 'react';
import { useTheme } from '../../context/SettingsContext';
import { 
  Search, 
  Filter, 
  Eye, 
  Check, 
  X, 
  Clock,
  Package,
  AlertTriangle,
  CheckCircle,
  XCircle
} from 'lucide-react';

const ValidasiBarang = () => {
  // Theme context
  const { themeClasses, isDark } = useTheme();
  
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [selectedItem, setSelectedItem] = useState(null);
  const [showDetailModal, setShowDetailModal] = useState(false);

  // Ganti data dummy dengan data dari backend
  const [barangData, setBarangData] = useState([]);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/peminjaman`, { credentials: 'include' })
      .then(res => res.json())
      .then(data => setBarangData(data.data || []));
  }, []);

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending':
        return isDark ? 'bg-yellow-900/30 text-yellow-400' : 'bg-yellow-100 text-yellow-800';
      case 'approved':
        return isDark ? 'bg-green-900/30 text-green-400' : 'bg-green-100 text-green-800';
      case 'rejected':
        return isDark ? 'bg-red-900/30 text-red-400' : 'bg-red-100 text-red-800';
      default:
        return isDark ? 'bg-gray-800 text-gray-300' : 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'pending':
        return <Clock className="w-4 h-4" />;
      case 'approved':
        return <CheckCircle className="w-4 h-4" />;
      case 'rejected':
        return <XCircle className="w-4 h-4" />;
      default:
        return <Clock className="w-4 h-4" />;
    }
  };

  // Enhanced filtering function that includes nama barang, nama pengguna, and kategori
  const filteredData = barangData.filter(item => {
    const searchLower = searchTerm.toLowerCase();
    const matchesSearch = item.namaBarang.toLowerCase().includes(searchLower) ||
                         item.submittedBy.toLowerCase().includes(searchLower) ||
                         item.kategori.toLowerCase().includes(searchLower);
    const matchesFilter = filterStatus === 'all' || item.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const handleValidation = async (id, action) => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/peminjaman/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ status: action })
      });
      if (res.ok) {
        setBarangData(prev =>
          prev.map(item =>
            item.id_peminjaman === id ? { ...item, status: action } : item
          )
        );
      } else {
        alert('Gagal mengubah status');
      }
    } catch (err) {
      alert('Gagal koneksi ke server');
    }
  };

  const openDetailModal = (item) => {
    setSelectedItem(item);
    setShowDetailModal(true);
  };

  const closeDetailModal = () => {
    setSelectedItem(null);
    setShowDetailModal(false);
  };

  const statusStats = {
    total: barangData.length,
    pending: barangData.filter(item => item.status === 'pending').length,
    approved: barangData.filter(item => item.status === 'approved').length,
    rejected: barangData.filter(item => item.status === 'rejected').length
  };

  // Theme-aware helper functions
  const getIconBgColor = (type) => {
    const colors = {
      blue: isDark ? 'bg-blue-900/30' : 'bg-blue-100',
      yellow: isDark ? 'bg-yellow-900/30' : 'bg-yellow-100',
      green: isDark ? 'bg-green-900/30' : 'bg-green-100',
      red: isDark ? 'bg-red-900/30' : 'bg-red-100'
    };
    return colors[type] || colors.blue;
  };

  const getIconColor = (type) => {
    const colors = {
      blue: isDark ? 'text-blue-400' : 'text-blue-600',
      yellow: isDark ? 'text-yellow-400' : 'text-yellow-600',
      green: isDark ? 'text-green-400' : 'text-green-600',
      red: isDark ? 'text-red-400' : 'text-red-600'
    };
    return colors[type] || colors.blue;
  };

  const getButtonHoverColor = (type) => {
    const colors = {
      blue: isDark ? 'hover:text-blue-300' : 'hover:text-blue-900',
      green: isDark ? 'hover:text-green-300' : 'hover:text-green-900',
      red: isDark ? 'hover:text-red-300' : 'hover:text-red-900'
    };
    return colors[type] || colors.blue;
  };

  return (
    <div className={`space-y-6 p-6 min-h-screen ${themeClasses.bgBase}`}>
      {/* Header */}
      <div className="mb-8">
        <div>
          <h1 className={`text-4xl font-bold mb-2 ${themeClasses.textPrimary}`}>Validasi Barang</h1>
          <p className={`text-xl ${themeClasses.textSecondary}`}>Kelola dan validasi barang yang disubmit pengguna</p>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className={`p-6 rounded-lg shadow-sm border ${themeClasses.bgCard} ${themeClasses.border}`}>
          <div className="flex items-center justify-between">
            <div>
              <p className={`text-sm font-medium ${themeClasses.textSecondary}`}>Total Barang</p>
              <p className={`text-2xl font-semibold ${themeClasses.textPrimary}`}>{statusStats.total}</p>
            </div>
            <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${getIconBgColor('blue')}`}>
              <Package className={`w-8 h-8 ${getIconColor('blue')}`} />
            </div>
          </div>
        </div>
        
        <div className={`p-6 rounded-lg shadow-sm border ${themeClasses.bgCard} ${themeClasses.border}`}>
          <div className="flex items-center justify-between">
            <div>
              <p className={`text-sm font-medium ${themeClasses.textSecondary}`}>Menunggu Validasi</p>
              <p className={`text-2xl font-semibold ${getIconColor('yellow')}`}>{statusStats.pending}</p>
            </div>
            <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${getIconBgColor('yellow')}`}>
              <Clock className={`w-8 h-8 ${getIconColor('yellow')}`} />
            </div>
          </div>
        </div>
        
        <div className={`p-6 rounded-lg shadow-sm border ${themeClasses.bgCard} ${themeClasses.border}`}>
          <div className="flex items-center justify-between">
            <div>
              <p className={`text-sm font-medium ${themeClasses.textSecondary}`}>Disetujui</p>
              <p className={`text-2xl font-semibold ${getIconColor('green')}`}>{statusStats.approved}</p>
            </div>
            <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${getIconBgColor('green')}`}>
              <CheckCircle className={`w-8 h-8 ${getIconColor('green')}`} />
            </div>
          </div>
        </div>
        
        <div className={`p-6 rounded-lg shadow-sm border ${themeClasses.bgCard} ${themeClasses.border}`}>
          <div className="flex items-center justify-between">
            <div>
              <p className={`text-sm font-medium ${themeClasses.textSecondary}`}>Ditolak</p>
              <p className={`text-2xl font-semibold ${getIconColor('red')}`}>{statusStats.rejected}</p>
            </div>
            <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${getIconBgColor('red')}`}>
              <XCircle className={`w-8 h-8 ${getIconColor('red')}`} />
            </div>
          </div>
        </div>
      </div>

      {/* Filters and Search */}
      <div className={`p-6 rounded-lg shadow-sm border ${themeClasses.bgCard} ${themeClasses.border}`}>
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 ${isDark ? 'text-gray-400' : 'text-gray-400'}`} />
              <input
                type="text"
                placeholder="Cari berdasarkan nama barang, pengguna, atau kategori..."
                className={`w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                  isDark 
                    ? 'bg-gray-800 border-gray-600 text-white placeholder-gray-400' 
                    : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                }`}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Filter className={`w-5 h-5 ${isDark ? 'text-gray-400' : 'text-gray-400'}`} />
            <select
              className={`border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                isDark 
                  ? 'bg-gray-800 border-gray-600 text-white' 
                  : 'bg-white border-gray-300 text-gray-900'
              }`}
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
            >
              <option value="all">Semua Status</option>
              <option value="pending">Menunggu Validasi</option>
              <option value="approved">Disetujui</option>
              <option value="rejected">Ditolak</option>
            </select>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className={`rounded-lg shadow-sm border overflow-hidden ${themeClasses.bgCard} ${themeClasses.border}`}>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className={isDark ? 'bg-gray-800' : 'bg-gray-50'}>
              <tr>
                <th className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${themeClasses.textSecondary}`}>
                  Barang
                </th>
                <th className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${themeClasses.textSecondary}`}>
                  Kategori
                </th>
                <th className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${themeClasses.textSecondary}`}>
                  Pengguna
                </th>
                <th className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${themeClasses.textSecondary}`}>
                  Tanggal Submit
                </th>
                <th className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${themeClasses.textSecondary}`}>
                  Status
                </th>
                <th className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${themeClasses.textSecondary}`}>
                  Aksi
                </th>
              </tr>
            </thead>
            <tbody className={`divide-y ${isDark ? 'divide-gray-700' : 'divide-gray-200'}`}>
              {filteredData.map((item) => (
                <tr key={item.id} className={`${isDark ? 'hover:bg-gray-800' : 'hover:bg-gray-50'}`}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className={`text-sm font-medium ${themeClasses.textPrimary}`}>{item.namaBarang}</div>
                    <div className={`text-sm ${themeClasses.textSecondary}`}>{item.hargaEstimasi}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className={`text-sm ${themeClasses.textPrimary}`}>{item.kategori}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className={`text-sm ${themeClasses.textPrimary}`}>{item.submittedBy}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className={`text-sm ${themeClasses.textPrimary}`}>{item.tanggalSubmit}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(item.status)}`}>
                      {getStatusIcon(item.status)}
                      {item.status === 'pending' ? 'Menunggu' : item.status === 'approved' ? 'Disetujui' : 'Ditolak'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => openDetailModal(item)}
                        className={`p-1 rounded ${getIconColor('blue')} ${getButtonHoverColor('blue')}`}
                        title="Lihat Detail"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      {item.status === 'pending' && (
                        <>
                          <button
                            onClick={() => handleValidation(item.id, 'approved')}
                            className={`p-1 rounded ${getIconColor('green')} ${getButtonHoverColor('green')}`}
                            title="Setujui"
                          >
                            <Check className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleValidation(item.id, 'rejected')}
                            className={`p-1 rounded ${getIconColor('red')} ${getButtonHoverColor('red')}`}
                            title="Tolak"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Detail Modal */}
      {showDetailModal && selectedItem && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className={`rounded-lg max-w-2xl w-full max-h-[100vh] overflow-y-auto ${themeClasses.bgCard}`}>
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <h2 className={`text-xl font-bold ${themeClasses.textPrimary}`}>Detail Barang</h2>
                <button
                  onClick={closeDetailModal}
                  className={`p-1 rounded ${isDark ? 'text-gray-400 hover:text-gray-300' : 'text-gray-400 hover:text-gray-600'}`}
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
              
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <img
                      src={selectedItem.foto}
                      alt={selectedItem.namaBarang}
                      className={`w-full h-48 object-cover rounded-lg border ${themeClasses.border}`}
                    />
                  </div>
                  <div className="space-y-3">
                    <div>
                      <label className={`text-sm font-medium ${themeClasses.textSecondary}`}>Nama Barang</label>
                      <p className={themeClasses.textPrimary}>{selectedItem.namaBarang}</p>
                    </div>
                    <div>
                      <label className={`text-sm font-medium ${themeClasses.textSecondary}`}>Kategori</label>
                      <p className={themeClasses.textPrimary}>{selectedItem.kategori}</p>
                    </div>
                    <div>
                      <label className={`text-sm font-medium ${themeClasses.textSecondary}`}>Pengguna</label>
                      <p className={themeClasses.textPrimary}>{selectedItem.submittedBy}</p>
                    </div>
                    <div>
                      <label className={`text-sm font-medium ${themeClasses.textSecondary}`}>Tanggal Submit</label>
                      <p className={themeClasses.textPrimary}>{selectedItem.tanggalSubmit}</p>
                    </div>
                  </div>
                </div>
                
                <div>
                  <label className={`text-sm font-medium ${themeClasses.textSecondary}`}>Deskripsi</label>
                  <p className={`mt-1 ${themeClasses.textPrimary}`}>{selectedItem.deskripsi}</p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className={`text-sm font-medium ${themeClasses.textSecondary}`}>Kondisi</label>
                    <p className={themeClasses.textPrimary}>{selectedItem.kondisi}</p>
                  </div>
                </div>
                
                <div>
                  <label className={`text-sm font-medium ${themeClasses.textSecondary}`}>Status</label>
                  <div className="mt-1">
                    <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(selectedItem.status)}`}>
                      {getStatusIcon(selectedItem.status)}
                      {selectedItem.status === 'pending' ? 'Menunggu Validasi' : selectedItem.status === 'approved' ? 'Disetujui' : 'Ditolak'}
                    </span>
                  </div>
                </div>
                
                {selectedItem.status === 'pending' && (
                  <div className={`flex gap-3 pt-4 border-t ${themeClasses.border}`}>
                    <button
                      onClick={() => {
                        handleValidation(selectedItem.id, 'approved');
                        closeDetailModal();
                      }}
                      className="flex-1 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center gap-2"
                    >
                      <Check className="w-4 h-4" />
                      Setujui
                    </button>
                    <button
                      onClick={() => {
                        handleValidation(selectedItem.id, 'rejected');
                        closeDetailModal();
                      }}
                      className="flex-1 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors flex items-center justify-center gap-2"
                    >
                      <X className="w-4 h-4" />
                      Tolak
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ValidasiBarang;