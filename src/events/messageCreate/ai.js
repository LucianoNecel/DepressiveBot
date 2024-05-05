
require("dotenv").config();
const { GoogleGenerativeAI } = require("@google/generative-ai");
const ai = new GoogleGenerativeAI(process.env.API_KEY_GEMINI);
const model = ai.getGenerativeModel({ model: 'gemini-pro' });
const CHANNELS = [process.env.CHANNEL_ID_CHATBOT];
const IGNORE_PREFIX = "!";

module.exports = async (client, message) => {
  try {
    if(message.author.bot) return;
    if(message.content.startsWith(IGNORE_PREFIX)) return;
    if(!CHANNELS.includes(message.channelId) && !message.mentions.users.has(client.user.id))
      return;

    await message.channel.sendTyping();
  
    let prevMessages = await message.channel.messages.fetch({ limit: 10 })
    
    prevMessages.reverse();

    prevMessages.forEach((msg) => {
      console.log(msg.content);
    });
    
    const {response} = await model.generateContent(message.cleanContent)

    await message.reply({
      content: response.text()
    });

  } catch (error) {
    console.log(error)
  }
}

/*
require("dotenv").config();
const { GoogleGenerativeAI } = require("@google/generative-ai");
const ai = new GoogleGenerativeAI(process.env.API_KEY_GEMINI);
const model = ai.getGenerativeModel({ model: 'gemini-pro' });
const IGNORE_PREFIX = "!";

module.exports = async (client, message) => {
  if (message.author.bot) return;
  if (message.channel.id !== process.env.CHANNEL_ID_CHATBOT) return;
  if (message.content.startsWith(IGNORE_PREFIX)) return;

  let conversationLog = [];

  try {
    await message.channel.sendTyping();
    let prevMessages = await message.channel.messages.fetch({ limit: 15 });
    prevMessages.reverse();
    
    prevMessages.forEach((msg) => {
      if (msg.content.startsWith('!')) return;
      if (msg.author.id !== client.user.id && message.author.bot) return;
      if (msg.author.id == client.user.id) {
        conversationLog.push(msg.content);
      }

      if (msg.author.id == message.author.id) {
        conversationLog.push(msg.content);
      }
    });

    const {result} = await model.generateContent(conversationLog)
    console.log(result)

    await message.reply({
      content: result.text()
    });
  } catch (error) {
    console.log(`ERR: ${error}`);
  }
}
*/