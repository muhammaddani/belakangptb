const db = require('../models');

// Mendapatkan semua permintaan seminar
exports.getSeminarRequests = async (req, res) => {
    try {
        const seminarRequests = await db.permintaanSeminar.findAll({
            include: [{
                model: db.permintaanTa,
                include: [db.mahasiswa] // Menampilkan informasi mahasiswa yang terkait
            }]
        });
        res.json(seminarRequests);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

// Menjadwalkan seminar
exports.scheduleSeminar = async (req, res) => {
    const { id, waktu, tempat } = req.body; // Ambil ID, waktu, dan tempat dari body request
    try {
        const seminar = await db.permintaanSeminar.findByPk(id);
        if (!seminar) {
            return res.status(404).send('Seminar request not found.');
        }
        seminar.waktu = new Date(waktu);
        seminar.tempat = tempat;
        await seminar.save();
        res.send('Seminar scheduled successfully.');
    } catch (error) {
        res.status(500).send(error.message);
    }
};

// Menyetujui atau menolak permintaan seminar
exports.approveOrRejectSeminar = async (req, res) => {
    const { id, status } = req.body; // status bisa 'disetujui' atau 'ditolak'
    try {
        const seminar = await db.permintaanSeminar.findByPk(id);
        if (!seminar) {
            return res.status(404).send('Seminar request not found.');
        }
        seminar.status = status;
        await seminar.save();
        res.send(`Seminar request has been ${status}.`);
    } catch (error) {
        res.status(500).send(error.message);
    }
};