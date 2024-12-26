module.exports = (sequelize, DataTypes) => {
    const DosenPenguji = sequelize.define('DosenPenguji', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        penguji_satu_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        penguji_dua_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        penguji_tiga_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    }, {
        sequelize,
        modelName: 'DosenPenguji',
        tableName: 'dosen_penguji',
        timestamps: false
    });

    return DosenPenguji;
};