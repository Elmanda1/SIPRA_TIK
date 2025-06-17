// src/index.js

import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.routes.js';
import dashboardRoutes from './routes/dashboard.routes.js';
import barangRoutes from './routes/barang.routes.js';
import peminjamanRoutes from './routes/peminjaman.routes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cors({
  origin: process.env.CLIENT_URL,
  credentials: true
}));

// ✅ Mount the auth routes
app.use('/api/v1/auth', authRoutes);
app.use('/dashboard', dashboardRoutes);
app.use('/api/v1/barang', barangRoutes);
app.use('/api/v1/peminjaman', peminjamanRoutes);

app.get('/', (req, res) => {
  res.send('API is running...');
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
