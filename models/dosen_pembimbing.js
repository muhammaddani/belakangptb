module.exports = (sequelize, DataTypes) => {
    const DosenPembimbing = sequelize.define('DosenPembimbing', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        pembimbing_satu_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        pembimbing_dua_id: {
            type: DataTypes.INTEGER,
            allowNull: true
        }
    }, {
        sequelize,
        modelName: 'DosenPembimbing',
        tableName: 'dosen_pembimbing',
        timestamps: false
    });

    return DosenPembimbing;
};