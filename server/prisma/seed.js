import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

const userData = [
  // Mahasiswa userData
  { username: '2407411077', password: '$2b$12$F0dsJr3sFhQTFxJUBWU0Yup3ngGhEUb4SWBNbMW8REs.ofG8dd3UK', role: 'mahasiswa', isVerified: true },
  { username: '2407411079', password: '$2b$12$F0dsJr3sFhQTFxJUBWU0Yup3ngGhEUb4SWBNbMW8REs.ofG8dd3UK', role: 'mahasiswa', isVerified: true },
  { username: '2407411073', password: '$2b$12$F0dsJr3sFhQTFxJUBWU0Yup3ngGhEUb4SWBNbMW8REs.ofG8dd3UK', role: 'mahasiswa', isVerified: true },
  { username: '2407411086', password: '$2b$12$F0dsJr3sFhQTFxJUBWU0Yup3ngGhEUb4SWBNbMW8REs.ofG8dd3UK', role: 'mahasiswa', isVerified: true },
  { username: '2407411078', password: '$2b$12$F0dsJr3sFhQTFxJUBWU0Yup3ngGhEUb4SWBNbMW8REs.ofG8dd3UK', role: 'mahasiswa', isVerified: true },
  { username: '2407411072', password: '$2b$12$F0dsJr3sFhQTFxJUBWU0Yup3ngGhEUb4SWBNbMW8REs.ofG8dd3UK', role: 'mahasiswa', isVerified: true },
  { username: '2407411069', password: '$2b$12$F0dsJr3sFhQTFxJUBWU0Yup3ngGhEUb4SWBNbMW8REs.ofG8dd3UK', role: 'mahasiswa', isVerified: true },
  { username: '2407411076', password: '$2b$12$F0dsJr3sFhQTFxJUBWU0Yup3ngGhEUb4SWBNbMW8REs.ofG8dd3UK', role: 'mahasiswa', isVerified: true },
  { username: '2407411084', password: '$2b$12$F0dsJr3sFhQTFxJUBWU0Yup3ngGhEUb4SWBNbMW8REs.ofG8dd3UK', role: 'mahasiswa', isVerified: true },
  { username: '2407411070', password: '$2b$12$F0dsJr3sFhQTFxJUBWU0Yup3ngGhEUb4SWBNbMW8REs.ofG8dd3UK', role: 'mahasiswa', isVerified: true },
  { username: '2407411082', password: '$2b$12$F0dsJr3sFhQTFxJUBWU0Yup3ngGhEUb4SWBNbMW8REs.ofG8dd3UK', role: 'mahasiswa', isVerified: true },
  { username: '2407411059', password: '$2b$12$F0dsJr3sFhQTFxJUBWU0Yup3ngGhEUb4SWBNbMW8REs.ofG8dd3UK', role: 'mahasiswa', isVerified: true },
  { username: '2407411066', password: '$2b$12$F0dsJr3sFhQTFxJUBWU0Yup3ngGhEUb4SWBNbMW8REs.ofG8dd3UK', role: 'mahasiswa', isVerified: true },
  { username: '2407411071', password: '$2b$12$F0dsJr3sFhQTFxJUBWU0Yup3ngGhEUb4SWBNbMW8REs.ofG8dd3UK', role: 'mahasiswa', isVerified: true },
  { username: '2407411081', password: '$2b$12$F0dsJr3sFhQTFxJUBWU0Yup3ngGhEUb4SWBNbMW8REs.ofG8dd3UK', role: 'mahasiswa', isVerified: true },
  // Dosen userData
  { username: '198606072019031011', password: '$2b$12$F0dsJr3sFhQTFxJUBWU0Yup3ngGhEUb4SWBNbMW8REs.ofG8dd3UK', role: 'dosen', isVerified: true },
  { username: '198410282019031005', password: '$2b$12$eB9D4thBoKiDdkeN3ybCMe7bkew.omfw1yTvYxwwWtdtvI3ewYxj2', role: 'dosen', isVerified: true },
  { username: '198411292020121002', password: '$2b$12$7pvGHw7luZkRnotw313oReJBMdtwN710vLxn2CM6Tyet72NeZypGS', role: 'dosen', isVerified: true },
  { username: '199110042019032024', password: '$2b$12$JYD8EPMGKN4eHksfwn.TP.ynC1p5nQrT5BCO2cQKKTyO1zE.l0HBe', role: 'dosen', isVerified: true },
  { username: '199303022019032022', password: '$2b$12$5dyC0GW/prAMwQs67d/7zexeAyplw0cWLoTAbB2zN9sh0.m66Ozgy', role: 'dosen', isVerified: true },
  { username: '197904282005012002', password: '$2b$12$rvXt9Wo6acrBYpYSdZ7iUeHedCJxpXPp9PQPkf9uvKVkjJTSCFbfO', role: 'dosen', isVerified: true },
  { username: '197908032003122003', password: '$2b$12$V1QzqvV6yIz13S9oTo7a1.sqB7FXe.HgwbaHLDgV8B54Y2qKn8nhe', role: 'dosen', isVerified: true },
  { username: '198111162005012004', password: '$2b$12$WAKwoaJy0AHl9FPfOxS0Aud7jhcX2LTzP5Bxkv/hAHy8DyS2lsrRy', role: 'dosen', isVerified: true },
  { username: '198502272015042001', password: '$2b$12$y9rHehGmKEQ6Y14LuJH5XetyGY6XYna32z.Y/FFn3bqFPzSeaC36C', role: 'dosen', isVerified: true },
  { username: '198807122018032001', password: '$2b$12$kw/6WhSMvLMrZqCjfIjDHODGqh8fbsrCDsAn6HdMdiDb.oXbSsDtW', role: 'dosen', isVerified: true },
  // Admin user
  {
    username: 'bernardganteng',
    password: '$2b$12$eI2qi/RgQnKdxWvCxlGXWOXelg2pADYeS6DrHIzaMVb5bpZJb36zu', // hash dari 'admin123'
    role: 'admin',
    isVerified: true,
  },
]

// Daftar NIM sesuai urutan userData mahasiswa
const nimList = userData.filter(u => u.role === 'mahasiswa').map(u => u.username)

const mahasiswaData = [
  {
    nama: 'Muhammad Nadhif Athallah Susatyo',
    email: 'muhammad.nadhif.athallah.susatyo.tik24@stu.pnj.ac.id',
    foto: null,
    phone: '081234567006',
    prodi: 'D4 Teknik Informatika',
    alamat: 'Jl. Flamboyan No. 6',
    kota: 'Jakarta',
    provinsi: 'DKI Jakarta',
    angkatan: 2024,
    kelas: 'TI-3C',
  },
  {
    nama: 'Muhammad Aurakha Ghazy Zackhary',
    email: 'muhammad.aurakha.ghazy.zackhary.tik24@stu.pnj.ac.id',
    foto: null,
    phone: '081234567007',
    prodi: 'D4 Teknik Informatika',
    alamat: 'Jl. Mawar No. 8',
    kota: 'Depok',
    provinsi: 'Jawa Barat',
    angkatan: 2024,
    kelas: 'TI-2A',
  },
  {
    nama: 'Fadhil Islamirisha',
    email: 'fadhil.islamirisha.tik24@stu.pnj.ac.id',
    foto: null,
    phone: '081234567008',
    prodi: 'D4 Teknik Informatika',
    alamat: 'Jl. Melati No. 8',
    kota: 'Bogor',
    provinsi: 'Jawa Barat',
    angkatan: 2024,
    kelas: 'TI-3B',
  },
  {
    nama: 'Nazmi Yaqzan Azzahra',
    email: 'nazmi.yaqzan.azzahra.tik24@stu.pnj.ac.id',
    foto: null,
    phone: '081234567009',
    prodi: 'D4 Teknik Informatika',
    alamat: 'Jl. Kenanga No. 9',
    kota: 'Bekasi',
    provinsi: 'Jawa Barat',
    angkatan: 2024,
    kelas: 'TI-2C',
  },
  {
    nama: 'Putra Nugraha',
    email: 'putra.nugraha.nurrahman.tik24@stu.pnj.ac.id',
    foto: null,
    phone: '081234567010',
    prodi: 'D4 Teknik Informatika',
    alamat: 'Jl. Dahlia No. 10',
    kota: 'Tangerang',
    provinsi: 'Banten',
    angkatan: 2024,
    kelas: 'TI-2B',
  },
  {
    nama: 'Muhammad Irzaldi Alamsyah',
    email: 'muhammad.irzaldi.alamsyah.tik24@stu.pnj.ac.id',
    foto: null,
    phone: '081234567011',
    prodi: 'D4 Teknik Informatika',
    alamat: 'Jl. Cempaka No. 11',
    kota: 'Jakarta',
    provinsi: 'DKI Jakarta',
    angkatan: 2024,
    kelas: 'TI-3A',
  },
  {
    nama: 'Yovana Ibnu Sina',
    email: 'yovana.ibnu.sina.tik24@stu.pnj.ac.id',
    foto: null,
    phone: '081234567012',
    prodi: 'D4 Teknik Informatika',
    alamat: 'Jl. Flamboyan No. 12',
    kota: 'Depok',
    provinsi: 'Jawa Barat',
    angkatan: 2024,
    kelas: 'TI-2C',
  },
  {
    nama: 'Umar Utomo',
    email: 'umar.utomo.tik24@stu.pnj.ac.id',
    foto: null,
    phone: '081234567013',
    prodi: 'D4 Teknik Informatika',
    alamat: 'Jl. Mawar No. 13',
    kota: 'Bogor',
    provinsi: 'Jawa Barat',
    angkatan: 2024,
    kelas: 'TI-3C',
  },
  {
    nama: 'Raden Mas Fidel Khalid Ramadhan',
    email: 'raden.mas.fidel.khalid.ramadhan.tik24@stu.pnj.ac.id',
    foto: null,
    phone: '081234567014',
    prodi: 'D4 Teknik Informatika',
    alamat: 'Jl. Melati No. 14',
    kota: 'Jakarta',
    provinsi: 'DKI Jakarta',
    angkatan: 2024,
    kelas: 'TI-2A',
  },
  {
    nama: 'Najwa Laila Rahmani',
    email: 'najwa.laila.rahmani.tik24@stu.pnj.ac.id',
    foto: null,
    phone: '081234567015',
    prodi: 'D4 Teknik Informatika',
    alamat: 'Jl. Kenanga No. 15',
    kota: 'Depok',
    provinsi: 'Jawa Barat',
    angkatan: 2024,
    kelas: 'TI-2B',
  },
  {
    nama: 'Anjani Friday',
    email: 'anjani.friday.tik24@stu.pnj.ac.id',
    foto: null,
    phone: '081234567016',
    prodi: 'D4 Teknik Informatika',
    alamat: 'Jl. Dahlia No. 16',
    kota: 'Tangerang',
    provinsi: 'Banten',
    angkatan: 2024,
    kelas: 'TI-3B',
  },
  {
    nama: 'Juen Denardy',
    email: 'juen.denardy.tik24@stu.pnj.ac.id',
    foto: null,
    phone: '081234567017',
    prodi: 'D4 Teknik Informatika',
    alamat: 'Jl. Cempaka No. 17',
    kota: 'Bekasi',
    provinsi: 'Jawa Barat',
    angkatan: 2024,
    kelas: 'TI-3A',
  },
  {
    nama: 'Muhammad Fatih Ammario Seno Riyadi',
    email: 'muhammad.fatih.ammario.seno.riyadi.tik24@stu.pnj.ac.id',
    foto: null,
    phone: '081234567018',
    prodi: 'D4 Teknik Informatika',
    alamat: 'Jl. Flamboyan No. 18',
    kota: 'Jakarta',
    provinsi: 'DKI Jakarta',
    angkatan: 2024,
    kelas: 'TI-2C',
  },
  {
    nama: 'Hari Bernardo',
    email: 'hari.bernardo.tik24@stu.pnj.ac.id',
    foto: null,
    phone: '081234567019',
    prodi: 'D4 Teknik Informatika',
    alamat: 'Jl. Mawar No. 19',
    kota: 'Depok',
    provinsi: 'Jawa Barat',
    angkatan: 2024,
    kelas: 'TI-2B',
  },
  {
    nama: 'Fadla Rachmandani',
    email: 'fadla.rachmandani.tik24@stu.pnj.ac.id',
    foto: null,
    phone: '081234567020',
    prodi: 'D4 Teknik Informatika',
    alamat: 'Jl. Melati No. 20',
    kota: 'Bogor',
    provinsi: 'Jawa Barat',
    angkatan: 2024,
    kelas: 'TI-3C',
  },
]

// Pastikan jumlah mahasiswaData sama dengan nimList
if (mahasiswaData.length !== nimList.length) {
  throw new Error('Jumlah mahasiswaData dan userData mahasiswa tidak sama!')
}

const mahasiswaSeed = mahasiswaData.map((mhs, idx) => ({
  nim: nimList[idx],
  ...mhs,
}))

const dosenData = [
  {
    kode_dosen: '198606072019031011',
    nama: 'Anggi Mardiyono, S.Kom., M.Kom.',
    email: 'anggi.mardiyono@gmail.com',
    foto: null,
    phone: '085227622664',
    fakultas: 'Teknik Informatika dan Komputer',
    prodi: 'D4 Teknik Informatika',
    jabatan: 'Asisten Ahli',
  },
  {
    kode_dosen: '198410282019031005',
    nama: 'Asep Taufik Muharram, S.Kom., M.Kom.',
    email: 'taufikmuharram@gmail.com',
    foto: null,
    phone: '081514855584',
    fakultas: 'Teknik Informatika dan Komputer',
    prodi: 'D4 Teknik Informatika',
    jabatan: 'Asisten Ahli',
  },
  {
    kode_dosen: '198411292020121002',
    nama: 'Bambang Warsuta, S.Kom., M.T.I.',
    email: 'bambangwarsuta@gmail.com',
    foto: null,
    phone: '081299441447',
    fakultas: 'Teknik Informatika dan Komputer',
    prodi: 'D4 Teknik Informatika',
    jabatan: 'Pengajar',
  },
  {
    kode_dosen: '199110042019032024',
    nama: 'Malisa Huzaifa, S.Kom., M.T.',
    email: 'huzaifa.malisa@gmail.com',
    foto: null,
    phone: '085370833573',
    fakultas: 'Teknik Informatika dan Komputer',
    prodi: 'D4 Teknik Multimedia Digital',
    jabatan: 'Pengajar',
  },
  {
    kode_dosen: '199303022019032022',
    nama: 'Noorlela Marcheta, S.Kom., M.Kom.',
    email: 'noorlela.marcheta@gmail.com',
    foto: null,
    phone: '087873757293',
    fakultas: 'Teknik Informatika dan Komputer',
    prodi: 'D4 Teknik Multimedia Digital',
    jabatan: 'Asisten Ahli',
  },
  {
    kode_dosen: '197904282005012002',
    nama: 'Mera Kartika Delimayanti, S.Si., M.T., Ph.D.',
    email: 'mera.delimayanti@politeknik.ac.id',
    foto: null,
    phone: '081234567890',
    fakultas: 'Teknik Informatika dan Komputer',
    prodi: 'D4 Teknik Informatika',
    jabatan: 'Lektor Kepala',
  },
  {
    kode_dosen: '197908032003122003',
    nama: 'Anita Hidayati, S.Kom., M.Kom.',
    email: 'anita.hidayati@tik.ac.id',
    foto: null,
    phone: '081234567891',
    fakultas: 'Teknik Informatika dan Komputer',
    prodi: 'D4 Teknik Informatika',
    jabatan: 'Lektor',
  },
  {
    kode_dosen: '198111162005012004',
    nama: 'Dr. Dewi Yanti Liliana, S.Kom., M.Kom.',
    email: 'dewi.yanti@tik.ac.id',
    foto: null,
    phone: '081234567892',
    fakultas: 'Teknik Informatika dan Komputer',
    prodi: 'D4 Teknik Informatika',
    jabatan: 'Lektor',
  },
  {
    kode_dosen: '198502272015042001',
    nama: 'Risna Sari, S.Kom., M.T.I.',
    email: 'risna.sari@tik.ac.id',
    foto: null,
    phone: '081234567893',
    fakultas: 'Teknik Informatika dan Komputer',
    prodi: 'D4 Teknik Informatika',
    jabatan: 'Asisten Ahli',
  },
  {
    kode_dosen: '198807122018032001',
    nama: 'Iklima Ermis Ismail, M.Kom.',
    email: 'iklima.ismail@tik.ac.id',
    foto: null,
    phone: '081234567894',
    fakultas: 'Teknik Informatika dan Komputer',
    prodi: 'D4 Teknik Informatika',
    jabatan: 'Pengajar',
  },
]

const ruanganData = [
  { nama_ruangan: 'AA 204', nama_gedung: 'Gedung AA', status: 'tersedia' },
  { nama_ruangan: 'AA 205', nama_gedung: 'Gedung AA', status: 'tersedia' },
  { nama_ruangan: 'AA 206', nama_gedung: 'Gedung AA', status: 'tersedia' },
  { nama_ruangan: 'AA 207', nama_gedung: 'Gedung AA', status: 'tersedia' },
  { nama_ruangan: 'AA 210', nama_gedung: 'Gedung AA', status: 'tersedia' },
  { nama_ruangan: 'AA 211', nama_gedung: 'Gedung AA', status: 'tersedia' },
  { nama_ruangan: 'AA 213', nama_gedung: 'Gedung AA', status: 'tersedia' },
  { nama_ruangan: 'GSG 301', nama_gedung: 'Gedung GSG', status: 'tersedia' },
  { nama_ruangan: 'GSG 302', nama_gedung: 'Gedung GSG', status: 'tersedia' },
  { nama_ruangan: 'GSG 303', nama_gedung: 'Gedung GSG', status: 'tersedia' },
  { nama_ruangan: 'GSG 304', nama_gedung: 'Gedung GSG', status: 'tersedia' },
  { nama_ruangan: 'GSG 305', nama_gedung: 'Gedung GSG', status: 'tersedia' },
  { nama_ruangan: 'GSG 306', nama_gedung: 'Gedung GSG', status: 'tersedia' },
  { nama_ruangan: 'GSG 307', nama_gedung: 'Gedung GSG', status: 'tersedia' },
  { nama_ruangan: 'Laboratorium Database', nama_gedung: 'Lab', status: 'tersedia' },
  { nama_ruangan: 'Laboratorium Jaringan', nama_gedung: 'Lab', status: 'tersedia' },
  { nama_ruangan: 'Ruang Teleconference', nama_gedung: 'Gedung AA', status: 'tersedia' },
  { nama_ruangan: 'Ruang Konsultasi GSG', nama_gedung: 'Gedung GSG', status: 'tersedia' },
  { nama_ruangan: 'Ruang Konsultasi AA', nama_gedung: 'Gedung AA', status: 'tersedia' },
]

const barangData = [
  // Peralatan AV
  { nama_barang: 'Proyektor', kategori: 'peralatan-av', jml_barang: 5, lokasi: 'Gudang', kondisi: 'baik', status: 'tersedia' },
  { nama_barang: 'Speaker', kategori: 'peralatan-av', jml_barang: 3, lokasi: 'Gudang', kondisi: 'baik', status: 'tersedia' },
  { nama_barang: 'Microphone', kategori: 'peralatan-av', jml_barang: 4, lokasi: 'Gudang', kondisi: 'baik', status: 'tersedia' },
  { nama_barang: 'Layar Proyektor', kategori: 'peralatan-av', jml_barang: 3, lokasi: 'Gudang', kondisi: 'baik', status: 'tersedia' },
  { nama_barang: 'Kamera DSLR', kategori: 'peralatan-av', jml_barang: 2, lokasi: 'Gudang', kondisi: 'baik', status: 'tersedia' },
  { nama_barang: 'Video Camera', kategori: 'peralatan-av', jml_barang: 2, lokasi: 'Gudang', kondisi: 'baik', status: 'tersedia' },
  { nama_barang: 'Lighting Kit', kategori: 'peralatan-av', jml_barang: 1, lokasi: 'Gudang', kondisi: 'baik', status: 'tersedia' },
  { nama_barang: 'Audio Interface', kategori: 'peralatan-av', jml_barang: 2, lokasi: 'Gudang', kondisi: 'baik', status: 'tersedia' },
  { nama_barang: 'Green Screen', kategori: 'peralatan-av', jml_barang: 1, lokasi: 'Gudang', kondisi: 'baik', status: 'tersedia' },
  { nama_barang: 'Wireless Presenter', kategori: 'peralatan-av', jml_barang: 5, lokasi: 'Gudang', kondisi: 'baik', status: 'tersedia' },
  { nama_barang: 'Extension HDMI', kategori: 'peralatan-av', jml_barang: 8, lokasi: 'Gudang', kondisi: 'baik', status: 'tersedia' },
  { nama_barang: 'Microphone Stand', kategori: 'peralatan-av', jml_barang: 6, lokasi: 'Gudang', kondisi: 'baik', status: 'tersedia' },
  { nama_barang: 'Mixer Audio', kategori: 'peralatan-av', jml_barang: 2, lokasi: 'Gudang', kondisi: 'baik', status: 'tersedia' },
  { nama_barang: 'Webcam HD', kategori: 'peralatan-av', jml_barang: 4, lokasi: 'Gudang', kondisi: 'baik', status: 'tersedia' },
  { nama_barang: 'Stabilizer Gimbal', kategori: 'peralatan-av', jml_barang: 1, lokasi: 'Gudang', kondisi: 'baik', status: 'tersedia' },
  { nama_barang: 'VGA to HDMI Converter', kategori: 'peralatan-av', jml_barang: 3, lokasi: 'Gudang', kondisi: 'baik', status: 'tersedia' },
  { nama_barang: 'Wireless Microphone Set', kategori: 'peralatan-av', jml_barang: 2, lokasi: 'Gudang', kondisi: 'baik', status: 'tersedia' },
  { nama_barang: 'Backdrop Stand', kategori: 'peralatan-av', jml_barang: 2, lokasi: 'Gudang', kondisi: 'baik', status: 'tersedia' },

  // Perangkat Komputer
  { nama_barang: 'PC Desktop', kategori: 'perangkat-komputer', jml_barang: 25, lokasi: 'Lab Komputer', kondisi: 'baik', status: 'tersedia' },
  { nama_barang: 'Laptop', kategori: 'perangkat-komputer', jml_barang: 15, lokasi: 'Lab Komputer', kondisi: 'baik', status: 'tersedia' },
  { nama_barang: 'Monitor LED', kategori: 'perangkat-komputer', jml_barang: 30, lokasi: 'Lab Komputer', kondisi: 'baik', status: 'tersedia' },
  { nama_barang: 'Keyboard Mechanical', kategori: 'perangkat-komputer', jml_barang: 30, lokasi: 'Lab Komputer', kondisi: 'baik', status: 'tersedia' },
  { nama_barang: 'Mouse Optical', kategori: 'perangkat-komputer', jml_barang: 35, lokasi: 'Lab Komputer', kondisi: 'baik', status: 'tersedia' },

  // Peralatan Jaringan
  { nama_barang: 'Router', kategori: 'peralatan-jaringan', jml_barang: 3, lokasi: 'Lab Jaringan', kondisi: 'baik', status: 'tersedia' },
  { nama_barang: 'Switch', kategori: 'peralatan-jaringan', jml_barang: 2, lokasi: 'Lab Jaringan', kondisi: 'baik', status: 'tersedia' },
  { nama_barang: 'Kabel UTP', kategori: 'peralatan-jaringan', jml_barang: 3, lokasi: 'Lab Jaringan', kondisi: 'baik', status: 'tersedia' },
  { nama_barang: 'Access Point', kategori: 'peralatan-jaringan', jml_barang: 4, lokasi: 'Lab Jaringan', kondisi: 'baik', status: 'tersedia' },
  { nama_barang: 'Hub', kategori: 'peralatan-jaringan', jml_barang: 1, lokasi: 'Lab Jaringan', kondisi: 'baik', status: 'tersedia' },
  { nama_barang: 'Patch Panel', kategori: 'peralatan-jaringan', jml_barang: 2, lokasi: 'Lab Jaringan', kondisi: 'baik', status: 'tersedia' },
  { nama_barang: 'Firewall', kategori: 'peralatan-jaringan', jml_barang: 1, lokasi: 'Lab Jaringan', kondisi: 'baik', status: 'tersedia' },
  { nama_barang: 'Modem', kategori: 'peralatan-jaringan', jml_barang: 2, lokasi: 'Lab Jaringan', kondisi: 'baik', status: 'tersedia' },

  // Peralatan Listrik
  { nama_barang: 'Stop Kontak', kategori: 'peralatan-listrik', jml_barang: 8, lokasi: 'Gudang', kondisi: 'baik', status: 'tersedia' },
  { nama_barang: 'Kabel Roll', kategori: 'peralatan-listrik', jml_barang: 4, lokasi: 'Gudang', kondisi: 'baik', status: 'tersedia' },
  { nama_barang: 'Lampu', kategori: 'peralatan-listrik', jml_barang: 10, lokasi: 'Gudang', kondisi: 'baik', status: 'tersedia' },
  { nama_barang: 'UPS', kategori: 'peralatan-listrik', jml_barang: 3, lokasi: 'Gudang', kondisi: 'baik', status: 'tersedia' },
  { nama_barang: 'MCB', kategori: 'peralatan-listrik', jml_barang: 6, lokasi: 'Gudang', kondisi: 'baik', status: 'tersedia' },
  { nama_barang: 'Stabilizer', kategori: 'peralatan-listrik', jml_barang: 2, lokasi: 'Gudang', kondisi: 'baik', status: 'tersedia' },
  { nama_barang: 'Konektor Listrik', kategori: 'peralatan-listrik', jml_barang: 15, lokasi: 'Gudang', kondisi: 'baik', status: 'tersedia' },
  { nama_barang: 'Multimeter', kategori: 'peralatan-listrik', jml_barang: 1, lokasi: 'Gudang', kondisi: 'baik', status: 'tersedia' },

  // Lainnya
  { nama_barang: 'Papan Pengumuman', kategori: 'lainnya', jml_barang: 2, lokasi: 'Lobi', kondisi: 'baik', status: 'tersedia' },
  { nama_barang: 'Dispenser', kategori: 'lainnya', jml_barang: 1, lokasi: 'Lobi', kondisi: 'baik', status: 'tersedia' },
  { nama_barang: 'Lain-lain', kategori: 'lainnya', jml_barang: 0, lokasi: 'Gudang', kondisi: 'baik', status: 'tersedia' },
]

async function main() {
  console.log('Starting user seeding...')
  await prisma.user.createMany({ data: userData, skipDuplicates: true })

  // Tidak perlu menambah adminUser dengan field tambahan karena schema User tidak punya field tsb

  console.log('Starting mahasiswa seeding...')
  for (const mhs of mahasiswaSeed) {
    try {
      await prisma.mahasiswa.create({ data: mhs })
    } catch (e) {
      console.error(`Gagal insert mahasiswa NIM ${mhs.nim}:`, e.message)
    }
  }
  console.log('Starting dosen seeding...')
  for (const dosen of dosenData) {
    try {
      await prisma.dosen.create({ data: dosen })
    } catch (e) {
      console.error(`Gagal insert dosen Kode ${dosen.kode_dosen}:`, e.message)
    }
  }

  // Seed Ruangan (upsert agar tidak duplikat)
  for (const ruangan of ruanganData) {
    await prisma.inven_ruangan.upsert({
      where: { nama_ruangan: ruangan.nama_ruangan },
      update: {},
      create: ruangan,
    })
  }

  // Seed Barang (boleh create, id_barang auto)
  for (const barang of barangData) {
    await prisma.inven_barang.create({ data: barang })
  }

  console.log('Seeding finished.')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
