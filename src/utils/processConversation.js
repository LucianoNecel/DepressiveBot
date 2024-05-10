const { ConversationManager } = require('../utils/conversationManager.js');
const { GoogleGenerativeAI } = require('@google/generative-ai');
const { config } = require('../utils/configGeminiAI.js');

const conversationManager = new ConversationManager();
const genAI = new GoogleGenerativeAI(process.env.API_KEY_GEMINI);

module.exports = async ({ message, messageContent }) => {
	try {
		const model = await genAI.getGenerativeModel({ model: config.modelName });
		const chat = model.startChat({
			history: conversationManager.getHistory(message.author.id),
			safetySettings: config.safetySettings,
		});
		const botMessage = await message.reply('> `Generando una respuesta...`');
		await message.channel.sendTyping();

		await conversationManager.handleModelResponse(
			botMessage,
			() => chat.sendMessageStream(messageContent),
			message
		);

		await botMessage.delete();
	} catch (error) {
		console.error('Error procesando la conversación:', error);
		await message.reply('Algo salió mal.');
	}
};
