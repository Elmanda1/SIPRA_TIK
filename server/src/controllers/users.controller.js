import prisma from '../config/prisma.js';
import bcrypt from 'bcrypt';

// GET /api/v1/users
export async function getAllUsers(req, res) {
  try {
    const users = await prisma.user.findMany();
    res.json({ data: users });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

// POST /api/v1/users
export async function createUser(req, res) {
  try {
    const { username, password, role } = req.body;
    if (!username || !password || !role) return res.status(400).json({ error: 'username, password, role required' });
    const exists = await prisma.user.findUnique({ where: { username } });
    if (exists) return res.status(409).json({ error: 'Username already exists' });
    const hash = await bcrypt.hash(password, 12);
    const user = await prisma.user.create({
      data: { username, password: hash, role }
    });
    res.status(201).json({ data: user });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

// PUT /api/v1/users/:username
export async function updateUser(req, res) {
  try {
    const { username } = req.params;
    const { password, role } = req.body;
    const data = {};
    if (password) data.password = await bcrypt.hash(password, 12);
    if (role) data.role = role;
    const user = await prisma.user.update({
      where: { username },
      data
    });
    res.json({ data: user });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

// DELETE /api/v1/users/:username
export async function deleteUser(req, res) {
  try {
    const { username } = req.params;
    await prisma.user.delete({ where: { username } });
    res.json({ message: 'User deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}