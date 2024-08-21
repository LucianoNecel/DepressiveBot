const { EmbedBuilder } = require('discord.js');
module.exports = {
	name: 'roles',
	description: 'Muestra todos los roles del servidor.',
	callback: async (client, interaction) => {
		const guild = interaction.guild;
		let roleList = '';
		let count = 1;
		const roles = guild.roles.cache
			.sort((a, b) => b.position - a.position)
			.map((role) => {
				const memberCount = role.members.size;
				return `\`${count++}.\` <@&${role.id}>  ${memberCount} ${
					memberCount !== 1 ? 'miembros' : 'miembro'
				}\n`;
			});
		for (const roleString of roles) {
			roleList += roleString;
		}
		const MAX_LENGTH = 4096;
		const embeds = [];
		while (roleList.length > MAX_LENGTH) {
			const splitIndex = roleList.lastIndexOf('\n', MAX_LENGTH - 1);
			const part = roleList.slice(
				0,
				splitIndex === -1 ? MAX_LENGTH : splitIndex
			);
			embeds.push(
				new EmbedBuilder()
					.setTitle(`Roles (${guild.roles.cache.size})`)
					.setDescription(part)
					.setColor('440000')
					.setFooter({
						text: `Solicitado por ${interaction.user.tag}`,
						iconURL: interaction.user.displayAvatarURL({ dynamic: true }),
					})
					.setTimestamp()
			);
			roleList = roleList.slice(part.length).trim();
		}
		if (roleList.length > 0) {
			embeds.push(
				new EmbedBuilder()
					.setTitle(`Roles (${guild.roles.cache.size})`)
					.setDescription(roleList)
					.setColor('440000')
					.setFooter({
						text: `Solicitado por ${interaction.user.tag}`,
						iconURL: interaction.user.displayAvatarURL({ dynamic: true }),
					})
					.setTimestamp()
			);
		}
		try {
			await interaction.reply({ embeds: embeds });
		} catch (error) {
			console.error('Error al enviar los embeds:', error);
			await interaction.reply({
				content: 'Hubo un error al intentar enviar los roles.',
				ephemeral: true,
			});
		}
	},
};
