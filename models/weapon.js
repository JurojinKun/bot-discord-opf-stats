const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    const Weapon = sequelize.define('weapon', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        nom: {
            type: DataTypes.STRING,
            allowNull: false
        }
    }, {
        timestamps: false,
        tableName: 'weapons'
    });

    return Weapon;
};