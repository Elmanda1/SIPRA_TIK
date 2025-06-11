// src/routes/dashboard.js
import { Router } from 'express';
import { getDashboardSummary } from '../controllers/dashboard.controller.js';

const router = Router();

router.get('/summary', getDashboardSummary);

export default router;
