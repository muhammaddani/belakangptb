const { users } = require('../models');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

exports.register = async (req, res) => {
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        const user = await users.create({
            email: req.body.email,
            password: hashedPassword,
            nama: req.body.nama,
            NIP: req.body.NIP,
            fotoprofil: req.body.fotoprofil
        });
        res.json(user);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

exports.login = async (req, res) => {
    try {
        const user = await users.findOne({ where: { email: req.body.email } });
        if (!user) return res.status(404).send("User not found.");
        if (!await bcrypt.compare(req.body.password, user.password)) return res.status(401).send("Incorrect password.");
        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '10h' });
        res.json({ token });
    } catch (error) {
        res.status(500).send(error.message);
    }
};

exports.protectedData = (req, res) => {
    res.send('This is protected data.');
  };  

// Tambahkan fungsi logout
exports.logout = (req, res) => {
    // Untuk JWT, kita tidak benar-benar perlu menghapus token dari backend
    // Namun, kita bisa memberitahu client untuk menghapus tokennya
    res.status(200).send('You have logged out successfully.');
};
