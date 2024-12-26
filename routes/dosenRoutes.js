const express = require('express');
const router = express.Router();
const db = require('../models'); // Sesuaikan path sesuai dengan struktur direktori Anda

// Mendapatkan semua dosen
router.get('/dosen', async (req, res) => {
    try {
        const dosen = await db.dosen.findAll();
        res.json(dosen);
    } catch (error) {
        res.status(500).send({ message: "Error retrieving dosen: " + error.message });
    }
});

module.exports = router;

