const { ApplicationCommandOptionType } = require('discord.js');
const Personnage = require('../models/personnage');
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
            type: ApplicationCommandOptionType.String,
            name: 'nouveaunom',
            description: 'Le nouveau nom du personnage',
            required: false
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
        const nouveauNom = interaction.options.getString('nouveaunom');
        const vie = interaction.options.getInteger('vie');
        const endurance = interaction.options.getInteger('endurance');
        const attaque = interaction.options.getInteger('attaque');
        const defense = interaction.options.getInteger('defense');
        const vitesse = interaction.options.getInteger('vitesse');
        const capitalizedName = capitalizeEachWord(nom);

        try {
            const personnage = await Personnage.findOne({ where: { nom: nom } });
            if (!personnage) {
                return interaction.reply(`Si tu veux éditer un personnage, commence par avoir un QI plus élévé qu'Azmog. ${capitalizedName} n'existe pas encore donc tu ne peux pas l'éditer.`);
            }

            if (!nouveauNom && vie === null && endurance === null && attaque === null && defense === null && vitesse === null) {
                return interaction.reply(`Donc tu me demandes d'éditer mais tu ne modifies rien ? La prochaine fois je t'envoie la souris de charchar dans ta grosse tête !`);
            }

            // Mettre à jour le personnage
            if (nouveauNom) personnage.nom = capitalizeEachWord(nouveauNom);
            if (vie !== null) personnage.vie = vie;
            if (endurance !== null) personnage.endurance = endurance;
            if (attaque !== null) personnage.attaque = attaque;
            if (defense !== null) personnage.defense = defense;
            if (vitesse !== null) personnage.vitesse = vitesse;

            await personnage.save();

            if (nouveauNom) {
                await interaction.reply(`${capitalizeEachWord(nouveauNom)} a été mis à jour avec succès !`);
            } else {
                await interaction.reply(`${capitalizedName} a été mis à jour avec succès !`);
            }
        } catch (e) {
            console.log(e);
            await interaction.reply({ content: 'Une erreur est survenue lors de la modification du personnage', ephemeral: true });
        }
    }
};