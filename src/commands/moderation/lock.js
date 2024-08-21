const {
	ApplicationCommandOptionType,
	PermissionFlagsBits,
} = require('discord.js');
module.exports = {
	name: 'lock',
	description: 'Bloquear un canal del servidor.',
	options: [
		{
			name: 'canal',
			description: 'Selecciona el canal que queres bloquear.',
			type: ApplicationCommandOptionType.Channel,
			required: false,
		},
	],
	permissionsRequired: [PermissionFlagsBits.ManageChannels],
	botPermissions: [PermissionFlagsBits.ManageChannels],
	callback: async (client, interaction) => {
		const channel =
			interaction.options.getChannel('canal') || interaction.channel;
		try {
			await channel.permissionOverwrites.edit(
				interaction.guild.roles.everyone,
				{
					SendMessages: false,
				}
			);
			await interaction.reply({
				content: `🔒 El canal ${channel} ha sido bloqueado.`,
				ephemeral: false,
			});
		} catch (error) {
			console.error('Error al bloquear el canal:', error);
			await interaction.reply({
				content: 'Hubo un error al intentar bloquear el canal.',
				ephemeral: true,
			});
		}
	},
};
