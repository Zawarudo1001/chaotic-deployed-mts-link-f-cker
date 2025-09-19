(function() {
    'use strict';

    console.log('MTS Fixer: Загружен');
    
    let isEnabled = true;
    let intervalId = null;
    let originalFetch = window.fetch;

    // Функция включения/выключения
    function toggleExtension(enabled) {
        isEnabled = enabled;
        
        if (enabled) {
            // Включаем перехват fetch
            window.fetch = function(req, init) {
                if (typeof req === 'string' && req.includes('/setUserInvolvementStatus')) {
                    init = init || {};
                    init.body = 'isFocused=true&isSoundEnabled=true&isVideoEnabled=true';
                    return originalFetch(req, init);
                }
                return originalFetch.apply(window, arguments);
            };

            // Запускаем интервал
            if (!intervalId) {
                intervalId = setInterval(function() {
                    let acceptButton = Array.from(document.querySelectorAll('button')).find(button => button.textContent.trim() === 'Подтверждаю');
                    if (acceptButton) {
                        acceptButton.click();
                        console.log('MTS Fixer: Кнопка "Подтверждаю" нажата');
                    }

                    let closetButton = Array.from(document.querySelectorAll('button')).find(button => button.textContent.trim() === 'Закрыть');
                    if (closetButton) {
                        closetButton.click();
                        console.log('MTS Fixer: Кнопка "Закрыть" нажата');
                    }
                }, 5000);
            }
            
            console.log('MTS Fixer: Включен');
        } else {
            // Выключаем перехват fetch
            if (window.fetch !== originalFetch) {
                window.fetch = originalFetch;
            }

            // Останавливаем интервал
            if (intervalId) {
                clearInterval(intervalId);
                intervalId = null;
            }
            
            console.log('MTS Fixer: Выключен');
        }
    }

    // Загрузка состояния из storage
    chrome.storage.local.get(['mtsFixerEnabled'], function(result) {
        const enabled = result.mtsFixerEnabled !== false; // По умолчанию включено
        toggleExtension(enabled);
    });

    // Слушаем сообщения от popup
    chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
        if (message.type === 'TOGGLE_EXTENSION') {
            toggleExtension(message.enabled);
            // Сохраняем состояние
            chrome.storage.local.set({ mtsFixerEnabled: message.enabled });
            sendResponse({ success: true });
        }
        
        if (message.type === 'GET_STATUS') {
            sendResponse({ enabled: isEnabled });
        }
    });

})();