chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  // Comprobar si la pestaña ha terminado de cargar y si es YouTube
  if (changeInfo.status === 'complete' && tab.url.includes('youtube.com')) {
      // Inyectar js solo en la pestaña activa de YouTube
      chrome.scripting.executeScript({
          target: {tabId: tabId},
          files: ['adsFeed.js']
      });
  }
});