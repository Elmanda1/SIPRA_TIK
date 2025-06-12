  import React from 'react';
  import { Building2, Video, Monitor, Network, Zap, MoreHorizontal } from 'lucide-react';
  import { useNavigate } from 'react-router-dom';
  import logoImg from '../../assets/SIPRATIK.png';  

  const HomeContent = ({ setActiveMenu, blueContainerRef, handleKategoriClick }) => {
    const navigate = useNavigate();
    
    return (
      <div className=" flex flex-col items-center justify-center min-h-[60vh]">
        <div className=' flex flex-col w-full items-center justify-center pb-20 bg-opacity-80 backdrop-blur-sm rounded-xl pt-20'>
          <h1 className="text-5xl md:text-6xl font-bold text-gray-800 text-center mb-7">
            Selamat Datang di          
            <img
                src={logoImg}
                alt="Logo"
                className="w-100 h-30 mt-2"
          />
          </h1>
          <p className="text-2xl text-gray-600 text-center mb-12 max-w-4xl">
            Sistem Informasi Peminjaman Sarana dan Prasarana TIK untuk Mahasiswa dan Dosen
          </p>
          <div className='flex flex-row items-center justify-center gap-4 mb-5'>
            <button
              onClick={() => setActiveMenu('pinjam')}
              className="px-8 py-3 bg-[#00A8E8] hover:bg-[#33BBF3] text-white font-bold rounded-lg shadow transition"
            >
              PINJAM SEKARANG
            </button>

            <button
              onClick={() => {
                if (blueContainerRef.current) {
                  blueContainerRef.current.scrollIntoView({ behavior: 'smooth' });
                }
              }}
              className="px-8 py-3 bg-[#00A8E8] hover:bg-[#33BBF3] text-white font-bold rounded-lg shadow transition"
            >
              LIHAT SARPRAS
            </button>
          </div>
          <p className="text-gray-600 pl-4">
            Lihat{" "}
            <a 
              onClick={() => setActiveMenu('ketentuan')} 
              className="text-blue-600 hover:text-blue-800 underline cursor-pointer"
            >
              Syarat & Ketentuan
            </a>
            {" "} Disini
          </p>
        </div>
        
        <div className=' flex flex-col items-center justify-center  w-[80vw] h-[100vh] '>
          <h1 className="text-3xl md:text-5xl font-bold text-gray-800 text-center mb-12">
            Profil Politeknik Negeri Jakarta
          </h1>
          <iframe className='w-full h-full rounded-xl' src="https://www.youtube.com/embed/Im00a5ZL46I?si=UjdkRQsGxlySgfqp" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
        </div>

        <div
          ref={blueContainerRef}
          className=' flex flex-col items-center justify-start rounded-[30px] w-[80vw] min-h-[80vh] p-12 mt-10'
        >
          <h1 className="text-5xl md:text-6xl font-bold text-gray-800 text-center mb-6">
            Kategori Sarana Prasarana
          </h1>
          <p className="text-2xl text-gray-600 text-center mb-7 max-w-2xl">
            Pilih kategori sarana prasarana yang Anda butuhkan
          </p>

          <div className="w-full max-w-7xl mt-8 grid grid-cols-1 md:grid-cols-3 gap-8">
            <div
              className="transition hover:scale-[1.03] duration-400 cursor-pointer bg-white bg-opacity-50 rounded-2xl shadow-xl p-10 flex flex-col items-center justify-center"
              onClick={() => handleKategoriClick('ruang-kelas')}
            >
              <Building2 className="w-14 h-14 text-gray-800 mb-8" />
              <span className="text-3xl font-bold text-sky-600 mb-2">Ruang Kelas</span>
              <p className="text-gray-600 text-center">Peminjaman ruang kelas untuk kegiatan belajar mengajar.</p>
            </div>
            <div
              className="transition hover:scale-[1.03] duration-400 cursor-pointer bg-white bg-opacity-50 rounded-2xl shadow-xl p-10 flex flex-col items-center justify-center"
              onClick={() => handleKategoriClick('peralatan-av')}
            >
              <Video className="w-14 h-14 text-gray-800 mb-8" />
              <span className="text-3xl font-bold text-sky-600 mb-2">Peralatan AV</span>
              <p className="text-gray-600 text-center">Peminjaman alat audio visual seperti microphone, speaker, dan lainnya.</p>
            </div>
            <div
              className="transition hover:scale-[1.03] duration-400 cursor-pointer bg-white bg-opacity-50 rounded-2xl shadow-xl p-10 flex flex-col items-center justify-center"
              onClick={() => handleKategoriClick('perangkat-komputer')}
            >
              <Monitor className="w-14 h-14 text-gray-800 mb-8" />
              <span className="text-3xl font-bold text-sky-600 mb-2">Perangkat Komputer</span>
              <p className="text-gray-600 text-center">Peminjaman alat elektronik, proyektor, dan lainnya.</p>
            </div>
            <div
              className="transition hover:scale-[1.03] duration-400 cursor-pointer bg-white bg-opacity-50 rounded-2xl shadow-xl p-10 flex flex-col items-center justify-center"
              onClick={() => handleKategoriClick('peralatan-jaringan')}
            >
              <Network className="w-14 h-14 text-gray-800 mb-8" />
              <span className="text-3xl font-bold text-sky-600 mb-2">Peralatan Jaringan</span>
              <p className="text-gray-600 text-center">Router, switch, kabel UTP, tester, dan alat jaringan lainnya.</p>
            </div>
            <div
              className="transition hover:scale-[1.03] duration-400 cursor-pointer bg-white bg-opacity-50 rounded-2xl shadow-xl p-10 flex flex-col items-center justify-center"
              onClick={() => handleKategoriClick('peralatan-listrik')}
            >
              <Zap className="w-14 h-14 text-gray-800 mb-8" />
              <span className="text-3xl font-bold text-sky-600 mb-2">Peralatan Listrik</span>
              <p className="text-gray-600 text-center">Peralatan listrik seperti kabel, stop kontak, dan lainnya.</p>
            </div>
            <div
              className="transition hover:scale-[1.03] duration-400 cursor-pointer bg-white bg-opacity-50 rounded-2xl shadow-xl p-10 flex flex-col items-center justify-center"
              onClick={() => handleKategoriClick('lainnya')}
            >
              <MoreHorizontal className="w-14 h-14 text-gray-800 mb-8" />
              <span className="text-3xl font-bold text-sky-600 mb-2">Lainnya</span>
              <p className="text-gray-600 text-center">Kategori sarana prasarana lainnya sesuai kebutuhan.</p>
            </div>
          </div>
        </div>
        <div className=' flex flex-col items-center justify-start rounded-[30px] w-[60vw] min-h-[80vh] p-12 mt-10'>
          <h1 className="text-5xl md:text-6xl font-bold text-gray-800 text-center mb-6">
            Langkah Langkah Peminjam
          </h1>
          <p className="text-2xl text-gray-600 text-center mb-7 max-w-2xl">
            step by step peminjaman sarana prasarana di SIPRATIK
          </p>
          <div className="relative w-full max-w-6xl mt-12">

                {/* Step 1 */}
                <div className="flex flex-row items-center justify mb-16">
                  <div className="px-16 py-2 flex flex-col items-center transition hover:scale-[1.03] duration-400 cursor-pointer bg-white bg-opacity-50 rounded-2xl shadow-xl justify-center gap-4">
                    <h3 className="text-2xl font-bold text-indigo-600">Ajukan Peminjaman</h3>
                    <img src="/src/assets/form.png" className="w-[200px] h-[200px] object-cover rounded-full shadow-xl" />
                    <div className="text-center">
                      <p>Akses menu <i>Pinjam </i> dan mulai mengisi form </p><p>untuk proses pengajuan peminjaman.</p>
                    </div>
                  </div>
                </div>

                {/* Panah dari Step 1 ke Step 2 */}
                <svg className="absolute left-56 top-[370px]" width="500" height="150">
                  <path d="M50,0 C80,50 200,80 300,100" stroke="black" strokeWidth="3" fill="none" strokeDasharray="15" markerEnd="url(#arrowhead)" />
                </svg>

                {/* Step 2 */}
                <div className="flex flex-row items-center justify-end mb-16">
                  <div className="px-12 py-2 flex flex-col items-center transition hover:scale-[1.03] duration-400 cursor-pointer bg-white bg-opacity-50 rounded-2xl shadow-xl justify-center gap-4">
                    <h3 className="text-2xl text-indigo-600 font-bold">Menunggu Verifikasi</h3>
                    <img src="/src/assets/sitback.png" className="w-[200px] h-[200px] object-cover rounded-full shadow-xl" />
                    <div className="text-center">
                      <p>Permohonan Anda sedang ditinjau oleh tim </p>
                      <p>administrasi untuk memastikan ketersediaan barang.</p>
                    </div>
                  </div>
                </div>

                {/* Panah dari Step 2 ke Step 3 */}
                <svg className="absolute right-24 top-[770px]" width="500" height="150">
                  <path d="M300,0 C200,70 80,90 50,110" stroke="black" strokeWidth="3" fill="none" strokeDasharray="15" markerEnd="url(#arrowhead)" />
                </svg>

                {/* Step 3 */}
                <div className="flex flex-row  items-center mb-16">
                  <div className="py-2 px-2 flex flex-col items-center transition hover:scale-[1.03] duration-400 cursor-pointer bg-white bg-opacity-50 rounded-2xl shadow-xl justify-center gap-4">
                    <h3 className="text-2xl text-indigo-600 font-bold">Peminjaman Disetujui</h3>
                    <img src="/src/assets/pinjaman.png" className="w-[200px] h-[200px] object-cover rounded-full shadow-xl" />
                    <div className="text-center">
                      <p>Selamat! peminjaman Anda telah disetujui.</p>
                      <p>Silakan gunakan fasilitas sesuai dengan jadwal dan ketentuan.</p>
                    </div>
                  </div>
                </div>

                <svg className="absolute left-52 top-[1150px]" width="500" height="200">
                  <path  d="M0,0 C 30 70, 100 100, 350 120" stroke="black" strokeWidth="3" fill="none" strokeDasharray="15" markerEnd="url(#arrowhead)" />
                </svg>

                {/* Step 4 */}
                <div className="flex flex-row  items-center justify-end mb-16">
                  <div className="py-2 px-2 flex flex-col items-center transition hover:scale-[1.03] duration-400 cursor-pointer bg-white bg-opacity-50 rounded-2xl shadow-xl justify-center gap-4">
                    <h3 className="text-2xl font-bold text-indigo-600">Selesaikan Peminjaman</h3>
                    <img src="/src/assets/selesai.jpg" className="w-[200px] h-[200px] object-cover rounded-full shadow-xl" />
                    <div className="text-center">
                      <p>Setelah peminjaman selesai, silahkan lakukan</p> <p>proses penyelesaian dengan click pinjaman aktif halaman <i>History</i>.</p>
                    </div>
                  </div>
                </div>

                <svg width="0" height="0">
                <defs>
                  <marker id="arrowhead" markerWidth="10" markerHeight="7" 
                          refX="10" refY="3.5" orient="auto">
                    <polygon points="0 0, 10 3.5, 0 7" fill="black" />
                  </marker>
                </defs>
              </svg>
          </div>
        </div>
      

        
      </div>
    );
  };

  export default HomeContent;