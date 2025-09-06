document.addEventListener('DOMContentLoaded', function() {
    
    // ====== 1. LENIS SMOOTH SCROLL INITIALIZATION ======
    const lenis = new Lenis({ lerp: 0.15, smoothWheel: true });
    function raf(time) { lenis.raf(time); requestAnimationFrame(raf); }
    requestAnimationFrame(raf);

    // ====== 2. ELEMENT SELECTORS (DEFINED ONCE) ======
    const header = document.querySelector('.main-header');
    const waterContainer = document.getElementById('animated-water-container');
    const hamburger = document.getElementById('hamburger-menu');
    const mainNav = document.querySelector('.main-nav');
    const modalOverlay = document.getElementById('quote-modal-overlay');
    const triggerButtons = document.querySelectorAll('.quote-modal-trigger');

    // ====== 3. SCROLL-BASED ANIMATIONS ======
    // This single event listener handles all effects that react to scrolling.
    lenis.on('scroll', (e) => {
        const scroll = e.animatedScroll;
    
        // Header Shadow Logic
        if (header) {
            header.classList.toggle('scrolled', scroll > 50);
        }
    
        // ===== SCROLL-REVEAL WATER EFFECT (Corrected) =====
        // The 'if' statement now correctly uses the 'waterContainer' variable 
        // that was defined once at the top of the script.
        if (waterContainer) {
            const initialHeight = 150; // This must match the new CSS height
            const growthFactor = 0.5; // Controls how fast the water rises
    
            // The logic remains the same: we just increase the window's height.
            waterContainer.style.height = `${initialHeight + scroll * growthFactor}px`;
        }
        // ===================================================
    });

    // ====== 4. MOBILE MENU LOGIC ======
    if (hamburger && mainNav) {
        hamburger.addEventListener('click', () => {
            const isActive = mainNav.classList.toggle('active');
            hamburger.classList.toggle('active');
            isActive ? lenis.stop() : lenis.start();
        });
    }
    
    // ====== 5. QUOTE MODAL LOGIC ======
    const toggleModal = (isActive) => {
        if (modalOverlay) modalOverlay.classList.toggle('active', isActive);
        isActive ? lenis.stop() : lenis.start();
    };
    triggerButtons.forEach(button => button.addEventListener('click', () => toggleModal(true)));
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
    if (window.VanillaTilt) {
        VanillaTilt.init(document.querySelectorAll(".tilt-card"), {
            max: 15, speed: 400, glare: true, "max-glare": 0.3
        });
    }
});

// ====== 8. PRE-LOADER (USES window.onload FOR RELIABILITY) ======
window.onload = function() {
    const loader = document.getElementById('loader-wrapper');
    if (loader) {
        loader.classList.add('hidden');
    }
};
