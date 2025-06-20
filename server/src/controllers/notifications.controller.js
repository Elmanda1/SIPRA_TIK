import prisma from '../config/prisma.js';

// GET /api/v1/notifications
export async function getNotifications(req, res) {
  try {
    const notifications = await prisma.notification.findMany({ where: { userId: req.user.username } });
    res.json({ data: notifications });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

// POST /api/v1/notifications/:id/read
export async function markAsRead(req, res) {
  try {
    const id = Number(req.params.id);
    await prisma.notification.update({ where: { id }, data: { read: true } });
    res.json({ message: 'Marked as read' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}