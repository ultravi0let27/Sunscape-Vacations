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

    lenis.on('scroll', (e) => {
        const scroll = e.animatedScroll;
    
        // Header Shadow Logic
        if (header) {
            header.classList.toggle('scrolled', scroll > 50);
        }
    
        // ===== SCROLL-REVEAL WATER EFFECT =====
        const waterContainer = document.getElementById('animated-water-container');
        if (waterContainer) {
            const scroll = e.animatedScroll;
            const initialHeight = 150; // Must match the CSS height
            const growthFactor = 0.2;  // The slower growth rate
        
            // We only change the height of the container, revealing the SVG inside.
            waterContainer.style.height = `${initialHeight + scroll * growthFactor}px`;
        }
        // ===================================
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

    // ====== 5a. SAND CURSOR INTERACTION (Corrected) ======
    const sandCursorLight = document.getElementById('sand-cursor-light');
    const pageContent = document.querySelector('.page-content');
    
    if (sandCursorLight && pageContent) {
        // Logic to move the light with the cursor
        document.addEventListener('mousemove', (e) => {
            requestAnimationFrame(() => {
                sandCursorLight.style.left = `${e.clientX}px`;
                sandCursorLight.style.top = `${e.clientY}px`;
            });
        });
    
        // New logic to fade the light in
        pageContent.addEventListener('mouseenter', () => {
            sandCursorLight.style.opacity = '1';
        });
    
        // New logic to fade the light out
        pageContent.addEventListener('mouseleave', () => {
            sandCursorLight.style.opacity = '0';
        });
    }
    
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
