const { ApplicationCommandOptionType } = require('discord-api-types/v9');
const { Accessory, StatisticsAccessory } = require('../models');
const capitalizeEachWord = require('../utils/utils');

module.exports = {
    name: 'delete-a',
    description: 'Supprime les stats d\'un accessoire par son nom',
    options: [{
        type: ApplicationCommandOptionType.String,
        name: 'accessoire',
        description: 'Le nom de l\'accessoire dont les stats doivent être supprimées',
        required: true,
    }],
    async execute(interaction) {
        const nomAccessory = capitalizeEachWord(interaction.options.getString('accessoire'));

        try {
            const accessory = await Accessory.findOne({ where: { nom: nomAccessory } });
            if (!accessory) {
                return await interaction.reply(`Je ne peux pas supprimer les stats d'un accessoire qui n'existe pas. ${nomAccessory} n'est pas dans ma base de données.`);
            }

            const statistique = await StatisticsAccessory.findOne({ where: { accessory_id: accessory.id } });
            if (!statistique) {
                return await interaction.reply(`Je ne peux pas supprimer les stats d'un accessoire qui n'a pas ses stats encore sauvegardées. ${nomAccessory} n'est pas dans ma base de données.`);
            }

            // Supprimer les statistiques associées à cet accessoire
            await StatisticsAccessory.destroy({ where: { accessory_id: accessory.id } });

            await interaction.reply(`Les stats de ${nomAccessory} ont été supprimées avec succès.`);
        } catch (e) {
            console.log(e);
            await interaction.reply({ content: 'Une erreur est survenue lors de la suppression des stats du accessory', ephemeral: true });
        }
    }
};