const { EmbedBuilder } = require('discord.js');

module.exports = {
    name: 'hora',
    description: 'Contesta con la hora.',
    callback: async (client, interaction) => {
        await interaction.deferReply();

        const timestampBot = `<t:${Math.floor(Date.now() / 1000)}:T>`;
        const embed = new EmbedBuilder()
            .setColor('#0099ff')
            .setTitle('Hora')
            .setDescription(`Son las ${timestampBot}`);

        await interaction.editReply({ embeds: [embed] });
    }
};