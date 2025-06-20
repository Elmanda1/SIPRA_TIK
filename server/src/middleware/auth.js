import { verifyAccessToken } from '../utils/jwt.js';

export function authenticateJWT(req, res, next) {
  const authHeader = req.headers.authorization || req.cookies?.accessToken;
  let token = null;

  if (authHeader && typeof authHeader === 'string' && authHeader.startsWith('Bearer ')) {
    token = authHeader.split(' ')[1];
  } else if (req.cookies?.accessToken) {
    token = req.cookies.accessToken;
  }

  if (!token) return res.status(401).json({ message: 'No token provided' });

  const decoded = verifyAccessToken(token);
  if (!decoded) return res.status(403).json({ message: 'Invalid or expired token' });

  req.user = decoded;
  next();
}

export function authorizeRole(...roles) {
  return (req, res, next) => {
    if (!req.user || !roles.includes(req.user.role)) {
      return res.status(403).json({ message: 'Forbidden: insufficient role' });
    }
    next();
  };
}