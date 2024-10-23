const segundo = 5;
const multVelocidad = 16;

if (hayAnuncio())
  saltarAnuncio();

observarAnuncios();

function hayAnuncio() {
  const anuncio = document.querySelector('.ad-showing');
  return (anuncio !== null);
}

function observarAnuncios() {
  const observadorAnuncios = new MutationObserver((mutations) => {
    mutations.forEach(() => {
      if (hayAnuncio())
        saltarAnuncio();
    });
  });

  observadorAnuncios.observe(document.body, { childList: true, subtree: true });
}

function saltarAnuncio() {
  const video = document.querySelector('video');

  if (video) {
    if (hayAnuncio()) {
      if (isFinite(video.duration) && video.duration > 0 && video.currentTime < segundo) {
        // Avanzar y mutear el anuncio y pulsar el botón de saltar anuncio
        video.currentTime = segundo;
        video.muted = true;
        video.playbackRate = multVelocidad;
      }
    
    } else {
      // Reestablecer el audio y la velocidad
      video.muted = false;
      video.playbackRate = 1;
    }
  }
}