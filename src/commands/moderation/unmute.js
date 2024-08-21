const {
	ApplicationCommandOptionType,
	EmbedBuilder,
	PermissionFlagsBits,
} = require('discord.js');
module.exports = {
	name: 'unmute',
	description: 'Desmutear a un miembro del servidor.',
	options: [
		{
			name: 'miembro',
			description: 'Miembro a desmutear.',
			type: ApplicationCommandOptionType.User,
			required: true,
		},
		{
			name: 'razón',
			description: 'Razón del desmuteo.',
			type: ApplicationCommandOptionType.String,
			min_length: 1,
			max_length: 512,
			required: false,
		},
	],
	permissionsRequired: [PermissionFlagsBits.MuteMembers],
	botPermissions: [PermissionFlagsBits.MuteMembers],
	callback: async (client, interaction) => {
		const miembroId = interaction.options.get('miembro').value;
		const razon =
			interaction.options.get('razón')?.value || 'Sin razón especificada';
		const miembro = await interaction.guild.members.fetch(miembroId);
		if (!miembro) {
			await interaction.reply({
				content: 'El miembro no está en el servidor.',
				ephemeral: true,
			});
			return;
		}
		if (miembro.user.bot) {
			await interaction.reply({
				content: 'No puedo desmutear a un bot.',
				ephemeral: true,
			});
			return;
		}
		if (miembro.id === interaction.guild.ownerId) {
			await interaction.reply({
				content:
					'No podés desmutear a ese miembro porque es el líder del servidor.',
				ephemeral: true,
			});
			return;
		}
		const miembroPosicionRol = miembro.roles.highest.position;
		const requestMiembroPosicionRol = interaction.member.roles.highest.position;
		const botPosicionRol = interaction.guild.members.me.roles.highest.position;
		if (miembroPosicionRol >= requestMiembroPosicionRol) {
			await interaction.reply({
				content:
					'No podés desmutear a ese miembro porque tiene el mismo rol o un rol superior al tuyo.',
				ephemeral: true,
			});
			return;
		}
		if (miembroPosicionRol >= botPosicionRol) {
			await interaction.reply({
				content:
					'No puedo desmutear a ese miembro porque tiene el mismo rol o un rol superior que yo.',
				ephemeral: true,
			});
			return;
		}
		try {
			if (
				miembro.communicationDisabledUntilTimestamp &&
				miembro.communicationDisabledUntilTimestamp > Date.now()
			) {
				await miembro.timeout(null);
				const embed = new EmbedBuilder()
					.setDescription(
						`***${miembro} fué desmuteado.*** | __Razón__: ${razon}`
					)
					.setColor('#8BFF00');
				await interaction.reply({
					embeds: [embed],
					ephemeral: false,
				});
			} else {
				await interaction.reply({
					content: 'Este miembro no está muteado.',
					ephemeral: true,
				});
			}
		} catch (error) {
			console.log(`Hubo un error desmuteando a: ${error}`);
			await interaction.reply({
				content: 'Hubo un error al intentar desmutear al miembro.',
				ephemeral: true,
			});
		}
	},
};
