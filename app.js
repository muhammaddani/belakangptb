const fs = require('fs');
const path = require('path');

// Path ke folder uploads
const uploadDir = path.join(__dirname, 'uploads');

// Mengecek apakah folder 'uploads' ada
if (!fs.existsSync(uploadDir)) {
    // Jika tidak ada, buat folder uploads
    fs.mkdirSync(uploadDir);
}

const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');
require('dotenv').config();

const app = express();
const userRoutes = require('./routes/user');
const permintaanTaRoutes = require('./routes/permintaanTaRoutes');
const seminarRoutes = require('./routes/seminarRoutes');
const sidangRoutes = require('./routes/sidangRoutes');
const dosenRoutes = require('./routes/dosenRoutes');

const port = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes dengan prefix '/api'
app.use('/api/users', userRoutes);
app.use('/api/permintaan-ta', permintaanTaRoutes);
app.use('/api/seminar', seminarRoutes);
app.use('/api/sidang', sidangRoutes);
app.use('/api/dosen', dosenRoutes);  // Asumsikan ini adalah yang benar untuk dosenRoutes


app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});