const express = require('express');
const router = express.Router();
const seminarController = require('../controllers/seminarController');

router.get('/requests', seminarController.getSeminarRequests); // Route untuk mendapatkan semua permintaan seminar
router.post('/schedule', seminarController.scheduleSeminar); // Route untuk menjadwalkan seminar
router.post('/approve-reject', seminarController.approveOrRejectSeminar); // Route untuk menyetujui atau menolak permintaan seminar

module.exports = router;