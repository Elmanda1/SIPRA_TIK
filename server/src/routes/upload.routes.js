import { Router } from 'express';
import multer from 'multer';
import path from 'path';
import { authenticateJWT } from '../middleware/auth.js';

const router = Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname)),
});
const upload = multer({ storage });

router.post('/pengembalian/:id/upload-foto', authenticateJWT, upload.single('foto'), async (req, res) => {
  // Simpan URL file ke database peminjaman jika perlu
  res.json({ url: `/uploads/${req.file.filename}` });
});

export default router;