require('dotenv').config();
const { cargarFallos } = require('../../utils/cargarFallos.js');
const { guardarFallos } = require('../../utils/guardarFallos.js');

module.exports = async (client, message) => {
	try {
		if (message.channel.id === process.env.CHANNEL_ID_CONTADOR) {
			if (
				message.author.id === process.env.CLIENT_ID_CONTADOR &&
				message.content.includes('LO ARRUINASTE EN')
			) {
				const inicioMensaje = message.content.indexOf('<@') + 2;
				const finMensaje = message.content.indexOf('>');
				const idUsuario = message.content.slice(inicioMensaje, finMensaje);
				const usuarioQueFallo = message.guild.members.cache.get(idUsuario);

				if (usuarioQueFallo) {
					const nombreUsuario = usuarioQueFallo.user.username;
					let fallos = cargarFallos();

					if (!fallos[nombreUsuario]) {
						fallos[nombreUsuario] = 1;
					} else {
						fallos[nombreUsuario]++;
					}
					guardarFallos(fallos);
				}
			}
		}
	} catch (error) {
		console.log(error);
	}
};
