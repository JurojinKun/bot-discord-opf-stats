const { ApplicationCommandOptionType } = require('discord-api-types/v9');
const { Pet, StatisticsPet } = require('../models');
const capitalizeEachWord = require('../utils/utils');

module.exports = {
    name: 'get-f',
    description: 'Recherche les stats d\'un familier par son nom',
    options: [{
        type: ApplicationCommandOptionType.String,
        name: 'familier',
        description: 'Le nom du familier à rechercher',
        required: true,
    }],
    async execute(interaction) {
        let nomFamilier = interaction.options.getString('familier');
        try {
            const familier = await Pet.findOne({
                where: { nom: nomFamilier },
                include: [{ model: StatisticsPet, as: 'statistics_pet' }]
            });

            if (familier && familier.statistics_pet && familier.statistics_pet.length > 0) {
                const stats = familier.statistics_pet[0].dataValues;
                await interaction.reply(`Familier: ${familier.nom}\nVie: ${stats.vie}\nEndurance: ${stats.endurance}\nAttaque: ${stats.attaque}\nDéfense: ${stats.defense}\nVitesse: ${stats.vitesse}`);
            } else {
                nomFamilier = capitalizeEachWord(nomFamilier);
                await interaction.reply(`Je n'ai pas la science infuse, ${nomFamilier} n'a pas encore ses stats sauvegardées !`);
            }
        } catch (e) {
            console.log(e);
            await interaction.reply({ content: 'Une erreur est survenue lors de la recherche du familier', ephemeral: true });
        }
    }
};