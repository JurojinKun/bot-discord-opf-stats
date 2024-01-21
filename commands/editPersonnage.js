const { ApplicationCommandOptionType } = require('discord.js');
const { Personnage, Statistiques } = require('../models');
const capitalizeEachWord = require('../utils/utils');

module.exports = {
    name: 'edit',
    description: 'Modifie les informations d\'un personnage',
    options: [
        {
            type: ApplicationCommandOptionType.String,
            name: 'personnage',
            description: 'Le nom actuel du personnage',
            required: true
        },
        {
            type: ApplicationCommandOptionType.Integer,
            name: 'vie',
            description: 'La nouvelle valeur de vie du personnage',
            required: false
        },
        {
            type: ApplicationCommandOptionType.Integer,
            name: 'endurance',
            description: 'La nouvelle valeur d\'endurance du personnage',
            required: false
        },
        {
            type: ApplicationCommandOptionType.Integer,
            name: 'attaque',
            description: 'La nouvelle valeur d\'attaque du personnage',
            required: false
        },
        {
            type: ApplicationCommandOptionType.Integer,
            name: 'defense',
            description: 'La nouvelle valeur de défense du personnage',
            required: false
        },
        {
            type: ApplicationCommandOptionType.Integer,
            name: 'vitesse',
            description: 'La nouvelle valeur de vitesse du personnage',
            required: false
        }
    ],
    async execute(interaction) {
        const nom = interaction.options.getString('personnage');
        const vie = interaction.options.getInteger('vie');
        const endurance = interaction.options.getInteger('endurance');
        const attaque = interaction.options.getInteger('attaque');
        const defense = interaction.options.getInteger('defense');
        const vitesse = interaction.options.getInteger('vitesse');
        const capitalizedName = capitalizeEachWord(nom);

        try {
            const personnage = await Personnage.findOne({ where: { nom: nom } });
            if (!personnage) {
                return interaction.reply(`Si tu veux éditer un personnage, commence par avoir un QI plus élévé qu'Azmog. ${capitalizedName} n'est même pas encore sur le jeu.`);
            }

            if (vie === null && endurance === null && attaque === null && defense === null && vitesse === null) {
                return interaction.reply(`Donc tu me demandes d'éditer mais tu ne modifies rien ? La prochaine fois je t'envoie la souris de charchar dans ta grosse tête !`);
            }

            // Rechercher les statistiques associées au personnage
            const statistique = await Statistiques.findOne({ where: { personnage_id: personnage.id } });

            // Mettre à jour des statistiques pour le personnage
            if (!statistique) {
                return await interaction.reply(`Si tu veux éditer un personnage, commence par avoir un QI plus élévé qu'Azmog. Les stats de ${capitalizedName} n'existe pas encore donc tu ne peux pas l'éditer.`);
            } else {
                if (vie !== null) statistique.vie = vie;
                if (endurance !== null) statistique.endurance = endurance;
                if (attaque !== null) statistique.attaque = attaque;
                if (defense !== null) statistique.defense = defense;
                if (vitesse !== null) statistique.vitesse = vitesse;
                await statistique.save();
            }

            await interaction.reply(`Les informations de ${capitalizedName} ont été mises à jour avec succès !`);
        } catch (e) {
            console.log(e);
            await interaction.reply({ content: 'Une erreur est survenue lors de la modification du personnage', ephemeral: true });
        }
    }
};