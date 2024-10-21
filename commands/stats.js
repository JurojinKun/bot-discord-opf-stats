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

module.exports = {
  name: "stats",
  description:
    "Liste les personnages, armes, accessoires ou familiers",
  options: [
    {
      type: ApplicationCommandOptionType.String,
      name: "type",
      description:
        "Type de la liste des statistiques (personnage, familier, arme ou accessoire)",
      required: true,
      choices: [
        { name: "Personnage", value: "personnage" },
        { name: "Familier", value: "familier" },
        { name: "Arme", value: "arme" },
        { name: "Accessoire", value: "accessoire" },
      ],
    },
  ],
  async execute(interaction) {
    let type = interaction.options.getString("type").toLowerCase();
    let reponse = "";

    try {
      switch (type) {
        case "personnage":
          // Personnages non déblocables sans statistiques
          const personnagesNonDeblocablesSansStats = await Character.findAll({
            include: [
              {
                model: StatisticsCharacter,
                as: "statistics_character",
                required: false,
              },
            ],
            where: { "$statistics_character.id$": null, unlockable: false },
            order: [["nom", "ASC"]],
          });

          // Personnages déblocables sans statistiques
          const personnagesDeblocablesSansStats = await Character.findAll({
            include: [
              {
                model: StatisticsCharacter,
                as: "statistics_character",
                required: false,
              },
            ],
            where: { "$statistics_character.id$": null, unlockable: true },
            order: [["nom", "ASC"]],
          });

          if (personnagesNonDeblocablesSansStats.length > 0) {
            const nomsNonDeblocables = personnagesNonDeblocablesSansStats
              .map((p) => p.nom)
              .join("\n");
            reponse += `**Personnages non déblocables sans statistiques :**\n${nomsNonDeblocables}\n\n`;
          } else {
            reponse += `**Personnages non déblocables sans statistiques :**\nTous les personnages non déblocables ont leurs statistiques sauvegardées, félicitations !\n\n`;
          }

          if (personnagesDeblocablesSansStats.length > 0) {
            const nomsDeblocables = personnagesDeblocablesSansStats
              .map((p) => p.nom)
              .join("\n");
            reponse += `**Personnages déblocables sans statistiques :**\n${nomsDeblocables}`;
          } else {
            reponse += `**Personnages déblocables sans statistiques :**\nTous les personnages déblocables ont leurs statistiques sauvegardées, félicitations !`;
          }
          break;
        case "familier":
          const pets = await Pet.findAll({
            include: [
              {
                model: StatisticsPet,
                as: "statistics_pet",
                required: true,
              },
            ],
            order: [["nom", "ASC"]],
          });
          if (pets.length > 0) {
            const nomsPets = pets.map((p) => p.nom).join("\n");
            reponse += `**Familiers sauvegardés:**\n${nomsPets}`;
          } else {
            reponse += `Pas encore de familiers sauvegardés, bouge toi les fesses !`;
          }
          break;
        case "arme":
          const weapons = await Weapon.findAll({
            include: [
              {
                model: StatisticsWeapon,
                as: "statistics_weapon",
                required: true,
              },
            ],
            order: [["nom", "ASC"]],
          });
          if (weapons.length > 0) {
            const nomsWeapons = weapons.map((p) => p.nom).join("\n");
            reponse += `**Armes sauvegardées:**\n${nomsWeapons}`;
          } else {
            reponse += `Pas encore d'armes sauvegardées, bouge toi les fesses !`;
          }
          break;
        case "accessoire":
          const accessories = await Accessory.findAll({
            include: [
              {
                model: StatisticsAccessory,
                as: "statistics_accessory",
                required: true,
              },
            ],
            order: [["nom", "ASC"]],
          });
          if (accessories.length > 0) {
            const nomsAccessories = accessories.map((p) => p.nom).join("\n");
            reponse += `**Accessoires sauvegardés:**\n${nomsAccessories}`;
          } else {
            reponse += `Pas encore d'accessoires sauvegardés, bouge toi les fesses !`;
          }
          break;
        default:
          return await interaction.reply({
            content: "Spécifie un type valide.",
            ephemeral: true,
          });
      }

      await interaction.reply(reponse);
    } catch (error) {
      console.error(error);
      await interaction.reply({
        content:
          "Une erreur est survenue lors de la recherche des personnages n'ayant pas de statistiques",
        ephemeral: true,
      });
    }
  },
};
