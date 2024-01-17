const { ApplicationCommandOptionType } = require('discord-api-types/v9');
const Personnage = require('../models/personnage');
const capitalizeEachWord = require('../utils/utils');

module.exports = {
    name: 'get', // Le nom de la commande slash
    description: 'Recherche les stats d\'un personnage par son nom',
    options: [{
        type: ApplicationCommandOptionType.String,
        name: 'personnage',
        description: 'Le nom du personnage à rechercher',
        required: true,
    }],
    async execute(interaction) {
        let nomPersonnage = interaction.options.getString('personnage');
        const personnage = await Personnage.findOne({ where: { nom: nomPersonnage } });

        if (personnage) {
            await interaction.reply(`Personnage: ${personnage.nom}\nVie: ${personnage.vie}\nEndurance: ${personnage.endurance}\nAttaque: ${personnage.attaque}\nDéfense: ${personnage.defense}\nVitesse: ${personnage.vitesse}`);
        } else {
            nomPersonnage = capitalizeEachWord(nomPersonnage);
            await interaction.reply(`Je n'ai pas la science infuse, je ne connais pas encore ce ${nomPersonnage} !`);
        }
    }
};