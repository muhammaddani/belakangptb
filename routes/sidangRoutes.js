const express = require('express');
const router = express.Router();
const sidangController = require('../controllers/sidangController');
const upload = require('../middleware/upload'); // Memasukkan middleware upload

router.get('/jadwal', sidangController.getJadwalSidang);

router.get('/requests', sidangController.getSidangRequests);

router.post('/:id/approve-reject', sidangController.approveOrRejectSidang);


module.exports = router;