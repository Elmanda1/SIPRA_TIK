import {
  generateAccessToken,
  generateRefreshToken,
  verifyAccessToken,
  verifyRefreshToken,
} from '../utils/jwt.js';

const mockPayload = {
  id: 'user-123',
  email: 'test@example.com',
  role: 'ADMIN',
};

console.log('🔐 JWT Utility Test Start');

// Generate Tokens
const accessToken = generateAccessToken(mockPayload);
const refreshToken = generateRefreshToken(mockPayload);

console.log('✅ Access Token:', accessToken);
console.log('✅ Refresh Token:', refreshToken);

// Verify Tokens
const decodedAccess = verifyAccessToken(accessToken);
const decodedRefresh = verifyRefreshToken(refreshToken);

console.log('✅ Decoded Access Token:', decodedAccess);
console.log('✅ Decoded Refresh Token:', decodedRefresh);

// Test invalid token
const invalid = verifyAccessToken(accessToken + 'corrupt');
console.log('🚫 Invalid Token Test:', invalid === null ? 'Handled correctly' : 'Unexpected success');
