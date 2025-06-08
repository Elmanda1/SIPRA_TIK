// src/controllers/userController.js

import {PrismaClient} from '@prisma/client';

const prisma = new PrismaClient();
z
export const getAllUsers = async (req, res) => {
  try {
    const { page = 1, limit = 10, role, search } = req.query;
    const skip = (parseInt(page) - 1) * parseInt(limit);

    const where = {};
    
    if (role) {
      where.role = role;
    }
    
    if (search) {
      where.OR = [
        { uname: { contains: search, mode: 'insensitive' } },
        { email: { contains: search, mode: 'insensitive' } }
      ];
    }

    const [users, total] = await Promise.all([
      prisma.users.findMany({
        where,
        select: {
          id_user: true,
          uname: true,
          email: true,
          role: true,
          _count: {
            select: {
              barang: true,
              ruangan: true,
              pinjam: true
            }
          }
        },
        skip,
        take: parseInt(limit),
        orderBy: { id_user: 'desc' }
      }),
      prisma.users.count({ where })
    ]);

    res.status(200).json({
      success: true,
      data: users,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        totalPages: Math.ceil(total / parseInt(limit))
      }
    });
  } catch (err) {
    console.error('Error getting users:', err);
    res.status(500).json({ 
      success: false,
      error: 'Gagal mengambil data user',
      message: err.message 
    });
  }
};

export const getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    
    const user = await prisma.users.findUnique({
      where: { id_user: parseInt(id) },
      select: {
        id_user: true,
        uname: true,
        email: true,
        role: true,
        barang: {
          select: {
            id_barang: true,
            nama_barang: true,
            status: true
          }
        },
        ruangan: {
          select: {
            id_ruangan: true,
            kode_ruangan: true,
            status: true
          }
        },
        pinjam: {
          select: {
            id_peminjaman: true,
            tanggal_peminjaman: true,
            tanggal_pengembalian: true,
            status: true
          },
          orderBy: { tanggal_pengajuan: 'desc' },
          take: 10
        }
      }
    });

    if (!user) {
      return res.status(404).json({
        success: false,
        error: 'User tidak ditemukan'
      });
    }

    res.status(200).json({
      success: true,
      data: user
    });
  } catch (err) {
    console.error('Error getting user by id:', err);
    res.status(500).json({ 
      success: false,
      error: 'Gagal mengambil data user',
      message: err.message 
    });
  }
};

export const createUser = async (req, res) => {
  try {
    const { uname, email, pw, role } = req.body;

    // Validasi input
    if (!uname || !email || !pw || !role) {
      return res.status(400).json({
        success: false,
        error: 'Semua field harus diisi'
      });
    }

    // Cek email sudah ada atau belum
    const existingUser = await prisma.users.findUnique({
      where: { email }
    });

    if (existingUser) {
      return res.status(409).json({
        success: false,
        error: 'Email sudah terdaftar'
      });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(pw, 12);

    // Create user
    const newUser = await prisma.users.create({
      data: {
        uname,
        email,
        pw: hashedPassword,
        role
      },
      select: {
        id_user: true,
        uname: true,
        email: true,
        role: true
      }
    });

    res.status(201).json({
      success: true,
      message: `User ${uname} berhasil dibuat`,
      data: newUser
    });
  } catch (err) {
    console.error('Error creating user:', err);
    res.status(500).json({ 
      success: false,
      error: 'Gagal membuat user',
      message: err.message 
    });
  }
};

export const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { uname, email, role } = req.body;

    const existingUser = await prisma.users.findUnique({
      where: { id_user: parseInt(id) }
    });

    if (!existingUser) {
      return res.status(404).json({
        success: false,
        error: 'User tidak ditemukan'
      });
    }

    // Cek email conflict (jika email berubah)
    if (email && email !== existingUser.email) {
      const emailConflict = await prisma.users.findUnique({
        where: { email }
      });

      if (emailConflict) {
        return res.status(409).json({
          success: false,
          error: 'Email sudah digunakan oleh user lain'
        });
      }
    }

    const updatedUser = await prisma.users.update({
      where: { id_user: parseInt(id) },
      data: {
        ...(uname && { uname }),
        ...(email && { email }),
        ...(role && { role })
      },
      select: {
        id_user: true,
        uname: true,
        email: true,
        role: true
      }
    });

    res.status(200).json({
      success: true,
      message: 'User berhasil diupdate',
      data: updatedUser
    });
  } catch (err) {
    console.error('Error updating user:', err);
    res.status(500).json({ 
      success: false,
      error: 'Gagal mengupdate user',
      message: err.message 
    });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    const existingUser = await prisma.users.findUnique({
      where: { id_user: parseInt(id) }
    });

    if (!existingUser) {
      return res.status(404).json({
        success: false,
        error: 'User tidak ditemukan'
      });
    }

    await prisma.users.delete({
      where: { id_user: parseInt(id) }
    });

    res.status(200).json({
      success: true,
      message: 'User berhasil dihapus'
    });
  } catch (err) {
    console.error('Error deleting user:', err);
    res.status(500).json({ 
      success: false,
      error: 'Gagal menghapus user',
      message: err.message 
    });
  }
};