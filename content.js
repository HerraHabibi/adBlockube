const segundo = 5;
const multVelocidad = 16;

function saltarAnuncio() {
  const video = document.querySelector('video');

  if (video) {
    if (hayAnuncio()) {
      if (isFinite(video.duration) && video.duration > 0 && video.currentTime < segundo) {
        // Avanzar y mutear el anuncio y pulsar el botón de saltar anuncio
        video.currentTime = segundo;
        video.muted = true;
        video.playbackRate = multVelocidad;
        observarBotonSaltar();
      }
    
    } else {
      // Reestablecer el audio y la velocidad
      video.muted = false;
      video.playbackRate = 1;
    }
  }
}

function hayAnuncio() {
  const adIndicator = document.querySelector('.ad-showing');
  return (adIndicator !== null);
}

function observarAnuncios() {
  const observadorAnuncios = new MutationObserver((mutations) => {
    mutations.forEach(() => {
      if (hayAnuncio())
        saltarAnuncio();
    });
  });

  // Inicia la observación en el body y sus hijos
  observadorAnuncios.observe(document.body, { childList: true, subtree: true });
}

function observarBotonSaltar() {
  const skipObserver = new MutationObserver(() => {
    if (!hayAnuncio())
      skipObserver.disconnect();  // Dejar de observar una vez pulsado

    const skipButton = document.querySelector('.ytp-skip-ad-button');
    
    if (skipButton && skipButton.tagName === 'BUTTON') {
      
      // Verificar si el botón está visible y habilitado
      const buttonStyle = window.getComputedStyle(skipButton);

      if (buttonStyle.display !== 'none' && buttonStyle.visibility !== 'hidden' && !skipButton.disabled) {
        // Pulsar el botón si está visible y habilitado
        skipButton.click();
      }
    }
  });

  // Observar cambios en el DOM para ver cuándo aparece el botón
  skipObserver.observe(document.body, { childList: true, subtree: true });
}

// Ejecutar extensión al cargar la página
if (hayAnuncio())
  saltarAnuncio();

observarAnuncios();