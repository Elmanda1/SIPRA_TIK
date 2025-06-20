import express from 'express';
import * as AuthController from '../controllers/auth.controller.js';
import * as authService from '../services/auth.service.js';
import { authenticateJWT } from '../middleware/auth.js';

const router = express.Router();

router.post('/login', AuthController.login);
router.post('/reset-password', async (req, res) => {
  try {
    const { username, role } = req.body;
    const result = await authService.resetPassword({ username, role });
    res.json(result);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});
router.post('/reset-password/confirm', async (req, res) => {
  try {
    const { username, role, resetToken, newPassword } = req.body;
    // Panggil service untuk verifikasi token dan update password
    const result = await authService.confirmResetPassword({ username, role, resetToken, newPassword });
    res.json(result);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});
router.get('/verify-email', AuthController.verifyEmail);

// Logout endpoint
router.post('/logout', authenticateJWT, (req, res) => {
  res.clearCookie('accessToken');
  res.clearCookie('refreshToken');
  res.json({ message: 'Logged out successfully' });
});

// Refresh token endpoint
router.post('/refresh', AuthController.refreshToken);

// Roles endpoint
router.get('/roles', (req, res) => {
  // Bisa juga ambil dari DB jika dynamic
  res.json({ roles: ['admin', 'mahasiswa', 'dosen'] });
});

export default router;
