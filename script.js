document.addEventListener('DOMContentLoaded', () => {
    // 1. Strict Language Management
    const langBtns = document.querySelectorAll('.lang-btn');
    const htmlElement = document.documentElement;

    const setLanguage = (lang) => {
        htmlElement.setAttribute('lang', lang);
        langBtns.forEach(btn => {
            btn.classList.toggle('active', btn.getAttribute('data-lang') === lang);
        });
        localStorage.setItem('tiago-cyber-lang', lang);
    };

    langBtns.forEach(btn => {
        btn.addEventListener('click', () => setLanguage(btn.getAttribute('data-lang')));
    });

    setLanguage(localStorage.getItem('tiago-cyber-lang') || 'pt');

    // 2. Elite Cursor Physics (Optimized for zero perceived lag)
    const cursorDot = document.querySelector('.cursor-dot');
    const cursorOutline = document.querySelector('.cursor-outline');
    const cursorGlow = document.getElementById('cursor-glow');

    // Detect touch device
    const isTouch = ('ontouchstart' in window) || (navigator.maxTouchPoints > 0);

    // If it's a touch device, disable custom cursor functionality
    if (isTouch) {
        if (cursorDot) cursorDot.style.display = 'none';
        if (cursorOutline) cursorOutline.style.display = 'none';
        if (cursorGlow) cursorGlow.style.display = 'none';
        document.body.classList.add('touch-device'); // Optional: Add a class to body for touch-specific styling
        return; // Exit the cursor logic early
    }

    let mouseX = -100;
    let mouseY = -100;

    const pos = { dot: { x: mouseX, y: mouseY }, outline: { x: mouseX, y: mouseY }, glow: { x: mouseX, y: mouseY } };

    // Snappier strengths
    const strength = { outline: 0.3, glow: 0.1 }; // Increased from 0.15 and 0.05

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;

        // Update DOT instantly for zero lag perception
        if (cursorDot) {
            cursorDot.style.transform = `translate(${mouseX - 3}px, ${mouseY - 3}px)`;
        }
    });

    const animateCursors = () => {
        // Outline & Glow: Smooth but faster follow
        pos.outline.x += (mouseX - pos.outline.x) * strength.outline;
        pos.outline.y += (mouseY - pos.outline.y) * strength.outline;

        pos.glow.x += (mouseX - pos.glow.x) * strength.glow;
        pos.glow.y += (mouseY - pos.glow.y) * strength.glow;

        if (cursorOutline) cursorOutline.style.transform = `translate(${pos.outline.x - 15}px, ${pos.outline.y - 15}px)`;
        if (cursorGlow) cursorGlow.style.transform = `translate(${pos.glow.x - 250}px, ${pos.glow.y - 250}px)`;

        requestAnimationFrame(animateCursors);
    };
    animateCursors();

    // Hover states for magnetic effect
    const interactables = document.querySelectorAll('a, button, .project-card, .btn');
    interactables.forEach(el => {
        el.addEventListener('mouseenter', () => cursorOutline.classList.add('hover'));
        el.addEventListener('mouseleave', () => cursorOutline.classList.remove('hover'));
    });

    // 3. Precise Scroll Reveal
    const revealElements = document.querySelectorAll('.reveal');
    const observerOptions = {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, observerOptions);

    revealElements.forEach(el => observer.observe(el));

    // 4. Smooth Anchor Control
    document.querySelectorAll('nav a, .btn').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href.startsWith('#')) {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    window.scrollTo({
                        top: target.offsetTop - 80,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
});
