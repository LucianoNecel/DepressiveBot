const {cargarFallos} = require('../../cargarFallos.js');

module.exports = {
    name: 'fallos',
    description: 'Ranking de fallos en el contador.',

    callback: async (client, interaction) => {
        await interaction.deferReply();

        let fallos = cargarFallos();
        const listaFallos = Object.entries(fallos);
        listaFallos.sort((a, b) => b[1] - a[1]);
        let mensajeRanking = "```yaml\n" + "Ranking de quien cortó más veces el contador a partir del 06/06/23:\n" + "```"
        mensajeRanking += "```js\n";
        listaFallos.forEach((item, index) => {
            const usuario = item[0];
            const cantidadFallos = item[1];
            mensajeRanking += `${index + 1}° : ${usuario} (${cantidadFallos})\n`;
        });
        mensajeRanking += "```\n";

        await interaction.editReply({ content: mensajeRanking });
    }
};