const { testServer } = require('../../../config.json');
const areCommandsDifferent = require('../../utils/areCommandsDifferent');
const getApplicationCommands = require('../../utils/getApplicationCommands');
const getLocalCommands = require('../../utils/getLocalCommands');

module.exports = async (client) => {
	try {
		const localCommands = getLocalCommands();
		const applicationCommands = await getApplicationCommands(
			client,
			testServer
		);

		for (const localCommand of localCommands) {
			const { name, description, options } = localCommand;

			const existingCommand = await applicationCommands.cache.find(
				(cmd) => cmd.name === name
			);

			if (existingCommand) {
				if (localCommand.deleted) {
					await applicationCommands.delete(existingCommand.id);
					console.log(`🗑 Se eliminó el comando "${name}".`);
					continue;
				}

				if (areCommandsDifferent(existingCommand, localCommand)) {
					await applicationCommands.edit(existingCommand.id, {
						description,
						options,
					});

					console.log(`🔁 Se editó el comando "${name}".`);
				}
			} else {
				if (localCommand.deleted) {
					console.log(
						`⏩ Se saltó el registro del comando "${name}" ya que está establecido para borrar.`
					);
					continue;
				}

				await applicationCommands.create({
					name,
					description,
					options,
				});

				console.log(`👍 Se registró el comando "${name}."`);
			}
		}
	} catch (error) {
		console.log(`Hubo un error: ${error}`);
	}
};
