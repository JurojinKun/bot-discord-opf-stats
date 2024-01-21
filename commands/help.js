module.exports = {
    name: 'help',
    description: 'Affiche la liste des commandes disponibles',
    async execute(interaction) {
        const helpMessage = `
**Commandes Disponibles :**
- **/get** : Recherche les stats d'un personnage par son nom.
- **/set** : Enregistre un nouveau personnage avec ses stats (format : nom/vie/endurance/attaque/defense/vitesse).
- **/edit** : Modifie les informations d'un personnage (le nom actuel est obligatoire, les autres champs sont optionnels).
- **/delete** : Supprime un personnage et ses stats par son nom (attention cette action est irréversible et il n'y aura pas de demande de confirmation avant de supprimer).

Utilise chaque commande pour plus de détails sur son utilisation.
        `;

        await interaction.reply({ content: helpMessage, ephemeral: true });
    }
};
