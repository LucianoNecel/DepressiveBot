function saludoAleatorio() {
	const saludos = [
		'¡Hola! ¿Cómo estás ',
		'¿Qué tal estás ',
		'¿Cómo va ',
		'¡Hola! ¿Todo bien ',
	];
	const indice = Math.floor(Math.random() * saludos.length);
	return saludos[indice];
}

module.exports = { saludoAleatorio };
