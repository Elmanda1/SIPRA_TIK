// src/routes/dashboard.js
import { Router } from 'express';
import { getDashboardSummary } from '../controllers/dashboard.controller.js';
import { authenticateJWT, authorizeRole } from '../middleware/auth.js';

const router = Router();

router.get('/summary', authenticateJWT, authorizeRole('admin', 'staff'), getDashboardSummary);

export default router;
