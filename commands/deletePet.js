const { ApplicationCommandOptionType } = require('discord-api-types/v9');
const { Pet, StatisticsPet } = require('../models');
const capitalizeEachWord = require('../utils/utils');

module.exports = {
    name: 'delete-f',
    description: 'Supprime les stats d\'un familier par son nom',
    options: [{
        type: ApplicationCommandOptionType.String,
        name: 'familier',
        description: 'Le nom du familier dont les stats doivent être supprimées',
        required: true,
    }],
    async execute(interaction) {
        const nomFamilier = capitalizeEachWord(interaction.options.getString('familier'));

        try {
            const familier = await Pet.findOne({ where: { nom: nomFamilier } });
            if (!familier) {
                return await interaction.reply(`Je ne peux pas supprimer les stats d'un familier qui n'existe pas. ${nomFamilier} n'est pas dans ma base de données.`);
            }

            const statistique = await StatisticsPet.findOne({ where: { pet_id: familier.id } });
            if (!statistique) {
                return await interaction.reply(`Je ne peux pas supprimer les stats d'un familier qui n'a pas ses stats encore sauvegardées. ${nomFamilier} n'est pas dans ma base de données.`);
            }

            // Supprimer les statistiques associées à ce familier
            await StatisticsPet.destroy({ where: { pet_id: familier.id } });

            await interaction.reply(`Les stats de ${nomFamilier} ont été supprimées avec succès.`);
        } catch (e) {
            console.log(e);
            await interaction.reply({ content: 'Une erreur est survenue lors de la suppression des stats du familier', ephemeral: true });
        }
    }
};