const quitarRolContador = (client) => {
    setInterval(async () => {
        const currentDate = new Date();
        
        if (currentDate.getDay() === 5) {
          const guild = client.guilds.cache.get(process.env.GUILD_ID);
          const role = guild.roles.cache.get(process.env.ROLE_ID);
          const channel = guild.channels.cache.get(process.env.CHANNEL_ID);
      
          if (!guild || !role || !channel) {
            return;
          }
      
          await guild.members.fetch();
      
          const membersWithRole = guild.members.cache.filter(member => member.roles.cache.has(process.env.ROLE_ID));
      
          for (const member of membersWithRole.values()) {
            await member.roles.remove(role, 'Es viernes, se quitó el rol.');
          }
      
          if (membersWithRole.size > 0) {
            const mentions = membersWithRole.map(member => `<@${member.user.id}>`).join(' ');
            await channel.send(`${mentions} Ya pueden volver a escribir en el contador.`);
          }
        } else {

        }
    }, 60 * 60 * 1000);
}

module.exports = {quitarRolContador};