import express from 'express';
import prisma from '../config/prisma.js';
import { authenticateJWT, authorizeRole } from '../middleware/auth.js';

const router = express.Router();

// Endpoint: GET /api/v1/users
router.get('/users', authenticateJWT, authorizeRole('admin'), async (req, res) => {
  try {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        status: true,
        createdAt: true,
      }
    });
    // Format joinDate dan totalBorrowings jika perlu
    const formatted = users.map(u => ({
      ...u,
      joinDate: u.createdAt,
      totalBorrowings: 0 // Ganti jika ada relasi peminjaman
    }));
    res.json(formatted);
  } catch (err) {
    res.status(500).json({ message: 'Gagal mengambil data user' });
  }
});

export default router;