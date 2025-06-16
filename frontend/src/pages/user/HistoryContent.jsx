import React, { useState } from 'react';
import { MapPin, Filter, AlertCircle, Clock, DollarSign, Camera } from 'lucide-react';
import { usePeminjaman } from '../../context/PeminjamanContext';

const BookingTable = ({ title, bookings, handleBookingClick }) => (
  <div className="bg-white rounded-xl shadow-sm mb-8">
    <div className="border-b border-gray-200 px-6 py-4 flex items-center justify-between">
      <h2 className="text-2xl font-bold text-gray-900">{title}</h2>
      <button className="p-2 text-gray-400 bg-white hover:text-gray-600">
        <Filter className="w-5 h-5" />
      </button>
    </div>
    <div className="px-6 py-3 bg-gray-50 border-b border-gray-200">
      <div className="grid grid-cols-6 gap-4 text-sm font-medium text-gray-700">
        <div>Nama Barang</div>
        <div>Tanggal Peminjaman</div>
        <div>Durasi Peminjaman</div>
        <div>Kategori</div>
        <div>Status</div>
        <div className='ml-5'>Aksi</div>
      </div>
    </div>
    <div className="divide-y divide-gray-200 overflow-y-auto ">
      {bookings.length === 0 && (
        <div className="px-6 py-8 text-center text-gray-400">Tidak ada data</div>
      )}
      {bookings.map((booking) => (
        <div
          key={booking.id}
          className="px-6 py-4 hover:bg-gray-50 transition-colors cursor-pointer"
          onClick={() => handleBookingClick && handleBookingClick(booking)}
        >
          <div className="grid grid-cols-6 gap-4 items-center">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center">
                <MapPin className="w-5 h-5 text-indigo-600" />
              </div>
              <div>
                <div className="font-medium text-gray-900">{booking.room}</div>
              </div>
            </div>
            <div className="text-gray-900">{booking.date}</div>
            <div className="text-gray-900">{booking.time}</div>
            <div className="text-gray-900">{booking.building}</div>
            <div>
              <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                booking.status === 'Aktif' ? 'bg-blue-100 text-blue-800' :
                booking.status === 'Menunggu Verifikasi' ? 'bg-yellow-100 text-yellow-800' :
                booking.status === 'Dibatalkan' ? 'bg-red-100 text-red-800' :
                booking.status === 'Selesai' ? 'bg-green-100 text-green-800' :
                booking.status === 'Penalty' ? 'bg-orange-100 text-orange-800' :
                'bg-gray-100 text-gray-800'
              }`}>
                {booking.status}
              </span>
            </div>
            <div className="flex space-x-2">
              {(booking.status === 'Aktif' || 
                booking.status === 'Menunggu Verifikasi' || 
                booking.status === 'Dibatalkan' || 
                booking.status === 'Selesai' || 
                booking.status === 'Penalty') && (
                <button className="text-blue-900 bg-white shadow-lg hover:text-blue-900 text-sm font-medium">
                  Detail
                </button>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
);

const HistoryContent = ({ 
  handleBookingClick, 
  selectedBooking, 
  setSelectedBooking,
  handleCancelBooking,
  handleCompleteBooking 
}) => {
  const { peminjamanHistory, handlePayPenalty } = usePeminjaman();
  const [showPenaltyModal, setShowPenaltyModal] = useState(false);
  const [showPenaltyDetailModal, setShowPenaltyDetailModal] = useState(false);
  const [bookingToComplete, setBookingToComplete] = useState(null);
  const [penaltyData, setPenaltyData] = useState({
    photo: null,
    amount: '',
    notes: '',
    photoPreview: null
  });

  // Konstanta untuk perhitungan denda
  const DENDA_PER_JAM = 5000; // Rp 5.000 per jam

  const activeBookings = peminjamanHistory.filter(booking => booking.status === 'Aktif' || booking.status === 'Menunggu Verifikasi');
  const historyBookings = peminjamanHistory.filter(booking => booking.status !== 'Aktif' && booking.status !== 'Menunggu Verifikasi');

  const handlePenaltyInput = (e) => {
    const { name, value, files } = e.target;
    if (name === 'photo') {
      const file = files[0];
      if (file) {
        // Convert to base64
        const reader = new FileReader();
        reader.onloadend = () => {
          setPenaltyData(prev => ({
            ...prev,
            photo: file,
            photoPreview: reader.result // Simpan sebagai base64 string
          }));
        };
        reader.readAsDataURL(file);
      }
    } else {
      setPenaltyData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handlePenaltyConfirm = (e) => {
    e.preventDefault();
    if (bookingToComplete) {
      const amount = parseFloat(penaltyData.amount) || 0;
      const totalDenda = amount * DENDA_PER_JAM;

      const completeData = {
        status: amount > 0 ? 'Penalty' : 'Selesai',
        penaltyData: amount > 0 ? {
          photo: penaltyData.photo,
          photoPreview: penaltyData.photoPreview,
          notes: penaltyData.notes || `Terlambat mengembalikan ${amount} jam`,
          amount: amount,
          dendaPerJam: DENDA_PER_JAM,
          totalDenda: totalDenda,
          isPaid: false
        } : null
      };

      console.log('Sending complete data:', completeData);

      // Update peminjaman dengan data lengkap
      handleCompleteBooking(bookingToComplete.id, completeData);
      
      // Reset form
      setShowPenaltyModal(false);
      setBookingToComplete(null);
      setSelectedBooking(null);
      
      if (penaltyData.photoPreview) {
        URL.revokeObjectURL(penaltyData.photoPreview);
      }
      
      setPenaltyData({
        photo: null,
        amount: '',
        notes: '',
        photoPreview: null
      });
    }
  };

  const handlePenaltyPayment = (bookingId) => {
    handlePayPenalty(bookingId);
    // Tutup modal setelah pembayaran
    setShowPenaltyDetailModal(false);
    setSelectedBooking(null);
  };

  const initiateCompletion = (booking) => {
    setBookingToComplete(booking);
    setShowPenaltyModal(true);
  };

  const handleDetailClick = (booking) => {
    console.log('Clicked booking:', booking);
    
    // Jika booking memiliki penalty data atau status penalty
    if (booking.status === 'Penalty' || booking.penaltyData) {
      const bookingWithPenalty = {
        ...booking,
        penaltyData: booking.penaltyData || {
          amount: 0,
          dendaPerJam: DENDA_PER_JAM,
          totalDenda: 0,
          isPaid: false
        }
      };
      
      console.log('Setting selected booking with penalty:', bookingWithPenalty);
      setSelectedBooking(bookingWithPenalty);
      setShowPenaltyDetailModal(true);
    } else {
      handleBookingClick(booking);
    }
  };

  // Fungsi untuk menghitung total denda berdasarkan jam keterlambatan
  const calculateTotalPenalty = (hours) => {
    return hours * DENDA_PER_JAM;
  };

  // Fungsi untuk format tanggal yang lebih baik
  const formatDate = (dateString) => {
    return dateString || 'Tidak tersedia';
  };

  return (
    <div className='mt-10'>
      <BookingTable title="Pinjaman Aktif" bookings={activeBookings} handleBookingClick={handleDetailClick} />
      <BookingTable title="History Peminjaman" bookings={historyBookings} handleBookingClick={handleDetailClick} />

      {/* Modal untuk detail booking biasa */}
      {selectedBooking && !showPenaltyDetailModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 max-w-md w-full mx-4">
            <h3 className="text-lg text-black font-bold mb-4">Detail Peminjaman</h3>
            <div className="text-black space-y-3">
              <div>
                <span className="font-medium">Nama Barang: </span> {selectedBooking.room}
              </div>
              <div>
                <span className="font-medium">Tanggal:</span> {selectedBooking.date}
              </div>
              <div>
                <span className="font-medium">Waktu:</span> {selectedBooking.time}
              </div>
              <div>
                <span className="font-medium">Kategori:</span> {selectedBooking.building}
              </div>
              <div>
                <span className="font-medium">Status:</span>
                <span className={`ml-2 px-3 py-1 rounded-full text-xs font-medium ${selectedBooking.statusColor}`}>
                  {selectedBooking.status}
                </span>
              </div>
            </div>
            <div className="flex justify-end space-x-3 mt-6">
              <button
                onClick={() => setSelectedBooking(null)}
                className="px-4 py-2 bg-white text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                Tutup
              </button>
              {selectedBooking.status === 'Menunggu Verifikasi' && (
                <button 
                  onClick={() => handleCancelBooking(selectedBooking.id)}
                  className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                >
                  Batalkan
                </button>
              )}
              {selectedBooking.status === 'Aktif' && (
                <button 
                  onClick={() => initiateCompletion(selectedBooking)}
                  className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                >
                  Selesai Peminjaman
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Modal khusus untuk detail penalty */}
      {showPenaltyDetailModal && selectedBooking && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 max-w-3xl w-full mx-4 max-h-[95vh] overflow-y-auto">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
                <AlertCircle className="w-6 h-6 text-orange-600" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900">Detail Penalty</h3>
                <p className="text-sm text-gray-600">Informasi denda peminjaman</p>
              </div>
            </div>

            {/* Detail Peminjaman */}
            <div className="bg-gray-50 p-4 rounded-lg mb-6">
              <h4 className="font-medium text-gray-900 mb-3">Detail Peminjaman:</h4>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-gray-600">Nama Barang:</p>
                  <p className="font-medium text-black">{selectedBooking.room}</p>
                </div>
                <div>
                  <p className="text-gray-600">Tanggal Peminjaman:</p>
                  <p className="font-medium text-black">{selectedBooking.date}</p>
                </div>
                <div>
                  <p className="text-gray-600">Durasi:</p>
                  <p className="font-medium text-black">{selectedBooking.time}</p>
                </div>
                <div>
                  <p className="text-gray-600">Kategori:</p>
                  <p className="font-medium text-black">{selectedBooking.building}</p>
                </div>
              </div>
            </div>

            {/* Detail Penalty */}
            {selectedBooking?.penaltyData && (
              <div className="bg-orange-50 border border-orange-200 p-4 rounded-lg mb-6">
                <h4 className="font-medium text-orange-900 mb-4 flex items-center gap-2">
                  <DollarSign className="w-4 h-4" />
                  Informasi Denda
                </h4>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-sm">
                      <Clock className="w-4 h-4 text-orange-600" />
                      <span className="text-gray-700">Total Jam Keterlambatan:</span>
                    </div>
                    <span className="font-semibold text-orange-900">
                      {selectedBooking.penaltyData.amount || 0} jam
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-700">Denda per Jam:</span>
                    <span className="font-semibold text-orange-900">
                      Rp {(selectedBooking.penaltyData.dendaPerJam || 0).toLocaleString('id-ID')}
                    </span>
                  </div>

                  <hr className="border-orange-200" />

                  <div className="flex items-center justify-between">
                    <span className="font-medium text-gray-900">Total Denda:</span>
                    <span className="text-lg font-bold text-orange-900">
                      Rp {(selectedBooking.penaltyData.totalDenda || 0).toLocaleString('id-ID')}
                    </span>
                  </div>
                </div>
              </div>
            )}

            {/* Foto Pengembalian */}
            {selectedBooking.penaltyData?.photo && (
              <div className="mb-6">
                <div className="flex items-center gap-2 mb-3">
                  <Camera className="w-4 h-4 text-gray-600" />
                  <h4 className="font-medium text-gray-900">Foto Pengembalian:</h4>
                </div>
                <div className="bg-gray-100 p-3 rounded-lg">
                  {selectedBooking.penaltyData.photoPreview ? (
                    <div className="space-y-2">
                      <img 
                        src={selectedBooking.penaltyData.photoPreview} 
                        alt="Foto Pengembalian" 
                        className="w-full max-w-sm h-auto rounded-lg border"
                      />
                      <p className="text-sm text-gray-600">
                        {selectedBooking.penaltyData.photo.name || 'penalty_photo.jpg'}
                      </p>
                    </div>
                  ) : (
                    <p className="text-sm text-gray-600">
                      Foto telah diupload: {selectedBooking.penaltyData.photo.name || 'penalty_photo.jpg'}
                    </p>
                  )}
                </div>
              </div>
            )}

            {/* Status Badge */}
            <div className="flex items-center justify-center mb-6">
              <span className="px-4 py-2 bg-orange-100 text-orange-800 rounded-full text-sm font-medium">
                Status: Penalty - {selectedBooking.penaltyData?.isPaid ? 'Sudah Dibayar' : 'Belum Dibayar'}
              </span>
            </div>

            {/* Buttons */}
            <div className="flex justify-end gap-3">
              <button
                onClick={() => {
                  setShowPenaltyDetailModal(false);
                  setSelectedBooking(null);
                }}
                className="px-6 py-2 bg-white text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                Tutup
              </button>
              <button
                onClick={() => handlePenaltyPayment(selectedBooking.id)}
                disabled={selectedBooking?.penaltyData?.isPaid}
                className={`px-6 py-2 rounded-lg ${
                  selectedBooking?.penaltyData?.isPaid
                    ? 'bg-gray-300 text-gray-600 cursor-not-allowed'
                    : 'bg-orange-600 text-white hover:bg-orange-700'
                }`}
              >
                {selectedBooking?.penaltyData?.isPaid ? 'Sudah Dibayar' : 'Bayar Denda'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Penalty Confirmation Modal */}
      {showPenaltyModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 max-w-3xl w-full mx-4 max-h-[95vh] overflow-y-auto">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center">
                <AlertCircle className="w-6 h-6 text-yellow-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900">Form Pengembalian Barang</h3>
            </div>

            <form onSubmit={handlePenaltyConfirm} className="space-y-6">
              {/* Detail Peminjaman - Readonly */}
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-medium text-gray-900 mb-3">Detail Peminjaman:</h4>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-gray-600">Nama Barang:</p>
                    <p className="font-medium text-black">{bookingToComplete?.room}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Tanggal Peminjaman:</p>
                    <p className="font-medium text-black">{bookingToComplete?.date}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Durasi:</p>
                    <p className="font-medium text-black">{bookingToComplete?.time}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Kategori:</p>
                    <p className="font-medium text-black">{bookingToComplete?.building}</p>
                  </div>
                </div>
              </div>

              {/* Form Pengembalian */}
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Upload Foto Pengembalian *
                  </label>
                  <input
                    type="file"
                    name="photo"
                    onChange={handlePenaltyInput}
                    accept="image/*"
                    className="py-2 px-3 text-black border border-gray-300 rounded-lg w-full"
                    required
                  />
                  {penaltyData.photoPreview && (
                    <div className="mt-2">
                      <img 
                        src={penaltyData.photoPreview} 
                        alt="Preview" 
                        className="w-60 h-60 object-cover rounded-lg border"
                      />
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Jumlah Telat (dalam jam) *
                  </label>
                  <input
                    type="number"
                    name="amount"
                    value={penaltyData.amount}
                    onChange={handlePenaltyInput}
                    className="w-full border border-gray-300 rounded-lg p-2 bg-white text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Isi 0 jika tepat waktu"
                    min="0"
                    required
                  />
                  {penaltyData.amount && parseInt(penaltyData.amount) > 0 && (
                    <div className="mt-2 p-3 bg-orange-50 border border-orange-200 rounded-lg">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-orange-700">Perhitungan Denda:</span>
                        <span className="font-semibold text-orange-900">
                          {penaltyData.amount} jam × Rp {DENDA_PER_JAM.toLocaleString('id-ID')} = 
                          Rp {calculateTotalPenalty(parseInt(penaltyData.amount)).toLocaleString('id-ID')}
                        </span>
                      </div>
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Catatan (opsional)
                  </label>
                  <textarea
                    name="notes"
                    value={penaltyData.notes}
                    onChange={handlePenaltyInput}
                    className="w-full border border-gray-300 rounded-lg p-2 bg-white text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Tambahkan catatan jika diperlukan..."
                    rows={3}
                  />
                </div>
              </div>

              {/* Buttons */}
              <div className="flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => {
                    setShowPenaltyModal(false);
                    setBookingToComplete(null);
                    // Clean up preview URL
                    if (penaltyData.photoPreview) {
                      URL.revokeObjectURL(penaltyData.photoPreview);
                    }
                    setPenaltyData({ 
                      photo: null, 
                      amount: '', 
                      notes: '', 
                      photoPreview: null 
                    });
                  }}
                  className="px-4 py-2 bg-white text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                >
                  Simpan & Selesaikan
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default HistoryContent;