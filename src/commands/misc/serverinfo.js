const { EmbedBuilder, ChannelType } = require('discord.js');
module.exports = {
	name: 'serverinfo',
	description: 'Muestra información sobre el servidor.',
	callback: async (client, interaction) => {
		const guild = interaction.guild;
		const owner = await guild.fetchOwner();
		const totalMembers = guild.memberCount;
		const onlineMembers = guild.members.cache.filter(
			(member) => member.presence?.status === 'online'
		).size;
		const userCount = guild.members.cache.filter(
			(member) => !member.user.bot
		).size;
		const onlineUsers = guild.members.cache.filter(
			(member) => !member.user.bot && member.presence?.status === 'online'
		).size;
		const botCount = guild.members.cache.filter(
			(member) => member.user.bot
		).size;
		const onlineBots = guild.members.cache.filter(
			(member) => member.user.bot && member.presence?.status === 'online'
		).size;
		const roleCount = guild.roles.cache.size;
		const categoryChannels = guild.channels.cache.filter(
			(channel) => channel.type === ChannelType.GuildCategory
		).size;
		const textChannels = guild.channels.cache.filter(
			(channel) => channel.type === ChannelType.GuildText
		).size;
		const voiceChannels = guild.channels.cache.filter(
			(channel) => channel.type === ChannelType.GuildVoice
		).size;
		const totalChannels = categoryChannels + textChannels + voiceChannels;
		const createdAt = guild.createdAt.toLocaleDateString('es-ES', {
			day: '2-digit',
			month: '2-digit',
			year: 'numeric',
		});
		const nitroBoosts = guild.premiumSubscriptionCount;
		const region = guild.preferredLocale;
		const embed = new EmbedBuilder()
			.setAuthor({
				name: guild.name,
				iconURL: guild.iconURL({ dynamic: true }),
			})
			.setThumbnail(guild.iconURL({ dynamic: true }))
			.addFields(
				{
					name: `:id: ID:`,
					value: `${guild.id}`,
					inline: false,
				},
				{ name: ':crown: Propietario:', value: owner.user.tag, inline: true },
				{
					name: ':calendar: Fecha de creación:',
					value: createdAt,
					inline: true,
				},
				{ name: ':earth_americas: Región:', value: region, inline: true },
				{
					name: `:busts_in_silhouette: Miembros: ${totalMembers} | ${onlineMembers} en línea ឵឵឵ ឵឵឵ ឵឵ ឵឵឵ ឵឵឵ ឵឵឵ ឵឵឵ ឵឵឵ ឵឵឵ ឵឵឵ ឵឵឵ ឵឵឵ ឵឵឵ ឵឵឵ ឵឵឵`,
					value: `:man_curly_haired_tone1: Usuarios: **${userCount}** | ${onlineUsers} en línea\n:robot: Bots: **${botCount}** | ${onlineBots} en línea\n:rocket: Mejoras de Nitro: **${nitroBoosts}**`,
					inline: true,
				},
				{
					name: `:speech_balloon: Canales (${totalChannels})`,
					value: `Categoría: **${categoryChannels}**\nTexto: **${textChannels}**\nVoz: **${voiceChannels}**`,
					inline: true,
				},
				{
					name: `:closed_lock_with_key: Roles (${roleCount})`,
					value: `Para ver una lista con todos los roles usa /roles`,
					inline: false,
				}
			)
			.setColor('#440000')
			.setFooter({
				text: `Solicitado por ${interaction.user.tag}`,
				iconURL: interaction.user.displayAvatarURL({ dynamic: true }),
			})
			.setTimestamp();
		await interaction.reply({ embeds: [embed] });
	},
};
