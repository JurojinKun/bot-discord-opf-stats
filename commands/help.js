module.exports = {
    name: 'help',
    description: 'Affiche la liste des commandes disponibles',
    async execute(interaction) {
        const helpMessage = `
**Commandes personnages disponibles :**
- **/get** : Recherche les stats personnage, familier, accessoire ou arme par son nom.
- **/set** : Enregistre nouveau personnage, nouveau familier, nouvel accessoire ou nouvelle arme avec ses stats (format : nom/vie/endurance/attaque/defense/vitesse).
- **/edit** : Modifie les informations personnage, familier, accessoire ou arme (le nom actuel est obligatoire, les autres champs sont optionnels).
- **/delete** : Supprime les stats personnage, familier, accessoire ou arme par son nom (attention cette action est irréversible et il n'y aura pas de demande de confirmation avant de supprimer).
- **/no-stats** : Liste les personnages étant sur le jeu mais qui n'ont pas encore leurs stats sauvegardées.
- **/rank** : Classe les personnages existants par leurs statistiques de manière décroissante en top 3, 10 ou 25.

**Précision importante pour les commandes /get, /set, /edit et /delete: veuillez spécifier un type valide : "p" pour personnage, "f" pour familier, "ac" pour un accessoire et "ar" pour une arme par exemple.**

Utilise chaque commande pour plus de détails sur son utilisation.
        `;

        await interaction.reply({ content: helpMessage, ephemeral: true });
    }
};
