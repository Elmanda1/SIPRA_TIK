import prisma from '../config/prisma.js';
import * as AuthService from '../services/auth.service.js';
import { loginSchema, resetPasswordSchema } from '../Validators/auth.schema.js';

export async function login(req, res) {
  try {
    // Validate request body
    const { error } = loginSchema.validate(req.body);
    if (error) {
      return res.status(400).json({
        status: 'error',
        message: error.details[0].message,
      });
    }

    const { username, password } = req.body;

    const result = await AuthService.login({
      username,
      password,
      req, // Pass request object for session creation
    });

    // Set HTTP-only cookies for tokens
    res.cookie('accessToken', result.accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 60 * 60 * 1000, // 1 hour
    });

    res.cookie('refreshToken', result.refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    // Send response without tokens in body
    res.status(200).json({
      status: 'success',
      message: 'Login berhasil',
      data: {
        user: result.user,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: 'error',
      message: error.message,
    });
  }
}

export async function resetPassword(req, res) {
  try {
    const data = resetPasswordSchema.parse(req.body);
    const result = await AuthService.resetPassword(data);
    res.json(result);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}

// Email verification endpoint
export async function verifyEmail(req, res) {
  try {
    const { token } = req.query;
    if (!token) throw new Error('Token required');
    // Pastikan token berupa string 6 digit angka
    if (!/^\d{6}$/.test(token)) throw new Error('Invalid token format');
    const user = await prisma.user.findFirst({ where: { verificationToken: token } });
    if (!user) throw new Error('Invalid or expired token');

    await prisma.user.update({
      where: { username: user.username },
      data: { isVerified: true, verificationToken: null },
    });

    res.json({ message: 'Email verified successfully' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}
