import React from 'react';
import { AlertCircle, BanknoteIcon, CheckCircle2, Clock, FileWarning, ScrollText, ShieldAlert, UserCog } from 'lucide-react';

const KetentuanContent = () => {
  return (
    <div className="flex flex-col items-center w-full min-h-screen py-10 px-4">
      <div className="w-full max-w-4xl space-y-8">
        {/* Header */}
        <div className="text-center">
          <h2 className="text-4xl font-bold mb-2 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
            Ketentuan & Saran Peminjaman
          </h2>
          <p className="text-gray-600">Mohon membaca dengan seksama sebelum melakukan peminjaman</p>
        </div>

        {/* Waktu Operasional */}
        <div className="bg-white/60 backdrop-blur-md rounded-2xl p-6 shadow-xl border border-white/30">
          <div className="flex items-center gap-3 mb-4">
            <Clock className="w-6 h-6 text-blue-600" />
            <h3 className="text-2xl font-bold text-gray-800">Waktu Operasional</h3>
          </div>
          <ul className="space-y-3 text-gray-700">
            <li className="flex items-center gap-2">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              Senin - Jumat: 08:00 - 18:00 WIB
            </li>
            <li className="flex items-center gap-2">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              Durasi peminjaman disesuaikan dengan kebutuhan dan ketersediaan
            </li>
          </ul>
        </div>

        {/* Syarat Peminjaman */}
        <div className="bg-white/60  backdrop-blur-md rounded-2xl p-6 shadow-xl border border-white/30">
          <div className="flex items-center gap-3 mb-4">
            <ScrollText className="w-6 h-6 text-purple-600" />
            <h3 className="text-2xl font-bold text-gray-800">Syarat Peminjaman</h3>
          </div>
          <ul className="space-y-3 text-gray-700">
            <li className="flex items-start gap-2">
              <div className="w-2 h-2 bg-purple-500 rounded-full mt-2"></div>
              <span>Peminjam adalah mahasiswa aktif atau dosen Politeknik Negeri Jakarta</span>
            </li>
            <li className="flex items-start gap-2">
              <div className="w-2 h-2 bg-purple-500 rounded-full mt-2"></div>
              <span>Memiliki kartu identitas yang masih berlaku (KTM/Kartu Pegawai)</span>
            </li>
            <li className="flex items-start gap-2">
              <div className="w-2 h-2 bg-purple-500 rounded-full mt-2"></div>
              <span>Mengisi form peminjaman dengan lengkap dan benar</span>
            </li>
            <li className="flex items-start gap-2">
              <div className="w-2 h-2 bg-purple-500 rounded-full mt-2"></div>
              <span>Bersedia mematuhi seluruh ketentuan yang berlaku</span>
            </li>
          </ul>
        </div>

        {/* Prosedur Peminjaman */}
        <div className="bg-white/60  backdrop-blur-md rounded-2xl p-6 shadow-xl border border-white/30">
          <div className="flex items-center gap-3 mb-4">
            <UserCog className="w-6 h-6 text-green-600" />
            <h3 className="text-2xl font-bold text-gray-800">Prosedur Peminjaman</h3>
          </div>
          <div className="space-y-4">
            <div className="flex gap-4">
              <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-green-600 font-semibold">1</span>
              </div>
              <div className="flex-1">
                <h4 className="font-semibold text-gray-800 mb-1">Cek Ketersediaan</h4>
                <p className="text-gray-600">Periksa ketersediaan barang/ruangan yang akan dipinjam melalui menu Daftar Barang</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-green-600 font-semibold">2</span>
              </div>
              <div className="flex-1">
                <h4 className="font-semibold text-gray-800 mb-1">Isi Form Peminjaman</h4>
                <p className="text-gray-600">Lengkapi form peminjaman dengan data yang valid dan keterangan yang jelas</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-green-600 font-semibold">3</span>
              </div>
              <div className="flex-1">
                <h4 className="font-semibold text-gray-800 mb-1">Konfirmasi Admin</h4>
                <p className="text-gray-600">Tunggu konfirmasi dari admin melalui WhatsApp atau email yang terdaftar</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-green-600 font-semibold">4</span>
              </div>
              <div className="flex-1">
                <h4 className="font-semibold text-gray-800 mb-1">Ambil & Kembalikan</h4>
                <p className="text-gray-600">Ambil dan kembalikan barang sesuai waktu yang telah ditentukan</p>
              </div>
            </div>
          </div>
        </div>

        {/* Tanggung Jawab Peminjam */}
        <div className="bg-white/60  backdrop-blur-md rounded-2xl p-6 shadow-xl border border-white/30">
          <div className="flex items-center gap-3 mb-4">
            <ShieldAlert className="w-6 h-6 text-red-600" />
            <h3 className="text-2xl font-bold text-gray-800">Tanggung Jawab Peminjam</h3>
          </div>
          <ul className="space-y-3 text-gray-700">
            <li className="flex items-start gap-2">
              <div className="w-2 h-2 bg-red-500 rounded-full mt-2"></div>
              <span>Menjaga dan menggunakan barang sesuai fungsinya</span>
            </li>
            <li className="flex items-start gap-2">
              <div className="w-2 h-2 bg-red-500 rounded-full mt-2"></div>
              <span>Mengembalikan tepat waktu sesuai jadwal yang disepakati</span>
            </li>
            <li className="flex items-start gap-2">
              <div className="w-2 h-2 bg-red-500 rounded-full mt-2"></div>
              <span>Mengganti rugi jika terjadi kerusakan atau kehilangan</span>
            </li>
            <li className="flex items-start gap-2">
              <div className="w-2 h-2 bg-red-500 rounded-full mt-2"></div>
              <span>Tidak memindahtangankan barang kepada pihak lain</span>
            </li>
          </ul>
        </div>

        {/* Saran Penggunaan */}
        <div className="bg-white/60  backdrop-blur-md rounded-2xl p-6 shadow-xl border border-white/30">
          <div className="flex items-center gap-3 mb-4">
            <AlertCircle className="w-6 h-6 text-orange-600" />
            <h3 className="text-2xl font-bold text-gray-800">Saran Penggunaan</h3>
          </div>
          <ul className="space-y-3 text-gray-700">
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-5 h-5 text-orange-500 flex-shrink-0 mt-0.5" />
              <span>Periksa kondisi barang saat pengambilan dan pengembalian</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-5 h-5 text-orange-500 flex-shrink-0 mt-0.5" />
              <span>Baca panduan penggunaan sebelum mengoperasikan peralatan</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-5 h-5 text-orange-500 flex-shrink-0 mt-0.5" />
              <span>Simpan barang di tempat yang aman saat tidak digunakan</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-5 h-5 text-orange-500 flex-shrink-0 mt-0.5" />
              <span>Laporkan segera jika ada masalah atau kerusakan</span>
            </li>
          </ul>
        </div>

        {/* Ketentuan Denda */}
        <div className="bg-white/60  backdrop-blur-md rounded-2xl p-6 shadow-xl border border-white/30">
          <div className="flex items-center gap-3 mb-4">            <BanknoteIcon className="w-6 h-6 text-yellow-600" />
            <h3 className="text-2xl font-bold text-gray-800">Ketentuan Denda</h3>
          </div>
          <ul className="space-y-3 text-gray-700">
            <li className="flex items-start gap-2">
              <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2"></div>
              <span>Keterlambatan pengembalian dikenakan denda Rp 10.000/hari</span>
            </li>
            <li className="flex items-start gap-2">
              <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2"></div>
              <span>Kerusakan berat atau kehilangan dikenakan denda 100% dari harga barang</span>
            </li>
            <li className="flex items-start gap-2">
              <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2"></div>
              <span>Denda harus dilunasi sebelum dapat melakukan peminjaman berikutnya</span>
            </li>
          </ul>
        </div>

        {/* Catatan Penting */}
        <div className="bg-gradient-to-r from-red-50 to-orange-50 rounded-2xl p-6 shadow-xl border border-red-100">
          <div className="flex items-center gap-3 mb-4">
            <FileWarning className="w-6 h-6 text-red-600" />
            <h3 className="text-2xl font-bold text-gray-800">Catatan Penting</h3>
          </div>
          <ul className="space-y-3 text-gray-700">
            <li className="flex items-start gap-3">
              <div className="w-1.5 h-1.5 bg-red-500 rounded-full mt-2"></div>
              <span>Peminjaman dapat dibatalkan jika tidak memenuhi persyaratan atau ketentuan yang berlaku</span>
            </li>
            <li className="flex items-start gap-3">
              <div className="w-1.5 h-1.5 bg-red-500 rounded-full mt-2"></div>
              <span>Sanksi akan diberikan bagi peminjam yang melanggar ketentuan atau merusak barang</span>
            </li>
            <li className="flex items-start gap-3">
              <div className="w-1.5 h-1.5 bg-red-500 rounded-full mt-2"></div>
              <span>Keterlambatan pengembalian akan dicatat dan mempengaruhi peminjaman selanjutnya</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default KetentuanContent;
