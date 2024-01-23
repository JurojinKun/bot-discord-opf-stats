const { Sequelize } = require('sequelize');
const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    dialect: 'mysql'
});

// Importation des modèles
const Character = require('./character')(sequelize);
const Weapon = require('./weapon')(sequelize);
const Accessory = require('./accessory')(sequelize);
const StatisticsCharacter = require('./statistics_character')(sequelize);
const StatisticsWeapon = require('./statistics_weapon')(sequelize);
const StatisticsAccessory = require('./statistics_accessory')(sequelize);

// Définition des relations
Character.hasMany(StatisticsCharacter, { foreignKey: 'character_id', as: 'statistics_character' });
StatisticsCharacter.belongsTo(Character, { foreignKey: 'character_id' });
Weapon.hasMany(StatisticsWeapon, { foreignKey: 'weapon_id', as: 'statistics_weapon' });
StatisticsWeapon.belongsTo(Weapon, { foreignKey: 'weapon_id' });
Accessory.hasMany(StatisticsAccessory, { foreignKey: 'accessory_id', as: 'statistics_accessory' });
StatisticsAccessory.belongsTo(Accessory, { foreignKey: 'accessory_id' });

(async () => {
    await sequelize.sync({ force: false });
    console.log("All models were synchronized successfully.");
})();

module.exports = {
    sequelize,
    Character,
    Weapon,
    Accessory,
    StatisticsCharacter,
    StatisticsWeapon,
    StatisticsAccessory
};