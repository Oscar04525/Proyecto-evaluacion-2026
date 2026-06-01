/**
 * Application State
 */
const state = {
    isGiftUnlocked: false,
    clicksCount: 0
};

// Configuración de efectos de confeti
const targetConfettiConfig = {
    particleCount: 100,
    spread: 70,
    origin: { y: 0.6 }
};

/**
 * Lanza una ráfaga doble de confeti realista (estilo cañón lateral)
 */
const triggerEpicConfetti = () => {
    const duration = 3 * 1000;
    const end = Date.now() + duration;

    (function frame() {
        confetti({
            particleCount: 5,
            angle: 60,
            spread: 55,
            origin: { x: 0 }
        });
        confetti({
            particleCount: 5,
            angle: 120,
            spread: 55,
            origin: { x: 1 }
        });

        if (Date.now() < end) {
            requestAnimationFrame(frame);
        }
    }());
};

/**
 * Inicializador de EventListeners
 */
const initApp = () => {
    const btnMain = document.getElementById('btn-main');
    const btnUnlock = document.getElementById('btn-unlock');
    const secretContent = document.getElementById('secret-content');
    const floatingEmoji = document.getElementById('floating-emoji');
    const cards = document.querySelectorAll('.card');

    // Evento 1: Botón principal con feedback iterativo
    btnMain.addEventListener('click', () => {
        state.clicksCount++;
        
        // Dispara confeti estándar
        window.confetti(targetConfettiConfig);

        // Easter egg: Si hace click 5 veces seguidas, cambia el emoji
        if (state.clicksCount >= 5) {
            floatingEmoji.textContent = '👑👑👑';
            floatingEmoji.style.transform = 'scale(1.3)';
        }
    });

    // Evento 2: Mecánica de desbloqueo (Manejo del DOM)
    btnUnlock.addEventListener('click', (e) => {
        if (state.isGiftUnlocked) return;

        state.isGiftUnlocked = true;
        
        // Mutación de clases del DOM
        secretContent.classList.remove('hidden');
        secretContent.classList.add('visible');
        
        // Feedback visual en el botón
        e.target.disabled = true;
        e.target.textContent = "¡Desbloqueado con éxito! 🎉";
        e.target.style.backgroundColor = "#2ecc71";

        // Efecto premium continuo
        triggerEpicConfetti();
    });

    // Evento 3: Hover por CSS / JS interactivo en las cards para DAW flexin'
    cards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.borderColor = '#d45d79';
        });
        card.addEventListener('mouseleave', () => {
            card.style.borderColor = 'rgba(212, 93, 121, 0.1)';
        });
    });
};

// Asegurar la carga completa del DOM antes de inyectar lógica
document.addEventListener('DOMContentLoaded', initApp);