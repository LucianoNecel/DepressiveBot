const { ApplicationCommandOptionType, EmbedBuilder } = require('discord.js');
module.exports = {
	name: 'userinfo',
	description: 'Muestra información sobre un usuario.',
	options: [
		{
			name: 'usuario',
			description: 'El usuario sobre el cual obtener información.',
			type: ApplicationCommandOptionType.User,
			required: false,
		},
	],
	callback: async (client, interaction) => {
		const userOption =
			interaction.options.getUser('usuario') || interaction.user;
		const member = await interaction.guild.members.fetch(userOption.id);
		const rolesWithColor = member.roles.cache.filter(
			(role) => role.color !== 0
		);
		const highestRoleWithColor =
			rolesWithColor.size > 0
				? rolesWithColor.sort((a, b) => b.position - a.position).first()
				: null;
		const roleColor = highestRoleWithColor
			? highestRoleWithColor.color
			: '#2F3136';
		const activities = member.presence?.activities || [];
		const activity = activities.length > 0 ? activities[0] : null;
		const stateTranslations = {
			online: ':green_circle: En línea',
			idle: ':crescent_moon: Ausente',
			dnd: ':no_entry: No molestar',
			offline: ':red_circle: Desconectado',
			undefined: ':red_circle: Desconectado',
		};
		const embed = new EmbedBuilder()
			.setTitle(member.nickname || member.user.username)
			.setURL(`https://discord.com/users/${member.id}`)
			.setThumbnail(member.user.displayAvatarURL({ dynamic: true }))
			.addFields(
				{ name: ':id: ID:', value: `${userOption.id}`, inline: false },
				{
					name: 'Estado:',
					value:
						stateTranslations[member.presence?.status] ||
						`${member.presence?.status}`,
					inline: false,
				},
				{
					name: 'Usuario:',
					value: `${member.user.tag}`,
					inline: true,
				},
				{
					name: 'Nombre:',
					value: `${member.user.username}`,
					inline: true,
				},
				{
					name: 'Nick:',
					value: `${member.nickname || 'No tiene nick'}`,
					inline: true,
				},
				{
					name: ':new: Creación de cuenta:',
					value: `<t:${parseInt(userOption.createdTimestamp / 1000)}:f>`,
					inline: true,
				},
				{
					name: ':calendar: Ingreso al servidor:',
					value: `<t:${parseInt(member.joinedTimestamp / 1000)}:f>`,
					inline: true,
				},
				{
					name: ':closed_lock_with_key: Roles:',
					value:
						member.roles.cache
							.filter((role) => role.id !== interaction.guild.id)
							.sort((a, b) => b.position - a.position)
							.map((role) => `<@&${role.id}>`)
							.join(', ') || 'No tiene roles',
					inline: false,
				},
				{
					name: ' ',
					value: ' ',
					inline: false,
				}
			)
			.setColor(roleColor)
			.setFooter({
				text: `Solicitado por ${interaction.user.tag}`,
				iconURL: interaction.user.displayAvatarURL({ dynamic: true }),
			})
			.setTimestamp();
		if (activities.length === 0) {
			embed.addFields({
				name: 'Actividad:',
				value: ':zzz: No está realizando ninguna actividad',
				inline: false,
			});
		} else {
			embed.addFields({
				name: 'Actividad:',
				value: ' ',
				inline: false,
			});
			activities.forEach((activity) => {
				let tipoActividad;

				switch (activity.type) {
					case 0:
						tipoActividad = ':video_game: Jugando a';
						break;
					case 1:
						tipoActividad = ':movie_camera: Transmitiendo';
						break;
					case 2:
						tipoActividad = ':musical_note: Escuchando';
						break;
					case 3:
						tipoActividad = ':tv: Mirando';
						break;
					case 4:
						tipoActividad = ' ';
						break;
					case 5:
						tipoActividad = ':trophy: Compitiendo';
						break;
					default:
						tipoActividad = ' ';
				}
				embed.addFields({
					name: `${tipoActividad} ${activity.name}`,
					value: activity.details ? `${activity.details}` : 'Sin detalles',
					inline: false,
				});
			});
		}
		await interaction.reply({ embeds: [embed] });
	},
};
