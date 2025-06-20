import { Router } from 'express';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { authenticateJWT } from '../middleware/auth.js';
import { uploadToDrive } from '../utils/googleDrive.js'; // Pastikan file ini sudah dibuat

const router = Router();

// Validasi file: hanya ukuran max 5MB, tipe file apa saja diterima
const fileFilter = (req, file, cb) => {
  cb(null, true); // Terima semua tipe file
};

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // Pastikan folder uploads/ ada
    if (!fs.existsSync('uploads/')) fs.mkdirSync('uploads/');
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname)),
});
const upload = multer({ 
  storage, 
  fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 } // 5MB
});

router.post('/pengembalian/:id/upload-foto', authenticateJWT, upload.single('foto'), async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No file uploaded or file type not allowed.' });
  }
  try {
    const localPath = req.file.path;
    const fileName = req.file.originalname;
    const folderId = '15Rkbl_vs2v0two0lFB8bNt_8npnAa2Ey';
    // Upload ke Google Drive
    const driveFile = await uploadToDrive(localPath, fileName, folderId);
    // Hapus file lokal setelah upload
    fs.unlinkSync(localPath);

    // TODO: Simpan driveFile.webViewLink ke database jika diperlukan

    res.json({ 
      driveFileId: driveFile.id, 
      webViewLink: driveFile.webViewLink, 
      webContentLink: driveFile.webContentLink 
    });
  } catch (err) {
    // Hapus file lokal jika gagal upload
    if (req.file && fs.existsSync(req.file.path)) {
      fs.unlinkSync(req.file.path);
    }
    res.status(500).json({ error: err.message });
  }
});

export default router;