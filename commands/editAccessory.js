const { ApplicationCommandOptionType } = require("discord.js");
const { Accessory, StatisticsAccessory } = require("../models");
const capitalizeEachWord = require("../utils/utils");

module.exports = {
  name: "edit-a",
  description: "Modifie les informations d'un accessoire",
  options: [
    {
      type: ApplicationCommandOptionType.String,
      name: "nom",
      description: "Le nom actuel de l'accessoire",
      required: true,
    },
    {
      type: ApplicationCommandOptionType.String,
      name: "nouveau_nom",
      description: "Le nouveau nom de l'accessoire",
      required: false,
    },
    {
      type: ApplicationCommandOptionType.Integer,
      name: "vie",
      description: "La nouvelle valeur de vie de l'accessoire",
      required: false,
    },
    {
      type: ApplicationCommandOptionType.Integer,
      name: "endurance",
      description: "La nouvelle valeur d'endurance de l'accessoire",
      required: false,
    },
    {
      type: ApplicationCommandOptionType.Integer,
      name: "attaque",
      description: "La nouvelle valeur d'attaque de l'accessoire",
      required: false,
    },
    {
      type: ApplicationCommandOptionType.Integer,
      name: "defense",
      description: "La nouvelle valeur de défense de l'accessoire",
      required: false,
    },
    {
      type: ApplicationCommandOptionType.Integer,
      name: "vitesse",
      description: "La nouvelle valeur de vitesse de l'accessoire",
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
      const accessory = await Accessory.findOne({ where: { nom: nom } });
      if (!accessory) {
        return interaction.reply(
          `Si tu veux éditer un accessoire, commence par avoir un QI plus élévé qu'Azmog. ${capitalizedName} n'est même pas encore sauvegardé.`
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
        accessory.nom = nouveauNom;
        await accessory.save();
        capitalizedName = capitalizeEachWord(nouveauNom);
      } else {
        // Rechercher les statistiques associées au accessory
        const statistique = await StatisticsAccessory.findOne({
          where: { accessory_id: accessory.id },
        });

        // Mettre à jour des statistiques pour le accessory
        if (!statistique) {
          return await interaction.reply(
            `Si tu veux éditer un accessoire, commence par avoir un QI plus élévé qu'Azmog. Les stats de ${capitalizedName} n'existe pas encore donc tu ne peux éditer que son nom.`
          );
        } else {
          if (nouveauNom != null) {
            accessory.nom = nouveauNom;
            await accessory.save();
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
        content:
          "Une erreur est survenue lors de la modification de l'accessoire",
        ephemeral: true,
      });
    }
  },
};
