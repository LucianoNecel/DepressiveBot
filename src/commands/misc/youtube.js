const { ApplicationCommandOptionType, EmbedBuilder } = require('discord.js');
const axios = require('axios');
module.exports = {
	name: 'youtube',
	description: 'Busca un video en youtube.',
	options: [
		{
			name: 'buscar',
			description: 'Nombre del video a buscar.',
			type: ApplicationCommandOptionType.String,
			required: true,
		},
	],
	callback: async (client, interaction) => {
		const query = interaction.options.getString('buscar');
		const apiKey = process.env.API_KEY_YOUTUBE;
		const maxResults = 5;
		try {
			const response = await axios.get(
				`https://www.googleapis.com/youtube/v3/search`,
				{
					params: {
						part: 'snippet',
						q: query,
						maxResults: maxResults,
						type: 'video',
						key: apiKey,
					},
				}
			);
			const videos = response.data.items;
			if (videos.length === 0) {
				await interaction.reply({
					content: 'No se encontraron resultados en YouTube.',
					ephemeral: true,
				});
				return;
			}
			const embeds = videos.slice(0, 5).map((video) =>
				new EmbedBuilder()
					.setTitle(video.snippet.title)
					.setURL(`https://www.youtube.com/watch?v=${video.id.videoId}`)
					.setDescription(video.snippet.description || 'Sin descripción')
					.setColor('#FF0000')
					.setFooter({ text: `Publicado por ${video.snippet.channelTitle}` })
					.setThumbnail(video.snippet.thumbnails.high.url)
			);
			await interaction.reply({ embeds: embeds });
		} catch (error) {
			console.error('Error al buscar en YouTube:', error);
			await interaction.reply({
				content: 'Hubo un error al realizar la búsqueda en YouTube.',
				ephemeral: true,
			});
		}
	},
};
