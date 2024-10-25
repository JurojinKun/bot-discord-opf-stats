const {
  StatisticsCharacter,
  StatisticsPet,
  StatisticsWeapon,
  StatisticsAccessory,
} = require("../models");
const { ApplicationCommandOptionType } = require("discord-api-types/v9");

module.exports = {
  name: "clean-stats",
  description:
    "Nettoie les stats pour une nouvelle saison",
  options: [
    {
      type: ApplicationCommandOptionType.String,
      name: "table",
      description: "Nom de la ou les table(s) à nettoyer",
      required: true,
      choices: [
        { name: "Tout", value: "tout" },
        { name: "Personnages", value: "personnages" },
        { name: "Familiers", value: "familiers" },
        { name: "Armes", value: "armes" },
        { name: "Accessoires", value: "accessoires" },
      ],
    },
  ],
  async execute(interaction) {
    const ownerId = process.env.ID_ADMIN;

    if (interaction.user.id !== ownerId) {
      return interaction.reply(
        "Comment peux-tu oser faire ça ?! Tu n'es pas l'être suprême attendu, ça ne sert à rien d'essayer !"
      );
    }

    const tableChoisie = interaction.options.getString("table");

    try {
      switch (tableChoisie) {
        case "tout":
          await StatisticsCharacter.destroy({ where: {}, truncate: true });
          await StatisticsPet.destroy({ where: {}, truncate: true });
          await StatisticsWeapon.destroy({ where: {}, truncate: true });
          await StatisticsAccessory.destroy({ where: {}, truncate: true });
          break;
        case "personnages":
          await StatisticsCharacter.destroy({ where: {}, truncate: true });
          break;
        case "familiers":
          await StatisticsPet.destroy({ where: {}, truncate: true });
          break;
        case "armes":
          await StatisticsWeapon.destroy({ where: {}, truncate: true });
          break;
        case "accessoires":
          await StatisticsAccessory.destroy({ where: {}, truncate: true });
          break;
        default:
          return await interaction.reply({
            content: "Spécifie une table valide.",
            ephemeral: true,
          });
      }

      if (tableChoisie == "tout") {
        await interaction.reply(
          "Toutes les stats ont été nettoyées avec succès. Mission accomplie, monseigneur !"
        );
      } else {
        await interaction.reply(
          `Les stats ${tableChoisie} ont été nettoyées avec succès. Mission accomplie, monseigneur !`
        );
      }
    } catch (error) {
      console.error(error);
      await interaction.reply({
        content:
          "Une erreur est survenue lors du nettoyage des tables de statistiques.",
        ephemeral: true,
      });
    }
  },
};
