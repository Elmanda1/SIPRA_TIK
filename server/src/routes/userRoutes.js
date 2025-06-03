// src/routes/userRoutes.js

import express from 'express';
import { getAllUsers, createUser } from '../controllers/usercontroller.js';

const router = express.Router();

router.get('/', getAllUsers);
router.post('/', createUser);

export default router;
