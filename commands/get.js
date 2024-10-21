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
  name: "get",
  description:
    "Recherche les stats personnage, familier, arme ou accessoire par leur nom",
  options: [
    {
      type: ApplicationCommandOptionType.String,
      name: "type",
      description: "Type à rechercher (personnage, familier, arme ou accessoire)",
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
      name: "nom",
      description: "Nom à rechercher",
      required: true,
    },
  ],
  async execute(interaction) {
    let type = interaction.options.getString("type").toLowerCase();
    let nom = interaction.options.getString("nom");

    try {
      let stats, entityName;

      switch (type) {
        case "personnage":
          const personnage = await Character.findOne({
            where: { nom: nom },
            include: [
              { model: StatisticsCharacter, as: "statistics_character" },
            ],
          });

          if (
            personnage &&
            personnage.statistics_character &&
            personnage.statistics_character.length > 0
          ) {
            stats = personnage.statistics_character[0].dataValues;
            entityName = personnage.nom;
          } else {
            nom = capitalizeEachWord(nom);
            return await interaction.reply(
              `Je n'ai pas la science infuse, ${nom} n'a pas encore ses stats sauvegardées !`
            );
          }
          break;
        case "familier":
          const familier = await Pet.findOne({
            where: { nom: nom },
            include: [{ model: StatisticsPet, as: "statistics_pet" }],
          });

          if (
            familier &&
            familier.statistics_pet &&
            familier.statistics_pet.length > 0
          ) {
            stats = familier.statistics_pet[0].dataValues;
            entityName = familier.nom;
          } else {
            nom = capitalizeEachWord(nom);
            return await interaction.reply(
              `Je n'ai pas la science infuse, ${nom} n'a pas encore ses stats sauvegardées !`
            );
          }
          break;
        case "arme":
          const weapon = await Weapon.findOne({
            where: { nom: nom },
            include: [{ model: StatisticsWeapon, as: "statistics_weapon" }],
          });

          if (
            weapon &&
            weapon.statistics_weapon &&
            weapon.statistics_weapon.length > 0
          ) {
            stats = weapon.statistics_weapon[0].dataValues;
            entityName = weapon.nom;
          } else {
            nom = capitalizeEachWord(nom);
            return await interaction.reply(
              `Je n'ai pas la science infuse, ${nom} n'a pas encore ses stats sauvegardées !`
            );
          }
          break;
        case "accessoire":
          const accessory = await Accessory.findOne({
            where: { nom: nom },
            include: [
              { model: StatisticsAccessory, as: "statistics_accessory" },
            ],
          });

          if (
            accessory &&
            accessory.statistics_accessory &&
            accessory.statistics_accessory.length > 0
          ) {
            stats = accessory.statistics_accessory[0].dataValues;
            entityName = accessory.nom;
          } else {
            nom = capitalizeEachWord(nom);
            return await interaction.reply(
              `Je n'ai pas la science infuse, ${nom} n'a pas encore ses stats sauvegardées !`
            );
          }
          break;
        default:
          return await interaction.reply({
            content:
              'Spécifie un type valide.',
            ephemeral: true,
          });
      }

      // Réponse avec les statistiques
      await interaction.reply(
        `Type: ${findType(type)}\nNom: ${entityName}\nVie: ${
          stats.vie
        }\nEndurance: ${stats.endurance}\nAttaque: ${stats.attaque}\nDéfense: ${
          stats.defense
        }\nVitesse: ${stats.vitesse}`
      );
    } catch (e) {
      console.log(e);
      await interaction.reply({
        content: "Une erreur est survenue lors de la recherche.",
        ephemeral: true,
      });
    }
  },
};
