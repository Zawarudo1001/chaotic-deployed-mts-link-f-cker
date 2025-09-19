(function() {
    'use strict';

    console.log('MTS Fixer: Загружен и активен');
    
    let intervalId = null;
    let originalFetch = window.fetch;

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

    console.log('MTS Fixer: Активен и работает');

})();