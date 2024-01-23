const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    const Character = sequelize.define('character', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        nom: {
            type: DataTypes.STRING,
            allowNull: false
        },
        unlockable: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        }
    }, {
        timestamps: false,
        tableName: 'characters'
    });

    return Character;
};