const { ApplicationCommandOptionType } = require('discord-api-types/v9');
const { Personnage, Statistiques } = require('../models');
const capitalizeEachWord = require('../utils/utils');

module.exports = {
    name: 'set',
    description: 'Enregistre un nouveau personnage avec ses stats',
    options: [{
        type: ApplicationCommandOptionType.String,
        name: 'stats',
        description: 'Stats du personnage sous forme nom/vie/endurance/attaque/defense/vitesse',
        required: true,
    }],
    async execute(interaction) {
        const stats = interaction.options.getString('stats').split('/')
            .map(element => element.trim());
        if (stats.length !== 6) {
            return await interaction.reply("Allume ton cerveau, je t'ai dit le format de saisie. Utilise exactement ça: nom/vie/endurance/attaque/defense/vitesse");
        }

        let [nom, vie, endurance, attaque, defense, vitesse] = stats;
        nom = capitalizeEachWord(nom);

        try {
            // Vérifier si le personnage existe déjà
            let personnage = await Personnage.findOne({ where: { nom: nom } });
            if (!personnage) {
                // Si le personnage n'existe pas
                return await interaction.reply(`${nom} n'existe même pas dans le jeu pour le moment mais bien essayé toxic boy !`);
            }

            // Vérifier si des statistiques existent déjà pour ce personnage
            const statsExistantes = await Statistiques.findOne({ where: { personnage_id: personnage.id } });
            if (statsExistantes) {
                return await interaction.reply(`${nom} existe déjà dans la base de données. Tu dors au fond de la classe à côté du radiateur ?`);
            }

            // Créer une nouvelle entrée de statistiques pour ce personnage
            await Statistiques.create({
                personnage_id: personnage.id,
                vie: parseInt(vie),
                endurance: parseInt(endurance),
                attaque: parseInt(attaque),
                defense: parseInt(defense),
                vitesse: parseInt(vitesse)
            });

            await interaction.reply(`${nom} sauvegardé(e) avec succès !`);
        } catch (error) {
            console.error(error);
            await interaction.reply('Il y a eu une erreur lors de la création du personnage.');
        }
    }
};