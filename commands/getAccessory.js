const { ApplicationCommandOptionType } = require('discord-api-types/v9');
const { Accessory, StatisticsAccessory } = require('../models');
const capitalizeEachWord = require('../utils/utils');

module.exports = {
    name: 'get-a',
    description: 'Recherche les stats d\'un accessoire par son nom',
    options: [{
        type: ApplicationCommandOptionType.String,
        name: 'accessoire',
        description: "Le nom de l'accessoire à rechercher",
        required: true,
    }],
    async execute(interaction) {
        let nomAccessory = interaction.options.getString('accessoire');
        try {
            const accessory = await Accessory.findOne({
                where: { nom: nomAccessory },
                include: [{ model: StatisticsAccessory, as: 'statistics_accessory' }]
            });

            if (accessory && accessory.statistics_accessory && accessory.statistics_accessory.length > 0) {
                const stats = accessory.statistics_accessory[0].dataValues;
                await interaction.reply(`Accessoire: ${accessory.nom}\nVie: ${stats.vie}\nEndurance: ${stats.endurance}\nAttaque: ${stats.attaque}\nDéfense: ${stats.defense}\nVitesse: ${stats.vitesse}`);
            } else {
                nomAccessory = capitalizeEachWord(nomAccessory);
                await interaction.reply(`Je n'ai pas la science infuse, ${nomAccessory} n'a pas encore ses stats sauvegardées !`);
            }
        } catch (e) {
            console.log(e);
            await interaction.reply({ content: "Une erreur est survenue lors de la recherche de l'accessoire", ephemeral: true });
        }
    }
};