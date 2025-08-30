// ====== PRE-LOADER LOGIC ======
window.onload = function() {
    const loader = document.getElementById('loader-wrapper');
    if (loader) {
        loader.classList.add('hidden');
    }
};

document.addEventListener('DOMContentLoaded', function() {
    
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
            mainNav.classList.toggle('active');
            hamburger.classList.toggle('active');
            document.body.style.overflow = mainNav.classList.contains('active') ? 'hidden' : '';
        });

        document.querySelectorAll('.main-nav a, .main-nav button').forEach(link => {
            link.addEventListener('click', () => {
                if (mainNav.classList.contains('active')) {
                    mainNav.classList.remove('active');
                    hamburger.classList.remove('active');
                    document.body.style.overflow = '';
                }
            });
        });
    }

    if(header) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
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
            document.body.style.overflow = 'hidden';
        }
    };

    const closeModal = () => {
        if (modalOverlay) {
            modalOverlay.classList.remove('active');
            document.body.style.overflow = '';
        }
    };

    triggerButtons.forEach(button => {
        button.addEventListener('click', openModal);
    });
    
    if (closeModalBtn) {
        closeModalBtn.addEventListener('click', closeModal);
    }
    
    if (modalOverlay) {
        modalOverlay.addEventListener('click', function(event) {
            if (event.target === modalOverlay) {
                closeModal();
            }
        });
    }
});
