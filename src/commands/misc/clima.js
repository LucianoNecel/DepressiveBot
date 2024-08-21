const { ApplicationCommandOptionType, EmbedBuilder } = require('discord.js');
const { traducirCondicion } = require('../../utils/traducirCondicion.js');
const axios = require('axios');
const API_KEY = process.env.API_KEY_WEATHERAPI;
module.exports = {
	name: 'clima',
	description: 'Muestra el clima de la ciudad especificada.',
	options: [
		{
			name: 'ciudad',
			type: ApplicationCommandOptionType.String,
			description: 'Selecciona tu ciudad',
			required: true,
		},
	],
	callback: async (client, interaction) => {
		await interaction.deferReply();
		const ciudad = interaction.options.getString('ciudad').toLowerCase();
		if (!ciudad) {
			await interaction.editReply('Por favor, especifica una ciudad.');
			return;
		}
		try {
			const weatherResponse = await axios.get(
				`http://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${encodeURIComponent(
					ciudad
				)}`
			);
			const data = weatherResponse.data;
			const embed = new EmbedBuilder()
				.setColor('#0099ff')
				.setTitle(`Clima actual en ${data.location.name}`)
				.addFields(
					{
						name: 'Temperatura',
						value: `${data.current.temp_c}°C`,
						inline: true,
					},
					{
						name: 'Sensación Térmica',
						value: `${data.current.feelslike_c}°C`,
						inline: true,
					},
					{
						name: 'Condición',
						value: traducirCondicion(data.current.condition.text),
						inline: true,
					},
					{ name: 'Humedad', value: `${data.current.humidity}%`, inline: true },
					{
						name: 'Viento',
						value: `${data.current.wind_kph} km/h`,
						inline: true,
					},
					{
						name: 'Precipitaciones',
						value: `${data.current.precip_mm} mm`,
						inline: true,
					},
					{
						name: 'Última actualización',
						value: `${data.current.last_updated}`,
						inline: true,
					}
				);
			await interaction.editReply({ embeds: [embed] });
		} catch (error) {
			await interaction.editReply('Ocurrió un error al obtener el clima.');
		}
	},
};
