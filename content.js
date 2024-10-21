const porcentaje = 0.99;

function saltarAnuncio(porcentaje) {
  const video = document.querySelector('video');

  if (video) {
    if (hayAnuncio()) {
      if (isFinite(video.duration) && video.duration > 0 && video.currentTime < video.duration * porcentaje) {
        // Avanzar y mutear el anuncio
        video.currentTime = video.duration * porcentaje;
        video.muted = true;
        video.playbackRate = 16;
        pulsarSaltarAnuncio();
      }
    } else {
      // Reestablecer el audio
      video.muted = false;
      video.playbackRate = 1;
    }
  }
}

function hayAnuncio() {
  const adIndicator = document.querySelector('.ad-showing');
  return (adIndicator !== null);
}

function observarAnuncios(porcentaje) {
  const observadorAnuncios = new MutationObserver((mutations) => {
    mutations.forEach(() => {
      if (hayAnuncio())
        saltarAnuncio(porcentaje);
    });
  });

  // Inicia la observación en el body y sus hijos
  observadorAnuncios.observe(document.body, { childList: true, subtree: true });
}

// Observar botón de saltar anuncio y si se puede presiona el botón
function pulsarSaltarAnuncio() {
  const intervalId = setInterval(() => {
    const divTiempoSaltar = document.querySelector('.ytp-preview-ad');
    const skipButton = document.querySelector('.ytp-skip-ad-button');

    if (divTiempoSaltar && window.getComputedStyle(divTiempoSaltar).display === 'none' && skipButton) {
      skipButton.click();
      clearInterval(intervalId);
    }
  }, 20);
}

// Ejecutar extensión al cargar la página
if (hayAnuncio())
  saltarAnuncio(porcentaje);

observarAnuncios(porcentaje);