const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    const StatisticsCharacter = sequelize.define('statistics_character', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        character_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'character',
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
        tableName: 'statistics_characters'
    });

    return StatisticsCharacter;
};