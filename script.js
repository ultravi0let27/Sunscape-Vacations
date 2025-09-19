document.addEventListener('DOMContentLoaded', function() {
    
    // ====== 1. LENIS SMOOTH SCROLL INITIALIZATION ======
    const lenis = new Lenis({ lerp: 0.15, smoothWheel: true });
    function raf(time) { lenis.raf(time); requestAnimationFrame(raf); }
    requestAnimationFrame(raf);

    // ====== 2. ELEMENT SELECTORS ======
    const header = document.querySelector('.main-header');
    const hamburger = document.getElementById('hamburger-menu');
    const mainNav = document.querySelector('.main-nav');
    const modalOverlay = document.getElementById('quote-modal-overlay');
    const triggerButtons = document.querySelectorAll('.quote-modal-trigger, #mobile-hero-quote-button');

    // ====== 3. SCROLL-BASED ANIMATIONS ======
    lenis.on('scroll', (e) => {
        if (header) {
            header.classList.toggle('scrolled', e.animatedScroll > 50);
        }
    });

    // ====== 4. MOBILE MENU LOGIC ======
    if (hamburger && mainNav) {
        hamburger.addEventListener('click', () => {
            const isActive = mainNav.classList.toggle('active');
            hamburger.classList.toggle('active');
            isActive ? lenis.stop() : lenis.start();
        });
        const mobileNavLinks = document.querySelectorAll('.main-nav a, .main-nav .btn-nav-quote');
        mobileNavLinks.forEach(link => {
            link.addEventListener('click', () => {
                if (mainNav.classList.contains('active')) {
                    mainNav.classList.remove('active');
                    hamburger.classList.remove('active');
                    lenis.start();
                }
            });
        });
    }
    
    // ====== 5. QUOTE MODAL LOGIC ======
    const toggleModal = (isActive) => {
        if (modalOverlay) modalOverlay.classList.toggle('active', isActive);
        isActive ? lenis.stop() : lenis.start();
    };
    const openModal = (event) => {
        event.preventDefault();
        toggleModal(true);
    };
    const isTouchDevice = () => 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    const eventType = isTouchDevice() ? 'touchstart' : 'click';
    triggerButtons.forEach(button => {
        button.addEventListener(eventType, openModal);
    });
    document.getElementById('close-modal-btn')?.addEventListener('click', () => toggleModal(false));
    modalOverlay?.addEventListener('click', (event) => {
        if (event.target === modalOverlay) toggleModal(false);
    });

    // ====== 6. SCROLL REVEAL ANIMATIONS ======
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) entry.target.classList.add('visible');
        });
    }, { threshold: 0.1 });
    document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));

    // ====== 7. 3D TILT EFFECT ======
    if (window.VanillaTilt && !isTouchDevice()) {
        VanillaTilt.init(document.querySelectorAll(".tilt-card"), {
            max: 15, speed: 400, glare: true, "max-glare": 0.3
        });
    }

    // ====== 7a. INTERACTIVE GRADIENT LOGIC (Corrected) ======
    const particleCanvas = document.getElementById('particles-js'); // Target the particle canvas
    const isNotTouchDevice = () => !('ontouchstart' in window) && navigator.maxTouchPoints <= 0;
    
    if (particleCanvas && isNotTouchDevice()) {
        document.addEventListener('mousemove', (e) => {
            // We now update the CSS variables directly on the particle canvas
            particleCanvas.style.setProperty('--gradient-x', `${e.clientX}px`);
            particleCanvas.style.setProperty('--gradient-y', `${e.clientY}px`);
        });
    }

    // ====== 8. PARTICLE BACKGROUND INITIALIZATION (REFINED) ======
    particlesJS('particles-js', {
      "particles": {
        "number": { "value": 50, "density": { "enable": true, "value_area": 800 } },
        "color": { "value": ["#94C7C7", "#E0D5A6"] },
        "shape": { "type": "circle" },
        "opacity": { "value": 0.8, "random": true, "anim": { "enable": true, "speed": 1, "opacity_min": 0.2, "sync": false } },
        "size": {
          "value": 3, // REDUCED: Smaller, more star-like particles
          "random": true,
          "anim": { "enable": false }
        },
        "line_linked": { "enable": false },
        "move": {
          "enable": true,
          "speed": 0.4,
          "direction": "top",
          "random": true,
          "straight": false,
          "out_mode": "out",
          "bounce": false
        }
      },
      "interactivity": {
        "detect_on": "canvas",
        "events": { "onhover": { "enable": true, "mode": "repulse" }, "onclick": { "enable": false } },
        "modes": { "repulse": { "distance": 100, "duration": 0.4 } }
      },
      "retina_detect": true
    });
});

// ====== 9. PRE-LOADER ======
window.onload = function() {
    const loader = document.getElementById('loader-wrapper');
    if (loader) {
        loader.classList.add('hidden');
    }
};
