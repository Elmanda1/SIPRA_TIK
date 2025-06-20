import prisma from '../config/prisma.js';

// GET /api/v1/barang
export async function getAllBarang(req, res) {
  try {
    const { status, search } = req.query;
    const where = {};
    if (status) where.status = status;
    if (search) where.nama_barang = { contains: search, mode: 'insensitive' };
    const barang = await prisma.inven_barang.findMany({ where });
    res.json({ data: barang });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

// GET /api/v1/barang/:id
export async function getBarangById(req, res) {
  try {
    const id = Number(req.params.id);
    if (isNaN(id)) return res.status(400).json({ error: 'Invalid ID' });
    const barang = await prisma.inven_barang.findUnique({ where: { id_barang: id } });
    if (!barang) return res.status(404).json({ error: 'Barang not found' });
    res.json({ data: barang });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

// POST /api/v1/barang
export async function createBarang(req, res) {
  try {
    const { nama_barang, jml_barang, lokasi, kondisi, foto, status, keterangan, username } = req.body;
    if (!nama_barang || !jml_barang) return res.status(400).json({ error: 'nama_barang & jml_barang required' });
    const barang = await prisma.inven_barang.create({
      data: { nama_barang, jml_barang, lokasi, kondisi, foto, status, keterangan, username }
    });
    res.status(201).json({ data: barang });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

// PATCH /api/v1/barang/:id/status
export async function updateBarangStatus(req, res) {
  try {
    const id = Number(req.params.id);
    const { status } = req.body;
    if (!['tersedia', 'dipinjam', 'maintenance'].includes(status))
      return res.status(400).json({ error: 'Invalid status' });
    const barang = await prisma.inven_barang.update({
      where: { id_barang: id },
      data: { status }
    });
    res.json({ data: barang });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}