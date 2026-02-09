
// Menu Hamburger
document.addEventListener('DOMContentLoaded', function () {
    const mobileMenu = document.querySelector('.mobile-menu');
    const nav = document.querySelector('nav ul');
    const body = document.body;

    if (mobileMenu && nav) {
        function toggleMenu() {
            nav.classList.toggle('active');
            mobileMenu.classList.toggle('active');
            body.classList.toggle('menu-open');

            const icon = mobileMenu.querySelector('i');
            if (nav.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        }

        mobileMenu.addEventListener('click', toggleMenu);

        const navLinks = document.querySelectorAll('nav a');
        navLinks.forEach(link => {
            link.addEventListener('click', function () {
                if (nav.classList.contains('active')) {
                    toggleMenu();
                }
            });
        });

        document.addEventListener('click', function (event) {
            if (!nav.contains(event.target) && !mobileMenu.contains(event.target) && nav.classList.contains('active')) {
                toggleMenu();
            }
        });

        window.addEventListener('resize', function () {
            if (window.innerWidth > 992 && nav.classList.contains('active')) {
                toggleMenu();
            }
        });
    }

    // Animation des chiffres
    const chiffreNumbers = document.querySelectorAll('.chiffre-number');
    chiffreNumbers.forEach(chiffre => {
        const target = parseInt(chiffre.getAttribute('data-count'));
        let count = 0;
        const duration = 2000;
        const increment = target / (duration / 50);

        const timer = setInterval(() => {
            count += increment;
            if (count >= target) {
                count = target;
                clearInterval(timer);
            }
            chiffre.textContent = Math.floor(count);
        }, 50);
    });

    // Animation au défilement
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function (entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observer les cartes de valeurs
    document.querySelectorAll('.valeur-card').forEach(card => {
        observer.observe(card);
    });

    // Observer les cartes de membres
    document.querySelectorAll('.membre-card').forEach(card => {
        observer.observe(card);
    });

    // Observer les logos de partenaires
    document.querySelectorAll('.partenaire-logo').forEach(logo => {
        observer.observe(logo);
    });
});

// COLLEZ VOTRE NUMÉRO DE LOCALISATION MAPS ICI ↓
const mapsEmbedCode = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3988.258366072422!2d13.45026727492093!3d-5.816578994187247!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1a6dfbc2b79f84a9%3A0x6e2a3c1a7a8b8b8b!2sMatadi%2C%20R%C3%A9publique%20D%C3%A9mocratique%20du%20Congo!5e0!3m2!1sfr!2sfr!4v1690000000000!5m2!1sfr!2sfr";

// Configuration de l'université
const universityConfig = {
    name: "ULIMAT - Université Libre de Matadi",
    address: "Avenue de l'Université, Quartier Nzadi, Matadi, RDC",
    phone: "+243 81 234 5678",
    email: "info@ulimat.cd"
};

// Initialisation
document.addEventListener('DOMContentLoaded', function () {
    initializeMaps();
    setupMapInteractions();
});

function initializeMaps() {
    const mapIframe = document.querySelector('.map-frame iframe');

    if (mapIframe && mapsEmbedCode) {
        // Utiliser le code d'embed personnalisé
        mapIframe.src = mapsEmbedCode;

        // Animation de la section
        const mapsSection = document.querySelector('.maps-section');
        if (mapsSection) {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        animateSection(entry.target);
                        addUniversityInfo();
                    }
                });
            }, { threshold: 0.3 });

            mapsSection.style.opacity = '0';
            mapsSection.style.transform = 'translateY(30px)';
            mapsSection.style.transition = 'all 0.8s ease';
            observer.observe(mapsSection);
        }
    } else {
        console.error('Code Maps non trouvé');
    }
}

function animateSection(section) {
    section.style.opacity = '1';
    section.style.transform = 'translateY(0)';
}

function setupMapInteractions() {
    const mapFrame = document.querySelector('.map-frame');

    if (mapFrame) {
        mapFrame.addEventListener('mouseenter', function () {
            this.style.transform = 'translateY(-5px) scale(1.02)';
        });

        mapFrame.addEventListener('mouseleave', function () {
            this.style.transform = 'translateY(0) scale(1)';
        });

        // Indicateur de chargement
        const mapIframe = mapFrame.querySelector('iframe');
        if (mapIframe) {
            mapIframe.addEventListener('load', function () {
                showLoadIndicator();
            });
        }
    }
}

function addUniversityInfo() {
    const mapsContainer = document.querySelector('.maps-container');

    const infoHTML = `
        <div class="university-info">
            <div class="info-card">
                <div class="info-icon">
                    <i class="fas fa-university"></i>
                </div>
                <div class="info-content">
                    <h3>${universityConfig.name}</h3>
                    <p class="address">${universityConfig.address}</p>
                    <div class="contact-details">
                        <span class="phone">${universityConfig.phone}</span>
                        <span class="email">${universityConfig.email}</span>
                    </div>
                </div>
            </div>
        </div>
    `;

    mapsContainer.insertAdjacentHTML('beforeend', infoHTML);

    // Animation
    setTimeout(() => {
        const infoElement = document.querySelector('.university-info');
        if (infoElement) {
            infoElement.style.opacity = '1';
            infoElement.style.transform = 'translateY(0)';
        }
    }, 500);
}

function showLoadIndicator() {
    const mapFrame = document.querySelector('.map-frame');
    const indicator = document.createElement('div');
    indicator.className = 'map-indicator';
    indicator.innerHTML = '📍 Carte ULIMAT chargée';
    indicator.style.cssText = `
        position: absolute;
        top: 10px;
        right: 10px;
        background: rgba(0, 51, 102, 0.9);
        color: white;
        padding: 8px 12px;
        border-radius: 20px;
        font-size: 12px;
        z-index: 10;
        opacity: 0;
        transition: opacity 0.3s ease;
        font-weight: bold;
    `;

    mapFrame.style.position = 'relative';
    mapFrame.appendChild(indicator);

    setTimeout(() => {
        indicator.style.opacity = '1';
        setTimeout(() => {
            indicator.style.opacity = '0';
            setTimeout(() => {
                indicator.remove();
            }, 300);
        }, 3000);
    }, 1000);
}
