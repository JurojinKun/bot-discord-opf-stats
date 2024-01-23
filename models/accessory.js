const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    const Accessory = sequelize.define('accessory', {
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
        tableName: 'accessories'
    });

    return Accessory;
};