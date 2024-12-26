module.exports = (sequelize, DataTypes) => {
    const PermintaanSeminar = sequelize.define('PermintaanSeminar', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        ta_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        waktu: {
            type: DataTypes.DATE
        },
        tempat: {
            type: DataTypes.STRING
        },
        dosen_penguji_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        status: {
            type: DataTypes.ENUM,
            values: ['disetujui', 'ditolak', 'selessai', 'gagal']
        }
    }, {
        sequelize,
        modelName: 'PermintaanSeminar',
        tableName: 'permintaan_seminar',
        timestamps: false
    });

    return PermintaanSeminar;
};