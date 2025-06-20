import express from 'express';
import * as AuthController from '../controllers/auth.controller.js';
import { authenticateJWT } from '../middleware/auth.js';

const router = express.Router();

router.post('/login', AuthController.login);
router.post('/reset-password', AuthController.resetPassword);
router.get('/verify-email', AuthController.verifyEmail);

// Logout endpoint
router.post('/logout', authenticateJWT, (req, res) => {
  res.clearCookie('accessToken');
  res.clearCookie('refreshToken');
  res.json({ message: 'Logged out successfully' });
});

// Refresh token endpoint
router.post('/refresh', AuthController.refreshToken);

export default router;
