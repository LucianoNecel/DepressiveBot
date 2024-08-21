module.exports = {
	name: 'ping',
	description: 'Responde con la latencia.',
	callback: async (client, interaction) => {
		await interaction.deferReply();
		const reply = await interaction.fetchReply();
		const ping = reply.createdTimestamp - interaction.createdTimestamp;
		await interaction.editReply(
			`Pong! Cliente ${ping}ms | Websocket: ${client.ws.ping}ms`
		);
	},
};
