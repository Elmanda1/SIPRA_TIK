import prisma from '../config/prisma.js';

// GET /api/v1/ruangan
export async function getAllRuangan(req, res) {
  try {
    const { status, search } = req.query;
    const where = {};
    if (status) where.status = status;
    if (search) where.nama_ruangan = { contains: search, mode: 'insensitive' };
    const ruangan = await prisma.inven_ruangan.findMany({ where });
    res.json({ data: ruangan });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

// GET /api/v1/ruangan/:id
export async function getRuanganById(req, res) {
  try {
    const id = req.params.id;
    const ruangan = await prisma.inven_ruangan.findUnique({ where: { kode_ruangan: id } });
    if (!ruangan) return res.status(404).json({ error: 'Ruangan not found' });
    res.json({ data: ruangan });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

// POST /api/v1/ruangan
export async function createRuangan(req, res) {
  try {
    const { kode_ruangan, nama_ruangan, kapasitas, fasilitas, foto, status, keterangan, username } = req.body;
    if (!kode_ruangan || !nama_ruangan) return res.status(400).json({ error: 'kode_ruangan & nama_ruangan required' });
    const ruangan = await prisma.inven_ruangan.create({
      data: { kode_ruangan, nama_ruangan, kapasitas, fasilitas, foto, status, keterangan, username }
    });
    res.status(201).json({ data: ruangan });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

// PATCH /api/v1/ruangan/:id/status
export async function updateRuanganStatus(req, res) {
  try {
    const id = req.params.id;
    const { status } = req.body;
    if (!['tersedia', 'dipinjam', 'maintenance'].includes(status))
      return res.status(400).json({ error: 'Invalid status' });
    const ruangan = await prisma.inven_ruangan.update({
      where: { kode_ruangan: id },
      data: { status }
    });
    res.json({ data: ruangan });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}