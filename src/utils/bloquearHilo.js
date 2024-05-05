function bloquearHilo(thread) {
    const tiempoEspera = 10 * 60 * 1000;
  
    setTimeout(() => {
      thread.setLocked(true);
      console.log(`Pasaron 10 minutos, se bloqueó el hilo "${thread.name}".`);
    }, tiempoEspera);
}
  
module.exports = {bloquearHilo};