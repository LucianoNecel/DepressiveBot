const { TicTacToe } = require('discord-gamecord');
const { ApplicationCommandOptionType } = require('discord.js');
module.exports = {
	name: 'tresenlinea',
	description: 'Jugá al tres en línea!',
	options: [
		{
			name: 'usuario',
			description: 'El usuario contra el que vas a jugar.',
			type: ApplicationCommandOptionType.User,
			required: true,
		},
	],
	callback: async (client, interaction) => {
		const partida = new TicTacToe({
			message: interaction,
			isSlashGame: true,
			opponent: interaction.options.getUser('usuario'),
			embed: {
				title: 'Tres en línea',
				color: '#5865F2',
				statusTitle: 'Estado',
				overTitle: 'Partida finalizada',
			},
			emojis: {
				xButton: '❌',
				oButton: '🔵',
				blankButton: '➖',
			},
			mentionUser: true,
			timeoutTime: 60000,
			xButtonStyle: 'DANGER',
			oButtonStyle: 'PRIMARY',
			turnMessage: '{emoji} | Es el turno de **{player}**.',
			winMessage: '{emoji} | **{player}** ganó la partida.',
			tieMessage: 'La partida empató!',
			timeoutMessage: 'La partida no se terminó, nadie ganó!',
			playerOnlyMessage: 'Solo {player} y {opponent} pueden usar los botones.',
		});
		partida.startGame();
	},
};
