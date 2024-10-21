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
  name: "set",
  description:
    "Enregistre personnage, familier, arme ou accessoire avec ses stats",
  options: [
    {
      type: ApplicationCommandOptionType.String,
      name: "type",
      description: "Type à créer (personnage, familier, arme ou accessoire)",
      required: true,
      choices: [
        { name: "Personnage", value: "personnage" },
        { name: "Familier", value: "familier" },
        { name: "Arme", value: "arme" },
        { name: "Accessoire", value: "accessoire" },
      ],
    },
    {
      type: ApplicationCommandOptionType.String,
      name: "stats",
      description:
        "Stats sous forme nom/vie/endurance/attaque/defense/vitesse",
      required: true,
    },
  ],
  async execute(interaction) {
    let type = interaction.options.getString("type").toLowerCase();
    const stats = interaction.options
      .getString("stats")
      .split("/")
      .map((element) => element.trim());
    if (stats.length !== 6) {
      return await interaction.reply(
        "Allume ton cerveau, je t'ai dit le format de saisie. Utilise exactement ça: nom/vie/endurance/attaque/defense/vitesse"
      );
    }

    let [nom, vie, endurance, attaque, defense, vitesse] = stats;
    nom = capitalizeEachWord(nom);

    try {
      switch (type) {
        case "personnage":
          // Vérifier si le personnage existe déjà
          let personnage = await Character.findOne({ where: { nom: nom } });
          if (!personnage) {
            // Si le personnage n'existe pas
            return await interaction.reply(
              `${nom} n'existe même pas dans le jeu pour le moment mais bien essayé toxic boy !`
            );
          }

          // Vérifier si des statistiques existent déjà pour ce personnage
          const statsExistantes = await StatisticsCharacter.findOne({
            where: { character_id: personnage.id },
          });
          if (statsExistantes) {
            return await interaction.reply(
              `${nom} existe déjà dans la base de données. Tu dors au fond de la classe à côté du radiateur ?`
            );
          }

          // Créer une nouvelle entrée de statistiques pour ce personnage
          await StatisticsCharacter.create({
            character_id: personnage.id,
            vie: parseInt(vie),
            endurance: parseInt(endurance),
            attaque: parseInt(attaque),
            defense: parseInt(defense),
            vitesse: parseInt(vitesse),
          });
          break;
        case "familier":
          // Vérifier si le familier existe déjà
          let familier = await Pet.findOne({ where: { nom: nom } });
          if (!familier) {
            // Si le familier n'existe pas
            familier = await Pet.create({
              nom: nom,
            });
          } else {
            // Vérifier si des statistiques existent déjà pour ce familier
            const statsExistantes = await StatisticsPet.findOne({
              where: { pet_id: familier.id },
            });
            if (statsExistantes) {
              return await interaction.reply(
                `${nom} existe déjà dans la base de données. Tu dors au fond de la classe à côté du radiateur ?`
              );
            }
          }

          // Créer une nouvelle entrée de statistiques pour ce familier
          await StatisticsPet.create({
            pet_id: familier.id,
            vie: parseInt(vie),
            endurance: parseInt(endurance),
            attaque: parseInt(attaque),
            defense: parseInt(defense),
            vitesse: parseInt(vitesse),
          });
          break;
        case "arme":
          // Vérifier si l'arme' existe déjà
          let weapon = await Weapon.findOne({ where: { nom: nom } });
          if (!weapon) {
            // Si l'arme n'existe pas
            weapon = await Weapon.create({
              nom: nom,
            });
          } else {
            // Vérifier si des statistiques existent déjà pour cette arme
            const statsExistantes = await StatisticsWeapon.findOne({
              where: { weapon_id: weapon.id },
            });
            if (statsExistantes) {
              return await interaction.reply(
                `${nom} existe déjà dans la base de données. Tu dors au fond de la classe à côté du radiateur ?`
              );
            }
          }

          // Créer une nouvelle entrée de statistiques pour cette arme
          await StatisticsWeapon.create({
            weapon_id: weapon.id,
            vie: parseInt(vie),
            endurance: parseInt(endurance),
            attaque: parseInt(attaque),
            defense: parseInt(defense),
            vitesse: parseInt(vitesse),
          });
          break;
        case "accessoire":
          // Vérifier si l'accessoire existe déjà
          let accessory = await Accessory.findOne({ where: { nom: nom } });
          if (!accessory) {
            accessory = await Accessory.create({
              nom: nom,
            });
          } else {
            // Vérifier si des statistiques existent déjà pour cet accessoire
            const statsExistantes = await StatisticsAccessory.findOne({
              where: { accessory_id: accessory.id },
            });
            if (statsExistantes) {
              return await interaction.reply(
                `${nom} existe déjà dans la base de données. Tu dors au fond de la classe à côté du radiateur ?`
              );
            }
          }

          // Créer une nouvelle entrée de statistiques pour cet accessoire
          await StatisticsAccessory.create({
            accessory_id: accessory.id,
            vie: parseInt(vie),
            endurance: parseInt(endurance),
            attaque: parseInt(attaque),
            defense: parseInt(defense),
            vitesse: parseInt(vitesse),
          });
          break;
        default:
          return await interaction.reply({
            content:
              'Veuillez spécifier un type valide : "p" pour personnage, "f" pour familier, "ac" pour un accessoire et "ar" pour une arme par exemple.',
            ephemeral: true,
          });
      }
      await interaction.reply(
        `Type: ${findType(type)}\n${nom} sauvegardé(e) avec succès !`
      );
    } catch (e) {
      console.log(e);
      await interaction.reply({
        content: "Une erreur est survenue lors de la création.",
        ephemeral: true,
      });
    }
  },
};
