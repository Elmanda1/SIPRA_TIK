import { Router } from 'express';
import * as RuanganController from '../controllers/ruangan.controller.js';
import { authenticateJWT, authorizeRole } from '../middleware/auth.js';

const router = Router();

router.get('/', authenticateJWT, RuanganController.getAllRuangan);
router.get('/:id', authenticateJWT, RuanganController.getRuanganById);
router.post('/', authenticateJWT, authorizeRole('admin', 'staff'), RuanganController.createRuangan);
router.patch('/:id/status', authenticateJWT, authorizeRole('admin', 'staff'), RuanganController.updateRuanganStatus);

export default router;