module.exports = (thread) => {
  const tiempoEspera = 10 * 60 * 1000;
  console.log(`En 10 minutos se bloqueará el hilo "${thread.name}".`);

  setTimeout(() => {
    thread.setLocked(true);
    console.log(`Pasaron 10 minutos, se bloqueó el hilo "${thread.name}".`);
  }, tiempoEspera);
}