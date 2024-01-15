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
