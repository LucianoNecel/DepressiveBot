require("dotenv").config();
const quitarRolContador = require('./utils/quitarRolContador.js');
const eventHandler = require('./handlers/eventHandler');
const { Client, IntentsBitField } = require('discord.js');
const client = new Client({
  intents: [
    IntentsBitField.Flags.Guilds,
    IntentsBitField.Flags.GuildMembers,
    IntentsBitField.Flags.GuildMessages,
    IntentsBitField.Flags.MessageContent,
  ],
});

quitarRolContador(client);
eventHandler(client);

client.login(process.env.TOKEN);