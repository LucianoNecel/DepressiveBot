function bloquearHilo(thread) {
    const tiempoEspera = 1 * 60 * 1000;
  
    setTimeout(() => {
      thread.setLocked(true);
      console.log(`Pasaron 5 minutos, se bloqueó el hilo "${thread.name}".`);
    }, tiempoEspera);
}
  
module.exports = {bloquearHilo};