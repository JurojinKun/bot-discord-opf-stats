const { Personnage, Statistiques } = require('../models');

module.exports = {
    name: 'no-stats',
    description: 'Liste les personnages sans statistiques',
    options: [],
    async execute(interaction) {
        try {
            // Requête pour trouver les personnages sans statistiques, triés par nom
            const personnagesSansStats = await Personnage.findAll({
                include: [{
                    model: Statistiques,
                    as: 'statistiques',
                    required: false
                }],
                where: { '$statistiques.id$': null },
                order: [['nom', 'ASC']] // Tri par nom dans l'ordre croissant (ASC)
            });

            // Construire le message de réponse
            if (personnagesSansStats.length > 0) {
                const nomsPersonnages = personnagesSansStats.map(p => p.nom).join('\n');
                await interaction.reply(`Personnages sans statistiques actuellement:\n${nomsPersonnages}`);
            } else {
                await interaction.reply('Tous les personnages ont des statistiques sauvegardées, félicitations à tous !');
            }
        } catch (error) {
            console.error(error);
            await interaction.reply({ content: "Une erreur est survenue lors de la recherche des personnages n'ayant pas de statistiques", ephemeral: true });
        }
    }
};