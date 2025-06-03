// src/controllers/userController.js

export const getAllUsers = async (req, res) => {
  try {
    // Ini nanti pakai Prisma
    res.status(200).json({ message: 'Ambil semua user - belum terhubung ke DB' });
  } catch (err) {
    res.status(500).json({ error: 'Gagal ambil user' });
  }
};

export const createUser = async (req, res) => {
  try {
    const { nama, email } = req.body;
    // Nanti kamu bisa pakai Prisma Client disini
    res.status(201).json({ message: `User ${nama} berhasil dibuat` });
  } catch (err) {
    res.status(500).json({ error: 'Gagal buat user' });
  }
};
