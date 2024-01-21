const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    const Personnage = sequelize.define('Personnage', {
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
        tableName: 'personnages'
    });

    return Personnage;
};