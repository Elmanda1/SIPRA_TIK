import React, { useState } from 'react';
import { Calendar, Clock, User, Phone, FileText, Package, CheckCircle, HomeIcon, Package2 } from 'lucide-react';
import { usePeminjaman } from '../../context/PeminjamanContext';
import { useAuth } from '../../context/AuthContext';

const barangPerKategori = {
  'ruang-kelas': [
    { id: 'aa-204', nama: 'Ruangan AA 204', jumlah: 1 },
    { id: 'aa-205', nama: 'Ruangan AA 205', jumlah: 1 },
    { id: 'aa-206', nama: 'Ruangan AA 206', jumlah: 1 },
    { id: 'aa-207', nama: 'Ruangan AA 207', jumlah: 1 },
    { id: 'aa-210', nama: 'Ruangan AA 210', jumlah: 1 },
    { id: 'aa-211', nama: 'Ruangan AA 211', jumlah: 1 },
    { id: 'aa-213', nama: 'Ruangan AA 213', jumlah: 1 },
    { id: 'gsg-301', nama: 'Ruangan GSG 301', jumlah: 1 },
    { id: 'gsg-302', nama: 'Ruangan GSG 302', jumlah: 1 },
    { id: 'gsg-303', nama: 'Ruangan GSG 303', jumlah: 1 },
    { id: 'gsg-304', nama: 'Ruangan GSG 304', jumlah: 1 },
    { id: 'gsg-305', nama: 'Ruangan GSG 305', jumlah: 1 },
    { id: 'gsg-306', nama: 'Ruangan GSG 306', jumlah: 1 },
    { id: 'gsg-307', nama: 'Ruangan GSG 307', jumlah: 1 },
    { id: 'lab-Database', nama: 'Laboratorium Database', jumlah: 1 },
    { id: 'lab-Jaringan', nama: 'Laboratorium Jaringan', jumlah: 1},
    { id: 'Teleconference', nama: 'Ruang Teleconference', jumlah: 1},
    { id: 'Konsultasi-GSG', nama: 'Ruang Konsultasi GSG', jumlah: 1 },
    { id: 'Konsultasi-AA', nama: 'Ruang Konsultasi AA', jumlah: 1 },
  ],
  'peralatan-av': [
    { id: 'proyektor', nama: 'Proyektor', jumlah: 5 },
    { id: 'speaker', nama: 'Speaker', jumlah: 3 },
    { id: 'microphone', nama: 'Microphone', jumlah: 4 },
    { id: 'layar-proyektor', nama: 'Layar Proyektor', jumlah: 3 },
    { id: 'kamera-dslr', nama: 'Kamera DSLR', jumlah: 2 },
    { id: 'video-camera', nama: 'Video Camera', jumlah: 2 },
    { id: 'lighting-kit', nama: 'Lighting Kit', jumlah: 1 },
    { id: 'audio-interface', nama: 'Audio Interface', jumlah: 2 },
    { id: 'green-screen', nama: 'Green Screen', jumlah: 1 },
    { id: 'wireless-presenter', nama: 'Wireless Presenter', jumlah: 5 },
    { id: 'extension-hdmi', nama: 'Extension HDMI', jumlah: 8 },
    { id: 'microphone-stand', nama: 'Microphone Stand', jumlah: 6 },
    { id: 'mixer-audio', nama: 'Mixer Audio', jumlah: 2 },
    { id: 'webcam-hd', nama: 'Webcam HD', jumlah: 4 },
    { id: 'stabilizer-gimbal', nama: 'Stabilizer Gimbal', jumlah: 1 },
    { id: 'vga-to-hdmi-converter', nama: 'VGA to HDMI Converter', jumlah: 3 },
    { id: 'wireless-microphone-set', nama: 'Wireless Microphone Set', jumlah: 2 },
    { id: 'backdrop-stand', nama: 'Backdrop Stand', jumlah: 2 }
  ],
  'perangkat-komputer': [
    { id: 'pc-desktop', nama: 'PC Desktop', jumlah: 25 },
    { id: 'laptop', nama: 'Laptop', jumlah: 15 },
    { id: 'monitor-led', nama: 'Monitor LED', jumlah: 30 },
    { id: 'keyboard-mechanical', nama: 'Keyboard Mechanical', jumlah: 30 },
    { id: 'mouse-optical', nama: 'Mouse Optical', jumlah: 35 }
  ],
  'peralatan-jaringan': [
    { id: 'router', nama: 'Router', jumlah: 3 },
    { id: 'switch', nama: 'Switch', jumlah: 2 },
    { id: 'kabel-utp', nama: 'Kabel UTP', jumlah: 3 },
    { id: 'access-point', nama: 'Access Point', jumlah: 4 },
    { id: 'hub', nama: 'Hub', jumlah: 1 },
    { id: 'patch-panel', nama: 'Patch Panel', jumlah: 2 },
    { id: 'firewall', nama: 'Firewall', jumlah: 1 },
    { id: 'modem', nama: 'Modem', jumlah: 2 }
  ],
  'peralatan-listrik': [
    { id: 'stop-kontak', nama: 'Stop Kontak', jumlah: 8 },
    { id: 'kabel-roll', nama: 'Kabel Roll', jumlah: 4 },
    { id: 'lampu', nama: 'Lampu', jumlah: 10 },
    { id: 'ups', nama: 'UPS', jumlah: 3 },
    { id: 'mcb', nama: 'MCB', jumlah: 6 },
    { id: 'stabilizer', nama: 'Stabilizer', jumlah: 2 },
    { id: 'konektor-listrik', nama: 'Konektor Listrik', jumlah: 15 },
    { id: 'multimeter', nama: 'Multimeter', jumlah: 1 }
  ],
  'lainnya': [
    { id: 'papan-pengumuman', nama: 'Papan Pengumuman', jumlah: 2 },
    { id: 'dispenser', nama: 'Dispenser', jumlah: 1 },
    { id: 'lain-lain', nama: 'Lain-lain', jumlah: 0 }
  ]
};

const PinjamContent = () => {
  const { addPeminjaman } = usePeminjaman();
  const { user } = useAuth(); // Fixed: moved inside component
  
  const [selectedKategori, setSelectedKategori] = useState('');
  const [selectedBarang, setSelectedBarang] = useState('');
  const [showAlert, setShowAlert] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [validationErrors, setValidationErrors] = useState([]);
  const [formData, setFormData] = useState({
    startTime: '08:00',
    endTime: '09:00',
    keterangan: ''
  });

  // Handle case when user is not logged in
  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-[80vh]">
        <div className="text-center">
          <p className="text-gray-500 text-lg mb-4">Silakan login terlebih dahulu</p>
          <p className="text-gray-400">Anda perlu login untuk mengakses form peminjaman</p>
        </div>
      </div>
    );
  }

  const resetForm = () => {
    setSelectedKategori('');
    setSelectedBarang('');
    setFormData({
      startTime: '08:00',
      endTime: '09:00',
      keterangan: ''
    });
    setValidationErrors([]);
  };

  const validateTime = (timeStr) => {
    const timeRegex = /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/;
    if (!timeRegex.test(timeStr)) return false;
    
    const [hours, minutes] = timeStr.split(':').map(Number);
    return hours >= 7 && hours <= 18 && (hours < 18 || minutes === 0);
  };

  const validateForm = () => {
    const errors = [];
    
    if (!selectedKategori) {
      errors.push('Kategori barang harus dipilih');
    }
    
    if (!selectedBarang) {
      errors.push('Barang yang dipinjam harus dipilih');
    }
    
    // Validate time format and range
    if (!validateTime(formData.startTime)) {
      errors.push('Jam mulai harus dalam format HH:MM dan antara 07:00-18:00');
    }
    
    if (!validateTime(formData.endTime)) {
      errors.push('Jam selesai harus dalam format HH:MM dan antara 07:00-18:00');
    }
    
    // Check if start time is before end time
    if (validateTime(formData.startTime) && validateTime(formData.endTime)) {
      const [startHour, startMinute] = formData.startTime.split(':').map(Number);
      const [endHour, endMinute] = formData.endTime.split(':').map(Number);
      
      const startTotal = startHour * 60 + startMinute;
      const endTotal = endHour * 60 + endMinute;
      
      if (startTotal >= endTotal) {
        errors.push('Jam mulai harus lebih awal dari jam selesai');
      }
    }
    
    if (!formData.keterangan.trim()) {
      errors.push('Keterangan harus diisi');
    }
    
    return errors;
  };

  const handleSubmit = (e) => {
    if (e) e.preventDefault();
    
    const errors = validateForm();
    
    if (errors.length > 0) {
      setValidationErrors(errors);
      return;
    }
    
    setValidationErrors([]);
    setShowConfirmation(true);
  };

  const handleConfirmSubmit = () => {
    // Create new peminjaman object
    const newPeminjaman = {
      room: selectedBarangData?.nama || '-',
      building: selectedKategori ? selectedKategori.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase()) : '-',
      time: `${formData.startTime} - ${formData.endTime}`,
      barang: selectedBarangData?.nama || '-',
      keterangan: formData.keterangan
    };

    // Add to history
    addPeminjaman(newPeminjaman);

    // Close modals and reset form
    setShowConfirmation(false);
    setShowAlert(true);
  };

  const handleSuccessClose = () => {
    setShowAlert(false);
    resetForm();
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    
    // Clear validation errors when user starts typing
    if (validationErrors.length > 0) {
      setValidationErrors([]);
    }
  };

  const selectedBarangData = selectedKategori && selectedBarang ? 
    barangPerKategori[selectedKategori].find(b => b.id === selectedBarang) : null;

  return (
    <div className="flex flex-col items-center rounded-lg w-full min-h-screen py-10 overflow-y-auto">
      {/* Header with animated gradient text */}
      <div className="text-center mb-8">
        <h2 className="text-4xl font-bold mb-2 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent pb-1">
          Form Peminjaman Barang
        </h2>
        <p className="text-gray-600 text-lg">Lengkapi form berikut untuk meminjam peralatan</p>
      </div>

      <div className="rounded-2xl w-full max-w-2xl p-8 shadow-2xl border bg-white">
        {/* Validation Errors */}
        {validationErrors.length > 0 && (
          <div className="mb-6 p-4 bg-gradient-to-r from-red-50 to-pink-50 rounded-xl border border-red-200">
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <svg className="w-4 h-4 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
              </div>
              <div>
                <h4 className="font-semibold text-red-800 mb-2">Mohon lengkapi data berikut:</h4>
                <ul className="space-y-1">
                  {validationErrors.map((error, index) => (
                    <li key={index} className="text-red-700 text-sm flex items-center gap-2">
                      <div className="w-1.5 h-1.5 bg-red-500 rounded-full"></div>
                      {error}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}

        {/* Confirmation Modal */}
        {showConfirmation && (
          <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray/50 backdrop-blur-sm">
            <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-lg w-full mx-4 transform transition-all duration-300 scale-100">
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Package className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="text-2xl font-bold mb-4 text-gray-800">Konfirmasi Peminjaman</h3>
                <div className="text-left bg-gray-50 rounded-lg p-4 mb-6 space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="font-semibold text-gray-600">Nama:</span>
                    <span className="text-gray-800">{user?.name || 'Tidak ada'}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="font-semibold text-gray-600">NIM:</span>
                    <span className="text-gray-800">{user?.nim || 'Tidak ada'}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="font-semibold text-gray-600">Barang:</span>
                    <span className="text-gray-800">{selectedBarangData?.nama || 'Tidak ada'}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="font-semibold text-gray-600">Kategori:</span>
                    <span className="text-gray-800">{selectedKategori ? selectedKategori.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase()) : 'Tidak ada'}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="font-semibold text-gray-600">Waktu:</span>
                    <span className="text-gray-800">{formData.startTime} - {formData.endTime}</span>
                  </div>
                  <div className="border-t pt-3">
                    <span className="font-semibold text-gray-600 block mb-2">Keterangan:</span>
                    <div className="bg-white rounded p-3 text-gray-800 text-sm max-h-20 overflow-y-auto">
                      {formData.keterangan || 'Tidak ada keterangan'}
                    </div>
                  </div>
                </div>
                <p className="text-gray-600 mb-6">
                  Apakah data peminjaman sudah benar?
                </p>
                <div className="flex gap-4">
                  <button
                    className="flex-1 px-6 py-3 bg-gray-200 text-gray-700 rounded-xl hover:bg-gray-300 transition-all duration-300 font-medium"
                    onClick={() => setShowConfirmation(false)}
                  >
                    Batal
                  </button>
                  <button
                    className="flex-1 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 shadow-lg font-medium"
                    onClick={handleConfirmSubmit}
                  >
                    Ya, Submit
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Success Modal with Animation */}
        {showAlert && (
          <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray/40 backdrop-blur-sm">
            <div className="bg-white rounded-2xl shadow-2xl p-8 flex flex-col items-center transform transition-all ">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4 animate-bounce">
                <CheckCircle className="w-8 h-8 text-green-600" />
              </div>
              <span className="text-2xl font-bold mb-2 text-gray-800">Berhasil!</span>
              <span className="text-gray-600 mb-2 text-center">Peminjaman berhasil disubmit</span>
              <span className="text-sm text-gray-500 mb-6 text-center">Form akan direset otomatis</span>
              <button
                className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 shadow-lg"
                onClick={handleSuccessClose}
              >
                OK
              </button>
            </div>
          </div>
        )}

        <div className="space-y-8">
          {/* Single Column Layout for All Fields */}
          <div className="space-y-6">
            
            {/* Kategori Barang */}
            <div className="group">
              <label className="flex items-center gap-2 mb-3 font-semibold text-gray-700 text-lg">
                <Package className="w-5 h-5 text-blue-600" />
                Kategori Barang <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <select
                  className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 bg-white/80 text-gray-700 focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-300 appearance-none cursor-pointer hover:border-blue-400"
                  value={selectedKategori}
                  onChange={e => {
                    setSelectedKategori(e.target.value);
                    setSelectedBarang('');
                    if (validationErrors.length > 0) {
                      setValidationErrors([]);
                    }
                  }}
                  required
                >
                  <option value="">Pilih Kategori</option>
                  <option value="ruang-kelas">Ruang Kelas</option>
                  <option value="peralatan-av">Peralatan AV</option>
                  <option value="perangkat-komputer">Perangkat Komputer</option>
                  <option value="peralatan-jaringan">Peralatan Jaringan</option>
                  <option value="peralatan-listrik">Peralatan Listrik</option>
                  <option value="lainnya">Lainnya</option>
                </select>
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                  <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                  </svg>
                </div>
              </div>
            </div>

            {/* Barang yang Dipinjam */}
            <div className="group">
              <label className="flex items-center gap-2 mb-3 font-semibold text-gray-700 text-lg">
                <Package2 className="w-5 h-5 text-blue-600" />
                Barang yang Dipinjam <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <select
                  className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 bg-white/80 text-gray-700 focus:outline-none focus:border-purple-500 focus:ring-4 focus:ring-purple-100 transition-all duration-300 appearance-none cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed hover:border-purple-400"
                  value={selectedBarang}
                  onChange={e => {
                    setSelectedBarang(e.target.value);
                    if (validationErrors.length > 0) {
                      setValidationErrors([]);
                    }
                  }}
                  disabled={!selectedKategori}
                  required
                >
                  <option value="">
                    {selectedKategori ? 'Pilih Barang' : 'Pilih kategori dulu'}
                  </option>
                  {selectedKategori &&
                    barangPerKategori[selectedKategori]?.map(barang => (
                      <option key={barang.id} value={barang.id}>
                        {barang.nama}
                      </option>
                    ))}
                </select>
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                  <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                  </svg>
                </div>
              </div>
              
              {/* Stock Info */}
              {selectedBarangData && (
                <div className="mt-3 p-3 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg border border-green-200 transform transition-all duration-300 hover:scale-[1.02]">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    <span className="text-green-700 font-medium">
                      Stok tersedia: {selectedBarangData.jumlah} unit
                    </span>
                  </div>
                </div>
              )}
            </div>

            {/* Nama Lengkap */}
            <div className="group">
              <label className="flex items-center gap-2 mb-3 font-semibold text-gray-700 text-lg">
                <User className="w-5 h-5 text-blue-600" />
                Nama Lengkap
              </label>
              <input
                type="text"
                className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 bg-gray-50 text-gray-700 focus:outline-none transition-all duration-300 cursor-not-allowed"
                value={user?.name || ''}
                readOnly
              />
            </div>

            {/* NIM */}
            <div className="group">
              <label className="flex items-center gap-2 mb-3 font-semibold text-gray-700 text-lg">
                <Calendar className="w-5 h-5 text-blue-600" />
                NIM
              </label>
              <input
                type="text"
                className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 bg-gray-50 text-gray-700 focus:outline-none transition-all duration-300 cursor-not-allowed"
                value={user?.nim || ''}
                readOnly
              />
            </div>

            {/* Kelas */}
            <div className="group">
              <label className="flex items-center gap-2 mb-3 font-semibold text-gray-700 text-lg">
                <HomeIcon className="w-5 h-5 text-blue-600" />
                Kelas
              </label>
              <input
                type="text"
                className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 bg-gray-50 text-gray-700 focus:outline-none transition-all duration-300 cursor-not-allowed"
                value={user?.class || ''}
                readOnly
              />
            </div>

            {/* No HP */}
            <div className="group">
              <label className="flex items-center gap-2 mb-3 font-semibold text-gray-700 text-lg">
                <Phone className="w-5 h-5 text-blue-600" />
                No. HP
              </label>
              <input
                type="text"
                className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 bg-gray-50 text-gray-700 focus:outline-none transition-all duration-300 cursor-not-allowed"
                value={user?.phone || ''}
                readOnly
              />
            </div>

            {/* Durasi Peminjaman - Manual input only */}
            <div className="group">
              <label className="flex items-center gap-2 mb-3 font-semibold text-gray-700 text-lg">
                <Clock className="w-5 h-5 text-blue-600" />
                Durasi Peminjaman <span className="text-red-500">*</span>
              </label>
              <div className="text-sm text-gray-500 mb-3">
                Jam operasional: 07:00 - 18:00 (format: HH:MM)
              </div>
              <div className="flex items-center gap-4">
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-600 mb-1">Dari Jam</label>
                  <div className="relative">
                    <input
                      type="text"
                      className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 bg-white/80 text-gray-700 focus:outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 transition-all duration-300 hover:border-indigo-400"
                      value={formData.startTime}
                      onChange={e => handleInputChange('startTime', e.target.value)}
                      placeholder="07:00"
                      maxLength="5"
                    />
                    <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                      <Clock className="w-4 h-4 text-gray-400" />
                    </div>
                  </div>
                </div>
                <div className="px-3 py-2 bg-gradient-to-r from-indigo-100 to-purple-100 rounded-lg font-medium text-indigo-700 mt-6">
                  sampai
                </div>
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-600 mb-1">Sampai Jam</label>
                  <div className="relative">
                    <input
                      type="text"
                      className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 bg-white/80 text-gray-700 focus:outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 transition-all duration-300 hover:border-indigo-400"
                      value={formData.endTime}
                      onChange={e => handleInputChange('endTime', e.target.value)}
                      placeholder="18:00"
                      maxLength="5"
                    />
                    <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                      <Clock className="w-4 h-4 text-gray-400" />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Keterangan - Full Width */}
            <div className="group">
              <label className="flex items-center gap-2 mb-3 font-semibold text-gray-700 text-lg">
                <FileText className="w-5 h-5 text-blue-600" />
                Keterangan <span className="text-red-500">*</span>
              </label>
              <textarea
                className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 bg-white/80 text-gray-700 focus:outline-none focus:border-gray-500 focus:ring-4 focus:ring-gray-100 transition-all duration-300 resize-none hover:border-gray-400"
                rows={4}
                placeholder="Tambahkan keterangan atau catatan khusus..."
                value={formData.keterangan}
                onChange={e => handleInputChange('keterangan', e.target.value)}
              />
            </div>

            {/* Submit Button */}
            <div className="flex justify-center pt-4">
              <button
                type="button"
                onClick={handleSubmit}
                className="group relative px-12 py-4 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 text-white font-bold text-lg rounded-2xl hover:from-blue-700 hover:via-purple-700 hover:to-indigo-700 focus:outline-none focus:ring-4 focus:ring-purple-200 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl"
              >
                <span className="relative z-10 flex items-center gap-3">
                  <CheckCircle className="w-6 h-6 group-hover:rotate-12 transition-transform duration-300" />
                  SUBMIT PEMINJAMAN
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-blue-400 via-purple-400 to-indigo-400 rounded-2xl opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PinjamContent;