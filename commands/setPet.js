const { ApplicationCommandOptionType } = require("discord-api-types/v9");
const { Pet, StatisticsPet } = require("../models");
const capitalizeEachWord = require("../utils/utils");

module.exports = {
  name: "set-f",
  description: "Enregistre un nouveau familier avec ses stats",
  options: [
    {
      type: ApplicationCommandOptionType.String,
      name: "stats",
      description:
        "Stats du familier sous forme nom/vie/endurance/attaque/defense/vitesse",
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

      await interaction.reply(`${nom} sauvegardé(e) avec succès !`);
    } catch (error) {
      console.error(error);
      await interaction.reply(
        "Il y a eu une erreur lors de la création du familier."
      );
    }
  },
};
