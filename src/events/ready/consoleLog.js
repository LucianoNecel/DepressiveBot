const { ActivityType } = require('discord.js');

module.exports = (client) => {
    console.log(`✅ ${client.user.tag} está en línea!`);

    client.user.setActivity({
        name: 'mejoras de código',
        type: ActivityType.Watching,
    })
};