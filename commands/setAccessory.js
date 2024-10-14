const { ApplicationCommandOptionType } = require("discord-api-types/v9");
const { Accessory, StatisticsAccessory } = require("../models");
const capitalizeEachWord = require("../utils/utils");

module.exports = {
  name: "set-a",
  description: "Enregistre un nouvel accessoire avec ses stats",
  options: [
    {
      type: ApplicationCommandOptionType.String,
      name: "stats",
      description:
        "Stats de l'accessoire sous forme nom/vie/endurance/attaque/defense/vitesse",
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

      await interaction.reply(`${nom} sauvegardé(e) avec succès !`);
    } catch (error) {
      console.error(error);
      await interaction.reply(
        "Il y a eu une erreur lors de la création de l'accessoire."
      );
    }
  },
};
