import prisma from '../config/prisma.js';
import bcrypt from 'bcrypt';
import {
  generateAccessToken,
  generateRefreshToken,
} from '../utils/jwt.js';

const SALT_ROUNDS = 12;

// REGISTER
export async function register({ name, username, email, password, role }) {
  try {
    const hashed = await bcrypt.hash(password, SALT_ROUNDS);

    const user = await prisma.user.create({
      data: {
        name,
        username,
        email,
        password: hashed,
        role,
      },
    });

    const payload = { id: user.id, email: user.email, role: user.role };

    const accessToken = generateAccessToken(payload);
    const refreshToken = generateRefreshToken(payload);

    // Save session
    await prisma.session.create({
      data: {
        userId: user.id_user,
        refreshToken,
        ipAddress: '', // Optional: req.ip
        userAgent: '', // Optional: req.headers['user-agent']
        expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days
      },
    });

    return {
      message: 'User registered successfully',
      user: {
        id: user.id_user,
        name: user.name,
        username: user.username,
        email: user.email,
        role: user.role,
      },
      accessToken,
      refreshToken,
    };
  } catch (err) {
  console.error('[REGISTER ERROR]', err);
  if (err.code === 'P2002') {
    throw new Error('Email already registered');
  }
  throw new Error('Failed to register user');
}

}

// LOGIN
export async function login({ username, password }) {
  const user = await prisma.user.findFirst({
    where: { username },
  });

  if (!user) {
    throw new Error('Invalid username or password');
  }

  const valid = await bcrypt.compare(password, user.password);
  if (!valid) {
    throw new Error('Invalid username or password');
  }

  const payload = {
    id: user.id_user,
    email: user.email,
    role: user.role,
  };

  const accessToken = generateAccessToken(payload);
  const refreshToken = generateRefreshToken(payload);

  await prisma.session.create({
    data: {
      userId: user.id_user,
      refreshToken,
      ipAddress: '',
      userAgent: '',
      expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    },
  });

  return {
    message: 'Login successful',
    user: {
      id: user.id_user,
      name: user.name,
      username: user.username,
      email: user.email,
      role: user.role,
    },
    accessToken,
    refreshToken,
  };
}
