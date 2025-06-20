import prisma from '../config/prisma.js';

export async function auditLog(req, res, next) {
  try {
    if (req.user) {
      await prisma.auditLog.create({
        data: {
          userId: req.user.username,
          action: req.method + ' ' + req.originalUrl,
          timestamp: new Date(),
          details: JSON.stringify(req.body)
        }
      });
    }
  } catch (e) {
    // Log error but don't block request
    console.error('Audit log error:', e.message);
  }
  next();
}