const { ApplicationCommandOptionType } = require("discord.js");
const { Pet, StatisticsPet } = require("../models");
const capitalizeEachWord = require("../utils/utils");

module.exports = {
  name: "edit-f",
  description: "Modifie les informations d'un familier",
  options: [
    {
      type: ApplicationCommandOptionType.String,
      name: "nom",
      description: "Le nom actuel du familier",
      required: true,
    },
    {
      type: ApplicationCommandOptionType.String,
      name: "nouveau_nom",
      description: "Le nouveau nom du familier",
      required: false,
    },
    {
      type: ApplicationCommandOptionType.Integer,
      name: "vie",
      description: "La nouvelle valeur de vie du familier",
      required: false,
    },
    {
      type: ApplicationCommandOptionType.Integer,
      name: "endurance",
      description: "La nouvelle valeur d'endurance du familier",
      required: false,
    },
    {
      type: ApplicationCommandOptionType.Integer,
      name: "attaque",
      description: "La nouvelle valeur d'attaque du familier",
      required: false,
    },
    {
      type: ApplicationCommandOptionType.Integer,
      name: "defense",
      description: "La nouvelle valeur de défense du familier",
      required: false,
    },
    {
      type: ApplicationCommandOptionType.Integer,
      name: "vitesse",
      description: "La nouvelle valeur de vitesse du familier",
      required: false,
    },
  ],
  async execute(interaction) {
    const nom = interaction.options.getString("nom");
    const nouveauNom = interaction.options.getString("nouveau_nom");
    const vie = interaction.options.getInteger("vie");
    const endurance = interaction.options.getInteger("endurance");
    const attaque = interaction.options.getInteger("attaque");
    const defense = interaction.options.getInteger("defense");
    const vitesse = interaction.options.getInteger("vitesse");
    let capitalizedName = capitalizeEachWord(nom);

    try {
      const familier = await Pet.findOne({ where: { nom: nom } });
      if (!familier) {
        return interaction.reply(
          `Si tu veux éditer un familier, commence par avoir un QI plus élévé qu'Azmog. ${capitalizedName} n'est même pas encore sauvegardé.`
        );
      }

      if (
        nouveauNom == null &&
        vie === null &&
        endurance === null &&
        attaque === null &&
        defense === null &&
        vitesse === null
      ) {
        return interaction.reply(
          `Donc tu me demandes d'éditer mais tu ne modifies rien ? La prochaine fois je t'envoie la souris de charchar dans ta grosse tête !`
        );
      } else if (
        nouveauNom != null &&
        vie === null &&
        endurance === null &&
        attaque === null &&
        defense === null &&
        vitesse === null
      ) {
        familier.nom = nouveauNom;
        await familier.save();
        capitalizedName = capitalizeEachWord(nouveauNom);
      } else {
        // Rechercher les statistiques associées au familier
        const statistique = await StatisticsPet.findOne({
          where: { pet_id: familier.id },
        });

        // Mettre à jour des statistiques pour le familier
        if (!statistique) {
          return await interaction.reply(
            `Si tu veux éditer un familier, commence par avoir un QI plus élévé qu'Azmog. Les stats de ${capitalizedName} n'existe pas encore donc tu ne peux éditer que son nom.`
          );
        } else {
          if (nouveauNom != null) {
            familier.nom = nouveauNom;
            await familier.save();
            capitalizedName = capitalizeEachWord(nouveauNom);
          }
          if (vie !== null) statistique.vie = vie;
          if (endurance !== null) statistique.endurance = endurance;
          if (attaque !== null) statistique.attaque = attaque;
          if (defense !== null) statistique.defense = defense;
          if (vitesse !== null) statistique.vitesse = vitesse;
          await statistique.save();
        }
      }

      await interaction.reply(
        `Les informations de ${capitalizedName} ont été mises à jour avec succès !`
      );
    } catch (e) {
      console.log(e);
      await interaction.reply({
        content: "Une erreur est survenue lors de la modification du familier",
        ephemeral: true,
      });
    }
  },
};
