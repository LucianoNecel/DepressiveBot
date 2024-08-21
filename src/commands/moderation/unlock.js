const {
	ApplicationCommandOptionType,
	PermissionFlagsBits,
} = require('discord.js');
module.exports = {
	name: 'unlock',
	description: 'Desbloquear un canal del servidor.',
	options: [
		{
			name: 'canal',
			description: 'Selecciona el canal que queres desbloquear.',
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
					SendMessages: true,
				}
			);
			await interaction.reply({
				content: `🔓 El canal ${channel} ha sido desbloqueado.`,
				ephemeral: false,
			});
		} catch (error) {
			console.error('Error al desbloquear el canal:', error);
			await interaction.reply({
				content: 'Hubo un error al intentar desbloquear el canal.',
				ephemeral: true,
			});
		}
	},
};
