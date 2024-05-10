const { ApplicationCommandOptionType } = require('discord.js');

module.exports = {
	name: 'anonimo',
	description: 'Escribí un mensaje anónimo para que lo muestre el bot.',
	options: [
		{
			name: 'mensaje',
			type: ApplicationCommandOptionType.String,
			description: 'El mensaje que se enviará de forma anónima.',
			required: true,
		},
	],

	callback: async (client, interaction) => {
		await interaction.deferReply({ ephemeral: true });

		const mensajeAnonimo = interaction.options.getString('mensaje');
		const idCanalAnonimo = process.env.CHANNEL_ID_GENERAL;
		const canalAnonimo = interaction.guild.channels.cache.find(
			(channel) => channel.id === idCanalAnonimo
		);

		if (canalAnonimo) {
			canalAnonimo.send(`Mensaje anónimo: ${mensajeAnonimo}`).catch((error) => {
				console.error('Error al enviar el mensaje anónimo:', error);
			});
			await interaction.editReply({
				content: '¡Mensaje enviado de forma anónima!',
				ephemeral: true,
			});
		} else {
			await interaction.editReply({
				content: 'No se pudo enviar el mensaje de forma anónima.',
				ephemeral: true,
			});
		}
	},
};
