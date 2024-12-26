const db = require('../models');
const bcrypt = require('bcryptjs');

exports.getUserProfile = async (req, res) => {
    try {
        const user = await db.users.findByPk(req.userId);
        if (!user) {
            return res.status(404).send('User not found.');
        }
        res.json({
            id: user.id,
            email: user.email,
            nama: user.nama,
            NIP: user.NIP,
            fotoprofil: user.fotoprofil
        });
    } catch (error) {
        res.status(500).send(error.message);
    }
};

exports.editProfile = async (req, res) => {
    const { email, nama, NIP, fotoprofil } = req.body;
    try {
        const user = await db.users.findByPk(req.userId);
        if (!user) {
            return res.status(404).send('User not found.');
        }

        // Cek apakah email baru sudah digunakan oleh pengguna lain
        if (email !== user.email) {
            const existingUser = await db.users.findOne({ where: { email: email } });
            if (existingUser) {
                return res.status(409).send('Email already in use.');
            }
            user.email = email;
        }

        user.nama = nama;
        user.NIP = NIP;
        user.fotoprofil = fotoprofil;
        await user.save();

        res.send('Profile updated successfully.');
    } catch (error) {
        res.status(500).send(error.message);
    }
};

exports.changePassword = async (req, res) => {
    const { oldPassword, newPassword } = req.body;
    try {
        const user = await db.users.findByPk(req.userId);
        if (!user) {
            return res.status(404).send('User not found.');
        }
        const isMatch = await bcrypt.compare(oldPassword, user.password);
        if (!isMatch) {
            return res.status(401).send('Old password does not match.');
        }
        user.password = await bcrypt.hash(newPassword, 10);
        await user.save();
        res.send('Password changed successfully.');
    } catch (error) {
        res.status(500).send(error.message);
    }
};