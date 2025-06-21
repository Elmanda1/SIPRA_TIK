// GET /api/v1/peminjaman
export async function getAllPeminjaman(req, res) {
  try {
    const { status, username } = req.query;
    const where = {};
    if (status) where.status = status;
    if (username) where.username = username;
    const pinjam = await prisma.peminjaman.findMany({ where });
    res.json({ data: pinjam });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

// GET /api/v1/peminjaman/:id
export async function getPeminjamanById(req, res) {
  try {
    const id = Number(req.params.id);
    if (isNaN(id)) return res.status(400).json({ error: 'Invalid ID' });
    const pinjam = await prisma.peminjaman.findUnique({ where: { id_peminjaman: id } });
    if (!pinjam) return res.status(404).json({ error: 'Peminjaman not found' });
    res.json({ data: pinjam });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

// POST /api/v1/peminjaman
export async function createPeminjaman(req, res) {
  try {
    const {
      tanggal_peminjaman,
      tanggal_pengembalian,
      keperluan,
      username,
      id_barang,
      kode_ruangan // dari frontend, tapi di schema namanya nama_ruangan!
    } = req.body;

    // Mapping field frontend ke schema prisma
    const data = {
      tanggal_peminjaman: new Date(tanggal_peminjaman),
      tanggal_pengembalian: new Date(tanggal_pengembalian),
      keperluan,
      username,
      id_barang: id_barang !== null ? Number(id_barang) : null,
      nama_ruangan: kode_ruangan || null // mapping dari kode_ruangan frontend ke nama_ruangan di schema
    };

    const pinjam = await prisma.peminjaman.create({ data });
    res.status(201).json({ data: pinjam });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

// PATCH /api/v1/peminjaman/:id/status
export async function updatePeminjamanStatus(req, res) {
  try {
    const id = Number(req.params.id);
    const { status } = req.body;
    const allowed = ['pending', 'diterima', 'ditolak', 'selesai', 'terlambat'];
    if (!allowed.includes(status))
      return res.status(400).json({ error: 'Invalid status' });
    const pinjam = await prisma.peminjaman.findUnique({ where: { id_peminjaman: id } });
    if (!pinjam) return res.status(404).json({ error: 'Peminjaman not found' });
    const updated = await prisma.peminjaman.update({
      where: { id_peminjaman: id },
      data: { status }
    });
    res.json({ data: updated });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

// Tambahkan endpoint pengembalian barang dengan penalty
export async function returnPeminjaman(req, res) {
  try {
    const id = Number(req.params.id);
    const pinjam = await prisma.peminjaman.findUnique({ where: { id_peminjaman: id } });
    if (!pinjam) return res.status(404).json({ error: 'Peminjaman not found' });

    const now = new Date();
    let penalty = 0;
    if (now > pinjam.tanggal_pengembalian) {
      const diff = Math.ceil((now - pinjam.tanggal_pengembalian) / (1000 * 60 * 60 * 24));
      penalty = diff * (process.env.PENALTY_PER_DAY || 10000);
    }

    const updated = await prisma.peminjaman.update({
      where: { id_peminjaman: id },
      data: { status: penalty > 0 ? 'terlambat' : 'selesai', catatan_pengembalian: req.body.catatan_pengembalian, penalty }
    });

    res.json({ data: updated, penalty });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}