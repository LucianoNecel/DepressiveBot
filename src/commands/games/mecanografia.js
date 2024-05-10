const { FastType } = require('discord-gamecord');
const { oracionAleatoria } = require('../../utils/oracionAleatoria');

module.exports = {
	name: 'mecanografia',
	description: 'Jugá a completar el texto antes que termine el tiempo!',

	callback: async (client, interaction) => {
		const oracion = oracionAleatoria();
		const partida = new FastType({
			message: interaction,
			isSlashGame: true,
			embed: {
				title: 'Mecanografía',
				color: '#5865F2',
				description: 'Tenés {time} segundos para escribir la oración de abajo:',
			},
			timeoutTime: 60000,
			sentence: oracion,
			winMessage:
				'Ganaste! Terminaste de escribir la oración en {time} segundos con un PPM de {wpm}.',
			loseMessage: 'Perdiste! No escribiste la oración correcta a tiempo.',
		});
		partida.startGame();
	},
};
