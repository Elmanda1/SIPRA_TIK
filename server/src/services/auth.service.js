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
        isBlocked: true,
        lastLoginAttempt: true,
        loginAttempts: true
      }
    });

    if (!user) {
      throw new Error('Username atau password salah');
    }

    // Check if account is blocked
    if (user.isBlocked) {
      // Check if block duration (1 hour) has passed
      const blockDuration = 60 * 60 * 1000; // 1 hour in milliseconds
      const now = new Date();
      const lastAttempt = user.lastLoginAttempt;

      if (lastAttempt && (now - new Date(lastAttempt)) < blockDuration) {
        throw new Error('Akun diblokir. Silakan coba lagi dalam 1 jam');
      } else {
        // Reset block if duration has passed
        await prisma.user.update({
          where: { username },
          data: {
            isBlocked: false,
            loginAttempts: 0
          }
        });
      }
    }

    // Verify password
    const isValidPassword = await bcrypt.compare(password, user.password);
    
    if (!isValidPassword) {
      // Increment login attempts
      const attempts = (user.loginAttempts || 0) + 1;
      const shouldBlock = attempts >= 3;

      await prisma.user.update({
        where: { username },
        data: {
          loginAttempts: attempts,
          isBlocked: shouldBlock,
          lastLoginAttempt: new Date()
        }
      });

      if (shouldBlock) {
        throw new Error('Akun diblokir karena terlalu banyak percobaan gagal');
      }
      
      throw new Error(`Username atau password salah. Sisa percobaan: ${3 - attempts}`);
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
          jurusan: true,
          alamat: true
        }
      });
    }

    if (!profile) {
      throw new Error('Data profil tidak ditemukan');
    }

    // Reset login attempts on successful login
    await prisma.user.update({
      where: { username },
      data: {
        loginAttempts: 0,
        isBlocked: false,
        lastLoginAttempt: new Date(),
        lastLoginSuccess: new Date()
      }
    });

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
export async function resetPassword({ email }) {
  // Cari user di Mahasiswa/Dosen
  let user = await prisma.mahasiswa.findUnique({ where: { email } });
  let username = user?.nim;
  if (!user) {
    user = await prisma.dosen.findUnique({ where: { email } });
    username = user?.kode_dosen;
  }
  if (!user) throw new Error('Email not found');

  // Generate 6 digit numeric reset token
  const resetToken = Math.floor(100000 + Math.random() * 900000).toString();
  const resetTokenExpiry = new Date(Date.now() + 60 * 60 * 1000); // 1 jam

  await prisma.user.update({
    where: { username },
    data: {
      resetToken,
      resetTokenExpiry,
    },
  });

  // Kirim resetToken ke email user
  await sendEmail(user.email, 'Reset Password SIPRA', `<p>Kode reset password Anda: <b>${resetToken}</b></p>`);

  return {
    message: 'Reset password token generated. Please check your email.',
    resetToken,
  };
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
