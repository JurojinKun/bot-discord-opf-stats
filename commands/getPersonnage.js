const { ApplicationCommandOptionType } = require('discord-api-types/v9');
const { Personnage, Statistiques } = require('../models');
const capitalizeEachWord = require('../utils/utils');

module.exports = {
    name: 'get',
    description: 'Recherche les stats d\'un personnage par son nom',
    options: [{
        type: ApplicationCommandOptionType.String,
        name: 'personnage',
        description: 'Le nom du personnage à rechercher',
        required: true,
    }],
    async execute(interaction) {
        let nomPersonnage = interaction.options.getString('personnage');
        try {
            const personnage = await Personnage.findOne({
                where: { nom: nomPersonnage },
                include: [{ model: Statistiques, as: 'statistiques' }]
            });

            if (personnage && personnage.statistiques && personnage.statistiques.length > 0) {
                const stats = personnage.statistiques[0].dataValues;
                await interaction.reply(`Personnage: ${personnage.nom}\nVie: ${stats.vie}\nEndurance: ${stats.endurance}\nAttaque: ${stats.attaque}\nDéfense: ${stats.defense}\nVitesse: ${stats.vitesse}`);
            } else {
                nomPersonnage = capitalizeEachWord(nomPersonnage);
                await interaction.reply(`Je n'ai pas la science infuse, ${nomPersonnage} n'a pas encore ses stats sauvegardées !`);
            }
        } catch (e) {
            console.log(e);
            await interaction.reply({ content: 'Une erreur est survenue lors de la recherche du personnage', ephemeral: true });
        }
    }
};