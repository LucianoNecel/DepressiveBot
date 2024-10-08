const getLocalCommands = require('../../utils/getLocalCommands');
const server = process.env.GUILD_ID;
const devs = process.env.DEVS_ID;
module.exports = async (client, interaction) => {
	if (!interaction.isChatInputCommand()) return;
	const localCommands = getLocalCommands();
	try {
		const commandObject = localCommands.find(
			(cmd) => cmd.name === interaction.commandName
		);
		if (!commandObject) return;
		if (commandObject.devOnly) {
			if (!devs.includes(interaction.member.id)) {
				interaction.reply({
					content: 'Solo los desarrolladores puede ejecutar este comando.',
					ephemeral: true,
				});
				return;
			}
		}
		if (commandObject.testOnly) {
			if (!(interaction.guild.id === server)) {
				interaction.reply({
					content: 'Este comando no se puede ejecutar acá.',
					ephemeral: true,
				});
				return;
			}
		}
		if (commandObject.permissionsRequired?.length) {
			for (const permission of commandObject.permissionsRequired) {
				if (!interaction.member.permissions.has(permission)) {
					interaction.reply({
						content: 'No tenés suficientes permisos.',
						ephemeral: true,
					});
					return;
				}
			}
		}
		if (commandObject.botPermissions?.length) {
			for (const permission of commandObject.botPermissions) {
				const bot = interaction.guild.members.me;
				if (!bot.permissions.has(permission)) {
					interaction.reply({
						content: 'No tengo suficientes permisos.',
						ephemeral: true,
					});
					return;
				}
			}
		}
		await commandObject.callback(client, interaction);
	} catch (error) {
		console.log(`Hubo un error ejecutando este comando: ${error}`);
	}
};
