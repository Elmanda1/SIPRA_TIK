import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

// Safely get secrets
const {
  JWT_SECRET,
  JWT_REFRESH_SECRET,
  JWT_EXPIRES_IN = '15m',
  JWT_REFRESH_EXPIRES_IN = '7d',
} = process.env;

if (!JWT_SECRET || !JWT_REFRESH_SECRET) {
  throw new Error('Missing JWT_SECRET or JWT_REFRESH_SECRET in environment');
}

// Generic function to sign tokens
function signToken(payload, secret, options = {}) {
  return jwt.sign(payload, secret, {
    algorithm: 'HS256',
    issuer: 'sipra_server',
    audience: 'sipra_client',
    ...options,
  });
}

// Verify safely, returning either decoded or null
function verifyToken(token, secret) {
  try {
    return jwt.verify(token, secret, {
      algorithms: ['HS256'],
      issuer: 'sipra_server',
      audience: 'sipra_client',
    });
  } catch (err) {
    console.error('JWT verification failed:', err.message);
    return null;
  }
}

// Exported API

export function generateAccessToken(payload) {
  return signToken(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
}

export function generateRefreshToken(payload) {
  return signToken(payload, JWT_REFRESH_SECRET, { expiresIn: JWT_REFRESH_EXPIRES_IN });
}

export function verifyAccessToken(token) {
  return verifyToken(token, JWT_SECRET);
}

export function verifyRefreshToken(token) {
  return verifyToken(token, JWT_REFRESH_SECRET);
}
