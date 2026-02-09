
// Animation des éléments au défilement
document.addEventListener('DOMContentLoaded', function () {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function (entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = `fadeInUp 1s ease forwards`;
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observer les éléments de contact
    document.querySelectorAll('.contact-item').forEach(item => {
        observer.observe(item);
    });

    // Observer le formulaire
    document.querySelectorAll('.contact-form-container').forEach(form => {
        observer.observe(form);
    });

    // Animation du formulaire
    const formInputs = document.querySelectorAll('.form-input');
    formInputs.forEach(input => {
        input.addEventListener('focus', function () {
            this.parentElement.classList.add('focused');
        });

        input.addEventListener('blur', function () {
            if (this.value === '') {
                this.parentElement.classList.remove('focused');
            }
        });
    });
});


// Menu Hamburger - Code à ajouter dans tous les fichiers
document.addEventListener('DOMContentLoaded', function () {
    const mobileMenu = document.querySelector('.mobile-menu');
    const nav = document.querySelector('nav ul');
    const body = document.body;

    if (mobileMenu && nav) {
        // Fonction pour ouvrir/fermer le menu
        function toggleMenu() {
            nav.classList.toggle('active');
            mobileMenu.classList.toggle('active');
            body.classList.toggle('menu-open');

            // Animation de l'icône hamburger
            const icon = mobileMenu.querySelector('i');
            if (nav.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        }

        // Événement de clic sur le menu hamburger
        mobileMenu.addEventListener('click', toggleMenu);

        // Fermer le menu en cliquant sur un lien
        const navLinks = document.querySelectorAll('nav a');
        navLinks.forEach(link => {
            link.addEventListener('click', function () {
                if (nav.classList.contains('active')) {
                    toggleMenu();
                }
            });
        });

        // Fermer le menu en cliquant à l'extérieur
        document.addEventListener('click', function (event) {
            if (!nav.contains(event.target) && !mobileMenu.contains(event.target) && nav.classList.contains('active')) {
                toggleMenu();
            }
        });

        // Gestion du redimensionnement de la fenêtre
        window.addEventListener('resize', function () {
            if (window.innerWidth > 992 && nav.classList.contains('active')) {
                toggleMenu();
            }
        });
    }
});

// Initialize map
function initMap() {
    // Coordinates for Matadi, Kongo Central, RDC
    const matadi = [-5.829677, 13.469857];

    // Create map
    const map = L.map('map').setView(matadi, 13);

    // Add tile layer (OpenStreetMap)
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    // Add marker
    const marker = L.marker(matadi).addTo(map);
    marker.bindPopup("<b>ISTA/Matadi</b><br>Matadi, Kongo Central").openPopup();

    // Add circle to show area
    L.circle(matadi, {
        color: '#ff6905',
        fillColor: '#ff6905',
        fillOpacity: 0.1,
        radius: 1000
    }).addTo(map);
}



