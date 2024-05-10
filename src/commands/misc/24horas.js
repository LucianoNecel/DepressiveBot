module.exports = {
	name: '24horas',
	description: 'Comienza a cambiar el nombre del canal de voz cada hora.',

	callback: async (client, interaction) => {
		await interaction.deferReply({ ephemeral: true });

		await interaction.editReply({
			content: `Comando en desarrollo!`,
			ephemeral: true,
		});
	},
};
