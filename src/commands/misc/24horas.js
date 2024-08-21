require('dotenv').config();
const {
	ApplicationCommandOptionType,
	ChannelType,
	PermissionFlagsBits,
} = require('discord.js');
const CATEGORY_ID = process.env.CATEGORY_ID_24HS;
let intervalId;
let cuentaHoras = 0;
module.exports = {
	name: '24horas',
	description:
		'Crear canal de 24 horas y empezar conteo de horas o terminarlo.',
	options: [
		{
			name: 'accion',
			type: ApplicationCommandOptionType.String,
			description: 'Elegir una opción.',
			choices: [
				{
					name: 'Empezar',
					value: 'empezar',
				},
				{
					name: 'Terminar',
					value: 'terminar',
				},
			],
			required: true,
		},
	],
	permissionsRequired: [PermissionFlagsBits.ManageChannels],
	botPermissions: [PermissionFlagsBits.ManageChannels],
	callback: async (client, interaction) => {
		const opcion = interaction.options.getString('accion');
		if (opcion === 'empezar') {
			await interaction.deferReply({ ephemeral: true });
			const guild = interaction.guild;
			const nombreBaseCanal = '🚨┃';
			const nombreBaseCanal2 = '/24 horas ';
			const date = new Date();
			const fecha =
				('0' + date.getDate()).slice(-2) +
				'/' +
				('0' + (date.getMonth() + 1)).slice(-2) +
				'/' +
				('0' + date.getFullYear()).slice(-2);
			try {
				const canalVoz = await guild.channels.create({
					name: `${nombreBaseCanal}${cuentaHoras}${nombreBaseCanal2}${fecha}`,
					type: ChannelType.GuildVoice,
					parent: CATEGORY_ID,
				});
				const tiempoEspera = 60 * 60 * 1000;
				intervalId = setInterval(async () => {
					cuentaHoras += 1;
					const nombreNuevoCanal = `${nombreBaseCanal}${cuentaHoras}${nombreBaseCanal2}${fecha}`;
					const canalExistente = await guild.channels.cache.get(canalVoz.id);
					if (!canalExistente) {
						console.log(`El canal de voz "${nombreNuevoCanal}" fué eliminado.`);
						clearInterval(intervalId);
					} else {
						await canalVoz.setName(nombreNuevoCanal);
					}
				}, tiempoEspera);
				await interaction.editReply({
					content: `Canal de voz creado: <#${canalVoz.id}>`,
					ephemeral: true,
				});
			} catch (error) {
				console.error('Error al crear el canal de voz:', error);
				await interaction.editReply({
					content: 'Hubo un error al crear el canal de voz.',
					ephemeral: true,
				});
			}
		} else if (opcion === 'terminar') {
			try {
				clearInterval(intervalId);
				console.log(
					`Se terminó el conteo del canal! Horas contadas: ${cuentaHoras}`
				);
				await interaction.reply({
					content: `Se terminó el conteo del canal! Horas contadas: ${cuentaHoras}`,
					ephemeral: true,
				});
			} catch (error) {
				console.error(error);
			}
		}
	},
};
