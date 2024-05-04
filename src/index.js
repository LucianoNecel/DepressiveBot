require("dotenv").config();
let { nombrex } = require('../src/commands/variables.js');
const {chisteAleatorio} = require('./chisteAleatorio.js');
const {cargarFallos} = require('../src/cargarFallos.js');
const {guardarFallos} = require('../src/guardarFallos.js');
const {saludoAleatorio} = require('../src/saludoAleatorio.js');
const {quitarRolContador} = require('../src/quitarRolContador.js');
const { Client, IntentsBitField } = require('discord.js');
const { GoogleGenerativeAI } = require("@google/generative-ai");
const dialogflow = require('@google-cloud/dialogflow');

const eventHandler = require('./handlers/eventHandler');
const client = new Client({
  intents: [
    IntentsBitField.Flags.Guilds,
    IntentsBitField.Flags.GuildMembers,
    IntentsBitField.Flags.GuildMessages,
    IntentsBitField.Flags.MessageContent,
  ],
});

eventHandler(client);
quitarRolContador(client);


const ai = new GoogleGenerativeAI(process.env.API_KEY_GEMINI);
const model = ai.getGenerativeModel({model: 'gemini-pro'});

client.on('messageCreate', async message => {
  try {
    if(message.author.bot) return;
    if(message.channel.id !== process.env.CHANNEL_ID_CHATBOT ) return;

    const {response} = await model.generateContent(message.cleanContent)

    await message.reply({
      content: response.text()
    });

  } catch (error) {
    console.log(error)
  }
});

client.login(process.env.TOKEN);

client.on('messageCreate', message => {
  if (message.channel.id === process.env.CHANNEL_ID_TAQUILLA) {
    console.log('Mensaje en canal #taquilla');
    if (message.embeds.length > 0) {
      console.log('Mensaje contiene embeds');
      const embed = message.embeds[0];
      console.log('Embed:', embed);
      if (embed.title && embed.title.startsWith('__**Película:**__')) {
        console.log('Título del embed comienza con "__**Película:**__"');
        nombrex = embed.title.replace('__**Película:**__', '');
        console.log(`La última película enviada al canal de #taquilla es: ${nombrex}`);
      } else {
        console.log('Título del embed no comienza con "__**Película:**__"');
      }
    } else {
      console.log('Mensaje no contiene embeds');
    }
  } else {
    console.log('Mensaje no está en canal #taquilla');
  }

  if (message.channel.id === process.env.CHANNEL_ID_CONTADOR){
    if (message.author.id === process.env.CLIENT_ID_CONTADOR && message.content.includes('LO ARRUINASTE EN')) {
      const inicioMensaje = message.content.indexOf('<@') + 2;
      const finMensaje = message.content.indexOf('>');
      const idUsuario = message.content.slice(inicioMensaje, finMensaje);
      const usuarioQueFallo = message.guild.members.cache.get(idUsuario)

      if (usuarioQueFallo){
        const nombreUsuario = usuarioQueFallo.user.username;
        let fallos = cargarFallos();

        if (!fallos[nombreUsuario]) {
          fallos[nombreUsuario] = 1;
        } else {
          fallos[nombreUsuario]++;
        }
        guardarFallos(fallos);
      }
    }
  }
  
  if (!message.author.bot) {
    if (message.content.toLowerCase().includes('hola') && message.content.toLowerCase().includes(process.env.CLIENT_ID)) {
      const saludo = saludoAleatorio();
      message.reply(saludo + message.author.displayName + '?');
    }
    else if (message.content.toLowerCase().includes('si o no') && message.content.toLowerCase().includes(process.env.CLIENT_ID)) {
      const siono = Math.random() < 0.5? "Sí" : "No";
      message.reply(siono);
    }
    else if (message.content.toLowerCase().includes(process.env.CLIENT_ID)) {
      const chiste = chisteAleatorio();
      message.author.send('Te haces el gracioso taggeando porque si? Toma un chiste de mierda:\n' + chiste);
    }
  }
});