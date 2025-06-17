import express from 'express';
import * as AuthController from '../controllers/auth.controller.js';

const router = express.Router();

router.post('/login', AuthController.login);
router.post('/reset-password', AuthController.resetPassword);
router.get('/verify-email', AuthController.verifyEmail);

export default router;
