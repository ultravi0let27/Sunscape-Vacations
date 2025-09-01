document.addEventListener('DOMContentLoaded', function() {
    
    // ====== INITIALIZE LENIS SMOOTH SCROLL ======
    const lenis = new Lenis({ lerp: 0.15, smoothWheel: true });
    function raf(time) { lenis.raf(time); requestAnimationFrame(raf); }
    requestAnimationFrame(raf);

    // ====== PRE-LOADER ======
    window.onload = function() {
        const loader = document.getElementById('loader-wrapper');
        if (loader) loader.classList.add('hidden');
    };

    // ====== PARTICLES.JS ======
    if (document.getElementById('particles-js')) {
        particlesJS.load('particles-js', 'particles.json', console.log.bind(console, 'Particles.js config loaded'));
    }

    // ====== NEW: SVG WAVE COLOR INITIALIZER ======
    // This makes our new wave colors work
    document.querySelectorAll('.wave').forEach(wave => {
        wave.style.fill = getComputedStyle(wave).getPropertyValue('fill');
    });

    // --- HEADER SHADOW & MOBILE MENU ---
    const hamburger = document.getElementById('hamburger-menu');
    const mainNav = document.querySelector('.main-nav');
    const header = document.querySelector('.main-header');

    if (hamburger && mainNav) {
        hamburger.addEventListener('click', () => {
            const isActive = mainNav.classList.toggle('active');
            hamburger.classList.toggle('active');
            isActive ? lenis.stop() : lenis.start();
        });
    }
    
    if(header) {
        lenis.on('scroll', (e) => {
            header.classList.toggle('scrolled', e.animatedScroll > 50);
        });
    }

    // ====== QUOTE MODAL LOGIC ======
    const modalOverlay = document.getElementById('quote-modal-overlay');
    const triggerButtons = document.querySelectorAll('.quote-modal-trigger');

    const toggleModal = (isActive) => {
        if (modalOverlay) modalOverlay.classList.toggle('active', isActive);
        isActive ? lenis.stop() : lenis.start();
    };

    triggerButtons.forEach(button => button.addEventListener('click', () => toggleModal(true)));
    document.getElementById('close-modal-btn')?.addEventListener('click', () => toggleModal(false));
    modalOverlay?.addEventListener('click', (event) => {
        if (event.target === modalOverlay) toggleModal(false);
    });


    // ====== SCROLL REVEAL ANIMATIONS ======
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) entry.target.classList.add('visible');
        });
    }, { threshold: 0.1 });
    document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));

    // ====== 3D TILT EFFECT ======
    if (window.VanillaTilt) {
        VanillaTilt.init(document.querySelectorAll(".tilt-card"), {
            max: 15, speed: 400, glare: true, "max-glare": 0.3
        });
    }
});
