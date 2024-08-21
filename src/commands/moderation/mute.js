const {
	ApplicationCommandOptionType,
	EmbedBuilder,
	PermissionFlagsBits,
} = require('discord.js');
const ms = require('ms');
module.exports = {
	name: 'mute',
	description: 'Mutear a un miembro del servidor.',
	options: [
		{
			name: 'miembro',
			description: 'Miembro a mutear.',
			type: ApplicationCommandOptionType.User,
			required: true,
		},
		{
			name: 'duración',
			description: 'Duración del muteo.',
			type: ApplicationCommandOptionType.String,
			required: true,
		},
		{
			name: 'razón',
			description: 'Razón del muteo.',
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
		const duracion = interaction.options.get('duración').value;
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
				content: 'No puedo mutear a un bot.',
				ephemeral: true,
			});
			return;
		}
		if (miembro.id === interaction.guild.ownerId) {
			await interaction.reply({
				content:
					'No podés mutear a ese miembro porque es el líder del servidor.',
				ephemeral: true,
			});
			return;
		}
		const msDuracion = ms(duracion);
		if (isNaN(msDuracion)) {
			await interaction.reply({
				content: 'Proveer una duración de muteo válida',
				ephemeral: true,
			});
			return;
		}
		if (msDuracion < 1000 || msDuracion > 2.419e9) {
			await interaction.reply({
				content:
					'La duración de muteo tiene que ser entre 1 segundo y 28 días.',
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
					'No podés mutear a ese miembro porque tiene el mismo rol o un rol superior al tuyo.',
				ephemeral: true,
			});
			return;
		}
		if (miembroPosicionRol >= botPosicionRol) {
			await interaction.reply({
				content:
					'No puedo mutear a ese miembro porque tiene el mismo rol o un rol superior que yo.',
				ephemeral: true,
			});
			return;
		}
		try {
			const { default: prettyMs } = await import('pretty-ms');
			if (
				miembro.communicationDisabledUntilTimestamp &&
				miembro.communicationDisabledUntilTimestamp > Date.now()
			) {
				const embed = new EmbedBuilder()
					.setDescription(
						`***El muteo de ${miembro} fué actualizado.*** | __Duración__: ${prettyMs(
							msDuracion
						)} | __Razón__: ${razon}`
					)
					.setColor('#D86700');
				await miembro.timeout(msDuracion, razon);
				await interaction.reply({
					embeds: [embed],
					ephemeral: false,
				});
			} else {
				const embed = new EmbedBuilder()
					.setDescription(
						`***${miembro} fué muteado.*** | __Duración__: ${prettyMs(
							msDuracion
						)} | __Razón__: ${razon}`
					)
					.setColor('#D86700');
				await miembro.timeout(msDuracion, razon);
				await interaction.reply({
					embeds: [embed],
					ephemeral: false,
				});
			}
		} catch (error) {
			console.log(`Hubo un error muteando a: ${error}`);
		}
	},
};
