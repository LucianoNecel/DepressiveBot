require('dotenv').config();
const { ActivityType } = require('discord.js');
const mongoose = require('mongoose');
const mongoURL = process.env.mongoURL;
const activities = [
	{ name: 'programar', type: ActivityType.Playing },
	{ name: 'dudas de usuarios', type: ActivityType.Listening },
	{ name: 'Google Generative AI', type: ActivityType.Watching },
	{ name: 'IPs', type: ActivityType.Watching },
];
let activityIndex = 0;
module.exports = async (client) => {
	console.log(`✅ ${client.user.tag} está en línea!`);
	client.user.setPresence({
		activities: [activities[activityIndex]],
		status: 'online',
	});
	setInterval(() => {
		activityIndex = (activityIndex + 1) % activities.length;
		client.user.setPresence({
			activities: [activities[activityIndex]],
			status: 'online',
		});
	}, 30000);
	try {
		await mongoose.connect(process.env.mongoURL || '', {});
		console.log('Se conectó a la base de datos!');
	} catch (error) {
		console.error('No se pudo conectar a la base de datos:', error.message);
	}
};
