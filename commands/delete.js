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
  name: "delete",
  description:
    "Supprime les stats personnage, familier, arme ou accessoire",
  options: [
    {
      type: ApplicationCommandOptionType.String,
      name: "type",
      description: "Type à supprimer (personnage, familier, arme ou accessoire)",
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
        name: 'nom',
        description: 'Le nom dont les stats doivent être supprimées',
        required: true,
    },
  ],
  async execute(interaction) {
    let type = interaction.options.getString("type").toLowerCase();
    const nom = capitalizeEachWord(interaction.options.getString('nom'));

    try {
      switch (type) {
        case "personnage":
            const personnage = await Character.findOne({ where: { nom: nom } });
            if (!personnage) {
                return await interaction.reply(`Je ne peux pas supprimer les stats d'un personnage qui n'existe pas. **${nom}** n'est pas dans ma base de données.`);
            }

            const statistiquePerso = await StatisticsCharacter.findOne({ where: { character_id: personnage.id } });
            if (!statistiquePerso) {
                return await interaction.reply(`Je ne peux pas supprimer les stats d'un personnage qui n'a pas ses stats encore sauvegardées. **${nom}** n'est pas dans ma base de données.`);
            }

            // Supprimer les statistiques associées à ce personnage
            await StatisticsCharacter.destroy({ where: { character_id: personnage.id } });
          break;
        case "familier":
            const familier = await Pet.findOne({ where: { nom: nom } });
            if (!familier) {
                return await interaction.reply(`Je ne peux pas supprimer les stats d'un familier qui n'existe pas. **${nom}** n'est pas dans ma base de données.`);
            }

            const statistiqueFafa = await StatisticsPet.findOne({ where: { pet_id: familier.id } });
            if (!statistiqueFafa) {
                return await interaction.reply(`Je ne peux pas supprimer les stats d'un familier qui n'a pas ses stats encore sauvegardées. **${nom}** n'est pas dans ma base de données.`);
            }

            // Supprimer les statistiques associées à ce familier
            await StatisticsPet.destroy({ where: { pet_id: familier.id } });
          break;
        case "arme":
            const weapon = await Weapon.findOne({ where: { nom: nom } });
            if (!weapon) {
                return await interaction.reply(`Je ne peux pas supprimer les stats d'une arme qui n'existe pas. **${nom}** n'est pas dans ma base de données.`);
            }

            const statistiqueWeapon = await StatisticsWeapon.findOne({ where: { weapon_id: weapon.id } });
            if (!statistiqueWeapon) {
                return await interaction.reply(`Je ne peux pas supprimer les stats d'une arme qui n'a pas ses stats encore sauvegardées. **${nom}** n'est pas dans ma base de données.`);
            }

            // Supprimer les statistiques associées à cette arme
            await StatisticsWeapon.destroy({ where: { weapon_id: weapon.id } });
          break;
        case "accessoire":
            const accessory = await Accessory.findOne({ where: { nom: nom } });
            if (!accessory) {
                return await interaction.reply(`Je ne peux pas supprimer les stats d'un accessoire qui n'existe pas. **${nom}** n'est pas dans ma base de données.`);
            }

            const statistiqueAccessory = await StatisticsAccessory.findOne({ where: { accessory_id: accessory.id } });
            if (!statistiqueAccessory) {
                return await interaction.reply(`Je ne peux pas supprimer les stats d'un accessoire qui n'a pas ses stats encore sauvegardées. **${nom}** n'est pas dans ma base de données.`);
            }

            // Supprimer les statistiques associées à cet accessoire
            await StatisticsAccessory.destroy({ where: { accessory_id: accessory.id } });
          break;
        default:
          return await interaction.reply({
            content:
              'Spécifie un type valide.',
            ephemeral: true,
          });
      }
    await interaction.reply(`Type: **${findType(type)}**\nLes stats de **${nom}** ont été supprimées avec succès.`);
    } catch (e) {
      console.log(e);
      await interaction.reply({
        content: "Une erreur est survenue lors de la suppression.",
        ephemeral: true,
      });
    }
  },
};