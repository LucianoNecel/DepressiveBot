require("dotenv").config();
const { GoogleGenerativeAI } = require("@google/generative-ai");
const ai = new GoogleGenerativeAI(process.env.API_KEY_GEMINI);
const model = ai.getGenerativeModel({model: 'gemini-pro'});

module.exports = async (client, message) => {
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
}