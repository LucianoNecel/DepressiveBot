module.exports = async (thread) => {
    if (!thread) {
        throw new Error('Falta el Objeto "thread"');
    }
    
    try {
        await thread.setRateLimitPerUser(600);
        console.log(`Slowmode de 10 minutos activado en "${thread.name}".`);
    } catch (error) {
        console.error('Error de slowmode:', error);
    }
}
