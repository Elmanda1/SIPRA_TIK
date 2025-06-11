// src/controllers/dashboardController.js
import prisma from '../config/prisma.js';

export const getDashboardSummary = async (req, res) => {
  try {
    const [
      totalPeminjaman,
      pendingApproval,
      approvedToday,
      totalUsers,
      penggunaAktifHariIni,
      penggunaBaruMingguIni,
      aktivitasMingguan
    ] = await Promise.all([
      prisma.peminjaman.count(),
      prisma.peminjaman.count({ where: { status: 'PENDING' } }),
      prisma.peminjaman.count({
        where: {
          status: 'APPROVED',
          updatedAt: {
            gte: new Date(new Date().setHours(0, 0, 0, 0))
          }
        }
      }),
      prisma.user.count(),
      prisma.session.findMany({
        where: {
          createdAt: {
            gte: new Date(new Date().setHours(0, 0, 0, 0))
          }
        },
        distinct: ['userId']
      }),
      prisma.user.findMany({
        where: {
          createdAt: {
            gte: new Date(new Date().setDate(new Date().getDate() - 7))
          }
        }
      }),
      prisma.session.findMany({
        where: {
          createdAt: {
            gte: new Date(new Date().setDate(new Date().getDate() - 7))
          }
        }
      })
    ]);

    const rataRataAktif = aktivitasMingguan.length / 7;

    res.json({
      totalPeminjaman,
      pendingApproval,
      approvedToday,
      totalUsers,
      penggunaAktifHariIni: penggunaAktifHariIni.length,
      penggunaBaruMingguIni: penggunaBaruMingguIni.length,
      rataRataAktif: Math.round(rataRataAktif)
    });
  } catch (error) {
    console.error('Dashboard Summary Error:', error);
    res.status(500).json({ message: 'Internal Server Error', error: error.message });
  }
};
