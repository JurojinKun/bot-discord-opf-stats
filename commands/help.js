module.exports = {
    name: 'help',
    description: 'Affiche la liste des commandes disponibles',
    async execute(interaction) {
        const helpMessage = `
**Commandes Disponibles :**
- **/get** : Recherche les stats d'un personnage par son nom.
- **/set** : Enregistre un nouveau personnage avec ses stats (format : nom/vie/endurance/attaque/defense/vitesse).

Utilise chaque commande pour plus de détails sur son utilisation.
        `;

        await interaction.reply({ content: helpMessage, ephemeral: true });
    }
};
