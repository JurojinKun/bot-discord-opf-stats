const { ApplicationCommandOptionType } = require("discord-api-types/v9");
const {
  Character,
  StatisticsCharacter,
  Pet,
  StatisticsPet,
  Weapon,
  StatisticsWeapon,
  Accessory,
  StatisticsAccessory,
} = require("../models");
const { capitalizeEachWord } = require("../utils/utils");
const { findType } = require("../utils/utils");

module.exports = {
  name: "edit",
  description:
    "Modifie les informations personnage, familier, accessoire ou arme",
  options: [
    {
      type: ApplicationCommandOptionType.String,
      name: "type",
      description: "Type à supprimer",
      required: true,
    },
    {
      type: ApplicationCommandOptionType.String,
      name: "nom",
      description: "Le nom actuel",
      required: true,
    },
    {
      type: ApplicationCommandOptionType.String,
      name: "nouveau_nom",
      description: "Le nouveau nom",
      required: false,
    },
    {
      type: ApplicationCommandOptionType.Integer,
      name: "vie",
      description: "La nouvelle valeur de vie",
      required: false,
    },
    {
      type: ApplicationCommandOptionType.Integer,
      name: "endurance",
      description: "La nouvelle valeur d'endurance",
      required: false,
    },
    {
      type: ApplicationCommandOptionType.Integer,
      name: "attaque",
      description: "La nouvelle valeur d'attaque",
      required: false,
    },
    {
      type: ApplicationCommandOptionType.Integer,
      name: "defense",
      description: "La nouvelle valeur de défense",
      required: false,
    },
    {
      type: ApplicationCommandOptionType.Integer,
      name: "vitesse",
      description: "La nouvelle valeur de vitesse",
      required: false,
    },
  ],
  async execute(interaction) {
    let type = interaction.options.getString("type").toLowerCase();
    const nom = interaction.options.getString("nom");
    const nouveauNom = interaction.options.getString("nouveau_nom");
    const vie = interaction.options.getInteger("vie");
    const endurance = interaction.options.getInteger("endurance");
    const attaque = interaction.options.getInteger("attaque");
    const defense = interaction.options.getInteger("defense");
    const vitesse = interaction.options.getInteger("vitesse");
    let capitalizedName = capitalizeEachWord(nom);

    try {
      switch (type) {
        case "p":
        case "perso":
        case "personnage":
          const personnage = await Character.findOne({ where: { nom: nom } });
          if (!personnage) {
            return interaction.reply(
              `Si tu veux éditer un personnage, commence par avoir un QI plus élévé qu'Azmog. ${capitalizedName} n'est même pas encore sur le jeu.`
            );
          }

          if (
            vie === null &&
            endurance === null &&
            attaque === null &&
            defense === null &&
            vitesse === null
          ) {
            return interaction.reply(
              `Donc tu me demandes d'éditer mais tu ne modifies rien ? La prochaine fois je t'envoie la souris de charchar dans ta grosse tête !`
            );
          }

          // Rechercher les statistiques associées au personnage
          const statistique = await StatisticsCharacter.findOne({
            where: { character_id: personnage.id },
          });

          // Mettre à jour des statistiques pour le personnage
          if (!statistique) {
            return await interaction.reply(
              `Si tu veux éditer un personnage, commence par avoir un QI plus élévé qu'Azmog. Les stats de ${capitalizedName} n'existe pas encore donc tu ne peux pas l'éditer.`
            );
          } else {
            if (vie !== null) statistique.vie = vie;
            if (endurance !== null) statistique.endurance = endurance;
            if (attaque !== null) statistique.attaque = attaque;
            if (defense !== null) statistique.defense = defense;
            if (vitesse !== null) statistique.vitesse = vitesse;
            await statistique.save();
          }
          break;
        case "f":
        case "fafa":
        case "familier":
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
          break;
        case "ar":
        case "w":
        case "weapon":
        case "arme":
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
          break;
        case "ac":
        case "accessory":
        case "accesoire":
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
          break;
        default:
          return await interaction.reply({
            content:
              'Veuillez spécifier un type valide : "p" pour personnage, "f" pour familier, "ac" pour un accessoire et "ar" pour une arme par exemple.',
            ephemeral: true,
          });
      }
      await interaction.reply(
        `Type: ${findType(
          type
        )}\nLes informations de ${capitalizedName} ont été mises à jour avec succès !`
      );
    } catch (e) {
      console.log(e);
      await interaction.reply({
        content: "Une erreur est survenue lors de la modification.",
        ephemeral: true,
      });
    }
  },
};
