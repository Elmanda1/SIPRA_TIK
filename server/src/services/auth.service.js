import prisma from '../config/prisma.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { generateAccessToken, generateRefreshToken } from '../utils/jwt.js';
import { sendEmail } from '../utils/email.js';

export async function login({ username, password, req }) {
  try {
    // Basic validation
    if (!username || !password) {
      throw new Error('Username dan password harus diisi');
    }

    // Find user
    const user = await prisma.user.findUnique({
      where: { username },
      select: {
        username: true,
        password: true,
        role: true,
        isVerified: true,
      }
    });

    if (!user) {
      throw new Error('Username atau password salah');
    }

    // Verify password
    const isValidPassword = await bcrypt.compare(password, user.password);

    if (!isValidPassword) {
      throw new Error('Username atau password salah');
    }

    // Check if account is verified
    if (!user.isVerified) {
      throw new Error('Akun belum diverifikasi. Silakan cek email Anda');
    }

    // Get user profile based on role
    let profile = null;
    if (user.role === 'mahasiswa') {
      profile = await prisma.mahasiswa.findUnique({
        where: { nim: username },
        select: {
          nim: true,
          nama: true,
          email: true,
          foto: true,
          phone: true,
          prodi: true,
          alamat: true,
          kota: true,
          provinsi: true,
          angkatan: true,
          kelas: true
        }
      });
    } else if (user.role === 'dosen') {
      profile = await prisma.dosen.findUnique({
        where: { kode_dosen: username },
        select: {
          kode_dosen: true,
          nama: true,
          email: true,
          foto: true,
          phone: true,
          fakultas: true,
          prodi: true,
          jabatan: true
        }
      });
    } else if (user.role === 'admin') {
      profile = await prisma.admin.findUnique({
        where: { username: username },
        select: {
          username: true
        }
      });
    }

    if (!profile) {
      throw new Error('Data profil tidak ditemukan');
    }

    // Create session
    const session = await prisma.session.create({
      data: {
        username: username,
        userAgent: req.headers['user-agent'] || '',
        ipAddress: req.ip,
        refreshToken: '', // sementara, akan diupdate setelah token dibuat
        expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
      }
    });

    // Generate tokens
    const accessToken = generateAccessToken(
      { username, role: user.role, sessionId: session.id }
    );
    const refreshToken = generateRefreshToken(
      { username, sessionId: session.id }
    );

    // Tambahkan refreshToken dan expiresAt ke session
    await prisma.session.update({
      where: { id: session.id },
      data: {
        refreshToken,
        expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
      }
    });

    return {
      user: {
        username,
        role: user.role,
        ...profile,
      },
      accessToken,
      refreshToken
    };

  } catch (error) {
    throw error;
  }
}

// RESET PASSWORD (generate token & save to user)
export async function resetPassword({ username, role }) {
  let user = null;
  let email = null;

  if (role === 'user' || role === 'mahasiswa') {
    // 1. Cari mahasiswa berdasarkan NIM
    const mahasiswa = await prisma.mahasiswa.findUnique({ where: { nim: username } });
    email = mahasiswa?.email;

    // 2. Cari user di tabel user (username = nim)
    user = await prisma.user.findUnique({ where: { username } });

    if (!mahasiswa || !user || !email) {
      throw new Error('User tidak ditemukan atau email belum terdaftar');
    }

    // 3. Generate kode reset (6 digit)
    const resetToken = Math.floor(100000 + Math.random() * 900000).toString();
    const resetTokenExpiry = new Date(Date.now() + 60 * 60 * 1000); // 1 jam

    // 4. Simpan token ke tabel user
    await prisma.user.update({
      where: { username },
      data: { resetToken, resetTokenExpiry }
    });

    // 5. (Opsional) Kirim email kode reset
    // await sendEmail(email, 'Reset Password SIPRATIK', `<p>Kode reset password Anda: <b>${resetToken}</b></p>`);

    // 6. Untuk dev/testing, return token di response
    return { message: 'Kode reset password berhasil digenerate.', resetToken };
  }

  // ...handle dosen dan admin seperti sebelumnya...
  // (bisa pakai pola yang sama: cari email di tabel dosen, simpan token di user)
}

// Generate 6 digit verification token untuk user yang belum diverifikasi (opsional, bisa dipanggil manual)
export async function generateVerificationToken(username) {
  const verificationToken = Math.floor(100000 + Math.random() * 900000).toString();
  await prisma.user.update({
    where: { username },
    data: { verificationToken }
  });
  return verificationToken;
}

export async function confirmResetPassword({ username, role, resetToken, newPassword }) {
  // Cari user di tabel user
  const user = await prisma.user.findUnique({ where: { username } });
  if (!user || user.resetToken !== resetToken) {
    throw new Error('Token reset tidak valid');
  }
  // Cek expiry jika perlu
  if (user.resetTokenExpiry && user.resetTokenExpiry < new Date()) {
    throw new Error('Token reset sudah kadaluarsa');
  }
  // Hash password baru
  const hashed = await bcrypt.hash(newPassword, 10);
  // Update password dan hapus token
  await prisma.user.update({
    where: { username },
    data: {
      password: hashed,
      resetToken: null,
      resetTokenExpiry: null,
    },
  });
  return { message: 'Password berhasil direset' };
}
