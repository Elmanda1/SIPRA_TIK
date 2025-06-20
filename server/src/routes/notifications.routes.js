import { Router } from 'express';
import * as NotificationsController from '../controllers/notifications.controller.js';
import { authenticateJWT } from '../middleware/auth.js';

const router = Router();

router.get('/', authenticateJWT, NotificationsController.getNotifications);
router.post('/:id/read', authenticateJWT, NotificationsController.markAsRead);

export default router;