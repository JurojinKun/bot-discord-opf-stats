const { ApplicationCommandOptionType } = require('discord-api-types/v9');
const { Character, StatisticsCharacter } = require('../models');
const capitalizeEachWord = require('../utils/utils');

module.exports = {
    name: 'delete-p',
    description: 'Supprime les stats d\'un personnage par son nom',
    options: [{
        type: ApplicationCommandOptionType.String,
        name: 'personnage',
        description: 'Le nom du personnage dont les stats doivent être supprimées',
        required: true,
    }],
    async execute(interaction) {
        const nomPersonnage = capitalizeEachWord(interaction.options.getString('personnage'));

        try {
            const personnage = await Character.findOne({ where: { nom: nomPersonnage } });
            if (!personnage) {
                return await interaction.reply(`Je ne peux pas supprimer les stats d'un personnage qui n'existe pas. ${nomPersonnage} n'est pas dans ma base de données.`);
            }

            const statistique = await StatisticsCharacter.findOne({ where: { character_id: personnage.id } });
            if (!statistique) {
                return await interaction.reply(`Je ne peux pas supprimer les stats d'un personnage qui n'a pas ses stats encore sauvegardées. ${nomPersonnage} n'est pas dans ma base de données.`);
            }

            // Supprimer les statistiques associées à ce personnage
            await StatisticsCharacter.destroy({ where: { character_id: personnage.id } });

            await interaction.reply(`Les stats de ${nomPersonnage} ont été supprimées avec succès.`);
        } catch (e) {
            console.log(e);
            await interaction.reply({ content: 'Une erreur est survenue lors de la suppression des stats du personnage', ephemeral: true });
        }
    }
};