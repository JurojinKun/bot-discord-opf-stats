const { ApplicationCommandOptionType } = require("discord-api-types/v9");
const { Character, StatisticsCharacter } = require("../models");
const { EmbedBuilder } = require("discord.js");
const { Op } = require("sequelize");

module.exports = {
  name: "rank-build",
  description: "Classe les personnages selon les stats et le build",
  options: [
    {
      type: ApplicationCommandOptionType.Integer,
      name: "top",
      description: "Top de personnages à afficher (3, 10 ou 25)",
      required: true,
    },
    {
      type: ApplicationCommandOptionType.String,
      name: "build",
      description:
        "Type de build pour le classement (offensif, defensif, equilibre)",
      required: true,
      choices: [
        { name: "Offensif", value: "offensif" },
        { name: "Défensif", value: "défensif" },
        { name: "Équilibré", value: "équilibré" },
      ],
    },
  ],
  async execute(interaction) {
    const topNumber = interaction.options.getInteger("top");
    const buildType = interaction.options.getString("build");

    // Vérifier que le nombre demandé est valide
    if (![3, 10, 25].includes(topNumber)) {
      return interaction.reply(
        "Tu as juste à choisir un nombre valide : 3, 10 ou 25. À croire tu es Pagma qui lit l'heure sur sa rolex !"
      );
    }

    try {
      // Récupération des personnages avec leurs statistiques renseignées
      const personnages = await Character.findAll({
        include: [
          {
            model: StatisticsCharacter,
            as: "statistics_character",
            where: {
              vie: { [Op.ne]: null },
              endurance: { [Op.ne]: null },
              attaque: { [Op.ne]: null },
              defense: { [Op.ne]: null },
              vitesse: { [Op.ne]: null },
            },
            required: true,
          },
        ],
      });

      // Calcul et tri en fonction du build sélectionné
      const classement = personnages
        .map((personnage) => {
          const stats = personnage.statistics_character[0];
          let totalStats;

          switch (buildType) {
            case "offensif":
              totalStats =
                stats.attaque * 2 +
                stats.vitesse * 2 +
                stats.vie +
                stats.endurance +
                stats.defense;
              break;
            case "défensif":
              totalStats =
                stats.defense * 2 +
                stats.vitesse * 2 +
                stats.vie +
                stats.endurance +
                stats.attaque;
              break;
            case "équilibré":
              totalStats =
                stats.attaque * 2 +
                stats.defense * 2 +
                stats.vitesse * 2 +
                stats.vie +
                stats.endurance;
              break;
            default:
              totalStats = 0;
          }

          return {
            nom: personnage.nom,
            stats,
            totalStats,
          };
        })
        .sort((a, b) => {
          // Trier d'abord par totalStats (décroissant), ensuite par nom (alphabétique croissant)
          if (b.totalStats === a.totalStats) {
            return a.nom.localeCompare(b.nom);
          }
          return b.totalStats - a.totalStats;
        });

      if (classement.length < topNumber) {
        return interaction.reply(
          `Il n'y a pas assez de personnages avec des statistiques pour afficher un top ${topNumber}.\nActuellement, il n'y en a que ${classement.length}.\nBouge toi les fesses feignasse !`
        );
      }

      // Limiter au nombre choisi par l'utilisateur
      const topClassement = classement.slice(0, topNumber);

      // Créer un embed pour le classement
      const embed = new EmbedBuilder()
        .setTitle(
          `Top ${topNumber} des personnages par statistiques - Build ${buildType}`
        )
        .setColor("#fec800");

      topClassement.forEach((p, index) => {
        const name = `\n#${index + 1} ${p.nom}`;
        const value = `Vie: **${p.stats.vie}** Endurance: **${p.stats.endurance}** Attaque: **${p.stats.attaque}** Défense: **${p.stats.defense}** Vitesse: **${p.stats.vitesse}**`;
        embed.addFields({ name, value, inline: false });
      });

      // Envoyer la réponse
      await interaction.reply({ embeds: [embed] });
    } catch (error) {
      console.log(error);
      await interaction.reply({
        content:
          "Une erreur est survenue lors de l'affichage du classement des personnages.",
        ephemeral: true,
      });
    }
  },
};
