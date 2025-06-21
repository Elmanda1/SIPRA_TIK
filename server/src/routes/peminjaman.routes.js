import express from 'express';
import { Router } from 'express';
import * as PeminjamanController from '../controllers/peminjaman.controller.js';
import { authenticateJWT } from '../middleware/auth.js';

const router = Router();

router.get('/', authenticateJWT, PeminjamanController.getAllPeminjaman);
router.get('/:id', authenticateJWT, PeminjamanController.getPeminjamanById);
router.post('/', authenticateJWT, PeminjamanController.createPeminjaman);
router.patch('/:id/status', authenticateJWT, PeminjamanController.updatePeminjamanStatus);
router.post('/:id/return', authenticateJWT, PeminjamanController.returnPeminjaman);

// Tambahkan PATCH untuk update status
router.patch('/peminjaman/:id', async (req, res) => {
  const { status } = req.body;
  const { id } = req.params;
  try {
    const updated = await prisma.peminjaman.update({
      where: { id_peminjaman: Number(id) },
      data: { status }
    });
    res.json({ data: updated });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;