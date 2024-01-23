module.exports = {
    name: 'help',
    description: 'Affiche la liste des commandes disponibles',
    async execute(interaction) {
        const helpMessage = `
**Commandes personnages disponibles :**
- **/get-p** : Recherche les stats d'un personnage par son nom.
- **/set-p** : Enregistre un nouveau personnage avec ses stats (format : nom/vie/endurance/attaque/defense/vitesse).
- **/edit-p** : Modifie les informations d'un personnage (le nom actuel est obligatoire, les autres champs sont optionnels).
- **/delete-p** : Supprime les stats d'un personnage par son nom (attention cette action est irréversible et il n'y aura pas de demande de confirmation avant de supprimer).
- **/no-stats** : Liste les personnages étant sur le jeu mais qui n'ont pas encore leurs stats sauvegardées.

**Commandes armes disponibles :**
- **/get-w** : Recherche les stats d'une arme par son nom.
- **/set-w** : Enregistre une nouvelle arme avec ses stats (format : nom/vie/endurance/attaque/defense/vitesse). Si l'arme ne rapporte rien sur une stat spécifique (ex: endurance), mettre 0.
- **/edit-w** : Modifie les informations d'une arme (le nom actuel est obligatoire, les autres champs sont optionnels).
- **/delete-w** : Supprime les stats d'une arme par son nom (attention cette action est irréversible et il n'y aura pas de demande de confirmation avant de supprimer).

**Commandes accessoires disponibles :**
- **/get-a** : Recherche les stats d'un accessoire par son nom.
- **/set-a** : Enregistre un nouvel accessoire avec ses stats (format : nom/vie/endurance/attaque/defense/vitesse). Si l'accessoire ne rapporte rien sur une stat spécifique (ex: endurance), mettre 0.
- **/edit-a** : Modifie les informations d'un accessoire (le nom actuel est obligatoire, les autres champs sont optionnels).
- **/delete-a** : Supprime les stats d'un accessoire par son nom (attention cette action est irréversible et il n'y aura pas de demande de confirmation avant de supprimer).

Utilise chaque commande pour plus de détails sur son utilisation.
        `;

        await interaction.reply({ content: helpMessage, ephemeral: true });
    }
};
