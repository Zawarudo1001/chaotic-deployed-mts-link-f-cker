// Service Worker для перехвата запросов даже при неактивном браузере
chrome.webRequest.onBeforeRequest.addListener(
  function(details) {
    if (details.url.includes('/setUserInvolvementStatus')) {
      console.log('Service Worker: Обнаружен запрос активности', details.url);
      
      // Здесь можно добавить дополнительную логику
      // Например, отправлять уведомления или логировать
    }
  },
  { urls: ["https://*.mts-link.ru/*"] }
);

// Альтернативный подход: модификация через перехват fetch в Service Worker
self.addEventListener('fetch', (event) => {
  const url = event.request.url;
  
  if (url.includes('/setUserInvolvementStatus') && event.request.method === 'POST') {
    console.log('Service Worker: Перехвачен fetch запрос');
    
    event.respondWith((async () => {
      // Клонируем запрос для чтения тела
      const clonedRequest = event.request.clone();
      
      // Создаем новый запрос с модифицированным телом
      const newBody = 'isFocused=true&isSoundEnabled=true&isVideoEnabled=true';
      const newRequest = new Request(url, {
        method: 'POST',
        headers: event.request.headers,
        body: newBody,
        mode: 'cors',
        credentials: 'include'
      });
      
      return fetch(newRequest);
    })());
  }
});

// Отслеживаем вкладки
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.status === 'complete' && tab.url && tab.url.includes('mts-link.ru')) {
    console.log('MTS Fixer: Страница MTS Link загружена');
  }
});

console.log('MTS Fixer: Service Worker запущен');