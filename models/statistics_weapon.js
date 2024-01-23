const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    const StatisticsWeapon = sequelize.define('statistics_weapon', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        weapon_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'weapon',
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
        tableName: 'statistics_weapons'
    });

    return StatisticsWeapon;
};