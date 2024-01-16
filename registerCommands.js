// Enregistre les commandes slash dans le serveur Discord.
require('dotenv').config();
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const fs = require('fs');

const commands = [];
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    commands.push({ name: command.name, description: command.description, options: command.options });
}

const rest = new REST({ version: '9' }).setToken(process.env.DISCORD_BOT_TOKEN);

(async () => {
    try {
        console.log('Début de la suppression des commandes slash globales.');

        await rest.put(
            Routes.applicationCommands(process.env.APP_ID),
            { body: [] } // Un tableau vide désinscrit toutes les commandes
        );

        console.log('Suppression réussie des commandes slash globales.');

        console.log('Début de la suppression des commandes slash spécifique au serveur.');

        await rest.put(
            Routes.applicationGuildCommands(process.env.APP_ID, process.env.SERVER_ID),
            { body: [] });

        console.log('Suppression réussie des commandes slash spécifique au serveur.');

        console.log('Début de l\'enregistrement des commandes slash.');

        await rest.put(
            Routes.applicationGuildCommands(process.env.APP_ID, process.env.SERVER_ID),
            { body: commands },
        );

        console.log('Enregistrement réussi des commandes slash.');
    } catch (error) {
        console.error(error);
    }
})();
