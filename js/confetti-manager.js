/**
 * Dispara una ráfaga limpia e inmediata de confeti en el centro del viewport
 */
export function fireStandardConfetti() {
    window.confetti({
        particleCount: 120,
        spread: 80,
        origin: { y: 0.55 },
        colors: ['#d45d79', '#fbc5d8', '#fbe3b5', '#ffffff']
    });
}

/**
 * Ejecuta una animación continua asíncrona mediante bucle de renderizado nativo (High Performance)
 */
export function runEpicConfetti() {
    const duration = 4 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 9999 };

    function randomInRange(min, max) {
        return Math.random() * (max - min) + min;
    }

    const interval = setInterval(function() {
        const timeLeft = animationEnd - Date.now();

        if (timeLeft <= 0) {
            return clearInterval(interval);
        }

        const particleCount = 50 * (timeLeft / duration);
        
        // Cañones laterales alternando posiciones aleatorias en el eje X
        window.confetti(Object.assign({}, defaults, { particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } }));
        window.confetti(Object.assign({}, defaults, { particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } }));
    }, 250);
}