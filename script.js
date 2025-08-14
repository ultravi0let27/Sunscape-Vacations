// ====== PRE-LOADER LOGIC ======
window.onload = function() {
    const loader = document.getElementById('loader-wrapper');
    if (loader) {
        loader.classList.add('hidden');
    }
};

document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.getElementById('hamburger-menu');
    const mainNav = document.querySelector('.main-nav');
    const header = document.querySelector('.main-header');

    // --- Mobile Menu Toggle ---
    if (hamburger && mainNav) {
        hamburger.addEventListener('click', () => {
            mainNav.classList.toggle('active');
            hamburger.classList.toggle('active');
            document.body.style.overflow = mainNav.classList.contains('active') ? 'hidden' : '';
        });

        document.querySelectorAll('.main-nav a').forEach(link => {
            link.addEventListener('click', () => {
                if (mainNav.classList.contains('active')) {
                    mainNav.classList.remove('active');
                    hamburger.classList.remove('active');
                    document.body.style.overflow = '';
                }
            });
        });
    }

    // --- Add Scrolled Class to Header ---
    if(header) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });
    }
});
