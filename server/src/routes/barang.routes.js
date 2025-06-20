import { Router } from 'express';
import * as BarangController from '../controllers/barang.controller.js';
import { authenticateJWT, authorizeRole } from '../middleware/auth.js';

const router = Router();

router.get('/', authenticateJWT, BarangController.getAllBarang);
router.get('/:id', authenticateJWT, BarangController.getBarangById);
router.post('/', authenticateJWT, authorizeRole('admin', 'staff'), BarangController.createBarang);
router.patch('/:id/status', authenticateJWT, authorizeRole('admin', 'staff'), BarangController.updateBarangStatus);

export default router;