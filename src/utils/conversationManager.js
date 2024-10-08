class ConversationManager {
	constructor() {
		this.chatHistories = {};
		this.userSettings = {};
	}
	getHistory(userId) {
		return (
			this.chatHistories[userId]?.map((line, index) => ({
				role: index % 2 === 0 ? 'user' : 'model',
				parts: [{ text: line }],
			})) || []
		);
	}
	updateChatHistory(userId, userMessage, modelResponse) {
		if (!this.chatHistories[userId]) {
			this.chatHistories[userId] = [];
		}
		this.chatHistories[userId].push(userMessage);
		this.chatHistories[userId].push(modelResponse);
	}
	clearHistory(userId) {
		delete this.chatHistories[userId];
	}
	isNewConversation(userId) {
		return (
			!this.chatHistories[userId] || this.chatHistories[userId].length === 0
		);
	}
	async handleModelResponse(botMessage, responseFunc, originalMessage) {
		const userId = originalMessage.author.id;
		try {
			const messageResult = await responseFunc();
			let finalResponse = '';
			for await (const chunk of messageResult.stream) {
				finalResponse += await chunk.text();
			}
			const chunks = this.splitResponse(finalResponse);
			for (const chunk of chunks) {
				await botMessage.channel.send(chunk);
			}
			this.updateChatHistory(userId, originalMessage.content, finalResponse);
		} catch (error) {
			console.error(error.message);
			await message.reply.reply(
				`<@${originalMessage.author.id}>, perdón, no pude generar una respuesta.`
			);
		}
	}
	splitResponse(response) {
		const chunks = [];
		const maxLength = 2000;
		while (response.length > maxLength) {
			const chunk = response.slice(0, maxLength);
			const lastSpaceIndex = chunk.lastIndexOf(' ');
			const sliceIndex = lastSpaceIndex !== -1 ? lastSpaceIndex : maxLength;
			chunks.push(response.slice(0, sliceIndex));
			response = response.slice(sliceIndex).trim();
		}
		if (response.length > 0) {
			chunks.push(response);
		}
		return chunks;
	}
}
module.exports.ConversationManager = ConversationManager;
