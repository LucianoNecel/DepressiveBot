function oracionAleatoria() {
	const oraciones = [
		'La niña salta a la comba en el patio, cantando una canción alegre mientras sus amigos la animan.',
		'El hombre joven toca la guitarra en la calle, deleitando a los transeúntes con su música.',
		'La mujer mayor lee un libro en el sofá, mientras su gato duerme tranquilamente a sus pies.',
		'El perro ladra con entusiasmo en la puerta, esperando que su dueño regrese a casa.',
		'El avión despega del aeropuerto, dejando atrás la ciudad y volando hacia nuevos horizontes.',
		'La lluvia cae suavemente sobre el tejado, creando una melodía relajante.',
		'El viento sopla a través de los árboles, susurrando secretos a las hojas.',
		'El sol brilla intensamente en el cielo, calentando la tierra y dando vida a las plantas.',
		'La luna ilumina suavemente la noche, guiando a los viajeros y creando un ambiente mágico.',
		'Las estrellas brillan en el firmamento, formando constelaciones que cuentan historias antiguas.',
		'El niño juega alegremente en el parque, balanceándose en los columpios y deslizándose por el tobogán.',
		'En el oscuro rincón de la mente humana, la psicología encuentra sus mayores desafíos y sus más brillantes descubrimientos.',
		'Los astros guían nuestros destinos, según la antigua ciencia de la astrología, una danza cósmica que influye en nuestras vidas.',
		'En la infancia, el mundo es un lienzo en blanco esperando ser pintado con las experiencias y enseñanzas que formarán nuestra adultez.',
		'La medicina moderna es una mezcla de ciencia y arte, buscando sanar cuerpos y almas con precisión y compasión.',
		'En el altar de la fe, la religión ofrece consuelo y guía, una luz en la oscuridad de la incertidumbre humana.',
		'La mente de un niño es un universo de maravillas, donde la imaginación florece y los sueños se tejen con hilos de esperanza.',
		'La adultez es un viaje de descubrimiento y responsabilidad, donde las decisiones moldean nuestro destino y nuestras acciones hablan por nosotros.',
		'La psicología nos enseña a entendernos a nosotros mismos y a los demás, desentrañando los misterios del alma humana.',
		'En la inmensidad del cosmos, la astrología ve patrones que reflejan nuestras vidas en las estrellas que nos rodean.',
		'Los niños son la promesa del mañana, la semilla de un futuro que depende de cómo los nutrimos y cuidamos hoy.',
		'La medicina tradicional y la moderna se entrelazan, buscando aliviar el sufrimiento humano y prolongar la vida con conocimientos ancestrales y tecnología de vanguardia.',
		'La religión es el refugio del alma, donde las preguntas encuentran respuestas y la esperanza florece incluso en los tiempos más oscuros.',
		'En el juego de la vida, la infancia es el prólogo, lleno de risas y descubrimientos inocentes.',
		'La adultez nos confronta con las realidades del mundo, desafiándonos a crecer y adaptarnos a medida que avanzamos por el camino de la vida.',
		'La psicología forense desentraña los enigmas de la mente criminal, buscando justicia y comprensión en las profundidades de la psique humana.',
		'Las estrellas son testigos silenciosos de nuestro paso por la vida, según la creencia antigua de la astrología.',
		'Los niños son esponjas que absorben el conocimiento y la experiencia, moldeando su entendimiento del mundo y su lugar en él.',
		'La medicina holística abraza el cuerpo, la mente y el espíritu, buscando equilibrio y sanación en todas las dimensiones del ser.',
		'La religión es el vínculo entre lo divino y lo humano, ofreciendo consuelo en la adversidad y esperanza en la desesperación.',
		'La infancia es un jardín de posibilidades, donde cada semilla de experiencia crece para formar el paisaje de nuestra adultez.',
		'La psicología evolutiva explora cómo la mente humana ha sido moldeada por milenios de selección natural, adaptándose para sobrevivir y prosperar.',
		'En el firmamento nocturno, la astrología ve mapas de destino escritos en las estrellas.',
		'Los niños son pequeños exploradores, navegando el vasto océano del conocimiento con curiosidad y asombro.',
		'La medicina preventiva es la piedra angular de la salud pública, defendiendo contra las enfermedades antes de que puedan arraigarse.',
		'La religión es el hilo que une lo divino y lo humano, ofreciendo consuelo y orientación a quienes buscan respuestas más allá de lo tangible.',
		'La infancia es el tesoro más preciado, un tiempo de inocencia y maravilla que nunca puede ser recuperado una vez perdido.',
		'La psicología educativa busca entender cómo aprendemos y crecemos, para mejorar el proceso de enseñanza y desarrollo humano.',
		'En las constelaciones del cielo, la astrología ve patrones que reflejan nuestras vidas en el gran lienzo del universo.',
		'Los niños son espejos que reflejan nuestras esperanzas y temores, nuestros sueños más profundos y nuestras aspiraciones más elevadas.',
		'La medicina alternativa ofrece enfoques holísticos para la curación, abordando el cuerpo, la mente y el espíritu en busca de equilibrio y bienestar.',
		'La religión es el ancla del alma en un mundo turbulento, ofreciendo consuelo y dirección a quienes buscan significado en la vida.',
		'La infancia es un campo de juego donde la imaginación florece y los sueños se vuelven realidad con un simple susurro de magia.',
		'La psicología positiva nos recuerda que el optimismo y la gratitud pueden transformar nuestras vidas, incluso en los momentos más oscuros.',
		'Bajo el manto estrellado, la astrología ve signos y símbolos que guían nuestro camino a través del laberinto de la vida.',
		'Los niños son semillas de esperanza, que florecen en el jardín del mañana con el cuidado y el amor adecuados.',
		'La medicina tradicional sigue siendo un faro de esperanza para millones en todo el mundo, ofreciendo curación a través de métodos ancestrales y conocimientos transmitidos de generación en generación.',
		'La religión es el puente entre lo mundano y lo divino, ofreciendo consuelo y orientación a quienes buscan respuestas más allá de lo físico.',
		'La infancia es un lienzo en blanco esperando ser llenado con las pinceladas de la experiencia y el amor.',
		'La psicología evolutiva explora cómo la mente humana ha evolucionado para adaptarse a nuestro entorno cambiante, desde las cavernas hasta las ciudades.',
		'En las estrellas, la astrología ve la influencia de los dioses en nuestras vidas, una danza cósmica de destino y libre albedrío.',
		'Los niños son el futuro de la humanidad, una promesa de renovación y esperanza en un mundo lleno de desafíos.',
		'La medicina moderna es un faro de esperanza en un mundo plagado de enfermedades y dolores, ofreciendo curación y alivio a millones en todo el mundo.',
		'La religión es el refugio del alma en tiempos de tormenta, ofreciendo consuelo y fortaleza a quienes buscan paz y significado.',
		'La infancia es un río de sueños, donde cada ola lleva consigo la promesa de un mañana más brillante y lleno de posibilidades.',
		'La psicología cognitiva explora los laberintos de la mente humana, buscando comprender cómo pensamos, recordamos y aprendemos.',
		'En las estrellas, la astrología ve historias escritas en el cielo, un relato épico de amor, guerra y destino.',
		'Los niños son la luz en la oscuridad, recordándonos la belleza y la alegría que se encuentra en las cosas más simples de la vida.',
		'La medicina preventiva es la mejor defensa contra las enfermedades, promoviendo hábitos saludables y estilos de vida activos para una vida más larga y plena.',
		'La religión es el lazo que une lo divino y lo humano, ofreciendo consuelo y esperanza a aquellos que buscan respuestas más allá de lo físico.',
		'La infancia es un jardín de posibilidades, donde cada semilla de experiencia crece para formar el paisaje de nuestro futuro.',
		'La psicología del desarrollo estudia cómo cambiamos y crecemos a lo largo de la vida, desde la infancia hasta la vejez.',
		'En las estrellas, la astrología ve destinos entrelazados en un tapiz cósmico, cada hilo tejido con cuidado y precisión.',
		'Los niños son como rayos de sol en un día nublado, llenando nuestras vidas con su risa y su inocencia.',
		'La medicina moderna es un faro de esperanza en un mar de enfermedades, ofreciendo curas y tratamientos que antes solo existían en la imaginación.',
		'La religión es el susurro del alma en un mundo ruidoso, ofreciendo paz y consuelo a aquellos que buscan respuestas más allá de lo tangible.',
		'La infancia es un lienzo en blanco esperando ser llenado con las pinceladas de la experiencia y el amor.',
		'La psicología evolutiva explora cómo la mente humana ha evolucionado para adaptarse a nuestro entorno cambiante, desde las cavernas hasta las ciudades.',
		'En las estrellas, la astrología ve la influencia de los dioses en nuestras vidas, una danza cósmica de destino y libre albedrío.',
		'Los niños son el futuro de la humanidad, una promesa de renovación y esperanza en un mundo lleno de desafíos.',
		'La medicina moderna es un faro de esperanza en un mundo plagado de enfermedades y dolores, ofreciendo curación y alivio a millones en todo el mundo.',
		'La religión es el refugio del alma en tiempos de tormenta, ofreciendo consuelo y fortaleza a quienes buscan paz y significado.',
		'La infancia es un río de sueños, donde cada ola lleva consigo la promesa de un mañana más brillante y lleno de posibilidades.',
		'La psicología cognitiva explora los laberintos de la mente humana, buscando comprender cómo pensamos, recordamos y aprendemos.',
		'En las estrellas, la astrología ve historias escritas en el cielo, un relato épico de amor, guerra y destino.',
		'Los niños son la luz en la oscuridad, recordándonos la belleza y la alegría que se encuentra en las cosas más simples de la vida.',
		'La medicina preventiva es la mejor defensa contra las enfermedades, promoviendo hábitos saludables y estilos de vida activos para una vida más larga y plena.',
		'La religión es el lazo que une lo divino y lo humano, ofreciendo consuelo y esperanza a aquellos que buscan respuestas más allá de lo físico.',
		'La infancia es un jardín de posibilidades, donde cada semilla de experiencia crece para formar el paisaje de nuestro futuro.',
		'La psicología del desarrollo estudia cómo cambiamos y crecemos a lo largo de la vida, desde la infancia hasta la vejez.',
		'En las estrellas, la astrología ve destinos entrelazados en un tapiz cósmico, cada hilo tejido con cuidado y precisión.',
		'Los niños son como rayos de sol en un día nublado, llenando nuestras vidas con su risa y su inocencia.',
		'La medicina moderna es un faro de esperanza en un mar de enfermedades, ofreciendo curas y tratamientos que antes solo existían en la imaginación.',
		'La religión es el susurro del alma en un mundo ruidoso, ofreciendo paz y consuelo a aquellos que buscan respuestas más allá de lo tangible.',
		'La infancia es un lienzo en blanco esperando ser llenado con las pinceladas de la experiencia y el amor.',
		'La psicología evolutiva explora cómo la mente humana ha evolucionado para adaptarse a nuestro entorno cambiante, desde las cavernas hasta las ciudades.',
		'En las estrellas, la astrología ve la influencia de los dioses en nuestras vidas, una danza cósmica de destino y libre albedrío.',
		'Los niños son el futuro de la humanidad, una promesa de renovación y esperanza en un mundo lleno de desafíos.',
		'La medicina moderna es un faro de esperanza en un mundo plagado de enfermedades y dolores, ofreciendo curación y alivio a millones en todo el mundo.',
		'La religión es el refugio del alma en tiempos de tormenta, ofreciendo consuelo y fortaleza a quienes buscan paz y significado.',
		'La infancia es un río de sueños, donde cada ola lleva consigo la promesa de un mañana más brillante y lleno de posibilidades.',
		'La psicología cognitiva explora los laberintos de la mente humana, buscando comprender cómo pensamos, recordamos y aprendemos.',
		'En las estrellas, la astrología ve historias escritas en el cielo, un relato épico de amor, guerra y destino.',
		'Los niños son la luz en la oscuridad, recordándonos la belleza y la alegría que se encuentra en las cosas más simples de la vida.',
		'La medicina preventiva es la mejor defensa contra las enfermedades, promoviendo hábitos saludables y estilos de vida activos para una vida más larga y plena.',
		'La religión es el lazo que une lo divino y lo humano, ofreciendo consuelo y esperanza a aquellos que buscan respuestas más allá de lo físico.',
		'La infancia es un jardín de posibilidades, donde cada semilla de experiencia crece para formar el paisaje de nuestro futuro.',
		'La psicología del desarrollo estudia cómo cambiamos y crecemos a lo largo de la vida, desde la infancia hasta la vejez.',
		'En las estrellas, la astrología ve destinos entrelazados en un tapiz cósmico, cada hilo tejido con cuidado y precisión.',
		'Los niños son como rayos de sol en un día nublado, llenando nuestras vidas con su risa y su inocencia.',
		'La medicina moderna es un faro de esperanza en un mar de enfermedades, ofreciendo curas y tratamientos que antes solo existían en la imaginación.',
		'La religión es el susurro del alma en un mundo ruidoso, ofreciendo paz y consuelo a aquellos que buscan respuestas más allá de lo tangible.',
	];
	const indice = Math.floor(Math.random() * oraciones.length);
	return oraciones[indice];
}

module.exports = { oracionAleatoria };
