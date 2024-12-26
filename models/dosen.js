module.exports = (sequelize, DataTypes) => {
    const Dosen = sequelize.define('Dosen', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        NIP: {
            type: DataTypes.STRING,
            unique: true
        },
        nama: {
            type: DataTypes.STRING
        },
        nohp: {
            type: DataTypes.STRING
        },
        foto: {
            type: DataTypes.STRING
        }
    }, {
        sequelize,
        modelName: 'Dosen',
        tableName: 'dosen',
        timestamps: false
    });

    return Dosen;
};