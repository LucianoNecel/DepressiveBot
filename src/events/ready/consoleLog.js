const { ActivityType } = require('discord.js');

const activities = [
	{ name: 'programar', type: ActivityType.Playing },
	{ name: 'dudas de usuarios', type: ActivityType.Listening },
	{ name: 'Google Generative AI', type: ActivityType.Watching },
	{ name: 'IPs', type: ActivityType.Watching },
];

let activityIndex = 0;

module.exports = (client) => {
	console.log(`✅ ${client.user.tag} está en línea!`);

	client.user.setPresence({
		activities: [activities[activityIndex]],
		status: 'online',
	});
	// Change the activity every 30000ms (30 seconds)
	setInterval(() => {
		activityIndex = (activityIndex + 1) % activities.length;
		client.user.setPresence({
			activities: [activities[activityIndex]],
			status: 'online',
		});
	}, 30000);
};
