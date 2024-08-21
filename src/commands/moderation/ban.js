const {
	ApplicationCommandOptionType,
	EmbedBuilder,
	PermissionFlagsBits,
} = require('discord.js');
module.exports = {
	name: 'ban',
	description: 'Bannear a un miembro del servidor.',
	options: [
		{
			name: 'miembro',
			description: 'Miembro a bannear.',
			type: ApplicationCommandOptionType.User,
			required: true,
		},
		{
			name: 'razón',
			description: 'Razón del banneo.',
			type: ApplicationCommandOptionType.String,
			min_length: 1,
			max_length: 512,
			required: false,
		},
	],
	permissionsRequired: [PermissionFlagsBits.BanMembers],
	botPermissions: [PermissionFlagsBits.BanMembers],
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
		if (miembro.id === interaction.guild.ownerId) {
			await interaction.reply({
				content:
					'No podés bannear a ese miembro porque es el líder del servidor.',
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
					'No podés bannear a ese miembro porque tiene el mismo rol o un rol superior al tuyo.',
				ephemeral: true,
			});
			return;
		}
		if (miembroPosicionRol >= botPosicionRol) {
			await interaction.reply({
				content:
					'No puedo bannear a ese miembro porque tiene el mismo rol o un rol superior que yo.',
				ephemeral: true,
			});
			return;
		}
		const embed = new EmbedBuilder()
			.setDescription(`***${miembro} fué banneado.*** | __Razón__: ${razon}`)
			.setColor('#B21613');
		try {
			await interaction.reply({
				embeds: [embed],
				ephemeral: false,
			});
			await miembro.ban({ razon });
		} catch (error) {
			console.log(`Hubo un error banneando a: ${error}`);
		}
	},
};
