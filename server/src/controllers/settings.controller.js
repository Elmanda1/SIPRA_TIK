import prisma from '../config/prisma.js';

// GET /api/v1/settings
export async function getSettings(req, res) {
  try {
    const settings = await prisma.settings.findUnique({ where: { userId: req.user.username } });
    res.json({ data: settings });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

// PUT /api/v1/settings
export async function updateSettings(req, res) {
  try {
    const settings = await prisma.settings.upsert({
      where: { userId: req.user.username },
      update: req.body,
      create: { userId: req.user.username, ...req.body }
    });
    res.json({ data: settings });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}