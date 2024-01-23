const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    const StatisticsAccessory = sequelize.define('statistics_accessory', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        accessory_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'accessory',
                key: 'id'
            }
        },
        vie: DataTypes.INTEGER,
        endurance: DataTypes.INTEGER,
        attaque: DataTypes.INTEGER,
        defense: DataTypes.INTEGER,
        vitesse: DataTypes.INTEGER
    }, {
        timestamps: false,
        tableName: 'statistics_accessories'
    });

    return StatisticsAccessory;
};