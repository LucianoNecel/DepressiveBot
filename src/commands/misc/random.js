const { ApplicationCommandOptionType } = require('discord.js');
module.exports = {
	name: 'random',
	description: 'Elegí un número aleatorio dentro de un rango específico.',
	options: [
		{
			name: 'mínimo',
			description: 'Valor mínimo del rango.',
			type: ApplicationCommandOptionType.Integer,
			required: false,
		},
		{
			name: 'máximo',
			description: 'Valor máximo del rango.',
			type: ApplicationCommandOptionType.Integer,
			required: false,
		},
	],
	callback: async (client, interaction) => {
		const minimo = interaction.options.getInteger('mínimo') || 0;
		const maximo = interaction.options.getInteger('máximo') || 100;
		if (minimo >= maximo) {
			await interaction.deferReply({ ephemeral: true });
			await interaction.editReply({
				content: 'El valor mínimo debe ser menor que el valor máximo.',
				ephemeral: true,
			});
			return;
		} else {
			await interaction.deferReply({ ephemeral: false });
		}
		const numeroAleatorio =
			Math.floor(Math.random() * (maximo - minimo + 1)) + minimo;
		await interaction.editReply({
			content: `Número aleatorio entre ${minimo} y ${maximo}: ${numeroAleatorio}`,
			ephemeral: false,
		});
	},
};
