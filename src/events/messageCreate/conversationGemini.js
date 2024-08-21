require('dotenv').config();
const processConversation = require('../../utils/processConversation');
const async = require('async');
const IGNORE_PREFIX = '!';
const conversationQueue = async.queue(processConversation, 1);
module.exports = async (client, message) => {
	try {
		if (message.author.bot) return;
		if (message.content.startsWith(IGNORE_PREFIX)) return;
		if (message.channel.id !== process.env.CHANNEL_ID_CHATBOT) return;
		const messageContent = message.content;
		if (messageContent === '') {
			await message.reply(
				'> `Parece que no dijiste nada. ¿De qué te gustaría hablar?`'
			);
			return;
		}
		conversationQueue.push({ message, messageContent });
	} catch (error) {
		console.error('Error procesando el mensaje:', error);
		await message.reply('Algo salió mal.');
	}
};
