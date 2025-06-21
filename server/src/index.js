import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.routes.js';
import dashboardRoutes from './routes/dashboard.routes.js';
import barangRoutes from './routes/barang.routes.js';
import peminjamanRoutes from './routes/peminjaman.routes.js';
import ruanganRoutes from './routes/ruangan.routes.js';
import usersRoutes from './routes/users.routes.js';
import settingsRoutes from './routes/settings.routes.js';
import cookieParser from 'cookie-parser';
import uploadRoutes from './routes/upload.routes.js';
import path from 'path';
import notificationsRoutes from './routes/notifications.routes.js';
import { auditLog } from './middleware/audit.js';
import userRoutes from './routes/user.routes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin: ['http://localhost:5174', 'http://127.0.0.1:5174'],
  credentials: true
}));

app.use(auditLog);

// ✅ Mount the auth routes
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/dashboard', dashboardRoutes);
app.use('/api/v1/barang', barangRoutes);
app.use('/api/v1/peminjaman', peminjamanRoutes);
app.use('/api/v1/ruangan', ruanganRoutes);
app.use('/api/v1/users', usersRoutes);
app.use('/api/v1/settings', settingsRoutes);
app.use('/api/v1/notifications', notificationsRoutes);
app.use('/api/v1', userRoutes);
app.use('/api/v1', peminjamanRoutes);
app.use('/uploads', express.static(path.resolve('uploads')));
app.use(uploadRoutes);

app.get('/', (req, res) => {
  res.send('API is running...');
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
