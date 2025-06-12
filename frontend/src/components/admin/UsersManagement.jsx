import React, { useState } from 'react';
import { Search, Plus, User, Mail, Calendar, Edit, Trash2, X, CheckCircle } from 'lucide-react';

const UsersManagement = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);
  const [users, setUsers] = useState([
  {
    id: 1,
    name: 'Rizky Maulana',
    email: 'rizky.maulana.tik24@stu.pnj.ac.id',
    role: 'user',
    status: 'active',
    joinDate: '2024-01-10',
    totalBorrowings: 7
  },
  {
    id: 2,
    name: 'Nadira Putri',
    email: 'nadira.putri.tik24@stu.pnj.ac.id',
    role: 'user',
    status: 'active',
    joinDate: '2024-02-14',
    totalBorrowings: 5
  },
  {
    id: 3,
    name: 'Fajar Nugraha',
    email: 'fajar.nugraha.tik24@stu.pnj.ac.id',
    role: 'user',
    status: 'inactive',
    joinDate: '2024-01-20',
    totalBorrowings: 3
  },
  {
    id: 4,
    name: 'Salsa Khairunnisa',
    email: 'salsa.khairunnisa.tik24@stu.pnj.ac.id',
    role: 'user',
    status: 'active',
    joinDate: '2024-03-01',
    totalBorrowings: 9
  },
  {
    id: 5,
    name: 'Andi Saputra',
    email: 'andi.saputra.tik24@stu.pnj.ac.id',
    role: 'user',
    status: 'active',
    joinDate: '2024-02-01',
    totalBorrowings: 6
  },
  {
    id: 6,
    name: 'Zahra Ayuningtyas',
    email: 'zahra.ayuningtyas.tik24@stu.pnj.ac.id',
    role: 'user',
    status: 'inactive',
    joinDate: '2024-01-29',
    totalBorrowings: 2
  },
  {
    id: 7,
    name: 'Ilham Pratama',
    email: 'ilham.pratama.tik24@stu.pnj.ac.id',
    role: 'user',
    status: 'active',
    joinDate: '2024-03-10',
    totalBorrowings: 10
  },
  {
    id: 8,
    name: 'Putri Aulia',
    email: 'putri.aulia.tik24@stu.pnj.ac.id',
    role: 'user',
    status: 'active',
    joinDate: '2024-02-28',
    totalBorrowings: 4
  },
  {
    id: 9,
    name: 'Rama Dwiandika',
    email: 'rama.dwiandika.tik24@stu.pnj.ac.id',
    role: 'user',
    status: 'inactive',
    joinDate: '2024-01-18',
    totalBorrowings: 1
  },
  {
    id: 10,
    name: 'Melani Oktaviani',
    email: 'melani.oktaviani.tik24@stu.pnj.ac.id',
    role: 'user',
    status: 'active',
    joinDate: '2024-03-05',
    totalBorrowings: 7
  },
  {
    id: 11,
    name: 'Yoga Firmansyah',
    email: 'yoga.firmansyah.tik24@stu.pnj.ac.id',
    role: 'user',
    status: 'active',
    joinDate: '2024-01-25',
    totalBorrowings: 6
  },
  {
    id: 12,
    name: 'Dewi Maharani',
    email: 'dewi.maharani.tik24@stu.pnj.ac.id',
    role: 'user',
    status: 'inactive',
    joinDate: '2024-02-02',
    totalBorrowings: 2
  },
  {
    id: 13,
    name: 'Galang Yudha',
    email: 'galang.yudha.tik24@stu.pnj.ac.id',
    role: 'user',
    status: 'active',
    joinDate: '2024-03-12',
    totalBorrowings: 8
  },
  {
    id: 14,
    name: 'Citra Anggraini',
    email: 'citra.anggraini.tik24@stu.pnj.ac.id',
    role: 'user',
    status: 'active',
    joinDate: '2024-01-11',
    totalBorrowings: 5
  },
  {
    id: 15,
    name: 'Fikri Hidayat',
    email: 'fikri.hidayat.tik24@stu.pnj.ac.id',
    role: 'user',
    status: 'inactive',
    joinDate: '2024-02-21',
    totalBorrowings: 3
  },
  {
    id: 16,
    name: 'Shinta Wulandari',
    email: 'shinta.wulandari.tik24@stu.pnj.ac.id',
    role: 'user',
    status: 'active',
    joinDate: '2024-01-22',
    totalBorrowings: 9
  },
  {
    id: 17,
    name: 'Rizal Fauzan',
    email: 'rizal.fauzan.tik24@stu.pnj.ac.id',
    role: 'user',
    status: 'active',
    joinDate: '2024-03-09',
    totalBorrowings: 6
  },
  {
    id: 18,
    name: 'Anisa Rahmawati',
    email: 'anisa.rahmawati.tik24@stu.pnj.ac.id',
    role: 'user',
    status: 'inactive',
    joinDate: '2024-02-05',
    totalBorrowings: 2
  },
  {
    id: 19,
    name: 'Bayu Alfian',
    email: 'bayu.alfian.tik24@stu.pnj.ac.id',
    role: 'user',
    status: 'active',
    joinDate: '2024-01-30',
    totalBorrowings: 5
  },
  {
    id: 20,
    name: 'Nabila Kurnia',
    email: 'nabila.kurnia.tik24@stu.pnj.ac.id',
    role: 'user',
    status: 'active',
    joinDate: '2024-03-06',
    totalBorrowings: 7
  },
  {
  id: 21,
  name: 'Ahmad Firdaus',
  email: 'ahmad.firdaus.tik21@stu.pnj.ac.id',
  role: 'user',
  status: 'active',
  joinDate: '2021-09-15',
  totalBorrowings: 15
},
{
  id: 22,
  name: 'Sari Indah',
  email: 'sari.indah.tik22@stu.pnj.ac.id',
  role: 'user',
  status: 'active',
  joinDate: '2022-08-20',
  totalBorrowings: 12
},
{
  id: 23,
  name: 'Budi Santoso',
  email: 'budi.santoso.tik21@stu.pnj.ac.id',
  role: 'user',
  status: 'inactive',
  joinDate: '2021-10-03',
  totalBorrowings: 8
},
{
  id: 24,
  name: 'Lina Permata',
  email: 'lina.permata.tik23@stu.pnj.ac.id',
  role: 'user',
  status: 'active',
  joinDate: '2023-07-12',
  totalBorrowings: 10
},
{
  id: 25,
  name: 'Dika Surya',
  email: 'dika.surya.tik22@stu.pnj.ac.id',
  role: 'user',
  status: 'active',
  joinDate: '2022-09-08',
  totalBorrowings: 14
},
{
  id: 26,
  name: 'Maya Sari',
  email: 'maya.sari.tik24@stu.pnj.ac.id',
  role: 'user',
  status: 'active',
  joinDate: '2024-01-15',
  totalBorrowings: 6
},
{
  id: 27,
  name: 'Rendra Putra',
  email: 'rendra.putra.tik21@stu.pnj.ac.id',
  role: 'user',
  status: 'inactive',
  joinDate: '2021-11-22',
  totalBorrowings: 18
},
{
  id: 28,
  name: 'Dini Rahayu',
  email: 'dini.rahayu.tik23@stu.pnj.ac.id',
  role: 'user',
  status: 'active',
  joinDate: '2023-08-05',
  totalBorrowings: 9
},
{
  id: 29,
  name: 'Farid Hakim',
  email: 'farid.hakim.tik22@stu.pnj.ac.id',
  role: 'user',
  status: 'active',
  joinDate: '2022-10-17',
  totalBorrowings: 11
},
{
  id: 30,
  name: 'Eka Putri',
  email: 'eka.putri.tik24@stu.pnj.ac.id',
  role: 'user',
  status: 'active',
  joinDate: '2024-02-28',
  totalBorrowings: 4
},
{
  id: 31,
  name: 'Hendra Gunawan',
  email: 'hendra.gunawan.tik21@stu.pnj.ac.id',
  role: 'user',
  status: 'active',
  joinDate: '2021-09-30',
  totalBorrowings: 16
},
{
  id: 32,
  name: 'Nita Anggraeni',
  email: 'nita.anggraeni.tik23@stu.pnj.ac.id',
  role: 'user',
  status: 'inactive',
  joinDate: '2023-09-14',
  totalBorrowings: 7
},
{
  id: 33,
  name: 'Arief Rahman',
  email: 'arief.rahman.tik22@stu.pnj.ac.id',
  role: 'user',
  status: 'active',
  joinDate: '2022-07-25',
  totalBorrowings: 13
},
{
  id: 34,
  name: 'Vina Marlina',
  email: 'vina.marlina.tik24@stu.pnj.ac.id',
  role: 'user',
  status: 'active',
  joinDate: '2024-03-11',
  totalBorrowings: 5
},
{
  id: 35,
  name: 'Imam Wahyudi',
  email: 'imam.wahyudi.tik21@stu.pnj.ac.id',
  role: 'user',
  status: 'inactive',
  joinDate: '2021-12-01',
  totalBorrowings: 19
},
{
  id: 36,
  name: 'Ratna Sari',
  email: 'ratna.sari.tik23@stu.pnj.ac.id',
  role: 'user',
  status: 'active',
  joinDate: '2023-06-18',
  totalBorrowings: 8
},
{
  id: 37,
  name: 'Joko Susilo',
  email: 'joko.susilo.tik22@stu.pnj.ac.id',
  role: 'user',
  status: 'active',
  joinDate: '2022-11-09',
  totalBorrowings: 12
},
{
  id: 38,
  name: 'Tari Wulandari',
  email: 'tari.wulandari.tik24@stu.pnj.ac.id',
  role: 'user',
  status: 'active',
  joinDate: '2024-01-08',
  totalBorrowings: 6
},
{
  id: 39,
  name: 'Andi Kurniawan',
  email: 'andi.kurniawan.tik21@stu.pnj.ac.id',
  role: 'user',
  status: 'active',
  joinDate: '2021-08-14',
  totalBorrowings: 17
},
{
  id: 40,
  name: 'Sinta Dewi',
  email: 'sinta.dewi.tik23@stu.pnj.ac.id',
  role: 'user',
  status: 'inactive',
  joinDate: '2023-10-22',
  totalBorrowings: 9
},
{
  id: 41,
  name: 'Yudi Pratama',
  email: 'yudi.pratama.tik22@stu.pnj.ac.id',
  role: 'user',
  status: 'active',
  joinDate: '2022-08-16',
  totalBorrowings: 11
},
{
  id: 42,
  name: 'Desi Ratnasari',
  email: 'desi.ratnasari.tik24@stu.pnj.ac.id',
  role: 'user',
  status: 'active',
  joinDate: '2024-02-14',
  totalBorrowings: 5
},
{
  id: 43,
  name: 'Agus Setiawan',
  email: 'agus.setiawan.tik21@stu.pnj.ac.id',
  role: 'user',
  status: 'inactive',
  joinDate: '2021-10-28',
  totalBorrowings: 20
},
{
  id: 44,
  name: 'Fitri Handayani',
  email: 'fitri.handayani.tik23@stu.pnj.ac.id',
  role: 'user',
  status: 'active',
  joinDate: '2023-07-03',
  totalBorrowings: 8
},
{
  id: 45,
  name: 'Dedy Firmansyah',
  email: 'dedy.firmansyah.tik22@stu.pnj.ac.id',
  role: 'user',
  status: 'active',
  joinDate: '2022-09-12',
  totalBorrowings: 14
},
{
  id: 46,
  name: 'Novi Anggraini',
  email: 'novi.anggraini.tik24@stu.pnj.ac.id',
  role: 'user',
  status: 'active',
  joinDate: '2024-03-07',
  totalBorrowings: 4
},
{
  id: 47,
  name: 'Ricky Maulana',
  email: 'ricky.maulana.tik21@stu.pnj.ac.id',
  role: 'user',
  status: 'active',
  joinDate: '2021-11-15',
  totalBorrowings: 18
},
{
  id: 48,
  name: 'Wulan Sari',
  email: 'wulan.sari.tik23@stu.pnj.ac.id',
  role: 'user',
  status: 'inactive',
  joinDate: '2023-08-29',
  totalBorrowings: 7
},
{
  id: 49,
  name: 'Bagas Prasetyo',
  email: 'bagas.prasetyo.tik22@stu.pnj.ac.id',
  role: 'user',
  status: 'active',
  joinDate: '2022-10-05',
  totalBorrowings: 12
},
{
  id: 50,
  name: 'Ira Suryani',
  email: 'ira.suryani.tik24@stu.pnj.ac.id',
  role: 'user',
  status: 'active',
  joinDate: '2024-01-19',
  totalBorrowings: 6
},
{
  id: 51,
  name: 'Krisna Wijaya',
  email: 'krisna.wijaya.tik21@stu.pnj.ac.id',
  role: 'user',
  status: 'inactive',
  joinDate: '2021-09-07',
  totalBorrowings: 15
},
{
  id: 52,
  name: 'Tina Marliana',
  email: 'tina.marliana.tik23@stu.pnj.ac.id',
  role: 'user',
  status: 'active',
  joinDate: '2023-06-24',
  totalBorrowings: 9
},
{
  id: 53,
  name: 'Hafiz Ramadhan',
  email: 'hafiz.ramadhan.tik22@stu.pnj.ac.id',
  role: 'user',
  status: 'active',
  joinDate: '2022-11-18',
  totalBorrowings: 13
},
{
  id: 54,
  name: 'Rini Puspita',
  email: 'rini.puspita.tik24@stu.pnj.ac.id',
  role: 'user',
  status: 'active',
  joinDate: '2024-02-23',
  totalBorrowings: 5
},
{
  id: 55,
  name: 'Eko Saputra',
  email: 'eko.saputra.tik21@stu.pnj.ac.id',
  role: 'user',
  status: 'active',
  joinDate: '2021-12-11',
  totalBorrowings: 16
},
{
  id: 56,
  name: 'Yuni Astuti',
  email: 'yuni.astuti.tik23@stu.pnj.ac.id',
  role: 'user',
  status: 'inactive',
  joinDate: '2023-09-02',
  totalBorrowings: 8
},
{
  id: 57,
  name: 'Irfan Hakim',
  email: 'irfan.hakim.tik22@stu.pnj.ac.id',
  role: 'user',
  status: 'active',
  joinDate: '2022-07-14',
  totalBorrowings: 11
},
{
  id: 58,
  name: 'Siska Permata',
  email: 'siska.permata.tik24@stu.pnj.ac.id',
  role: 'user',
  status: 'active',
  joinDate: '2024-03-16',
  totalBorrowings: 4
},
{
  id: 59,
  name: 'Teguh Santoso',
  email: 'teguh.santoso.tik21@stu.pnj.ac.id',
  role: 'user',
  status: 'active',
  joinDate: '2021-08-27',
  totalBorrowings: 19
},
{
  id: 60,
  name: 'Lilis Suryani',
  email: 'lilis.suryani.tik23@stu.pnj.ac.id',
  role: 'user',
  status: 'active',
  joinDate: '2023-10-08',
  totalBorrowings: 10
},
{
  id: 61,
  name: 'Doni Setiawan',
  email: 'doni.setiawan.tik22@stu.pnj.ac.id',
  role: 'user',
  status: 'inactive',
  joinDate: '2022-08-21',
  totalBorrowings: 7
},
{
  id: 62,
  name: 'Mega Kartika',
  email: 'mega.kartika.tik24@stu.pnj.ac.id',
  role: 'user',
  status: 'active',
  joinDate: '2024-01-12',
  totalBorrowings: 6
},
{
  id: 63,
  name: 'Indra Gunawan',
  email: 'indra.gunawan.tik21@stu.pnj.ac.id',
  role: 'user',
  status: 'active',
  joinDate: '2021-11-03',
  totalBorrowings: 17
},
{
  id: 64,
  name: 'Putri Salsabila',
  email: 'putri.salsabila.tik23@stu.pnj.ac.id',
  role: 'user',
  status: 'active',
  joinDate: '2023-07-19',
  totalBorrowings: 9
},
{
  id: 65,
  name: 'Ryan Adiputra',
  email: 'ryan.adiputra.tik22@stu.pnj.ac.id',
  role: 'user',
  status: 'active',
  joinDate: '2022-09-26',
  totalBorrowings: 12
},
{
  id: 66,
  name: 'Bella Maharani',
  email: 'bella.maharani.tik24@stu.pnj.ac.id',
  role: 'user',
  status: 'active',
  joinDate: '2024-02-05',
  totalBorrowings: 5
},
{
  id: 67,
  name: 'Ferdy Kurniawan',
  email: 'ferdy.kurniawan.tik21@stu.pnj.ac.id',
  role: 'user',
  status: 'inactive',
  joinDate: '2021-10-16',
  totalBorrowings: 14
},
{
  id: 68,
  name: 'Diana Sari',
  email: 'diana.sari.tik23@stu.pnj.ac.id',
  role: 'user',
  status: 'active',
  joinDate: '2023-08-11',
  totalBorrowings: 8
},
{
  id: 69,
  name: 'Gilang Pratama',
  email: 'gilang.pratama.tik22@stu.pnj.ac.id',
  role: 'user',
  status: 'active',
  joinDate: '2022-10-30',
  totalBorrowings: 11
},
{
  id: 70,
  name: 'Aulia Rahman',
  email: 'aulia.rahman.tik24@stu.pnj.ac.id',
  role: 'user',
  status: 'active',
  joinDate: '2024-03-02',
  totalBorrowings: 4
},
{
  id: 71,
  name: 'Hadi Saputro',
  email: 'hadi.saputro.tik21@stu.pnj.ac.id',
  role: 'user',
  status: 'active',
  joinDate: '2021-09-18',
  totalBorrowings: 18
},
{
  id: 72,
  name: 'Dinda Permata',
  email: 'dinda.permata.tik23@stu.pnj.ac.id',
  role: 'user',
  status: 'inactive',
  joinDate: '2023-06-07',
  totalBorrowings: 6
},
{
  id: 73,
  name: 'Wahyu Hidayat',
  email: 'wahyu.hidayat.tik22@stu.pnj.ac.id',
  role: 'user',
  status: 'active',
  joinDate: '2022-11-25',
  totalBorrowings: 13
},
{
  id: 74,
  name: 'Ayu Lestari',
  email: 'ayu.lestari.tik24@stu.pnj.ac.id',
  role: 'user',
  status: 'active',
  joinDate: '2024-01-27',
  totalBorrowings: 7
},
{
  id: 75,
  name: 'Ridho Firmansyah',
  email: 'ridho.firmansyah.tik21@stu.pnj.ac.id',
  role: 'user',
  status: 'active',
  joinDate: '2021-12-19',
  totalBorrowings: 15
},
{
  id: 76,
  name: 'Mila Sari',
  email: 'mila.sari.tik23@stu.pnj.ac.id',
  role: 'user',
  status: 'active',
  joinDate: '2023-09-23',
  totalBorrowings: 10
},
{
  id: 77,
  name: 'Ardy Nugraha',
  email: 'ardy.nugraha.tik22@stu.pnj.ac.id',
  role: 'user',
  status: 'inactive',
  joinDate: '2022-07-08',
  totalBorrowings: 9
},
{
  id: 78,
  name: 'Lia Kurniasari',
  email: 'lia.kurniasari.tik24@stu.pnj.ac.id',
  role: 'user',
  status: 'active',
  joinDate: '2024-02-18',
  totalBorrowings: 5
},
{
  id: 79,
  name: 'Bobby Ramadhan',
  email: 'bobby.ramadhan.tik21@stu.pnj.ac.id',
  role: 'user',
  status: 'active',
  joinDate: '2021-08-05',
  totalBorrowings: 16
},
{
  id: 80,
  name: 'Cinta Maharani',
  email: 'cinta.maharani.tik23@stu.pnj.ac.id',
  role: 'user',
  status: 'active',
  joinDate: '2023-10-14',
  totalBorrowings: 8
},
{
  id: 81,
  name: 'Alvin Pradana',
  email: 'alvin.pradana.tik22@stu.pnj.ac.id',
  role: 'user',
  status: 'active',
  joinDate: '2022-08-13',
  totalBorrowings: 12
},
{
  id: 82,
  name: 'Sari Wulandari',
  email: 'sari.wulandari.tik24@stu.pnj.ac.id',
  role: 'user',
  status: 'active',
  joinDate: '2024-03-21',
  totalBorrowings: 3
},
{
  id: 83,
  name: 'Galih Setiawan',
  email: 'galih.setiawan.tik21@stu.pnj.ac.id',
  role: 'user',
  status: 'inactive',
  joinDate: '2021-10-09',
  totalBorrowings: 20
},
{
  id: 84,
  name: 'Laila Nurjanah',
  email: 'laila.nurjanah.tik23@stu.pnj.ac.id',
  role: 'user',
  status: 'active',
  joinDate: '2023-07-26',
  totalBorrowings: 9
},
{
  id: 85,
  name: 'Kevin Pratama',
  email: 'kevin.pratama.tik22@stu.pnj.ac.id',
  role: 'user',
  status: 'active',
  joinDate: '2022-09-04',
  totalBorrowings: 14
},
{
  id: 86,
  name: 'Nadia Putri',
  email: 'nadia.putri.tik24@stu.pnj.ac.id',
  role: 'user',
  status: 'active',
  joinDate: '2024-01-03',
  totalBorrowings: 6
},
{
  id: 87,
  name: 'Faisal Rahman',
  email: 'faisal.rahman.tik21@stu.pnj.ac.id',
  role: 'user',
  status: 'active',
  joinDate: '2021-11-27',
  totalBorrowings: 17
},
{
  id: 88,
  name: 'Tiara Salsabila',
  email: 'tiara.salsabila.tik23@stu.pnj.ac.id',
  role: 'user',
  status: 'inactive',
  joinDate: '2023-08-17',
  totalBorrowings: 7
},
{
  id: 89,
  name: 'Rangga Wijaya',
  email: 'rangga.wijaya.tik22@stu.pnj.ac.id',
  role: 'user',
  status: 'active',
  joinDate: '2022-10-11',
  totalBorrowings: 11
},
{
  id: 90,
  name: 'Intan Permata',
  email: 'intan.permata.tik24@stu.pnj.ac.id',
  role: 'user',
  status: 'active',
  joinDate: '2024-02-09',
  totalBorrowings: 5
},
{
  id: 91,
  name: 'Dimas Kurniawan',
  email: 'dimas.kurniawan.tik21@stu.pnj.ac.id',
  role: 'user',
  status: 'active',
  joinDate: '2021-09-25',
  totalBorrowings: 18
},
{
  id: 92,
  name: 'Reva Anggraini',
  email: 'reva.anggraini.tik23@stu.pnj.ac.id',
  role: 'user',
  status: 'active',
  joinDate: '2023-06-12',
  totalBorrowings: 10
},
{
  id: 93,
  name: 'Fajar Sidiq',
  email: 'fajar.sidiq.tik22@stu.pnj.ac.id',
  role: 'user',
  status: 'inactive',
  joinDate: '2022-11-06',
  totalBorrowings: 8
},
{
  id: 94,
  name: 'Kania Maharani',
  email: 'kania.maharani.tik24@stu.pnj.ac.id',
  role: 'user',
  status: 'active',
  joinDate: '2024-03-14',
  totalBorrowings: 4
},
{
  id: 95,
  name: 'Rian Saputra',
  email: 'rian.saputra.tik21@stu.pnj.ac.id',
  role: 'user',
  status: 'active',
  joinDate: '2021-12-07',
  totalBorrowings: 16
},
{
  id: 96,
  name: 'Silvia Dewi',
  email: 'silvia.dewi.tik23@stu.pnj.ac.id',
  role: 'user',
  status: 'active',
  joinDate: '2023-09-30',
  totalBorrowings: 9
},
{
  id: 97,
  name: 'Taufik Hidayat',
  email: 'taufik.hidayat.tik22@stu.pnj.ac.id',
  role: 'user',
  status: 'active',
  joinDate: '2022-07-22',
  totalBorrowings: 13
},
{
  id: 98,
  name: 'Ulfa Rahmawati',
  email: 'ulfa.rahmawati.tik24@stu.pnj.ac.id',
  role: 'user',
  status: 'active',
  joinDate: '2024-01-31',
  totalBorrowings: 5
},
{
  id: 99,
  name: 'Vito Ananda',
  email: 'vito.ananda.tik21@stu.pnj.ac.id',
  role: 'user',
  status: 'inactive',
  joinDate: '2021-08-18',
  totalBorrowings: 19
},
{
  id: 100,
  name: 'Winda Sari',
  email: 'winda.sari.tik23@stu.pnj.ac.id',
  role: 'user',
  status: 'active',
  joinDate: '2023-10-05',
  totalBorrowings: 11
},
{
  id: 101,
  name: 'Muhammad Rafif Dwiarka',
  email: 'Muhammad.Rafif.Dwiarka.tik24@stu.pnj.ac.id',
  role: 'user',
  status: 'active',
  joinDate: '2024-10-05',
  totalBorrowings: 12
},
{
  id: 102,
  name: 'Falih Elmanda Ghaisan',
  email: 'Falih.Elmanda.Ghaisan.tik24@stu.pnj.ac.id',
  role: 'user',
  status: 'active',
  joinDate: '2024-09-05',
  totalBorrowings: 24
},
{
  id: 103,
  name: 'Hari Bernardo',
  email: 'Hari.Bernardo.tik24@stu.pnj.ac.id',
  role: 'user',
  status: 'active',
  joinDate: '2024-11-05',
  totalBorrowings: 31
},
{
  id: 104,
  name: 'Raden Mas Fidel Khalid Ramadhan',
  email: 'Raden.Mas.Fidel.Khalid.Ramadhan.tik24@stu.pnj.ac.id',
  role: 'user',
  status: 'active',
  joinDate: '2024-10-05',
  totalBorrowings: 9
},
{
  id: 105,
  name: 'Muhammad Aurakha Ghazy Zackhary',
  email: 'Muhammad.Aurakha.Ghazy.Zackhary.tik24@stu.pnj.ac.id',
  role: 'user',
  status: 'active',
  joinDate: '2024-10-05',
  totalBorrowings: 20
},
]);

 const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleEdit = (userId) => {
    console.log('Edit user:', userId);
    // Add edit logic here
  };

  const handleDeleteClick = (user) => {
    setUserToDelete(user);
    setShowDeleteModal(true);
  };

  const confirmDelete = () => {
    if (userToDelete) {
      setUsers(prevUsers => prevUsers.filter(user => user.id !== userToDelete.id));
      setShowDeleteModal(false);
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
    console.log('Add new user');
    // Add new user logic here
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-800 mb-2">Users Management</h1>
        <p className="text-xl text-gray-600">Kelola pengguna sistem</p>
      </div>

      {/* Search and Add User */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
        <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              type="text"
              placeholder="Cari pengguna..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border bg-white border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent focus:outline-none"
            />
          </div>
          
          <button
            onClick={handleAddUser}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            <Plus className="h-5 w-5" />
            Tambah Pengguna
          </button>
        </div>
      </div>

      {/* Users Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-800">Pengguna</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-800">Role</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-800">Status</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-800">Bergabung</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-800">Peminjaman</th>
                <th className="px-6 py-4 text-center text-sm font-semibold text-gray-800">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredUsers.map((user) => (
                <tr key={user.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 bg-blue-600 rounded-full flex items-center justify-center">
                        <User className="h-5 w-5 text-white" />
                      </div>
                      <div>
                        <p className="font-semibold text-gray-800">{user.name}</p>
                        <p className="text-sm text-gray-500 flex items-center gap-1">
                          <Mail className="h-4 w-4" />
                          {user.email}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                      user.role === 'admin' 
                        ? 'bg-purple-100 text-purple-800' 
                        : 'bg-blue-100 text-blue-800'
                    }`}>
                      {user.role === 'admin' ? 'Administrator' : 'Pengguna'}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                      user.status === 'active' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {user.status === 'active' ? 'Aktif' : 'Tidak Aktif'}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-1 text-sm text-gray-600">
                      <Calendar className="h-4 w-4" />
                      {new Date(user.joinDate).toLocaleDateString('id-ID', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric'
                      })}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm font-medium text-gray-800">
                      {user.totalBorrowings} kali
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-center gap-2">
                      <button
                        onClick={() => handleEdit(user.id)}
                        className="p-2 text-blue-600 bg-white hover:bg-blue-50 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1"
                        title="Edit pengguna"
                      >
                        <Edit className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => handleDeleteClick(user)}
                        className="p-2 text-red-600 bg-white hover:bg-red-50 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-1"
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
          <div className="text-center py-8 text-gray-500">
            <User className="h-12 w-12 mx-auto mb-4 text-gray-300" />
            <p>Tidak ada pengguna ditemukan</p>
          </div>
        )}
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 max-w-md w-full mx-4 shadow-xl">
            <div className="flex items-center gap-3 mb-4">
              <div className="h-12 w-12 bg-red-100 rounded-full flex items-center justify-center">
                <Trash2 className="h-6 w-6 text-red-600" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-800">Hapus Pengguna</h3>
                <p className="text-sm text-gray-600">Konfirmasi penghapusan data</p>
              </div>
            </div>
            
            <div className="mb-6">
              <p className="text-gray-700 mb-2">
                Apakah Anda yakin ingin menghapus pengguna berikut?
              </p>
              {userToDelete && (
                <div className="bg-gray-50 rounded-lg p-3">
                  <p className="font-semibold text-gray-800">{userToDelete.name}</p>
                  <p className="text-sm text-gray-600">{userToDelete.email}</p>
                </div>
              )}
              <p className="text-sm text-red-600 mt-2">
                Data yang dihapus tidak dapat dikembalikan.
              </p>
            </div>

            <div className="flex gap-3 justify-end">
              <button
                onClick={cancelDelete}
                className="px-4 py-2 text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300 transition-colors font-medium focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
              >
                Batal
              </button>
              <button
                onClick={confirmDelete}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
              >
                Ya, Hapus
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Success Modal */}
      {showSuccessModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 max-w-md w-full mx-4 shadow-xl">
            <div className="text-center">
              <div className="h-16 w-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Berhasil!</h3>
              <p className="text-gray-600 mb-6">
                Data pengguna berhasil dihapus dari sistem.
              </p>
              <button
                onClick={closeSuccessModal}
                className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
              >
                OK
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UsersManagement;