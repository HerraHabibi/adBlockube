encontrarAnuncios();
observarAnuncios();

function encontrarAnuncios() {
  const anuncios = document.querySelectorAll('ytd-ad-slot-renderer');

  anuncios.forEach(anuncio => {
    eliminarAnuncio(anuncio);
  });
}

function observarAnuncios() {
  const observador = new MutationObserver(mutations => {
    mutations.forEach(mutation => {
      if (mutation.addedNodes.length > 0)
        mutation.addedNodes.forEach(nodo => {
          if (nodo.nodeName === 'YTD-AD-SLOT-RENDERER')
            eliminarAnuncio(nodo);
        });
    });
  });

  observador.observe(document.body, { childList: true, subtree: true });
}

function eliminarAnuncio(anuncio) {
  const abuelo = anuncio.closest('ytd-ad-slot-renderer').parentElement?.parentElement;
  
  if (abuelo)
    abuelo.remove();
}