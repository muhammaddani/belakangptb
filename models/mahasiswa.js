module.exports = (sequelize, DataTypes) => {
    const Mahasiswa = sequelize.define('Mahasiswa', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        NIM: {
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
        modelName: 'Mahasiswa',
        tableName: 'mahasiswa',
        timestamps: false
    });

    return Mahasiswa;
};