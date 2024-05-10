const traduccionesCondicion = {
	Clear: 'Despejado',
	Sunny: 'Soleado',
	'Partly cloudy': 'Parcialmente nublado',
	Cloudy: 'Nublado',
	Overcast: 'Cubierto',
	Rain: 'Lluvia',
	Showers: 'Chubascos',
	Thunderstorm: 'Tormenta eléctrica',
	Snow: 'Nieve',
	Mist: 'Niebla',
	Fog: 'Neblina',
	Hail: 'Granizo',
	Drizzle: 'Llovizna',
	Sleet: 'Aguanieve',
	'Freezing rain': 'Lluvia helada',
	Blizzard: 'Ventisca',
	Tornado: 'Tornado',
	Dust: 'Polvo',
	Smoke: 'Humo',
	Sandstorm: 'Tormenta de arena',
	'Light rain': 'Lluvia leve',
	'Freezing fog': 'Niebla helada',
};

function traducirCondicion(condicion) {
	return traduccionesCondicion[condicion] || condicion;
}

module.exports = { traducirCondicion };
