module.exports = (sequelize, DataTypes) => {
    const PermintaanTa = sequelize.define('PermintaanTa', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        mahasiswa_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        judul: {
            type: DataTypes.STRING
        },
        deskripsi_singkat: {
            type: DataTypes.TEXT
        },
        status: {
            type: DataTypes.ENUM,
            values: ['disetujui', 'ditolak']
        },
        keterangan: {
            type: DataTypes.TEXT
        },
        dosen_pembimbing_id: {
            type: DataTypes.INTEGER,
            allowNull: true // Bisa null sampai dosen pembimbing ditentukan
        },
        dokumen: {
            type: DataTypes.STRING,
            allowNull: true
        }
    }, {
        sequelize,
        modelName: 'PermintaanTa',
        tableName: 'permintaan_ta',
        timestamps: false
    });

    return PermintaanTa;
};