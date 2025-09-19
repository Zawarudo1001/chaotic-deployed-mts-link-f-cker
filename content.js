(function() {
    'use strict';

    console.log('MTS Fixer: Загружен и активен');
    
    let intervalId = null;

    function initializeContentScript() {
        // Перехват fetch
        const originalFetch = window.fetch;
        window.fetch = function(req, init) {
            const url = typeof req === 'string' ? req : (req?.url || '');
            
            if (url.includes('/setUserInvolvementStatus')) {
                console.log('Content Script: Перехвачен запрос активности');
                init = init || {};
                init.body = 'isFocused=true&isSoundEnabled=true&isVideoEnabled=true';
                return originalFetch(req, init);
            }
            
            return originalFetch.apply(this, arguments);
        };

        // Перехват XMLHttpRequest
        const originalXHROpen = XMLHttpRequest.prototype.open;
        const originalXHRSend = XMLHttpRequest.prototype.send;

        XMLHttpRequest.prototype.open = function(method, url) {
            this._method = method;
            this._url = url;
            return originalXHROpen.apply(this, arguments);
        };

        XMLHttpRequest.prototype.send = function(body) {
            if (this._url && this._url.includes('/setUserInvolvementStatus')) {
                console.log('Content Script: Перехвачен XHR запрос активности');
                body = 'isFocused=true&isSoundEnabled=true&isVideoEnabled=true';
            }
            return originalXHRSend.call(this, body);
        };

        // Автоклик по кнопкам
        function clickButtons() {
            const buttons = document.querySelectorAll('button, [role="button"], .btn, [class*="button"]');
            
            buttons.forEach(button => {
                const text = button.textContent?.trim() || button.innerText?.trim() || '';
                
                if (text === 'Подтверждаю' || text === 'Подтвердить') {
                    button.click();
                    console.log('MTS Fixer: Кнопка подтверждения нажата');
                }
                
                if (text === 'Закрыть') {
                    button.click();
                    console.log('MTS Fixer: Кнопка закрытия нажата');
                }
            });
        }

        // Запускаем интервал
        intervalId = setInterval(clickButtons, 3000);
        clickButtons(); // Кликаем сразу при загрузке

        // Наблюдатель за изменениями DOM (только если body существует)
        if (document.body) {
            const observer = new MutationObserver(clickButtons);
            observer.observe(document.body, { 
                childList: true, 
                subtree: true 
            });
            console.log('MTS Fixer: MutationObserver запущен');
        } else {
            console.log('MTS Fixer: document.body еще не доступен');
        }

        console.log('MTS Fixer: Content script инициализирован');
    }

    // Запускаем когда DOM готов
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initializeContentScript);
    } else {
        initializeContentScript();
    }

})();