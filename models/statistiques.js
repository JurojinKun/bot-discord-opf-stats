const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    const Statistiques = sequelize.define('Statistique', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        personnage_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'personnages',
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
        tableName: 'statistiques'
    });

    return Statistiques;
};