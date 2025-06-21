import React, { useEffect, useState } from 'react';
import { Search, Plus, User, Mail, Calendar, Edit, Trash2, X, CheckCircle } from 'lucide-react';
import { useTheme } from '../../context/SettingsContext';

const UsersManagement = () => {
  const { themeClasses, isDark } = useTheme();
  const [searchTerm, setSearchTerm] = useState('');
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);
  const [users, setUsers] = useState([]); // Pastikan ini array kosong!
  const [roleFilter, setRoleFilter] = useState('all'); // Tambahkan ini!
  const [statusFilter, setStatusFilter] = useState('all');
  const [newUser, setNewUser] = useState({
    name: '',
    email: '',
    role: 'user',
    status: 'active'
  });
  const [editUser, setEditUser] = useState({
    id: '',
    name: '',
    email: '',
    role: 'user',
    status: 'active'
  });
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/users`, { credentials: 'include' })
      .then(res => res.json())
      .then(data => setUsers(Array.isArray(data.data) ? data.data : []))
      .catch(err => console.error('Failed to fetch users:', err));
  }, []);

 // Filter users based on search term, role, and status
  const filteredUsers = Array.isArray(users) ? users.filter(user => {
    const matchesSearchTerm = user.username && user.username.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = roleFilter === 'all' || user.role === roleFilter;
    // Jika tidak ada status, abaikan filter status
    return matchesSearchTerm && matchesRole;
  }) : [];

  const handleEdit = (userId) => {
    console.log('Edit clicked for user ID:', userId);
    const user = users.find(u => u.id === userId);
    console.log('Found user:', user);
    if (user) {
      setUserToEdit(user);
      setEditUser({
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        status: user.status
      });
      setShowEditModal(true);
      console.log('Edit modal should be open now');
    }
  };

  const handleDeleteClick = (user) => {
    setUserToDelete(user);
    setShowDeleteModal(true);
  };

  const confirmDelete = () => {
    if (userToDelete) {
      // Perbaiki syntax dengan menambahkan tanda kurung yang benar
      setUsers(prevUsers => prevUsers.filter(user => user.id !== userToDelete.id));
      setShowDeleteModal(false);
      setSuccessMessage('Data pengguna berhasil dihapus dari sistem.');
      setShowSuccessModal(true);
      setUserToDelete(null);
      
      // Auto close success modal after 3 seconds
      setTimeout(() => {
        setShowSuccessModal(false);
      }, 3000);
    }
  };

  const cancelDelete = () => {
    setShowDeleteModal(false);
    setUserToDelete(null);
  };

  const closeSuccessModal = () => {
    setShowSuccessModal(false);
  };

  const handleAddUser = () => {
    setShowAddModal(true);
    setNewUser({
      name: '',
      email: '',
      role: 'user',
      status: 'active'
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewUser(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleEditInputChange = (e) => {
    const { name, value } = e.target;
    setEditUser(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmitUser = () => {
    
    // Validasi form
    if (!newUser.name.trim() || !newUser.email.trim()) {
      alert('Nama dan email harus diisi!');
      return;
    }
    
    // Validasi email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(newUser.email)) {
      alert('Format email tidak valid!');
      return;
    }
    
    // Cek apakah email sudah ada
    const emailExists = users.some(user => user.email.toLowerCase() === newUser.email.toLowerCase());
    if (emailExists) {
      alert('Email sudah terdaftar!');
      return;
    }
    
    // Buat user baru
    const newUserData = {
      id: Math.max(...users.map(u => u.id)) + 1,
      name: newUser.name.trim(),
      email: newUser.email.trim().toLowerCase(),
      role: newUser.role,
      status: newUser.status,
      joinDate: new Date().toISOString().split('T')[0],
      totalBorrowings: 0
    };
    
    // Tambah ke array users
    setUsers(prev => [...prev, newUserData]);
    
    // Reset form dan tutup modal
    setShowAddModal(false);
    setSuccessMessage('Pengguna baru berhasil ditambahkan!');
    setShowSuccessModal(true);
    
    // Auto close success modal after 3 seconds
    setTimeout(() => {
      setShowSuccessModal(false);
    }, 3000);
  };

  const cancelAddUser = () => {
    setShowAddModal(false);
    setNewUser({
      name: '',
      email: '',
      role: 'user',
      status: 'active'
    });
  };

  const handleEditUser = () => {
    // Validasi form
    if (!editUser.name.trim() || !editUser.email.trim()) {
      alert('Nama dan email harus diisi!');
      return;
    }
    
    // Validasi email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(editUser.email)) {
      alert('Format email tidak valid!');
      return;
    }
    
    // Cek apakah email sudah ada (kecuali email user yang sedang diedit)
    const emailExists = users.some(user => 
      user.email.toLowerCase() === editUser.email.toLowerCase() && user.id !== editUser.id
    );
    if (emailExists) {
      alert('Email sudah terdaftar!');
      return;
    }
    
    // Update user dalam array
    setUsers(prev => prev.map(user => 
      user.id === editUser.id 
        ? {
            ...user,
            name: editUser.name.trim(),
            email: editUser.email.trim().toLowerCase(),
            role: editUser.role,
            status: editUser.status
          }
        : user
    ));
    
    // Reset form dan tutup modal
    setShowEditModal(false);
    setSuccessMessage('Data pengguna berhasil diperbarui!');
    setShowSuccessModal(true);
    
    // Auto close success modal after 3 seconds
    setTimeout(() => {
      setShowSuccessModal(false);
    }, 3000);
  };

  const cancelEditUser = () => {
    setShowEditModal(false);
    setUserToEdit(null);
    setEditUser({
      id: '',
      name: '',
      email: '',
      role: 'user',
      status: 'active'
    });
  };

return (
    <div className={`p-6 min-h-screen ${themeClasses.bgPrimary}`}>
      {/* Header */}
      <div className="mb-8">
        <h1 className={`text-4xl font-bold mb-2 ${themeClasses.textPrimary}`}>Users Management</h1>
        <p className={`text-xl ${themeClasses.textSecondary}`}>Kelola pengguna sistem</p>
      </div>

      {/* Search and Filter Section */}
      <div className={`rounded-xl shadow-sm border p-6 mb-6 ${themeClasses.border} ${themeClasses.bgCard}`}>
        <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
          {/* Search Input */}
          <div className="relative flex-1 max-w-md">
            <Search className={`absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 ${themeClasses.textMuted}`} />
            <input
              type="text"
              placeholder="Cari pengguna..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className={`w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent focus:outline-none ${
                isDark ? 'bg-gray-700 text-white border-gray-600' : 'bg-white text-gray-800 border-gray-300'
              }`}
            />
          </div>
          
          {/* Filter Section - keep existing structure, just add dark classes */}
          <div className="flex flex-col sm:flex-row gap-3 items-center">
            {/* Role Filter */}
            <div className="flex items-center gap-2">
              <label htmlFor="roleFilter" className={`text-sm font-medium whitespace-nowrap ${themeClasses.textSecondary}`}>
                Role:
              </label>
              <select
                id="roleFilter"
                value={roleFilter}
                onChange={(e) => setRoleFilter(e.target.value)}
                className={`px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent focus:outline-none text-sm ${
                  isDark ? 'bg-gray-700 text-white border-gray-600' : 'bg-white text-gray-800 border-gray-300'
                }`}
              >
                <option value="all">Semua</option>
                <option value="admin">Admin</option>
                <option value="user">Mahasiswa</option>
                <option value="dosen">Dosen</option>
              </select>
            </div>
            
            {/* Status Filter */}
            <div className="flex items-center gap-2">
              <label htmlFor="statusFilter" className={`text-sm font-medium whitespace-nowrap ${themeClasses.textSecondary}`}>
                Status:
              </label>
              <select
                id="statusFilter"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className={`px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent focus:outline-none text-sm ${
                  isDark ? 'bg-gray-700 text-white border-gray-600' : 'bg-white text-gray-800 border-gray-300'
                }`}
              >
                <option value="all">Semua</option>
                <option value="active">Aktif</option>
                <option value="inactive">Tidak Aktif</option>
              </select>
            </div>
            
            {/* Add User Button - unchanged */}
            <button
              onClick={handleAddUser}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 whitespace-nowrap"
            >
              <Plus className="h-5 w-5" />
              Tambah Pengguna
            </button>
          </div>
        </div>
        
        {/* Filter Summary */}
        {(searchTerm || roleFilter !== 'all' || statusFilter !== 'all') && (
          <div className={`mt-4 pt-4 border-t ${themeClasses.border}`}>
            <div className="flex flex-wrap items-center gap-2">
              <span className={`text-sm ${themeClasses.textMuted}`}>Filter aktif:</span>
              
              {searchTerm && (
                <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs ${
                  isDark ? 'bg-blue-900/30 text-blue-300' : 'bg-blue-100 text-blue-800'
                }`}>
                  Pencarian: "{searchTerm}"
                  <button
                    onClick={() => setSearchTerm('')}
                    className={`rounded-full p-0.5 ${isDark ? 'hover:bg-blue-800' : 'hover:bg-blue-200'}`}
                  >
                    <X className="h-3 w-3" />
                  </button>
                </span>
              )}
              
              {roleFilter !== 'all' && (
                <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs ${
                  isDark ? 'bg-purple-900/30 text-purple-300' : 'bg-purple-100 text-purple-800'
                }`}>
                  Role: {roleFilter === 'admin' ? 'Dosen' : 'Mahasiswa'}
                  <button
                    onClick={() => setRoleFilter('all')}
                    className={`rounded-full p-0.5 ${isDark ? 'hover:bg-purple-800' : 'hover:bg-purple-200'}`}
                  >
                    <X className="h-3 w-3" />
                  </button>
                </span>
              )}
              
              {statusFilter !== 'all' && (
                <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs ${
                  isDark ? 'bg-green-900/30 text-green-300' : 'bg-green-100 text-green-800'
                }`}>
                  Status: {statusFilter === 'active' ? 'Aktif' : 'Tidak Aktif'}
                  <button
                    onClick={() => setStatusFilter('all')}
                    className={`rounded-full p-0.5 ${isDark ? 'hover:bg-green-800' : 'hover:bg-green-200'}`}
                  >
                    <X className="h-3 w-3" />
                  </button>
                </span>
              )}
              
              <button
                onClick={() => {
                  setSearchTerm('');
                  setRoleFilter('all');
                  setStatusFilter('all');
                }}
                className={`text-xs underline ${isDark ? 'text-gray-400 hover:text-gray-300' : 'text-gray-500 hover:text-gray-700'}`}
              >
                Hapus semua filter
              </button>
            </div>
            
            <p className={`text-sm mt-2 ${themeClasses.textMuted}`}>
              Menampilkan {filteredUsers.length} dari {users.length} pengguna
            </p>
          </div>
        )}
      </div>

      {/* Users Table */}
      <div className={`rounded-xl shadow-sm border overflow-hidden ${themeClasses.border} ${themeClasses.bgCard}`}>
        <div className="overflow-x-auto hide-scrollbar">
          <table className="w-full">
            <thead className={`border-b ${themeClasses.border} ${isDark ? 'bg-gray-800' : 'bg-gray-50'}`}>
              <tr>
                <th className={`px-6 py-4 text-left text-sm font-semibold ${themeClasses.textPrimary}`}>Pengguna</th>
                <th className={`px-6 py-4 text-left text-sm font-semibold ${themeClasses.textPrimary}`}>Role</th>
                <th className={`px-6 py-4 text-left text-sm font-semibold ${themeClasses.textPrimary}`}>Status</th>
                <th className={`px-6 py-4 text-left text-sm font-semibold ${themeClasses.textPrimary}`}>Bergabung</th>
                <th className={`px-6 py-4 text-left text-sm font-semibold ${themeClasses.textPrimary}`}>Peminjaman</th>
                <th className={`px-6 py-4 text-center text-sm font-semibold ${themeClasses.textPrimary}`}>Aksi</th>
              </tr>
            </thead>
            <tbody className={`divide-y ${themeClasses.border}`}>
              {filteredUsers.map((user) => (
                <tr key={user.id} className={`transition-colors ${isDark ? 'hover:bg-gray-700' : 'hover:bg-gray-50'}`}>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 bg-blue-600 rounded-full flex items-center justify-center">
                        <User className="h-5 w-5 text-white" />
                      </div>
                      <div>
                        <p className={`font-semibold ${themeClasses.textPrimary}`}>{user.username}</p>
                        <p className={`text-sm flex items-center gap-1 ${themeClasses.textSecondary}`}>
                          {user.role}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                      user.role === 'admin'
                        ? isDark ? 'bg-purple-900/30 text-purple-400' : 'bg-purple-100 text-purple-800'
                        : isDark ? 'bg-blue-900/30 text-blue-400' : 'bg-blue-100 text-blue-800'
                    }`}>
                      {user.role === 'admin' ? 'Dosen' : 'Mahasiswa'}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                      user.isVerified
                        ? isDark ? 'bg-green-900/30 text-green-400' : 'bg-green-100 text-green-800'
                        : isDark ? 'bg-red-900/30 text-red-400' : 'bg-red-100 text-red-800'
                    }`}>
                      {user.isVerified ? 'Aktif' : 'Tidak Aktif'}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className={`flex items-center gap-1 text-sm ${themeClasses.textSecondary}`}>
                      <Calendar className="h-4 w-4" />
                      {user.createdAt
                        ? new Date(user.createdAt).toLocaleDateString('id-ID', {
                            year: 'numeric',
                            month: 'short',
                            day: 'numeric'
                          })
                        : '-'}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`text-sm font-medium ${themeClasses.textPrimary}`}>
                      {user.totalBorrowings} kali
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-center gap-2">
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          handleEdit(user.id);
                        }}
                        className={`p-2 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-offset-1 ${
                          isDark 
                            ? 'text-blue-400 hover:bg-blue-900/30 focus:ring-blue-500 focus:ring-offset-gray-800'
                            : 'text-blue-600 hover:bg-blue-50 focus:ring-blue-500 focus:ring-offset-white'
                        }`}
                        title="Edit pengguna"
                      >
                        <Edit className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => handleDeleteClick(user)}
                        className={`p-2 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-offset-1 ${
                          isDark 
                            ? 'text-red-400 hover:bg-red-900/30 focus:ring-red-500 focus:ring-offset-gray-800'
                            : 'text-red-600 hover:bg-red-50 focus:ring-red-500 focus:ring-offset-white'
                        }`}
                        title="Hapus pengguna"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {filteredUsers.length === 0 && (
          <div className={`text-center py-8 ${themeClasses.textMuted}`}>
            <User className="h-12 w-12 mx-auto mb-4" />
            <p>Tidak ada pengguna ditemukan</p>
          </div>
        )}
      </div>

      {/* Modals - Add dark mode classes while keeping original structure */}
      {showEditModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className={`rounded-xl p-6 max-w-md w-full mx-4 shadow-xl overflow-y-auto hide-scrollbar ${
            isDark ? 'bg-gray-800' : 'bg-white'
          }`}>
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className={`h-12 w-12 rounded-full flex items-center justify-center ${
                  isDark ? 'bg-orange-900/30' : 'bg-orange-100'
                }`}>
                  <Edit className={`h-6 w-6 ${isDark ? 'text-orange-400' : 'text-orange-600'}`} />
                </div>
                <div>
                  <h3 className={`text-lg font-semibold ${isDark ? 'text-white' : 'text-gray-800'}`}>Edit Pengguna</h3>
                  <p className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>Perbarui data pengguna</p>
                </div>
              </div>
              <button
                onClick={cancelEditUser}
                className={`p-2 ${isDark ? 'text-gray-400 hover:text-gray-300' : 'text-gray-400 hover:text-gray-600'}`}
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            
            {/* Keep modal content structure, just add dark classes */}
            <div className="space-y-4">
              {/* Input fields with dark mode */}
              <div>
                <label className={`block text-sm font-medium mb-1 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                  Nama Lengkap *
                </label>
                <input
                  type="text"
                  name="name"
                  value={editUser.name}
                  onChange={handleEditInputChange}
                  className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent focus:outline-none ${
                    isDark ? 'bg-gray-700 text-white border-gray-600' : 'bg-white text-gray-800 border-gray-300'
                  }`}
                  placeholder="Masukkan nama lengkap"
                />
              </div>
              
              <div>
                <label className={`block text-sm font-medium mb-1 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                  Email *
                </label>
                <input
                  type="email"
                  name="email"
                  value={editUser.email}
                  onChange={handleEditInputChange}
                  className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent focus:outline-none ${
                    isDark ? 'bg-gray-700 text-white border-gray-600' : 'bg-white text-gray-800 border-gray-300'
                  }`}
                  placeholder="Masukkan email"
                />
              </div>
              
              <div>
                <label className={`block text-sm font-medium mb-1 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                  Role
                </label>
                <select
                  name="role"
                  value={editUser.role}
                  onChange={handleEditInputChange}
                  className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent focus:outline-none text-sm ${
                    isDark ? 'bg-gray-700 text-white border-gray-600' : 'bg-white text-gray-800 border-gray-300'
                  }`}
                >
                  <option value="admin">Dosen</option>
                  <option value="user">Mahasiswa</option>
                </select>
              </div>
              
              <div>
                <label className={`block text-sm font-medium mb-1 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                  Status
                </label>
                <select
                  name="status"
                  value={editUser.status}
                  onChange={handleEditInputChange}
                  className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent focus:outline-none text-sm ${
                    isDark ? 'bg-gray-700 text-white border-gray-600' : 'bg-white text-gray-800 border-gray-300'
                  }`}
                >
                  <option value="active">Aktif</option>
                  <option value="inactive">Tidak Aktif</option>
                </select>
              </div>
              
              <div className="flex gap-3 justify-end pt-4">
                <button
                  type="button"
                  onClick={cancelEditUser}
                  className={`px-4 py-2 rounded-lg transition-colors font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 ${
                    isDark 
                      ? 'text-gray-300 bg-gray-700 hover:bg-gray-600 focus:ring-gray-500 focus:ring-offset-gray-800'
                      : 'text-gray-700 bg-gray-200 hover:bg-gray-300 focus:ring-gray-500 focus:ring-offset-white'
                  }`}
                >
                  Batal
                </button>
                <button
                  type="button"
                  onClick={handleEditUser}
                  className={`px-4 py-2 text-white rounded-lg hover:bg-orange-700 transition-colors font-medium focus:outline-none focus:ring-2 focus:ring-orange-500 ${
                    isDark ? 'bg-orange-600 focus:ring-offset-gray-800' : 'bg-orange-600 focus:ring-offset-white'
                  }`}
                >
                  Perbarui
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Add User Modal with dark mode */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className={`rounded-xl p-6 max-w-md w-full mx-4 shadow-xl overflow-y-auto hide-scrollbar ${
            isDark ? 'bg-gray-800' : 'bg-white'
          }`}>
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className={`h-12 w-12 rounded-full flex items-center justify-center ${
                  isDark ? 'bg-green-900/30' : 'bg-green-100'
                }`}>
                  <Plus className={`h-6 w-6 ${isDark ? 'text-green-400' : 'text-green-600'}`} />
                </div>
                <div>
                  <h3 className={`text-lg font-semibold ${isDark ? 'text-white' : 'text-gray-800'}`}>Tambah Pengguna</h3>
                  <p className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>Isi data pengguna baru</p>
                </div>
              </div>
              <button
                onClick={cancelAddUser}
                className={`p-2 ${isDark ? 'text-gray-400 hover:text-gray-300' : 'text-gray-400 hover:text-gray-600'}`}
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            
            <div className="space-y-4">
              {/* Input fields with dark mode */}
              <div>
                <label className={`block text-sm font-medium mb-1 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                  Nama Lengkap *
                </label>
                <input
                  type="text"
                  name="name"
                  value={newUser.name}
                  onChange={handleInputChange}
                  className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent focus:outline-none ${
                    isDark ? 'bg-gray-700 text-white border-gray-600' : 'bg-white text-gray-800 border-gray-300'
                  }`}
                  placeholder="Masukkan nama lengkap"
                />
              </div>
              
              <div>
                <label className={`block text-sm font-medium mb-1 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                  Email *
                </label>
                <input
                  type="email"
                  name="email"
                  value={newUser.email}
                  onChange={handleInputChange}
                  className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent focus:outline-none ${
                    isDark ? 'bg-gray-700 text-white border-gray-600' : 'bg-white text-gray-800 border-gray-300'
                  }`}
                  placeholder="Masukkan email"
                />
              </div>
              
              <div>
                <label className={`block text-sm font-medium mb-1 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                  Role
                </label>
                <select
                  name="role"
                  value={newUser.role}
                  onChange={handleInputChange}
                  className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent focus:outline-none text-sm ${
                    isDark ? 'bg-gray-700 text-white border-gray-600' : 'bg-white text-gray-800 border-gray-300'
                  }`}
                >
                  <option value="user">Mahasiswa</option>
                  <option value="admin">Dosen</option>
                </select>
              </div>
              
              <div>
                <label className={`block text-sm font-medium mb-1 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                  Status
                </label>
                <select
                  name="status"
                  value={newUser.status}
                  onChange={handleInputChange}
                  className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent focus:outline-none text-sm ${
                    isDark ? 'bg-gray-700 text-white border-gray-600' : 'bg-white text-gray-800 border-gray-300'
                  }`}
                >
                  <option value="active">Aktif</option>
                  <option value="inactive">Tidak Aktif</option>
                </select>
              </div>
              
              <div className="flex gap-3 justify-end pt-4">
                <button
                  type="button"
                  onClick={cancelAddUser}
                  className={`px-4 py-2 rounded-lg transition-colors font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 ${
                    isDark 
                      ? 'text-gray-300 bg-gray-700 hover:bg-gray-600 focus:ring-gray-500 focus:ring-offset-gray-800'
                      : 'text-gray-700 bg-gray-200 hover:bg-gray-300 focus:ring-gray-500 focus:ring-offset-white'
                  }`}
                >
                  Batal
                </button>
                <button
                  type="button"
                  onClick={handleSubmitUser}
                  className={`px-4 py-2 text-white rounded-lg hover:bg-green-700 transition-colors font-medium focus:outline-none focus:ring-2 focus:ring-green-500 ${
                    isDark ? 'bg-green-600 focus:ring-offset-gray-800' : 'bg-green-600 focus:ring-offset-white'
                  }`}
                >
                  Tambah
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal with dark mode */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className={`rounded-xl p-6 max-w-md w-full mx-4 shadow-xl ${
            isDark ? 'bg-gray-800' : 'bg-white'
          }`}>
            <div className="flex items-center justify-between mb-4">
              <h3 className={`text-lg font-semibold ${isDark ? 'text-white' : 'text-gray-800'}`}>Konfirmasi Hapus</h3>
              <button
                onClick={cancelDelete}
                className={`p-2 ${isDark ? 'text-gray-400 hover:text-gray-300' : 'text-gray-400 hover:text-gray-600'}`}
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            
            <div className="mb-6">
              <p className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                Apakah Anda yakin ingin menghapus pengguna <span className="font-semibold">{userToDelete?.name}</span>?
              </p>
            </div>
            
            <div className="flex gap-3 justify-end">
              <button
                onClick={cancelDelete}
                className={`px-4 py-2 rounded-lg transition-colors font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 ${
                  isDark 
                    ? 'text-gray-300 bg-gray-700 hover:bg-gray-600 focus:ring-gray-500 focus:ring-offset-gray-800'
                    : 'text-gray-700 bg-gray-200 hover:bg-gray-300 focus:ring-gray-500 focus:ring-offset-white'
                }`}
              >
                Batal
              </button>
              <button
                onClick={confirmDelete}
                className={`px-4 py-2 text-white rounded-lg bg-red-600 hover:bg-red-700 transition-colors font-medium focus:outline-none focus:ring-2 focus:ring-red-500 ${
                  isDark ? 'focus:ring-offset-gray-800' : 'focus:ring-offset-white'
                }`}
              >
                Hapus
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Success Modal with dark mode */}
      {showSuccessModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className={`rounded-xl p-6 max-w-md w-full mx-4 shadow-xl ${
            isDark ? 'bg-gray-800' : 'bg-white'
          }`}>
            <div className="flex items-center justify-between mb-4">
              <h3 className={`text-lg font-semibold ${isDark ? 'text-white' : 'text-gray-800'}`}>Sukses</h3>
              <button
                onClick={closeSuccessModal}
                className={`p-2 ${isDark ? 'text-gray-400 hover:text-gray-300' : 'text-gray-400 hover:text-gray-600'}`}
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            
            <div className="mb-6">
              <p className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                {successMessage}
              </p>
            </div>
            
            <div className="flex justify-end">
              <button
                onClick={closeSuccessModal}
                className={`px-4 py-2 text-white rounded-lg bg-green-600 hover:bg-green-700 transition-colors font-medium focus:outline-none focus:ring-2 focus:ring-green-500 ${
                  isDark ? 'focus:ring-offset-gray-800' : 'focus:ring-offset-white'
                }`}
              >
                Tutup
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UsersManagement;