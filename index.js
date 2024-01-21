require('dotenv').config();
const { Client, GatewayIntentBits, Collection } = require('discord.js');
const fs = require('fs');

const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server running on port ${port}`));

// Création d'une nouvelle instance du client Discord
const client = new Client({ intents: [GatewayIntentBits.Guilds] });

// Collection pour stocker les commandes
client.commands = new Collection();

// Lecture des fichiers de commande dans le dossier 'commands'
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

// Chargement des commandes
for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    client.commands.set(command.name, command);
}

// Événement 'ready' pour signaler que le bot est connecté et prêt
client.once('ready', () => {
    console.log('Le bot est en ligne!');
});

// Gestionnaire d'interactions pour les commandes slash
client.on('interactionCreate', async interaction => {
    if (!interaction.isCommand()) return;

    const validChannel = process.env.CHANNEL_ID;
    if (interaction.channelId !== validChannel) return interaction.reply({ content: 'Je ne peux pas te répondre dans ce channel, retrouve moi dans le channel dédié !', ephemeral: true });

    const command = client.commands.get(interaction.commandName);

    if (!command) return;

    try {
        await command.execute(interaction);
    } catch (error) {
        console.error(error);
        await interaction.reply({ content: 'Il y a eu une erreur lors de l\'exécution de la commande!', ephemeral: true });
    }
});

// Connexion du bot en utilisant le token stocké dans les variables d'environnement
client.login(process.env.DISCORD_BOT_TOKEN);