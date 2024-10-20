const multVelocidad = 16; // Multiplicador de velocidad (MÁX 16)

function saltarAnuncio(multVelocidad) {
  const video = document.querySelector('video');

  if (video) {
    if (hayAnuncio()) {
      // Acelerar la velocidad del anuncio
      video.playbackRate = multVelocidad;
      video.muted = true;
      observarSaltarAnuncio();

    } else {
      // Reestablecer velocidad del vídeo
      video.playbackRate = 1;
      video.muted = false;
    }
  }
}

function hayAnuncio() {
  const adIndicator = document.querySelector('.ad-showing');
  return (adIndicator !== null);
}

function observarAnuncios(multVelocidad) {
  const observadorAnuncios = new MutationObserver((mutations) => {
    mutations.forEach(() => {
      if (hayAnuncio())
        saltarAnuncio(multVelocidad);
    });
  });

  // Inicia la observación en el contenedor del player y sus hijos
  observadorAnuncios.observe(document.body, { childList: true, subtree: true });
}

// Observar botón de saltar anuncio y si se puede presiona el botón
function observarSaltarAnuncio() {
  const divTiempoSaltar = document.querySelector('.ytp-preview-ad');
  
  if (divTiempoSaltar) {
    const observadorBotonSaltar = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.target.style.display === 'none') {
          const skipButton = document.querySelector('.ytp-skip-ad-button');

          if (skipButton) {
            skipButton.click();
          }
        }
      });
    });
    
    observadorBotonSaltar.observe(divTiempoSaltar, { attributes: true, attributeFilter: ['style'] });
  }
}

// Ejecutar extensión al cargar la página
if (hayAnuncio()) {
  saltarAnuncio(multVelocidad);
}

observarAnuncios(multVelocidad);