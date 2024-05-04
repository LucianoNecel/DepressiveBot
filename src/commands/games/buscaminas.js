const { Minesweeper } = require('discord-gamecord');

module.exports = {
  name: 'buscaminas', 
  description: 'Jugá al buscaminas!',

  callback: async (client, interaction) => {
    const partida = new Minesweeper({
      message: interaction,
      isSlashGame: true,
      embed: {
          title: 'Buscaminas',
          color: '#5865F2',
          description: 'Presiona en los botones para revelar los bloques excepto las minas'
      },
      emojis: { bandera: '🚩', mina: '💣' },
      minas: 5,
      timeoutTime: 60000,
      winMessage: '¡Ganaste la partida!',
      loseMessage: '¡Perdiste la partida!',
      playerOnlyMessage: 'Solo {player} puede usar los botones.'
    });
    partida.startGame();
  },
};