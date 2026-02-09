
// Hero Slider - Style ISTA Matadi
document.addEventListener('DOMContentLoaded', function () {
    const slides = document.querySelectorAll('.hero-slide');
    const indicators = document.querySelectorAll('.hero-indicator');
    let currentSlide = 0;
    const slideInterval = 5000; // 5 secondes

    // Fonction pour changer de slide
    function showSlide(index) {
        // Retirer la classe active de tous les slides et indicateurs
        slides.forEach(slide => slide.classList.remove('active'));
        indicators.forEach(indicator => indicator.classList.remove('active'));

        // Ajouter la classe active au slide et indicateur courant
        slides[index].classList.add('active');
        indicators[index].classList.add('active');

        currentSlide = index;
    }

    // Fonction pour passer au slide suivant
    function nextSlide() {
        let nextIndex = (currentSlide + 1) % slides.length;
        showSlide(nextIndex);
    }

    // Démarrer le slider automatique
    let slideTimer = setInterval(nextSlide, slideInterval);

    // Gestion des clics sur les indicateurs
    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', function () {
            clearInterval(slideTimer);
            showSlide(index);
            slideTimer = setInterval(nextSlide, slideInterval);
        });
    });

    // Animation des statistiques
    const statNumbers = document.querySelectorAll('.stat-number');
    statNumbers.forEach(stat => {
        const target = parseInt(stat.getAttribute('data-count'));
        let count = 0;
        const duration = 2000; // 2 seconds
        const increment = target / (duration / 50);

        const timer = setInterval(() => {
            count += increment;
            if (count >= target) {
                count = target;
                clearInterval(timer);
            }
            stat.textContent = Math.floor(count);
        }, 50);
    });

    // Animation des éléments au défilement
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

    // Observer les cartes de programmes
    document.querySelectorAll('.program-card').forEach(card => {
        observer.observe(card);
    });

    // Observer les cartes d'actualités
    document.querySelectorAll('.news-card').forEach(card => {
        observer.observe(card);
    });

    // Observer les éléments de fonctionnalités
    document.querySelectorAll('.feature').forEach(feature => {
        observer.observe(feature);
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

document.querySelectorAll('.program-slider').forEach(slider => {
    const images = slider.dataset.images.split(',');
    let index = 0;
    let interval;
    let isAnimating = false; // Pour éviter les animations superposées

    // Créer un conteneur pour le slider
    const container = document.createElement('div');
    container.className = 'slider-container';
    container.style.position = 'relative';
    container.style.overflow = 'hidden';
    container.style.width = slider.offsetWidth + 'px';
    container.style.height = slider.offsetHeight + 'px';
    container.style.cursor = 'pointer'; // Pour montrer que c'est cliquable

    // Remplacer le slider par le conteneur
    slider.parentNode.insertBefore(container, slider);
    container.appendChild(slider);

    // Style du slider
    slider.style.width = '100%';
    slider.style.height = '100%';
    slider.style.objectFit = 'cover';
    slider.style.transition = 'transform 0.5s ease-in-out';
    slider.style.position = 'relative';
    slider.style.zIndex = '1';

    const slideToNext = () => {
        if (isAnimating) return; // Éviter les animations en cascade

        isAnimating = true;
        const nextIndex = (index + 1) % images.length;

        // Créer la nouvelle image
        const nextImage = new Image();
        nextImage.src = images[nextIndex];
        nextImage.style.position = 'absolute';
        nextImage.style.top = '0';
        nextImage.style.left = '100%';
        nextImage.style.width = '100%';
        nextImage.style.height = '100%';
        nextImage.style.objectFit = 'cover';
        nextImage.style.transition = 'transform 0.5s ease-in-out';
        nextImage.style.zIndex = '2';
        nextImage.style.pointerEvents = 'none'; // IMPORTANT: permet le hover à travers

        container.appendChild(nextImage);

        // Forcer le reflow pour l'animation
        nextImage.offsetWidth;

        // Démarrer l'animation
        setTimeout(() => {
            slider.style.transform = 'translateX(-100%)';
            nextImage.style.transform = 'translateX(-100%)';
        }, 10);

        // Après l'animation
        setTimeout(() => {
            // Mettre à jour l'image principale
            slider.src = images[nextIndex];
            slider.style.transform = 'translateX(0)';

            

            // Mettre à jour l'index
            index = nextIndex;
            isAnimating = false;
        }, 510);
    };

    // Gestion du carrousel
    const startCarousel = () => {
        if (!interval) {
            interval = setInterval(slideToNext, 5000);
        }
    };

    const stopCarousel = () => {
        if (interval) {
            clearInterval(interval);
            interval = null;
        }
    };

    // Événements sur le CONTAINER (pas sur l'image)
    container.addEventListener('mouseenter', stopCarousel);
    container.addEventListener('mouseleave', startCarousel);

    // Événement click sur l'image (exemple)
    container.addEventListener('click', () => {
        console.log('Image cliquée:', images[index]);
        // Tu peux ajouter une action ici
    });

    // Effet hover sur le container
    container.addEventListener('mouseenter', () => {
        container.style.opacity = '0.9';
        container.style.transform = 'scale(1.02)';
        container.style.transition = 'all 0.3s ease';
    });

    container.addEventListener('mouseleave', () => {
        container.style.opacity = '1';
        container.style.transform = 'scale(1)';
    });

    // Démarrer le carrousel
    startCarousel();

    // Pour le debug: afficher les infos
    console.log('Slider initialisé avec', images.length, 'images');
});


