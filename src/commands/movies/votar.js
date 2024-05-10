const { UserSelectMenuBuilder, ActionRowBuilder, ComponentType } = require('discord.js');
const { nombrex } = require('./pelicula.js');
const bloquearHilo = require('../../utils/bloquearHilo.js');
const slowmodeHilo = require('../../utils/slowmodeHilo.js');

module.exports = {
    name: 'votar',
    description: 'Elegir miembros que puedan votar la película.',
  
    callback: async (client, interaction) => {

        const userSelect = new UserSelectMenuBuilder()
            .setCustomId('miembros')
            .setPlaceholder('Seleccionar miembros para votar.')
            .setMinValues(1)
            .setMaxValues(10);
        const row1 = new ActionRowBuilder().addComponents(userSelect);

        try {
            const reply = await interaction.reply({
                content: 'Seleccionar miembros para votar.',
                components: [row1],
                ephemeral: true,
            });

            const collector = reply.createMessageComponentCollector({
                componentType: ComponentType.UserSelect,
                filter: (i) => i.user.id === interaction.user.id && i.customId === 'miembros',
                time: 60_000,
            });

            collector.on('collect', async (interaction) => {
                const selectedUserIds = interaction.values;
                //const selectedUsers = selectedUserIds.map((userId) => interaction.guild.members.cache.get(userId));
                //const selectedUserTags = selectedUsers.map((user) => user ? user.user.tag : 'Miembro no encontrado.');
                const channel = interaction.guild.channels.cache.get(process.env.CHANNEL_ID_TAQUILLA);

                if (!channel) {
                    return interaction.reply({ content: 'No se encontró el canal para crear el hilo.', ephemeral: true });
                }

                const threadName = `Votación: ${nombrex}` || 'Nueva votación';
                const thread = await channel.threads.create({
                    name: threadName,
                    autoArchiveDuration: 60,
                    reason: 'Votación creada por ' + interaction.user.tag,
                });
                
                slowmodeHilo(thread);
                bloquearHilo(thread);

                for (const userId of selectedUserIds) {
                    const selectedUser = interaction.guild.members.cache.get(userId);
                    if (selectedUser) {
                        await thread.members.add(selectedUser.id);
                    }
                }

                await thread.send(`¿Qué puntaje le dan a la película "${nombrex}"?`);

                await interaction.reply({
                content: `Se ha creado un hilo para votar en el canal ${channel} con el nombre "${threadName}".`,
                ephemeral: true,
                });
            });
        } catch (error) {
            console.error('Error al responder la interacción:', error);
        }
    },
};