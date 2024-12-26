const express = require('express');
const router = express.Router();
const permintaanTaController = require('../controllers/permintaanTaController');
const upload = require('../middleware/upload');

router.get('/', permintaanTaController.getAllPermintaanTa);
router.post('/permintaanTa/:id/approveReject', upload.single('dokumen'), (req, res, next) => {
    console.log('File uploaded:', req.file);
    next();
}, permintaanTaController.approveOrRejectPermintaanTa);

module.exports = router;