document.addEventListener('DOMContentLoaded', function() {
    
    // --- START: LENIS SMOOTH SCROLL SETUP (as per the guide) ---
    const lenis = new Lenis({
        lerp: 0.07, // The balanced, recommended "ease" factor
    });

    function raf(time) {
        lenis.raf(time);
        requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);
    // --- END: LENIS SMOOTH SCROLL SETUP ---


    // ====== PRE-LOADER ======
    window.onload = function() {
        const loader = document.getElementById('loader-wrapper');
        if (loader) {
            loader.classList.add('hidden');
        }
    };

    // ====== PARTICLES.JS ======
    if (document.getElementById('particles-js')) {
        particlesJS.load('particles-js', 'particles.json', function() {
            console.log('Particles.js config loaded');
        });
    }

    // --- HEADER SHADOW & MOBILE MENU ---
    const hamburger = document.getElementById('hamburger-menu');
    const mainNav = document.querySelector('.main-nav');
    const header = document.querySelector('.main-header');

    if (hamburger && mainNav) {
        hamburger.addEventListener('click', () => {
            const isActive = mainNav.classList.toggle('active');
            hamburger.classList.toggle('active');
            // Stop/start Lenis when the mobile menu is open/closed
            isActive ? lenis.stop() : lenis.start();
        });
    }
    
    if(header) {
        // Use the Lenis scroll event for perfect sync
        lenis.on('scroll', (e) => {
            if (e.animatedScroll > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });
    }

    // ====== QUOTE MODAL LOGIC ======
    const modalOverlay = document.getElementById('quote-modal-overlay');
    const closeModalBtn = document.getElementById('close-modal-btn');
    const triggerButtons = document.querySelectorAll('.quote-modal-trigger');

    const openModal = () => {
        if (modalOverlay) {
            modalOverlay.classList.add('active');
            lenis.stop();
        }
    };
    const closeModal = () => {
        if (modalOverlay) {
            modalOverlay.classList.remove('active');
            lenis.start();
        }
    };

    triggerButtons.forEach(button => button.addEventListener('click', openModal));
    if (closeModalBtn) closeModalBtn.addEventListener('click', closeModal);
    if (modalOverlay) modalOverlay.addEventListener('click', (event) => {
        if (event.target === modalOverlay) closeModal();
    });

    // ====== SCROLL REVEAL ANIMATIONS ======
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, {
        threshold: 0.1
    });

    const revealElements = document.querySelectorAll('.reveal');
    revealElements.forEach((el) => observer.observe(el));

    // ====== 3D TILT EFFECT ======
    if (window.VanillaTilt) {
        VanillaTilt.init(document.querySelectorAll(".tilt-card"), {
            max: 15, speed: 400, glare: true, "max-glare": 0.3
        });
    }
});
