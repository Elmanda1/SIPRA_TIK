import React, { createContext, useContext, useState } from 'react';

// Definisikan konstanta denda
const DENDA_PER_JAM = 5000;
const PeminjamanContext = createContext();

export const PeminjamanProvider = ({ children }) => {
  const [peminjamanHistory, setPeminjamanHistory] = useState([
    {
      id: 14,
      room: 'Proyektor',
      building: 'Peralatan AV',
      date: '09 Jun 2025',
      time: '12:00 - 15:00',
      status: 'Aktif',
      statusColor: 'bg-blue-100 text-blue-800'
    },
    {
      id: 13,
      room: 'Laptop',
      building: 'Perangkat Komputer',
      date: '08 Jun 2025',
      time: '14:00 - 16:00',
      status: 'Menunggu Verifikasi',
      statusColor: 'bg-blue-100 text-blue-800',
    },
    {
      id: 12,
      room: 'Switch',
      building: 'Peralatan Jaringan',
      date: '08 Jun 2025',
      time: '09:00 - 10:00',
      status: 'Aktif',
      statusColor: 'bg-blue-100 text-blue-800',
    },
    {
      id: 11,
      room: 'Microphone',
      building: 'Peralatan AV',
      date: '07 Jun 2025',
      time: '13:00 - 15:00',
      status: 'Aktif',
      statusColor: 'bg-blue-100 text-blue-800',
    },
    {
      id: 10,
      room: 'PC Desktop',
      building: 'Perangkat Komputer',
      date: '06 Jun 2025',
      time: '13:00 - 15:00',
      status: 'Aktif',
      statusColor: 'bg-blue-100 text-blue-800',
    },
    {
      id: 9,
      room: 'Router',
      building: 'Peralatan Jaringan',
      date: '25 Mei 2025',
      time: '09:00 - 11:00',
      status: 'Selesai',
      statusColor: 'bg-green-100 text-green-800',
    },
    {
      id: 8,
      room: 'Speaker',
      building: 'Peralatan AV',
      date: '18 Mei 2025',
      time: '14:00 - 16:00',
      status: 'Selesai',
      statusColor: 'bg-green-100 text-green-800',
    },
    {
      id: 7,
      room: 'Access Point',
      building: 'Peralatan Jaringan',
      date: '12 Mei 2025',
      time: '10:00 - 12:00',
      status: 'Dibatalkan',
      statusColor: 'bg-red-100 text-red-800',
    },
    {
      id: 6,
      room: 'Monitor LED',
      building: 'Perangkat Komputer',
      date: '28 Apr 2025',
      time: '08:00 - 10:00',
      status: 'Selesai',
      statusColor: 'bg-green-100 text-green-800',
    },
    {
      id: 5,
      room: 'Kamera DSLR',
      building: 'Peralatan AV',
      date: '15 Apr 2025',
      time: '13:00 - 14:00',
      status: 'Penalty',
      statusColor: 'bg-yellow-100 text-yellow-800',
      penaltyData: {
        photo: null,
        photoPreview: null,
        notes: "Dikembalikan terlambat",
        amount: 2.5,
        dendaPerJam: DENDA_PER_JAM,
        totalDenda: 12500,
        isPaid: false
      }
    },
    {
      id: 4,
      room: 'Keyboard Mechanical',
      building: 'Perangkat Komputer',
      date: '10 Apr 2025',
      time: '15:00 - 17:00',
      status: 'Selesai',
      statusColor: 'bg-green-100 text-green-800',
    },
    {
      id: 3,
      room: 'Patch Panel',
      building: 'Peralatan Jaringan',
      date: '05 Apr 2025',
      time: '11:00 - 13:00',
      status: 'Selesai',
      statusColor: 'bg-green-100 text-green-800',
    },
    {
      id: 2,
      room: 'Video Camera',
      building: 'Peralatan AV',
      date: '02 Apr 2025',
      time: '09:00 - 10:00',
      status: 'Selesai',
      statusColor: 'bg-green-100 text-green-800',
    },
    {
      id: 1,
      room: 'Ruangan AA 204',
      building: 'Ruang Kelas',
      date: '01 Apr 2025',
      time: '10:00 - 11:00',
      status: 'Selesai',
      statusColor: 'bg-green-100 text-green-800',
    }
  ]);

  const addPeminjaman = (newPeminjaman) => {
    setPeminjamanHistory(prev => [
      {
        id: prev.length + 1,
        ...newPeminjaman,
        status: 'Menunggu Verifikasi',
        statusColor: 'bg-yellow-100 text-yellow-800',
        date: new Date().toLocaleDateString('id-ID', {
          day: '2-digit',
          month: 'short',
          year: 'numeric'
        })
      },
      ...prev
    ]);
  };

  // Fungsi untuk mengupdate status peminjaman
  const updatePeminjamanStatus = (id, newStatus, penaltyData = null) => {
    setPeminjamanHistory(prev => {
      return prev.map(booking => {
        if (booking.id === id) {
          const baseUpdate = {
            ...booking,
            status: newStatus,
            statusColor: getStatusColor(newStatus)
          };

          // Jika ada penalty data, tambahkan ke update
          if (newStatus === 'Penalty' && penaltyData) {
            return {
              ...baseUpdate,
              penaltyData: {
                photo: penaltyData.photo,
                photoPreview: penaltyData.photoPreview,
                notes: penaltyData.notes,
                amount: parseFloat(penaltyData.amount),
                dendaPerJam: DENDA_PER_JAM,
                totalDenda: parseFloat(penaltyData.amount * DENDA_PER_JAM),
                isPaid: false
              }
            };
          }

          return baseUpdate;
        }
        return booking;
      });
    });
  };

  // Helper function untuk mendapatkan warna status
  const getStatusColor = (status) => {
    switch (status) {
      case 'Aktif':
        return 'bg-blue-100 text-blue-800';
      case 'Menunggu Verifikasi':
        return 'bg-yellow-100 text-yellow-800';
      case 'Selesai':
        return 'bg-green-100 text-green-800';
      case 'Dibatalkan':
        return 'bg-red-100 text-red-800';
      case 'Penalty':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  // Fungsi untuk menyelesaikan peminjaman dengan data penalty
  const handleCompleteBooking = (bookingId, completeData) => {
    setPeminjamanHistory(prev => {
      return prev.map(booking => {
        if (booking.id === bookingId) {
          return {
            ...booking,
            status: completeData.status,
            statusColor: getStatusColor(completeData.status),
            penaltyData: completeData.penaltyData ? {
              photo: completeData.penaltyData.photo,
              photoPreview: completeData.penaltyData.photoPreview, // Sekarang berisi base64
              notes: completeData.penaltyData.notes,
              amount: parseFloat(completeData.penaltyData.amount),
              dendaPerJam: DENDA_PER_JAM,
              totalDenda: parseFloat(completeData.penaltyData.amount) * DENDA_PER_JAM,
              isPaid: false
            } : null
          };
        }
        return booking;
      });
    });
  };

  // Fungsi untuk membayar denda
  const handlePayPenalty = (bookingId) => {
    setPeminjamanHistory(prev => {
      return prev.map(booking => {
        if (booking.id === bookingId && booking.penaltyData) {
          return {
            ...booking,
            penaltyData: {
              ...booking.penaltyData,
              isPaid: true
            }
          };
        }
        return booking;
      });
    });
  };

  // Fungsi untuk membatalkan peminjaman
  const handleCancelBooking = (bookingId, reason = '') => {
    setPeminjamanHistory(prev => {
      const updatedBookings = prev.map(booking => {
        if (booking.id === bookingId) {
          return {
            ...booking,
            status: 'Dibatalkan',
            statusColor: 'bg-red-100 text-red-800',
            cancelReason: reason,
            cancelledAt: new Date().toISOString()
          };
        }
        return booking;
      });
      
      console.log('Booking cancelled:', bookingId, 'Reason:', reason);
      return updatedBookings;
    });
  };

  // Fungsi untuk mendapatkan peminjaman berdasarkan ID
  const getBookingById = (id) => {
    return peminjamanHistory.find(booking => booking.id === id);
  };

  // Fungsi untuk mendapatkan statistik peminjaman
  const getBookingStats = () => {
    const total = peminjamanHistory.length;
    const aktif = peminjamanHistory.filter(item => item.status === 'Aktif').length;
    const selesai = peminjamanHistory.filter(item => item.status === 'Selesai').length;
    const menunggu = peminjamanHistory.filter(item => item.status === 'Menunggu Verifikasi').length;
    const penalty = peminjamanHistory.filter(item => item.status === 'Penalty').length;
    const dibatalkan = peminjamanHistory.filter(item => item.status === 'Dibatalkan').length;
    
    // Hitung total denda yang belum dibayar
    const unpaidPenalties = peminjamanHistory
      .filter(item => item.status === 'Penalty' && item.penaltyData && !item.penaltyData.isPaid)
      .reduce((total, item) => total + (item.penaltyData.totalDenda || 0), 0);

    return {
      total,
      aktif,
      selesai,
      menunggu,
      penalty,
      dibatalkan,
      unpaidPenalties
    };
  };

  // Fungsi untuk mendapatkan peminjaman yang memiliki denda belum dibayar
  const getUnpaidPenalties = () => {
    return peminjamanHistory.filter(item => 
      item.status === 'Penalty' && 
      item.penaltyData && 
      !item.penaltyData.isPaid
    );
  };

  return (
    <PeminjamanContext.Provider value={{
      peminjamanHistory,
      addPeminjaman,
      updatePeminjamanStatus,
      handleCompleteBooking,
      handlePayPenalty, // Tambahkan ke Provider
      handleCancelBooking,
      getBookingById,
      getBookingStats,
      getUnpaidPenalties
    }}>
      {children}
    </PeminjamanContext.Provider>
  );
};

export const usePeminjaman = () => useContext(PeminjamanContext);