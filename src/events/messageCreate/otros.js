require("dotenv").config();
const { chisteAleatorio } = require('../../utils/chisteAleatorio.js');
const { saludoAleatorio } = require('../../utils/saludoAleatorio.js');

module.exports = async (client, message) => {
  try {
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
  } catch (error) {
    console.log(error)
  }
}