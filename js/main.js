/**
 * UI ENGINE CORE - EDICIÓN ESPECIAL MES DEL CUMPLEAÑOS
 */

const DOM = {
    loader: document.getElementById('global-loader'),
    btnParty: document.getElementById('btn-party'),
    btnUnlock: document.getElementById('btn-vault-unlock'),
    btnAudio: document.getElementById('btn-audio-toggle'),
    audio: document.getElementById('bgm-player'),
    vaultContent: document.getElementById('vault-content'),
    dynamicGrid: document.getElementById('dynamic-grid'),
    avatar: document.getElementById('easter-egg-avatar')
};

const state = {
    isAudioPlaying: false,
    isGiftRevealed: false,
    avatarClicks: 0
};

// Mensajes limpios de la familia, enfocados en el mes de su cumpleaños
const messagesData = [
    {
        "id": 1,
        "icon": "☀️",
        "title": "Mi Compañera de Vida",
        "author": "De: Tu compañero de viaje",
        "text": "Gracias por ser el corazón y el alma de este hogar, y por hacer que cada día a tu lado valga la pena. Tu fuerza, tu alegría constante y la forma tan única en la que cuidas de todos nosotros son el motor que hace que nuestra familia funcione. Qué suerte tan inmensa tengo de compartir mi vida con una mujer tan extraordinaria."
    },
    {
        "id": 2,
        "icon": "🌸",
        "title": "Mi Mayor Ejemplo",
        "author": "De: Tu hermana",
        "text": "Mamá, gracias por ser siempre mi refugio seguro, mi confidente en los momentos clave y mi mejor amiga. Admiro muchísimo tu fuerza interna, tu generosidad sin límites y esa capacidad tan hermosa que tienes de sanar cualquier preocupación mía con solo una mirada o uno de tus abrazos. Ojalá el día de mañana pueda ser una mujer tan increíble como tú."
    },
    {
        "id": 3,
        "icon": "🏠",
        "title": "Mi Pilar Incondicional",
        "author": "De: Tu hijo Oscar",
        "text": "Gracias por creer en mí de forma incondicional en cada paso que doy, por apoyarme en cada meta que me propongo y por enseñarme el verdadero valor del esfuerzo con tu propio ejemplo diario. Saber que estás ahí me da la seguridad que necesito para comerme el mundo. Eres, y serás siempre, mi mayor orgullo."
    }
];

function renderMessages() {
    if (!DOM.dynamicGrid) return;
    
    DOM.dynamicGrid.innerHTML = messagesData.map(msg => `
        <div class="glass-shield dynamic-card" style="padding: 25px 20px; margin-bottom: 15px; text-align: center;">
            <div class="card-icon-bubble" style="font-size: 2.2rem; margin-bottom: 10px;">${msg.icon}</div>
            <h3 style="font-family: var(--font-heading); color: #d45d79; font-size: 1.3rem; margin-bottom: 5px;">${msg.title}</h3>
            <span class="card-author" style="display: block; font-size: 0.75rem; font-weight: 600; color: #7f8c8d; text-transform: uppercase; margin-bottom: 12px; letter-spacing: 1px;">${msg.author}</span>
            <p style="font-size: 0.92rem; line-height: 1.6; color: #555; text-align: justify; margin: 0;">${msg.text}</p>
        </div>
    `).join('');
}

function handleLoader() {
    if (DOM.loader) {
        setTimeout(() => {
            DOM.loader.classList.add('fade-out');
            setTimeout(() => DOM.loader.remove(), 600);
        }, 800);
    }
}

function runEpicConfetti() {
    const duration = 3.5 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 25, spread: 360, ticks: 50, zIndex: 9999 };

    function randomInRange(min, max) {
        return Math.random() * (max - min) + min;
    }

    const interval = setInterval(function() {
        const timeLeft = animationEnd - Date.now();
        if (timeLeft <= 0) return clearInterval(interval);

        const particleCount = 35 * (timeLeft / duration);
        window.confetti(Object.assign({}, defaults, { particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } }));
        window.confetti(Object.assign({}, defaults, { particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } }));
    }, 280);
}

function bindEvents() {
    if (DOM.btnParty) {
        DOM.btnParty.addEventListener('click', () => {
            window.confetti({
                particleCount: 80,
                spread: 60,
                origin: { y: 0.6 },
                colors: ['#d45d79', '#fbc5d8', '#fbe3b5']
            });
        });
    }

    if (DOM.btnUnlock) {
        DOM.btnUnlock.addEventListener('click', () => {
            if (state.isGiftRevealed) return;
            
            state.isGiftRevealed = true;
            DOM.btnUnlock.disabled = true;
            DOM.btnUnlock.textContent = "Desbloqueado con éxito ❤️";
            DOM.btnUnlock.style.backgroundColor = "#2ecc71";

            if (DOM.vaultContent) {
                DOM.vaultContent.classList.remove('hidden-layer');
                DOM.vaultContent.classList.add('reveal-layer');
                
                setTimeout(() => {
                    DOM.vaultContent.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }, 350);
            }
            
            runEpicConfetti();
        });
    }

    if (DOM.btnAudio && DOM.audio) {
        DOM.btnAudio.addEventListener('click', () => {
            state.isAudioPlaying = !state.isAudioPlaying;
            if (state.isAudioPlaying) {
                DOM.audio.play().catch(() => console.log("Autoplay interactivo requerido."));
                DOM.btnAudio.textContent = '🎵 On';
                DOM.btnAudio.style.backgroundColor = '#3498db';
                DOM.btnAudio.style.color = '#fff';
            } else {
                DOM.audio.pause();
                DOM.btnAudio.textContent = '🎵 Off';
                DOM.btnAudio.style.backgroundColor = 'rgba(0, 0, 0, 0.05)';
                DOM.btnAudio.style.color = 'inherit';
            }
        });
    }
}

document.addEventListener('DOMContentLoaded', () => {
    renderMessages(); 
    bindEvents();
    handleLoader();
});