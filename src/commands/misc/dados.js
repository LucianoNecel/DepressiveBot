const { ApplicationCommandOptionType } = require('discord.js');

module.exports = {
  name: 'dados', 
  description: 'Tira uno o más dados.',
  options: [{
      name: 'cantidad',
      description: 'Cantidad de dados a tirar.',
      type: ApplicationCommandOptionType.Integer,
      required: false
    }
  ],

  callback: async (client, interaction) => {
    await interaction.deferReply();

    const cantidadDados = interaction.options.getInteger('cantidad') || 1;
    const resultados = [];

    for (let i = 0; i < cantidadDados; i++) {
      const resultadoDado = Math.floor(Math.random() * 6) + 1;
      resultados.push(resultadoDado);
    }

    const mensaje = `Resultados de los dados: ${resultados.join(', ')}`;

    await interaction.editReply({ content: mensaje });
  },
};