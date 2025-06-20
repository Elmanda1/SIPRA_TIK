import { Router } from 'express';
import * as SettingsController from '../controllers/settings.controller.js';
import { authenticateJWT } from '../middleware/auth.js';

const router = Router();

router.get('/', authenticateJWT, SettingsController.getSettings);
router.put('/', authenticateJWT, SettingsController.updateSettings);

export default router;