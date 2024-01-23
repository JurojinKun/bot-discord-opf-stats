const { ApplicationCommandOptionType } = require('discord-api-types/v9');
const { Weapon, StatisticsWeapon } = require('../models');
const capitalizeEachWord = require('../utils/utils');

module.exports = {
    name: 'delete-w',
    description: "Supprime les stats d'une arme par son nom",
    options: [{
        type: ApplicationCommandOptionType.String,
        name: 'arme',
        description: "Le nom de l'arme dont les stats doivent être supprimées",
        required: true,
    }],
    async execute(interaction) {
        const nomWeapon = capitalizeEachWord(interaction.options.getString('arme'));

        try {
            const weapon = await Weapon.findOne({ where: { nom: nomWeapon } });
            if (!weapon) {
                return await interaction.reply(`Je ne peux pas supprimer les stats d'une arme qui n'existe pas. ${nomWeapon} n'est pas dans ma base de données.`);
            }

            const statistique = await StatisticsWeapon.findOne({ where: { weapon_id: weapon.id } });
            if (!statistique) {
                return await interaction.reply(`Je ne peux pas supprimer les stats d'une arme qui n'a pas ses stats encore sauvegardées. ${nomWeapon} n'est pas dans ma base de données.`);
            }

            // Supprimer les statistiques associées à cette arme
            await StatisticsWeapon.destroy({ where: { weapon_id: weapon.id } });

            await interaction.reply(`Les stats de ${nomWeapon} ont été supprimées avec succès.`);
        } catch (e) {
            console.log(e);
            await interaction.reply({ content: 'Une erreur est survenue lors de la suppression des stats du weapon', ephemeral: true });
        }
    }
};