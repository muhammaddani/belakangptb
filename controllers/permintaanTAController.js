const db = require('../models');

// Mendapatkan semua permintaan Tugas Akhir
exports.getAllPermintaanTa = async (req, res) => {
    try {
        const permintaanTa = await db.permintaanTa.findAll({
            include: [db.mahasiswa, db.dosen] // Asosiasi ke mahasiswa dan dosen pembimbing
        });
        res.json(permintaanTa);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

// Menyetujui atau Menolak Permintaan Tugas Akhir
exports.approveOrRejectPermintaanTa = async (req, res) => {
    const { id, status, dosen_pembimbing_id } = req.body;
    try {
        const permintaanTa = await db.permintaanTa.findByPk(id);
        if (!permintaanTa) {
            return res.status(404).send('Permintaan Tugas Akhir not found.');
        }
        if (status === 'disetujui') {
            permintaanTa.dosen_pembimbing_id = dosen_pembimbing_id;  // Set dosen pembimbing
            if (req.file) {
                permintaanTa.dokumen = req.file.path;  // Simpan path file jika diunggah
            }
        }
        permintaanTa.status = status;
        await permintaanTa.save();
        res.send(`Permintaan Tugas Akhir has been ${status}.`);
    } catch (error) {
        res.status(500).send(error.message);
    }
};