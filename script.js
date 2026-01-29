/* ============================================
   Amish Suchak's Portfolio - JavaScript
   2000s-2010s Nostalgic Interactions
   ============================================ */

document.addEventListener('DOMContentLoaded', function() {
    
    // Initialize all features
    initVisitorCounter();
    initSmoothScrolling();
    initKonamiCode();
    initCursorTrail();
    initTypingEffect();
    initScrollAnimations();
    
});

/* ============================================
   Visitor Counter (Fake but nostalgic!)
   ============================================ */
function initVisitorCounter() {
    const visitorCountEl = document.getElementById('visitor-count');
    if (visitorCountEl) {
        // Generate a somewhat random but consistent number
        let baseCount = 1337;
        const today = new Date();
        const daysSince2008 = Math.floor((today - new Date('2008-01-01')) / (1000 * 60 * 60 * 24));
        const visitorCount = baseCount + (daysSince2008 * 3);
        
        // Animate the counter
        let currentCount = 0;
        const targetCount = visitorCount;
        const duration = 2000;
        const startTime = Date.now();
        
        function updateCounter() {
            const elapsed = Date.now() - startTime;
            const progress = Math.min(elapsed / duration, 1);
            currentCount = Math.floor(progress * targetCount);
            visitorCountEl.textContent = currentCount.toLocaleString();
            
            if (progress < 1) {
                requestAnimationFrame(updateCounter);
            }
        }
        
        updateCounter();
    }
}

/* ============================================
   Smooth Scrolling for Navigation
   ============================================ */
function initSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                
                // Add a flash effect when reaching section
                targetElement.style.transition = 'box-shadow 0.3s ease';
                targetElement.style.boxShadow = '0 0 30px rgba(255, 215, 0, 0.8)';
                setTimeout(() => {
                    targetElement.style.boxShadow = '';
                }, 500);
            }
        });
    });
}

/* ============================================
   Konami Code Easter Egg
   ↑ ↑ ↓ ↓ ← → ← → B A
   ============================================ */
function initKonamiCode() {
    const konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 
                        'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 
                        'KeyB', 'KeyA'];
    let konamiIndex = 0;
    
    document.addEventListener('keydown', function(e) {
        if (e.code === konamiCode[konamiIndex]) {
            konamiIndex++;
            
            if (konamiIndex === konamiCode.length) {
                activateKonamiMode();
                konamiIndex = 0;
            }
        } else {
            konamiIndex = 0;
        }
    });
}

function activateKonamiMode() {
    // Create party mode alert
    const partyAlert = document.createElement('div');
    partyAlert.innerHTML = `
        <div style="
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: linear-gradient(45deg, #ff00ff, #00ffff, #ffff00, #ff00ff);
            background-size: 400% 400%;
            animation: partyGradient 1s ease infinite;
            padding: 40px;
            border-radius: 20px;
            border: 5px solid gold;
            box-shadow: 0 0 50px rgba(255, 0, 255, 0.8);
            z-index: 10000;
            text-align: center;
            font-family: 'Press Start 2P', monospace;
        ">
            <h2 style="color: #000; font-size: 24px; margin-bottom: 20px;">🎮 KONAMI CODE ACTIVATED! 🎮</h2>
            <p style="color: #000; font-size: 12px;">You found the secret!</p>
            <p style="color: #000; font-size: 14px; margin-top: 10px;">+30 LIVES 🍄</p>
        </div>
    `;
    document.body.appendChild(partyAlert);
    
    // Add party animation to body
    document.body.classList.add('konami-active');
    
    // Play party effects
    createConfetti();
    
    // Remove after 5 seconds
    setTimeout(() => {
        partyAlert.remove();
        document.body.classList.remove('konami-active');
    }, 5000);
}

function createConfetti() {
    const colors = ['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff', '#00ffff'];
    
    for (let i = 0; i < 100; i++) {
        setTimeout(() => {
            const confetti = document.createElement('div');
            confetti.style.cssText = `
                position: fixed;
                width: 10px;
                height: 10px;
                background: ${colors[Math.floor(Math.random() * colors.length)]};
                left: ${Math.random() * 100}vw;
                top: -10px;
                z-index: 9999;
                pointer-events: none;
                animation: confettiFall ${2 + Math.random() * 3}s linear forwards;
            `;
            document.body.appendChild(confetti);
            
            setTimeout(() => confetti.remove(), 5000);
        }, i * 30);
    }
}

// Add confetti animation
const confettiStyle = document.createElement('style');
confettiStyle.textContent = `
    @keyframes confettiFall {
        to {
            top: 100vh;
            transform: rotate(${Math.random() * 720}deg);
        }
    }
    @keyframes partyGradient {
        0% { background-position: 0% 50%; }
        50% { background-position: 100% 50%; }
        100% { background-position: 0% 50%; }
    }
`;
document.head.appendChild(confettiStyle);

/* ============================================
   Cursor Trail Effect (Classic 2000s!)
   ============================================ */
function initCursorTrail() {
    const trail = [];
    const trailLength = 10;
    const colors = ['#ff0000', '#ff7f00', '#ffff00', '#00ff00', '#0000ff', '#4b0082', '#9400d3'];
    
    for (let i = 0; i < trailLength; i++) {
        const dot = document.createElement('div');
        dot.style.cssText = `
            position: fixed;
            width: ${12 - i}px;
            height: ${12 - i}px;
            background: ${colors[i % colors.length]};
            border-radius: 50%;
            pointer-events: none;
            z-index: 9998;
            opacity: ${1 - (i * 0.1)};
            transition: transform 0.1s ease;
            box-shadow: 0 0 ${5 - i/2}px ${colors[i % colors.length]};
        `;
        document.body.appendChild(dot);
        trail.push({ element: dot, x: 0, y: 0 });
    }
    
    let mouseX = 0, mouseY = 0;
    
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });
    
    function animateTrail() {
        let x = mouseX;
        let y = mouseY;
        
        trail.forEach((dot, index) => {
            const nextX = x;
            const nextY = y;
            
            dot.element.style.left = dot.x + 'px';
            dot.element.style.top = dot.y + 'px';
            
            x += (dot.x - x) * 0.3;
            y += (dot.y - y) * 0.3;
            
            dot.x += (nextX - dot.x) * (0.5 - index * 0.03);
            dot.y += (nextY - dot.y) * (0.5 - index * 0.03);
        });
        
        requestAnimationFrame(animateTrail);
    }
    
    animateTrail();
}

/* ============================================
   Typing Effect for Name
   ============================================ */
function initTypingEffect() {
    const subtitle = document.querySelector('.subtitle');
    if (subtitle) {
        const originalText = subtitle.textContent;
        subtitle.textContent = '';
        
        let charIndex = 0;
        function typeChar() {
            if (charIndex < originalText.length) {
                subtitle.textContent += originalText[charIndex];
                charIndex++;
                setTimeout(typeChar, 50);
            }
        }
        
        // Start typing after a delay
        setTimeout(typeChar, 500);
    }
}

/* ============================================
   Scroll Animations
   ============================================ */
function initScrollAnimations() {
    const animatedElements = document.querySelectorAll('.experience-card, .education-card, .skill-category');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });
    
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        observer.observe(el);
    });
}

/* ============================================
   Form Submission Handler
   ============================================ */
document.addEventListener('submit', function(e) {
    if (e.target.classList.contains('retro-form')) {
        e.preventDefault();
        
        // Create success popup
        const popup = document.createElement('div');
        popup.innerHTML = `
            <div style="
                position: fixed;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                background: linear-gradient(180deg, #3a3a5a 0%, #2a2a4a 100%);
                border: 3px solid #ffd700;
                border-radius: 15px;
                padding: 30px;
                z-index: 10000;
                text-align: center;
                box-shadow: 0 0 30px rgba(255, 215, 0, 0.5);
            ">
                <h3 style="color: #00ff00; font-size: 18px; margin-bottom: 15px;">✉️ Message Sent! ✉️</h3>
                <p style="color: #fff; font-size: 14px;">Thanks for signing my guestbook!</p>
                <p style="color: #ff69b4; font-size: 12px; margin-top: 10px;">(Just kidding, this is a static site 😄)</p>
                <button onclick="this.parentElement.parentElement.remove()" style="
                    margin-top: 15px;
                    padding: 10px 20px;
                    background: linear-gradient(180deg, #4a90d9 0%, #2d6ca8 100%);
                    border: 2px solid #6ab7ff;
                    border-radius: 5px;
                    color: #fff;
                    cursor: pointer;
                    font-weight: bold;
                ">OK!</button>
            </div>
        `;
        document.body.appendChild(popup);
        
        // Reset form
        e.target.reset();
    }
});

/* ============================================
   Random Motivational Quotes (On page load)
   ============================================ */
const quotes = [
    "Welcome to my digital realm! 🌟",
    "Thanks for visiting! You're awesome! ⭐",
    "Have a great day! 🌈",
    "Stay curious, keep learning! 📚",
    "Code is poetry! 💻"
];

console.log(`
╔═══════════════════════════════════════════╗
║                                           ║
║   Welcome to Amish Suchak's Portfolio!    ║
║   ══════════════════════════════════════  ║
║                                           ║
║   ${quotes[Math.floor(Math.random() * quotes.length)].padEnd(35)}║
║                                           ║
║   Psst... try the Konami Code! 🎮         ║
║   ↑ ↑ ↓ ↓ ← → ← → B A                     ║
║                                           ║
╚═══════════════════════════════════════════╝
`);

/* ============================================
   Clock Widget (Updates in real-time)
   ============================================ */
function updateClock() {
    const statusBox = document.querySelector('.status-box');
    if (statusBox) {
        const now = new Date();
        const timeString = now.toLocaleTimeString();
        
        // Check if clock element exists, if not create it
        let clockEl = document.getElementById('live-clock');
        if (!clockEl) {
            clockEl = document.createElement('p');
            clockEl.id = 'live-clock';
            clockEl.style.marginTop = '5px';
            clockEl.style.fontFamily = "'Press Start 2P', monospace";
            clockEl.style.fontSize = '10px';
            clockEl.style.color = '#00ffff';
            statusBox.appendChild(clockEl);
        }
        clockEl.textContent = '🕐 ' + timeString;
    }
}

setInterval(updateClock, 1000);
updateClock();
