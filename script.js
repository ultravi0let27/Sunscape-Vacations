// ====== PRE-LOADER LOGIC ======
window.onload = function() {
    const loader = document.getElementById('loader-wrapper');
    if (loader) {
        loader.classList.add('hidden');
    }
};

document.addEventListener('DOMContentLoaded', function() {

    // ====== NEW: INITIALIZE LENIS SMOOTH SCROLL ======
    const lenis = new Lenis({
        lerp: 0.07, // Adjust this value for more or less "glide"
        smoothWheel: true,
    });

    // This is the animation loop that makes Lenis work
    function raf(time) {
        lenis.raf(time);
        requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);
    // =================================================


    // ====== INITIALIZE PARTICLES.JS ======
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
            document.body.style.overflow = isActive ? 'hidden' : '';
            // NEW: Stop and start Lenis when menu opens/closes
            isActive ? lenis.stop() : lenis.start();
        });

        document.querySelectorAll('.main-nav a, .main-nav button').forEach(link => {
            link.addEventListener('click', () => {
                if (mainNav.classList.contains('active')) {
                    mainNav.classList.remove('active');
                    hamburger.classList.remove('active');
                    document.body.style.overflow = '';
                    lenis.start(); // NEW: Make sure scroll starts again
                }
            });
        });
    }
    
    // NEW: Use the Lenis scroll event for the header for perfect sync
    if(header) {
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
            lenis.stop(); // NEW: Stop scroll when modal is open
        }
    };
    const closeModal = () => {
        if (modalOverlay) {
            modalOverlay.classList.remove('active');
            lenis.start(); // NEW: Start scroll again when modal closes
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
            max: 15,
            speed: 400,
            glare: true,
            "max-glare": 0.3
        });
    }
});
