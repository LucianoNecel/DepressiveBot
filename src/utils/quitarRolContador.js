require('dotenv').config();

module.exports = (client) => {
	const tiempoEspera = 1 * 60 * 1000;
	setInterval(async () => {
		const date = new Date();
		const guild = client.guilds.cache.get(process.env.GUILD_ID);
		const channel = guild.channels.cache.get(process.env.CHANNEL_ID_GENERAL);
		const role = guild.roles.cache.get(process.env.ROLE_ID_CONTADOR);

		if (date.getDay() === 5) {
			console.log(`Es viernes`);
			if (!guild) {
				console.error('Fallo en obtener el ID del servidor.');
				return;
			}
			if (!channel) {
				console.error('Fallo en obtener el ID del canal.');
				return;
			}
			if (!role) {
				console.error('Fallo en obtener el ID del rol.');
				return;
			}

			await guild.members.fetch();

			const membersWithRole = guild.members.cache.filter((member) =>
				member.roles.cache.has(process.env.ROLE_ID_CONTADOR)
			);

			for (const member of membersWithRole.values()) {
				await member.roles.remove(role, 'Es viernes, se quitó el rol.');
			}

			if (membersWithRole.size === 1) {
				const mentions = membersWithRole
					.map((member) => `<@${member.user.id}>`)
					.join(' ');
				await channel.send(
					`${mentions} Ya podés volver a escribir en el contador.`
				);
			} else if (membersWithRole.size > 1) {
				const mentions = membersWithRole
					.map((member) => `<@${member.user.id}>`)
					.join(' ');
				await channel.send(
					`${mentions} Ya pueden volver a escribir en el contador.`
				);
			}
		} else {
			console.log(`No es viernes`);
		}
	}, tiempoEspera);
};
