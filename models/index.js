const { Sequelize } = require('sequelize');
const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    dialect: 'mysql'
});

// Importation des modèles
const Personnage = require('./personnage')(sequelize);
const Statistiques = require('./statistiques')(sequelize);

// Définition des relations
Personnage.hasMany(Statistiques, { foreignKey: 'personnage_id', as: 'statistiques' });
Statistiques.belongsTo(Personnage, { foreignKey: 'personnage_id' });

module.exports = {
    sequelize,
    Personnage,
    Statistiques
};