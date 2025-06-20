import { Router } from 'express';
import * as PeminjamanController from '../controllers/peminjaman.controller.js';
import { authenticateJWT } from '../middleware/auth.js';

const router = Router();

router.get('/', authenticateJWT, PeminjamanController.getAllPeminjaman);
router.get('/:id', authenticateJWT, PeminjamanController.getPeminjamanById);
router.post('/', authenticateJWT, PeminjamanController.createPeminjaman);
router.patch('/:id/status', authenticateJWT, PeminjamanController.updatePeminjamanStatus);
router.post('/:id/return', authenticateJWT, PeminjamanController.returnPeminjaman);

export default router;