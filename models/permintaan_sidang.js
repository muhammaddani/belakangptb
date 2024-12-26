module.exports = (sequelize, DataTypes) => {
    const PermintaanSidang = sequelize.define('PermintaanSidang', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        permintaan_ta_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        waktu: {
            type: DataTypes.DATE,
            allowNull: true
        },
        tempat: {
            type: DataTypes.STRING,
            allowNull: true
        },
        dosen_penguji_id: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        status: {
            type: DataTypes.ENUM,
            values: ['disetujui', 'ditolak', 'selessai', 'gagal'],
            allowNull: true
        },
        keterangan: {
            type: DataTypes.STRING,
            allowNull: true
        }
    }, {
        sequelize,
        modelName: 'PermintaanSidang',
        tableName: 'permintaan_sidang',
        timestamps: false
    });

    return PermintaanSidang;
};