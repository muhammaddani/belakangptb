module.exports = (sequelize, DataTypes) => {
    const LogbookTa = sequelize.define('LogbookTa', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        ta_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        tanggal_bimbingan: {
            type: DataTypes.DATEONLY
        },
        keterangan: {
            type: DataTypes.TEXT
        },
        catatan: {
            type: DataTypes.TEXT
        }
    }, {
        sequelize,
        modelName: 'LogbookTa',
        tableName: 'logbook_ta',
        timestamps: false
    });

    return LogbookTa;
};