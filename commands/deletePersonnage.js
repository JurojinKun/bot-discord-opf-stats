const { ApplicationCommandOptionType } = require('discord-api-types/v9');
const Personnage = require('../models/personnage');
const capitalizeEachWord = require('../utils/utils');

module.exports = {
    name: 'delete',
    description: 'Supprime un personnage et ses stats par son nom',
    options: [{
        type: ApplicationCommandOptionType.String,
        name: 'personnage',
        description: 'Le nom du personnage à supprimer',
        required: true,
    }],
    async execute(interaction) {
        let nomPersonnage = interaction.options.getString('personnage');

        try {
            const personnage = await Personnage.findOne({ where: { nom: nomPersonnage } });
            if (personnage) {
                await Personnage.destroy({ where: { nom: nomPersonnage } });
                nomPersonnage = capitalizeEachWord(nomPersonnage);
                await interaction.reply(`${nomPersonnage} supprimé(e) avec succès !`);
            } else {
                nomPersonnage = capitalizeEachWord(nomPersonnage);
                await interaction.reply(`Jeune baltrou, tu essayes de supprimer quelque chose qui n'existe pas ? Je ne connais pas encore ce ${nomPersonnage} !`);
            }
        } catch (e) {
            console.log(e);
            await interaction.reply({ content: 'Une erreur est survenue lors de la suppression du personnage', ephemeral: true });
        }
    }
};