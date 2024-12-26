module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('User', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        email: {
            type: DataTypes.STRING,
            unique: true
        },
        password: {
            type: DataTypes.STRING
        },
        nama: {
            type: DataTypes.STRING
        },
        NIP: {
            type: DataTypes.STRING
        },
        fotoprofil: {
            type: DataTypes.STRING
        }
    }, {
        sequelize,
        modelName: 'User',
        tableName: 'user',
        timestamps: false
    });

    return User;
};