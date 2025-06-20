import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

const userData = [
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
  { username: '2407411060', password: '$2b$12$F0dsJr3sFhQTFxJUBWU0Yup3ngGhEUb4SWBNbMW8REs.ofG8dd3UK', role: 'mahasiswa', isVerified: true },
  { username: '2407411068', password: '$2b$12$F0dsJr3sFhQTFxJUBWU0Yup3ngGhEUb4SWBNbMW8REs.ofG8dd3UK', role: 'mahasiswa', isVerified: true },
  { username: '2407411074', password: '$2b$12$F0dsJr3sFhQTFxJUBWU0Yup3ngGhEUb4SWBNbMW8REs.ofG8dd3UK', role: 'mahasiswa', isVerified: true },
  { username: '2407411067', password: '$2b$12$F0dsJr3sFhQTFxJUBWU0Yup3ngGhEUb4SWBNbMW8REs.ofG8dd3UK', role: 'mahasiswa', isVerified: true },
  { username: '2407411063', password: '$2b$12$F0dsJr3sFhQTFxJUBWU0Yup3ngGhEUb4SWBNbMW8REs.ofG8dd3UK', role: 'mahasiswa', isVerified: true },
]

// Daftar NIM sesuai urutan userData
const nimList = userData.map(u => u.username)

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
    alamat: 'Jl. Mawar No. 7',
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

// Tambahkan nim ke setiap mahasiswa sesuai urutan userData
const mahasiswaSeed = mahasiswaData.map((mhs, idx) => ({
  nim: nimList[idx],
  ...mhs,
}))

async function main() {
  console.log('Starting user seeding...')
  await prisma.user.createMany({ data: userData, skipDuplicates: true })

  console.log('Starting mahasiswa seeding...')
  for (const mhs of mahasiswaSeed) {
    try {
      await prisma.mahasiswa.create({ data: mhs })
    } catch (e) {
      console.error(`Gagal insert mahasiswa NIM ${mhs.nim}:`, e.message)
    }
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
