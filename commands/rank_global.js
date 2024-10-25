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
const { EmbedBuilder, Embed } = require("discord.js");
const { Op } = require("sequelize");

module.exports = {
  name: "rank-global",
  description:
    "Classe les personnages, familiers, armes ou accessoires selon leurs stats globales",
  options: [
    {
      type: ApplicationCommandOptionType.String,
      name: "type",
      description:
        "Type à rechercher (personnage, familier, arme ou accessoire)",
      required: true,
      choices: [
        { name: "Personnage", value: "personnage" },
        { name: "Familier", value: "familier" },
        { name: "Arme", value: "arme" },
        { name: "Accessoire", value: "accessoire" },
      ],
    },
    {
      type: ApplicationCommandOptionType.Integer,
      name: "top",
      description: "Top de personnages à afficher (3, 10 ou 25)",
      required: true,
    },
  ],
  async execute(interaction) {
    let type = interaction.options.getString("type").toLowerCase();
    const topNumber = interaction.options.getInteger("top");

    // Vérifier que le nombre demandé est valide
    if (![3, 10, 25].includes(topNumber)) {
      return interaction.reply(
        "Tu as juste à choisir un nombre valide : 3, 10 ou 25. À croire tu es Pagma qui lit l'heure sur sa rolex !"
      );
    }

    try {
      let embed = new Embed();
      let titleEmbed;
      let classement, topClassement;

      switch (type) {
        case "personnage":
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
          classement = personnages
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

          if (classement.length < topNumber) {
            return interaction.reply(
              `Il n'y a pas assez de personnages avec des statistiques pour afficher un **top ${topNumber}**.\nActuellement, il n'y en a que **${classement.length}**.\nBouge toi les fesses feignasse !`
            );
          }

          titleEmbed = `Top ${topNumber} des personnages par statistiques`;
          break;
        case "familier":
          const familiers = await Pet.findAll({
            include: [
              {
                model: StatisticsPet,
                as: "statistics_pet",
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
          classement = familiers
            .map((familier) => {
              const stats = familier.statistics_pet[0];
              const totalStats =
                stats.vie +
                stats.endurance +
                stats.attaque +
                stats.defense +
                stats.vitesse;
              return {
                nom: familier.nom,
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
              `Il n'y a pas assez de familiers avec des statistiques pour afficher un **top ${topNumber}**.\nActuellement, il n'y en a que **${classement.length}**.\nBouge toi les fesses feignasse !!`
            );
          }

          titleEmbed = `Top ${topNumber} des familiers par statistiques`;
          break;
        case "arme":
          const armes = await Weapon.findAll({
            include: [
              {
                model: StatisticsWeapon,
                as: "statistics_weapon",
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
          classement = armes
            .map((arme) => {
              const stats = arme.statistics_weapon[0];
              const totalStats =
                stats.vie +
                stats.endurance +
                stats.attaque +
                stats.defense +
                stats.vitesse;
              return {
                nom: arme.nom,
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
              `Il n'y a pas assez d'armes avec des statistiques pour afficher un **top ${topNumber}**.\nActuellement, il n'y en a que **${classement.length}**.\nBouge toi les fesses feignasse !`
            );
          }

          titleEmbed = `Top ${topNumber} des armes par statistiques`;
          break;
        case "accessoire":
          const accessoires = await Accessory.findAll({
            include: [
              {
                model: StatisticsAccessory,
                as: "statistics_accessory",
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
          classement = accessoires
            .map((accessoire) => {
              const stats = accessoire.statistics_accessory[0];
              const totalStats =
                stats.vie +
                stats.endurance +
                stats.attaque +
                stats.defense +
                stats.vitesse;
              return {
                nom: accessoire.nom,
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
              `Il n'y a pas assez d'accessoires avec des statistiques pour afficher un **top ${topNumber}**.\nActuellement, il n'y en a que **${classement.length}**.\nBouge toi les fesses feignasse !`
            );
          }

          titleEmbed = `Top ${topNumber} des accessoires par statistiques`;
          break;
        default:
          return await interaction.reply({
            content: "Spécifie un type valide.",
            ephemeral: true,
          });
      }

      // Limiter au nombre choisi par l'utilisateur
      topClassement = classement.slice(0, topNumber);

      // Créer un embed pour le classement
      embed = new EmbedBuilder().setTitle(titleEmbed).setColor("#1fc097");

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
          "Une erreur est survenue lors de l'affichage classement des personnages.",
        ephemeral: true,
      });
    }
  },
};
