const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    const StatisticsPet = sequelize.define('statistics_pet', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        pet_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'pet',
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
        tableName: 'statistics_pets'
    });

    return StatisticsPet;
};