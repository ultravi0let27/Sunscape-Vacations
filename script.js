// ====== PRE-LOADER LOGIC ======
window.onload = function() {
    const loader = document.getElementById('loader-wrapper');
    if (loader) {
        loader.classList.add('hidden');
    }
};

// ====== DYNAMIC CONTENT BUILDER ======
document.addEventListener('DOMContentLoaded', function() {
    
    // Check if the data object exists before running
    if (typeof siteData !== 'undefined') {
        generateAccreditations();
        generateResorts();
        generateContactFooter();
    }

    function generateAccreditations() {
        const container = document.getElementById('accreditations-container');
        if (!container || !siteData.accreditations) return;

        const content = `
            <div class="accreditations-grid">
                <div class="accreditations-image-wrapper">
                    <img src="${siteData.accreditations.portraitImageUrl}" alt="Portrait of the Travel Advisor">
                </div>
                <div class="accreditations-content">
                    <h2 class="section-title">My Accreditations</h2>
                    <p>As a Travel Advisor, I feel it’s important to keep up-to-date with the travel industry and get to know the products. I decided to be accredited with the best of the industry.</p>
                    <div class="logos-grid">
                        ${siteData.accreditations.logos.map(logo => `
                            <div class="logo-item">
                                <img src="${logo.imageUrl}" alt="${logo.name}">
                            </div>
                        `).join('')}
                    </div>
                </div>
            </div>
        `;
        container.innerHTML = content;
    }

    function generateResorts() {
        const container = document.getElementById('resorts-accordion-container');
        if (!container || !siteData.visitedResorts) return;

        siteData.visitedResorts.forEach(countryData => {
            const starHtml = (rating) => {
                let stars = '';
                for (let i = 0; i < 5; i++) {
                    stars += `<svg class="${i < rating ? 'star-filled' : ''}" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M12 .587l3.668 7.568 8.332 1.151-6.064 5.828 1.48 8.279L12 18.896l-7.416 4.517 1.48-8.279L0 9.306l8.332-1.151z"/></svg>`;
                }
                return stars;
            };

            const resortsHtml = countryData.resorts.map(resort => `
                <li>
                    <span class="resort-name">${resort.name}</span>
                    <div class="star-rating">${starHtml(resort.rating)}</div>
                </li>
            `).join('');

            const item = document.createElement('details');
            item.className = 'accordion-item';
            item.innerHTML = `
                <summary class="accordion-header">
                    <h3 class="country-name">${countryData.country}</h3>
                    <div class="chevron-icon"></div>
                </summary>
                <div class="accordion-content">
                    <ul>
                        ${resortsHtml}
                    </ul>
                </div>
            `;
            container.appendChild(item);
        });
    }

    function generateContactFooter() {
        const container = document.getElementById('contact-container');
        if (!container || !siteData.contact) return;
        
        container.innerHTML = `
            <h2 class="section-title text-center">Let's Connect</h2>
            <div class="contact-card">
                <div class="contact-portrait">
                    <img src="${siteData.contact.portraitImageUrl}" alt="Sunscape Vacations travel advisor">
                </div>
                <div class="contact-details">
                     <p>200 Inlet Private<br>Orléans, Ontario<br>K4A 5H3</p>
                    <p class="affiliation-text">Sunscape Vacations is affiliated with Nexion Canada, ULC<br>280 Wellington St, Tower B 6th Floor, London, ON N6A 5H3<br>Phone: 396-86-96 | TICO: 1587942</p>
                </div>
                <div class="social-links">
                    <a href="https://www.facebook.com/your-profile-name" class="social-icon" aria-label="Facebook" target="_blank" rel="noopener noreferrer"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v2.385z"/></svg></a>
                    <a href="mailto:contact@sunscapevacations.com" class="social-icon" aria-label="Email"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M0 3v18h24v-18h-24zm21.518 2l-9.518 7.713-9.518-7.713h19.036zm-19.518 14v-11.817l10 8.104 10-8.104v11.817h-20z"/></svg></a>
                    <a href="https://www.instagram.com/your-username" class="social-icon" aria-label="Instagram" target="_blank" rel="noopener noreferrer"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.85s-.011 3.584-.069 4.85c-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07s-3.584-.012-4.85-.07c-3.252-.148-4.771-1.691-4.919-4.919-.058-1.265-.069-1.645-.069-4.85s.011-3.584.069-4.85c.149-3.225 1.664 4.771 4.919-4.919 1.266-.057 1.644-.069 4.85-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948s.014 3.667.072 4.947c.2 4.358 2.618 6.78 6.98 6.98 1.281.059 1.689.073 4.948.073s3.667-.014 4.947-.072c4.358-.2 6.78-2.618 6.98-6.98.059-1.281.073-1.689.073-4.948s-.014-3.667-.072-4.947c-.2-4.358-2.618-6.78-6.98-6.98-1.281-.059-1.689-.073-4.948-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.162 6.162 6.162 6.162-2.759 6.162-6.162-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4s1.791-4 4-4 4 1.79 4 4-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.441-.645 1.441-1.44s-.646-1.44-1.441-1.44z"/></svg></a>
                </div>
            </div>
            <div class="tico-logo">
                <img src="${siteData.contact.ticoLogoUrl}" alt="TICO registration logo">
                <span>T1552644</span>
            </div>
            <div class="footer-bottom-line">
                <p>&copy; 2024 Sunscape Vacations. All Rights Reserved. Crafted with care.</p>
            </div>
        `;
    }


    // --- ORIGINAL INTERACTIVITY (Header Shadow, Mobile Menu) ---
    const hamburger = document.getElementById('hamburger-menu');
    const mainNav = document.querySelector('.main-nav');
    const header = document.querySelector('.main-header');

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
