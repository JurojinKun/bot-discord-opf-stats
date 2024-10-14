const { ApplicationCommandOptionType } = require("discord.js");
const { Weapon, StatisticsWeapon } = require("../models");
const capitalizeEachWord = require("../utils/utils");

module.exports = {
  name: "edit-w",
  description: "Modifie les informations d'une arme",
  options: [
    {
      type: ApplicationCommandOptionType.String,
      name: "nom",
      description: "Le nom actuel de l'arme",
      required: true,
    },
    {
      type: ApplicationCommandOptionType.String,
      name: "nouveau_nom",
      description: "Le nouveau nom de l'arme",
      required: false,
    },
    {
      type: ApplicationCommandOptionType.Integer,
      name: "vie",
      description: "La nouvelle valeur de vie de l'arme",
      required: false,
    },
    {
      type: ApplicationCommandOptionType.Integer,
      name: "endurance",
      description: "La nouvelle valeur d'endurance de l'arme",
      required: false,
    },
    {
      type: ApplicationCommandOptionType.Integer,
      name: "attaque",
      description: "La nouvelle valeur d'attaque de l'arme",
      required: false,
    },
    {
      type: ApplicationCommandOptionType.Integer,
      name: "defense",
      description: "La nouvelle valeur de défense de l'arme",
      required: false,
    },
    {
      type: ApplicationCommandOptionType.Integer,
      name: "vitesse",
      description: "La nouvelle valeur de vitesse de l'arme",
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
      const weapon = await Weapon.findOne({ where: { nom: nom } });
      if (!weapon) {
        return interaction.reply(
          `Si tu veux éditer une arme, commence par avoir un QI plus élévé qu'Azmog. ${capitalizedName} n'est même pas encore sauvegardé.`
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
        weapon.nom = nouveauNom;
        await weapon.save();
        capitalizedName = capitalizeEachWord(nouveauNom);
      } else {
        // Rechercher les statistiques associées à l'arme
        const statistique = await StatisticsWeapon.findOne({
          where: { weapon_id: weapon.id },
        });

        // Mettre à jour des statistiques pour l'arme
        if (!statistique) {
          return await interaction.reply(
            `Si tu veux éditer une arme, commence par avoir un QI plus élévé qu'Azmog. Les stats de ${capitalizedName} n'existe pas encore donc tu ne peux éditer que son nom.`
          );
        } else {
          if (nouveauNom != null) {
            weapon.nom = nouveauNom;
            await weapon.save();
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
        content: "Une erreur est survenue lors de la modification de l'arme",
        ephemeral: true,
      });
    }
  },
};
