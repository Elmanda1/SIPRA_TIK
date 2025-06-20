import { Router } from 'express';
import * as UsersController from '../controllers/users.controller.js';
import { authenticateJWT, authorizeRole } from '../middleware/auth.js';

const router = Router();

router.get('/', authenticateJWT, authorizeRole('admin'), UsersController.getAllUsers);
router.post('/', authenticateJWT, authorizeRole('admin'), UsersController.createUser);
router.put('/:username', authenticateJWT, authorizeRole('admin'), UsersController.updateUser);
router.delete('/:username', authenticateJWT, authorizeRole('admin'), UsersController.deleteUser);

export default router;