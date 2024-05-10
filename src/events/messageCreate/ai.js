/*
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
    if(!CHANNELS.includes(message.channelId) && !message.mentions.users.has(client.user.id)) return;

    await message.channel.sendTyping();

    const {response} = await model.generateContent(message.cleanContent)

    await message.reply({
      content: response.text()
    });

  } catch (error) {
    console.log(error)
  }
}
*/

/*
require("dotenv").config();
const { GoogleGenerativeAI } = require("@google/generative-ai");
const ai = new GoogleGenerativeAI(process.env.API_KEY_GEMINI);
const CHANNELS = [process.env.CHANNEL_ID_CHATBOT];
const IGNORE_PREFIX = "!";

module.exports = async (client, message) => {
  try {
    if(message.author.bot) return;
    if(message.content.startsWith(IGNORE_PREFIX)) return;
    if(!CHANNELS.includes(message.channelId) && !message.mentions.users.has(client.user.id))
      return;

    await message.channel.sendTyping();

    const model = ai.getGenerativeModel({ model: 'gemini-pro' });
    const chat = model.startChat({
      history: [
        {
          role: "user",
          parts: [{ text: "" }],
        },
        {
          role: "model",
          parts: [{ text: "" }],
        },
      ],
      generationConfig: {
        maxOutputTokens: 100,
      },
    });
    
    const msg = message.content;

    const result = await chat.sendMessage(msg);
    const response = await result.response;
    const text = response.text();

    await message.reply(text);

  } catch (error) {
    console.log(error)
  }
}
*/

require("dotenv").config();
const { GoogleGenerativeAI } = require("@google/generative-ai");
const MODEL_NAME = "gemini-pro";
const genAI = new GoogleGenerativeAI(process.env.API_KEY_GEMINI);
const CHANNELS = [process.env.CHANNEL_ID_CHATBOT];
const IGNORE_PREFIX = "!";

module.exports = async (client, message) => {
  try {
    if (message.author.bot) return;
    if(message.content.startsWith(IGNORE_PREFIX)) return;
    if(!CHANNELS.includes(message.channelId) && !message.mentions.users.has(client.user.id)) return;

    await message.channel.sendTyping();

    const userMessage = message.content;

    const model = genAI.getGenerativeModel({ model: MODEL_NAME });

    const generationConfig = {
      temperature: 0.9,
      topK: 1,
      topP: 1,
      maxOutputTokens: 2048,
    };

    const parts = [
      {
        text: `input: ${userMessage}`,
      },
    ];

    const result = await model.generateContent({
      contents: [{ role: "user", parts }],
      generationConfig,
    });

    const reply = await result.response.text();
    if (reply.length > 2000) {
      const replyArray = reply.match(/[\s\S]{1,2000}/g);
      replyArray.forEach(async (msg) => {
        await message.reply(msg);
      });
      return;
    }

    message.reply(reply);

  } catch (error) {
    console.log(error)
  }
}
