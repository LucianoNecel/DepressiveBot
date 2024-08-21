const { ApplicationCommandOptionType, EmbedBuilder } = require('discord.js');
module.exports = {
	name: 'avatar',
	description: 'Obtener la imagen de perfil de un miembro del servidor.',
	options: [
		{
			name: 'miembro',
			description: 'Miembro del cual se quiere obtener la imagen de perfil.',
			type: ApplicationCommandOptionType.User,
			required: true,
		},
	],
	callback: async (client, interaction) => {
		const usuario = interaction.options.getUser('miembro');
		if (!usuario) {
			return interaction.reply('Selecciona un usuario.');
		}
		const avatarURL = usuario.displayAvatarURL({ dynamic: true, size: 1024 });
		const embed = new EmbedBuilder()
			.setAuthor({
				name: usuario.tag,
				iconURL: usuario.displayAvatarURL({ dynamic: true, size: 32 }),
			})
			.setTitle('Avatar del servidor')
			.setImage(avatarURL);
		try {
			await interaction.reply({
				embeds: [embed],
				ephemeral: false,
			});
		} catch (error) {
			console.log(`Hubo un error obteniendo la imagen de perfil: ${error}`);
		}
	},
};
