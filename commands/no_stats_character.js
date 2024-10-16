const { Character, StatisticsCharacter } = require('../models');

module.exports = {
    name: 'no-stats',
    description: 'Liste les personnages sans statistiques, séparés par leur statut déblocable',
    options: [],
    async execute(interaction) {
        try {
            // Personnages non déblocables sans statistiques
            const personnagesNonDeblocablesSansStats = await Character.findAll({
                include: [{
                    model: StatisticsCharacter,
                    as: 'statistics_character',
                    required: false
                }],
                where: { '$statistics_character.id$': null, unlockable: false },
                order: [['nom', 'ASC']]
            });

            // Personnages déblocables sans statistiques
            const personnagesDeblocablesSansStats = await Character.findAll({
                include: [{
                    model: StatisticsCharacter,
                    as: 'statistics_character',
                    required: false
                }],
                where: { '$statistics_character.id$': null, unlockable: true },
                order: [['nom', 'ASC']]
            });

            // Construire le message de réponse
            let reponse = '';

            if (personnagesNonDeblocablesSansStats.length > 0) {
                const nomsNonDeblocables = personnagesNonDeblocablesSansStats.map(p => p.nom).join('\n');
                reponse += `**Personnages non déblocables sans statistiques :**\n${nomsNonDeblocables}\n\n`;
            } else {
                reponse += `**Personnages non déblocables sans statistiques :**\nTous les personnages non déblocables ont leurs statistiques sauvegardées, félicitations !\n\n`;
            }

            if (personnagesDeblocablesSansStats.length > 0) {
                const nomsDeblocables = personnagesDeblocablesSansStats.map(p => p.nom).join('\n');
                reponse += `**Personnages déblocables sans statistiques :**\n${nomsDeblocables}`;
            } else {
                reponse += `**Personnages déblocables sans statistiques :**\nTous les personnages déblocables ont leurs statistiques sauvegardées, félicitations !`;
            }

            await interaction.reply(reponse);
        } catch (error) {
            console.error(error);
            await interaction.reply({ content: "Une erreur est survenue lors de la recherche des personnages n'ayant pas de statistiques", ephemeral: true });
        }
    }
};