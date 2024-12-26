const db = require('../models');

// Mendapatkan semua permintaan sidang yang disetujui
exports.getSidangRequests = async (req, res) => {
    try {
        const sidangWithDetails = await db.permintaanSidang.findAll({
            where: {
                waktu: null,
                tempat: null,
                dosen_penguji_id: null,
                status: null,
                keterangan: null
            },
            include: [{
                model: db.permintaanTa,
                include: [{
                    model: db.mahasiswa
                }, {
                    model: db.dosenPembimbing,
                    include: [{
                        model: db.dosen,
                        as: 'PembimbingSatu'  // Use the correct alias as defined in your associations
                    }, {
                        model: db.dosen,
                        as: 'PembimbingDua'  // Use the correct alias as defined in your associations
                    }]
                }]
            }, {
                model: db.dosenPenguji,
                include: [{
                    model: db.dosen,
                    as: 'PengujiSatu'  // Assuming an alias is set like this in your model associations
                }, {
                    model: db.dosen,
                    as: 'PengujiDua'  // Assuming you have this association
                }, {
                    model: db.dosen,
                    as: 'PengujiTiga'  // And this one if applicable
                }]
            }]
        });
        res.status(200).json(sidangWithDetails);
    } catch (error) {
        res.status(500).send('Error fetching sidang requests: ' + error.message);
    }
};


exports.getJadwalSidang = async (req, res) => {
    try {
        const jadwalSidang = await db.permintaanSidang.findAll({
            where: {
                status: 'disetujui'  // Memfilter hanya sidang yang berstatus disetujui
            },
            include: [
                {
                    model: db.permintaanTa, // Include permintaanTA
                    include: [
                        {
                            model: db.mahasiswa, // Include mahasiswa dari permintaanTA
                        },
                        {
                            model: db.dosenPembimbing, // Include dosen pembimbing dari permintaanTA
                            include: [
                                {
                                    model: db.dosen, // Include detail dosen sebagai pembimbing satu
                                    as: 'PembimbingSatu'
                                },
                                {
                                    model: db.dosen, // Include detail dosen sebagai pembimbing dua
                                    as: 'PembimbingDua'
                                }
                            ],
                        }
                    ]
                },
                {
                    model: db.dosenPenguji, // Include dosen penguji dari permintaanSidang
                    include: [
                        {
                            model: db.dosen, // Include detail dosen sebagai penguji satu
                            as: 'PengujiSatu'
                        },
                        {
                            model: db.dosen, // Include detail dosen sebagai penguji dua
                            as: 'PengujiDua'
                        },
                        {
                            model: db.dosen, // Include detail dosen sebagai penguji tiga
                            as: 'PengujiTiga'
                        }
                    ],
                }
            ]
        });

        res.status(200).json(jadwalSidang);
    } catch (error) {
        res.status(500).send('Terjadi kesalahan: ' + error.message);
    }
};

/// Menyetujui atau menolak permintaan sidang
exports.approveOrRejectSidang = async (req, res) => {
    const id = req.params.id;
    const { status, waktu, tempat, penguji_satu_id, penguji_dua_id, penguji_tiga_id, keterangan } = req.body;

    try {
        const sidang = await db.permintaanSidang.findByPk(id);
        if (!sidang) {
            return res.status(404).send('Sidang request not found.');
        }

        sidang.status = status;

        // Jika sidang disetujui, atur waktu, tempat, dosen penguji, dan dokumen
        if (status === 'disetujui') {
            sidang.waktu = new Date(waktu);
            sidang.tempat = tempat;
            sidang.keterangan = keterangan;

            const existingDosenPenguji = await db.dosenPenguji.findByPk(sidang.dosen_penguji_id);

            let isPengujiChanged = false;
            // Pastikan existingDosenPenguji tidak null sebelum membandingkan
            if (existingDosenPenguji) {
                isPengujiChanged = (
                    existingDosenPenguji.penguji_satu_id !== penguji_satu_id ||
                    existingDosenPenguji.penguji_dua_id !== penguji_dua_id ||
                    existingDosenPenguji.penguji_tiga_id !== penguji_tiga_id
                );
            } else {
                // Jika existingDosenPenguji null, langsung anggap ada perubahan
                isPengujiChanged = true;
            }

            if (isPengujiChanged) {
                // Hapus dosen penguji yang lama jika ada
                if (existingDosenPenguji) {
                    await db.dosenPenguji.destroy({ where: { id: existingDosenPenguji.id } });
                }

                // Membuat entri dosen penguji baru
                const dosenPenguji = await db.dosenPenguji.create({
                    penguji_satu_id,
                    penguji_dua_id,
                    penguji_tiga_id
                });

                // Menyimpan ID dosen penguji yang baru ke permintaan_sidang
                sidang.dosen_penguji_id = dosenPenguji.id;
            }
        }

        // Simpan perubahan terakhir
        await sidang.save();
        res.send(`Sidang request has been ${status}.`);
    } catch (error) {
        res.status(500).send('Error processing your request: ' + error.message);
    }
};

exports.permintaanSidang = async (req, res) => {
    try {
        const selesaiPermintaan = await db.PermintaanSidang.findAll({
            where: {
                status: 'selesai' // Asumsi status 'selesai' ada di tabel PermintaanSidang
            },
            attributes: ['id', 'permintaan_ta_id'], // Memastikan hanya mengambil id dan permintaan_ta_id
            include: [
                {
                    model: db.Mahasiswa, // Pastikan ini adalah nama model yang benar
                    as: 'mahasiswa', // Sesuaikan dengan nama alias di model jika ada
                    attributes: ['nama', 'NIM'] // Pilih atribut yang diinginkan
                },
                {
                    model: db.DosenPembimbing, // Pastikan ini adalah nama model yang benar untuk dosen pembimbing
                    as: 'dosenPembimbingDetail', // Alias harus sesuai dengan definisi di model
                    include: [
                        {
                            model: db.Dosen,
                            as: 'dosenPembimbing1', // Alias dosen pembimbing pertama
                            attributes: ['nama']
                        },
                        {
                            model: db.Dosen,
                            as: 'dosenPembimbing2', // Alias dosen pembimbing kedua
                            attributes: ['nama']
                        }
                    ]
                }
            ]
        });
        res.status(200).json(selesaiPermintaan);
    } catch (error) {
        res.status(500).send('Error fetching completed requests: ' + error.message);
    }
};

