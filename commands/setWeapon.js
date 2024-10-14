const { ApplicationCommandOptionType } = require("discord-api-types/v9");
const { Weapon, StatisticsWeapon } = require("../models");
const capitalizeEachWord = require("../utils/utils");

module.exports = {
  name: "set-w",
  description: "Enregistre une nouvelle arme avec ses stats",
  options: [
    {
      type: ApplicationCommandOptionType.String,
      name: "stats",
      description:
        "Stats de l'arme sous forme nom/vie/endurance/attaque/defense/vitesse",
      required: true,
    },
  ],
  async execute(interaction) {
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

      await interaction.reply(`${nom} sauvegardé(e) avec succès !`);
    } catch (error) {
      console.error(error);
      await interaction.reply(
        "Il y a eu une erreur lors de la création de l'arme."
      );
    }
  },
};
