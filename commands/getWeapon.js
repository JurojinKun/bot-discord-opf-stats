const { ApplicationCommandOptionType } = require('discord-api-types/v9');
const { Weapon, StatisticsWeapon } = require('../models');
const capitalizeEachWord = require('../utils/utils');

module.exports = {
    name: 'get-w',
    description: 'Recherche les stats d\'une arme par son nom',
    options: [{
        type: ApplicationCommandOptionType.String,
        name: 'arme',
        description: "Le nom de l'arme à rechercher",
        required: true,
    }],
    async execute(interaction) {
        let nomWeapon = interaction.options.getString('arme');
        try {
            const weapon = await Weapon.findOne({
                where: { nom: nomWeapon },
                include: [{ model: StatisticsWeapon, as: 'statistics_weapon' }]
            });

            if (weapon && weapon.statistics_weapon && weapon.statistics_weapon.length > 0) {
                const stats = weapon.statistics_weapon[0].dataValues;
                await interaction.reply(`Arme: ${weapon.nom}\nVie: ${stats.vie}\nEndurance: ${stats.endurance}\nAttaque: ${stats.attaque}\nDéfense: ${stats.defense}\nVitesse: ${stats.vitesse}`);
            } else {
                nomWeapon = capitalizeEachWord(nomWeapon);
                await interaction.reply(`Je n'ai pas la science infuse, ${nomWeapon} n'a pas encore ses stats sauvegardées !`);
            }
        } catch (e) {
            console.log(e);
            await interaction.reply({ content: "Une erreur est survenue lors de la recherche de l'arme", ephemeral: true });
        }
    }
};