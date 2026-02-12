const apiKey = 'AIzaSyADBCISE_hz_2HjYT9mV8fOA-0zfLu2Hc4';
const channelId = 'UCzvGapQRG1aPdcdWLWTe0Sg';

function fetchVideos() {
  const url = `https://www.googleapis.com/youtube/v3/search?key=${apiKey}&channelId=${channelId}&part=snippet&order=date&maxResults=10&type=video`;

  fetch(url)
    .then(response => response.json())
    .then(data => {
      const videos = data.items;
      const videoContainer = document.getElementById('videos');
      videoContainer.innerHTML = '';

      videos.forEach(video => {
        const videoId = video.id.videoId;
        const iframe = document.createElement('iframe');
        iframe.src = `https://www.youtube.com/embed/${videoId}`;
        iframe.width = '300';
        iframe.height = '200';
        iframe.frameBorder = '0';
        iframe.allowFullscreen = true;
        videoContainer.appendChild(iframe);
      });
    })
    .catch(error => console.error('Erreur de chargement des vidéos :', error));
}

// Appeler la fonction au chargement de la page
window.onload = fetchVideos;



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