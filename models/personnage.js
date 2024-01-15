const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    dialect: 'mysql'
});

const Personnage = sequelize.define('Personnage', {
    nom: DataTypes.STRING,
    vie: DataTypes.INTEGER,
    endurance: DataTypes.INTEGER,
    attaque: DataTypes.INTEGER,
    defense: DataTypes.INTEGER,
    vitesse: DataTypes.INTEGER
}, {
    timestamps: false,
    tableName: 'personnages'
});

module.exports = Personnage;