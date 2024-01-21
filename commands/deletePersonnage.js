const { ApplicationCommandOptionType } = require('discord-api-types/v9');
const { Personnage, Statistiques } = require('../models');
const capitalizeEachWord = require('../utils/utils');

module.exports = {
    name: 'delete',
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
            const personnage = await Personnage.findOne({ where: { nom: nomPersonnage } });
            const statistique = await Statistiques.findOne({ where: { personnage_id: personnage.id } });
            if (!personnage || !statistique) {
                return await interaction.reply(`Je ne peux pas supprimer les stats d'un personnage qui n'existe pas. ${nomPersonnage} n'est pas dans ma base de données.`);
            }

            // Supprimer les statistiques associées à ce personnage
            await Statistiques.destroy({ where: { personnage_id: personnage.id } });

            await interaction.reply(`Les stats de ${nomPersonnage} ont été supprimées avec succès.`);
        } catch (e) {
            console.log(e);
            await interaction.reply({ content: 'Une erreur est survenue lors de la suppression des stats du personnage', ephemeral: true });
        }
    }
};