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
