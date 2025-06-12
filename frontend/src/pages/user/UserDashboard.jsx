import React, { useRef, useState } from 'react';
import { MapPin, User, Search, Filter, History, Package, ClipboardList, Building2, Monitor, Network, Video, Zap, MoreHorizontal, Boxes } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { usePeminjaman } from '../../context/PeminjamanContext';
import logoImg from '../../assets/SIPRATIK.png';
import LogoutModal from '../../components/common/LogoutModal';
import profileImg from '../../assets/profile.jpg';
import HomeContent from './HomeContent';
import ProfileContent from './ProfileContent';
import BarangContent from './BarangContent';
import HistoryContent from './HistoryContent';
import PinjamContent from './PinjamContent';
import KetentuanContent from './KetentuanContent';

export default function UserDashboard() {
  document.title = "SIPRATIK";
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [activeMenu, setActiveMenu] = useState('Home');
  const [selectedCategory, setSelectedCategory] = useState(null); // Tambahkan state untuk kategori yang dipilih
  const navigate = useNavigate();
  const { logout } = useAuth();
  const { updatePeminjamanStatus } = usePeminjaman();
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const blueContainerRef = useRef(null);
  const { user } = useAuth();

  const handleLogout = () => {
    setShowLogoutModal(true);
  };

  const handleConfirmLogout = () => {
    logout();
    setShowLogoutModal(false);
    console.log('User logged out successfully');
  };

  const handleBookingClick = (booking) => {
    setSelectedBooking(booking);
  };

  const handleCancelBooking = (bookingId) => {
    updatePeminjamanStatus(bookingId, 'Dibatalkan');
    setSelectedBooking(null);
    console.log('Peminjaman dibatalkan');
  };

  const handleCompleteBooking = (bookingId, completeData) => {
    updatePeminjamanStatus(bookingId, completeData.status, completeData.penaltyData);
  };

  // Perbaiki fungsi handleKategoriClick
  const handleKategoriClick = (categoryId) => {
    // Set kategori yang dipilih
    setSelectedCategory(categoryId);
    // Pindah ke menu Barang
    setActiveMenu('Barang');
    
    // Tunggu hingga BarangContent ter-render dengan delay yang lebih lama
    setTimeout(() => {
      // Cari elemen berdasarkan ID yang sesuai
      const targetElement = document.getElementById(categoryId);
      if (targetElement) {
        // Scroll ke elemen dengan offset untuk header
        const yOffset = -100; // Offset untuk header yang fixed
        const y = targetElement.getBoundingClientRect().top + window.pageYOffset + yOffset;
        window.scrollTo({ top: y, behavior: 'smooth' });
      } else {
        // Fallback: scroll ke atas halaman barang jika elemen tidak ditemukan
        window.scrollTo({ top: 0, behavior: 'smooth' });
        console.warn(`Element with ID '${categoryId}' not found`);
      }
    }, 300); // Tingkatkan delay menjadi 300ms
  };

  return (    
    <div
      className="min-h-screen w-[99vw]"
      style={{
        background: "linear-gradient(180deg, rgb(210, 250, 255) 0px, #EAF1F8 1000px)"
      }}
    >
    {/* Header */}
<div className="bg-white/30 bg-opacity-50 backdrop-blur-sm fixed top-4 left-1/2 transform -translate-x-1/2 min-w-[1800px] max-w-[95vw] w-[1200px] h-30 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 px-20 py-4 flex items-center justify-between z-10 border border-white/20">
  <a className="text-3xl pl-2 font-bold text-gray-900 cursor-pointer hover:text-black transition-transform active:scale-95 duration-200 hover:scale-105"
    onClick={() => {
      setActiveMenu('Home');
      setSelectedCategory(null); // Reset kategori ketika kembali ke home
    }}
  >
   <img
        src={logoImg}
        alt="Logo"
        className="w-70 h-10 hover:brightness-110 transition-transform duration-200"
   />
  </a>
  
  {/* menu */}
  <div className="flex items-center space-x-4 gap-10">
    <h2 className='opacity-0'>............</h2>

    <button
      className={`flex flex-row gap-2 cursor-pointer transition-transform duration-300 px-4 py-2 rounded-xl relative group hover:scale-105 active:scale-95 focus:outline-none ${
        activeMenu === 'pinjam' ? 'bg-cyan-100/80 shadow-md' : ''
      }`}
      onClick={() => {
        setActiveMenu('pinjam');
        setSelectedCategory(null);
      }}
    >
      <Package className={`w-7 h-7 transition-transform duration-300 group-hover:scale-110 ${
        activeMenu === 'pinjam' ? 'text-cyan-600' : 'text-black group-hover:text-cyan-600'
      }`} />
      <p className={`text-xl transition-transform duration-300 select-none relative ${
        activeMenu === 'pinjam' ? 'text-cyan-600 font-bold' : 'text-black group-hover:text-cyan-600'
      }`}>
        Pinjam
      </p>
    </button>

    <button
      className={`flex flex-row gap-2 cursor-pointer transition-transform duration-300 px-4 py-2 rounded-xl relative group hover:scale-105 active:scale-95 focus:outline-none ${
        activeMenu === 'Barang' ? 'bg-cyan-100/80 shadow-md' : ''
      }`}
      onClick={() => {
        setActiveMenu('Barang');
        setSelectedCategory(null);
      }}
    >
      <Boxes className={`w-7 h-7 transition-transform duration-300 group-hover:scale-110 ${
        activeMenu === 'Barang' ? 'text-cyan-600' : 'text-black group-hover:text-cyan-600'
      }`} />
      <p className={`text-xl transition-transform duration-300 select-none relative ${
        activeMenu === 'Barang' ? 'text-cyan-600 font-bold' : 'text-black group-hover:text-cyan-600'
      }`}>
        Barang
      </p>
    </button>
    
    <button
      className={`flex flex-row gap-2 cursor-pointer transition-transform ease-in-out duration-300 px-4 py-2 rounded-xl relative group hover:scale-105 active:scale-95 focus:outline-none ${
        activeMenu === 'history' ? 'bg-cyan-100/80 shadow-md' : ''
      }`}
      onClick={() => {
        setActiveMenu('history');
        setSelectedCategory(null);
      }}
    >
      <History className={`w-7 h-7 transition-transform duration-300 group-hover:scale-110 ${
        activeMenu === 'history' ? 'text-cyan-600' : 'text-black group-hover:text-cyan-600'
      }`} />
      <p className={`text-xl transition-transform duration-300 select-none relative ${
        activeMenu === 'history' ? 'text-cyan-600 font-bold' : 'text-black group-hover:text-cyan-600'
      }`}>
        History
      </p>
    </button>
  </div>
  
  {/* Tombol logout */}
  <div className="flex items-center space-x-8 pr-8">
    <button
      onClick={handleLogout}
      className="flex items-center rounded-xl transition-transform ease-in-out duration-300 active:scale-95 hover:bg-gradient-to-r hover:from-red-500/20 hover:to-pink-500/20 hover:shadow-lg hover:scale-105 focus:outline-none px-6 py-4 group border border-transparent hover:border-red-200/30"
    >
      <div className="text-black font-bold group-hover:text-red-600 transition-colors duration-300">
        LOGOUT
      </div>
    </button>

    <button
      onClick={() => {
        setActiveMenu('profile');
        setSelectedCategory(null);
      }}
      className="flex items-center rounded-full hover:ring-4 active:scale-95 hover:ring-blue-400/30 bg-white outline outline-1 outline-gray-200 hover:outline-blue-300 focus:outline-none p-0 transition-all duration-300 hover:shadow-lg hover:scale-110 group"
      style={{ width: 48, height: 48, overflow: 'hidden' }}
    >
      <img
        src={user.foto}
        alt="Profile"
        className="w-12 h-12 object-cover rounded-full group-hover:brightness-110 transition-transform duration-300"
      />
    </button>
  </div>
</div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col gap-8 pt-24">
        {activeMenu === 'Home' && (
          <HomeContent
            setActiveMenu={setActiveMenu}
            blueContainerRef={blueContainerRef}
            handleKategoriClick={handleKategoriClick}
          />
        )}
        {activeMenu === 'Barang' && (
          <BarangContent selectedCategory={selectedCategory} />
        )}
        {activeMenu === 'history' && (
          <HistoryContent 
            handleBookingClick={handleBookingClick}
            selectedBooking={selectedBooking}
            setSelectedBooking={setSelectedBooking}
            handleCancelBooking={handleCancelBooking}
            handleCompleteBooking={handleCompleteBooking}
          />
        )}
        {activeMenu === 'pinjam' && <PinjamContent />}
        {activeMenu === 'profile' && <ProfileContent />}
        {activeMenu === 'ketentuan' && <KetentuanContent />}
      </div>

      {/* Logout Modal */}
      <LogoutModal
        isOpen={showLogoutModal}
        onClose={() => setShowLogoutModal(false)}
        onConfirm={handleConfirmLogout}
        userRole="User"
      />
    </div>
  );
}