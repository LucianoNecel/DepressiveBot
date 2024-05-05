const { ApplicationCommandOptionType, EmbedBuilder } = require('discord.js');
let nombrex = [];

module.exports = {
    name: 'pelicula',
    description: 'Subir película a la taquilla.',
    options: [
      {
        name: 'nombre',
        description: 'Nombre de la película.',
        type: ApplicationCommandOptionType.String,
        required: true
      },
      {
        name: 'día',
        description: 'Día en el que se verá la película. (Formato: 31/12)',
        type: ApplicationCommandOptionType.String,
        required: true
      },
      {
        name: 'hora',
        description: 'Hora a la que se verá la película. (Formato: 24:00)',
        type: ApplicationCommandOptionType.String,
        required: true
      },
      {
        name: 'trama',
        description: 'Trama de la película.',
        type: ApplicationCommandOptionType.String,
        required: true
      },
      {
        name: 'imagen',
        description: 'Imagen opcional de la película. (Formato: URL de la imagen)',
        type: ApplicationCommandOptionType.String,
        required: true
      }
    ],

    callback: async (client, interaction) => {
        const nombre = interaction.options.getString('nombre');
        const dia = interaction.options.getString('día');
        const hora = interaction.options.getString('hora');
        const trama = interaction.options.getString('trama');
        const imagen = interaction.options.getString('imagen');
        const propuestaPorNombre = interaction.user.tag;
        const propuestaPorFoto = interaction.user.displayAvatarURL();
        const voiceChannelId = process.env.CHANNEL_ID_CINEMAX;

        // Comprobamos si se han proporcionado todos los valores
        if (!nombre ||!dia ||!hora ||!trama ||!imagen) {
            return interaction.reply('Por favor, proporciona el nombre, el día, la hora, la trama y la imagen de la película.');
        }

        // Creamos un objeto EmbedBuilder
        const embed = new EmbedBuilder()
            .setTitle(`__**Película:**__ ${nombre}`)
            .setDescription(`__**Día:**__ ${dia}\n__**Hora:**__ ${hora}\n__**Trama:**__ ${trama}\n__**Sala:**__ <#${voiceChannelId}>\n \n**TODOS INVITADOS**\n**El que molesta, se va.**`)
            .setColor('#652ec7')
            .setFooter({ text: `Propuesta por: ${propuestaPorNombre}`, iconURL: `${propuestaPorFoto}` });

        // Añadimos la imagen al objeto EmbedBuilder si se ha proporcionado
        if (imagen) {
            embed.setImage(imagen);
        }

        // Respondemos a la interacción con el objeto EmbedBuilder
        await interaction.reply({ content: `¡La película "${nombre}" fue enviada!`, ephemeral: true });

        // Obtenemos el canal de la taquilla
        const targetChannel = interaction.guild.channels.cache.get(process.env.CHANNEL_ID_TAQUILLA);

        // Comprobamos si se ha encontrado el canal
        if (!targetChannel) {
            console.error('Error al enviar el mensaje: Canal no encontrado.');
            return;
        }

        // Creamos un nuevo hilo en el canal de la taquilla
        await targetChannel.send({ content: `<@&${process.env.ROLE_ID_PELICULAS}> ¡Nueva película disponible: ${nombre}!`, embeds: [embed] });
        if (nombrex.length === 0) {
            nombrex.push(nombre);
        } else if(nombrex.length > 0){
            nombrex.push(nombre);
            nombrex.shift();
        }
    },
    nombrex
};