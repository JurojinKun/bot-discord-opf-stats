module.exports = {
    name: 'help',
    description: 'Affiche la liste des commandes disponibles',
    async execute(interaction) {
        const helpMessage = `
**Commandes disponibles :**
- **/get** : Recherche les stats personnage, familier, accessoire ou arme par son nom.
- **/set** : Enregistre nouveau personnage, nouveau familier, nouvel accessoire ou nouvelle arme avec ses stats (format : nom/vie/endurance/attaque/defense/vitesse).
- **/edit** : Modifie les informations personnage, familier, accessoire ou arme (le nom actuel est obligatoire, les autres champs sont optionnels).
- **/delete** : Supprime les stats personnage, familier, accessoire ou arme par son nom (attention cette action est irréversible et il n'y aura pas de demande de confirmation avant de supprimer).
- **/stats** : Liste les personnages étant sur le jeu mais qui n'ont pas encore leurs stats sauvegardées ou liste les familiers, armes ou accessoires ayant déjà des stats sauvegardées.
- **/rank-global** : Classe les personnages existants par leurs statistiques globales de manière décroissante en top 3, 10 ou 25.
- **/rank-build** : Classe les personnages existants par leurs statistiques et le build sélectionné de manière décroissante en top 3, 10 ou 25.

**Utilise chaque commande pour plus de détails sur son utilisation.**
        `;

        await interaction.reply({ content: helpMessage, ephemeral: true });
    }
};
