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
    const triggerButtons = document.querySelectorAll('.quote-modal-trigger, #mobile-hero-quote-button');

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

    // ====== FIX: Close Mobile Menu on Link Click ======
    const mobileNavLinks = document.querySelectorAll('.main-nav a, .main-nav .btn-nav-quote');
    if (hamburger && mainNav) {
        mobileNavLinks.forEach(link => {
            link.addEventListener('click', () => {
                // Check if the menu is actually active before trying to close it
                if (mainNav.classList.contains('active')) {
                    mainNav.classList.remove('active');
                    hamburger.classList.remove('active');
                    lenis.start(); // Re-enable smooth scrolling
                }
            });
        });
    }
    
    // ====== 5. QUOTE MODAL LOGIC (with Mobile Fix) ======
    const toggleModal = (isActive) => {
        if (modalOverlay) modalOverlay.classList.toggle('active', isActive);
        isActive ? lenis.stop() : lenis.start();
    };
    
    const openModal = (event) => {
        // preventDefault stops the browser from trying to process a "ghost click" after the touch event
        event.preventDefault();
        toggleModal(true);
    };
    
    // Check if it's a touch device (we can reuse the function from the last fix)
    const isTouchDeviceForModal = () => 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    const eventType = isTouchDeviceForModal() ? 'touchstart' : 'click';
    
    triggerButtons.forEach(button => {
        button.addEventListener(eventType, openModal);
    });
    
    document.getElementById('close-modal-btn')?.addEventListener('click', () => toggleModal(false));
    modalOverlay?.addEventListener('click', (event) => {
        if (event.target === modalOverlay) toggleModal(false);
    });

    // ====== 5a. SAND CURSOR INTERACTION (with Mobile Check) ======
    const sandCursorLight = document.getElementById('sand-cursor-light');
    const pageContent = document.querySelector('.page-content');
    
    // This check prevents the cursor logic from running on touch devices
    const isTouchDevice = () => 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    
    if (sandCursorLight && pageContent && !isTouchDevice()) {
        document.addEventListener('mousemove', (e) => {
            requestAnimationFrame(() => {
                sandCursorLight.style.left = `${e.clientX}px`;
                sandCursorLight.style.top = `${e.clientY}px`;
            });
        });
    
        pageContent.addEventListener('mouseenter', () => {
            sandCursorLight.style.opacity = '1';
        });
    
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
