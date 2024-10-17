const { ApplicationCommandOptionType } = require("discord-api-types/v9");
const { Character, StatisticsCharacter } = require("../models");
const { EmbedBuilder } = require("discord.js");
const { Op } = require("sequelize");

module.exports = {
  name: "rank",
  description: "Classe les personnages selon les stats",
  options: [
    {
      type: ApplicationCommandOptionType.Integer,
      name: "top",
      description: "Top de personnages à afficher (3, 10 ou 25)",
      required: true,
    },
  ],
  async execute(interaction) {
    const topNumber = interaction.options.getInteger("top");

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

      // Calcul et tri
      const classement = personnages
        .map((personnage) => {
          const stats = personnage.statistics_character[0];
          const totalStats =
            stats.vie +
            stats.endurance +
            stats.attaque +
            stats.defense +
            stats.vitesse;
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

      // Limiter au nombre choisi par l'utilisateur
      const topClassement = classement.slice(0, topNumber);

      // Créer un embed pour le classement
      const embed = new EmbedBuilder()
        .setTitle(`Top ${topNumber} des personnages par statistiques`)
        .setColor("#fec800");

      topClassement.forEach((p, index) => {
        const name = `#${index + 1} ${p.nom}`;
        const value = `Total stats: ${p.totalStats}\nVie: ${p.stats.vie} Endurance: ${p.stats.endurance} Attaque: ${p.stats.attaque} Défense: ${p.stats.defense} Vitesse: ${p.stats.vitesse} `;
        embed.addFields({ name, value, inline: false });
      });

      // Envoyer la réponse
      await interaction.reply({ embeds: [embed] });
    } catch (error) {
      console.log(error);
      await interaction.reply({
        content:
          "Une erreur est survenue lors de l'affichage classement des personnages.",
        ephemeral: true,
      });
    }
  },
};
