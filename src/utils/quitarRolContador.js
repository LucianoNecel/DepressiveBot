require("dotenv").config();

module.exports = (client) => {
  setInterval(async () => {
    const currentDate = new Date();
    const guild = client.guilds.cache.get(process.env.GUILD_ID);
    if (!guild) {
      console.error('Fallo en obtener el ID del servidor.');
      return;
    }
    const channel = guild.channels.cache.get(process.env.CHANNEL_ID_GENERAL);
    if (!channel) {
      console.error('Fallo en obtener el ID del canal.');
      return;
    }
    if (currentDate.getDay() === 5) {
      const role = guild.roles.cache.get(process.env.ROLE_ID_CONTADOR);
      if (!role) {
        console.error('Fallo en obtener el ID del rol.');
        return;
      }
      await guild.members.fetch();

      const membersWithRole = guild.members.cache.filter(member => member.roles.cache.has(role));

      for (const member of membersWithRole.values()) {
        await member.roles.remove(role, 'Es viernes, se quitó el rol.');
      }

      if (membersWithRole.size > 0) {
        const mentions = membersWithRole.map(member => `<@${member.user.id}>`).join(' ');
        await channel.send(`${mentions} Ya pueden volver a escribir en el contador.`);
      }
    } else {
      console.log(`No es viernes`);
    }
  }, 60 * 60 * 1000);
}