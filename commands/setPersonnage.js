const { ApplicationCommandOptionType } = require('discord-api-types/v9');
const Personnage = require('../models/personnage');
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
        console.log(stats);
        if (stats.length !== 6) {
            return await interaction.reply("Allume ton cerveau, je t'ai dit le format de saisie. Utilise exactement ça: nom/vie/endurance/attaque/defense/vitesse");
        }

        let [nom, vie, endurance, attaque, defense, vitesse] = stats;
        nom = capitalizeEachWord(nom);

        // Vérifier si le personnage existe déjà
        const personnageExistant = await Personnage.findOne({ where: { nom: nom } });
        if (personnageExistant) {
            return await interaction.reply(`${nom} existe déjà dans la base de données. Tu dors au fond de la classe à côté du radiateur ?`);
        }

        try {
            await Personnage.create({
                nom,
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