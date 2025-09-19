(function() {
    'use strict';

    console.log('MTS Fixer: Загружен и активен');
    
    let intervalId = null;
    let originalFetch = window.fetch;

    // Включаем перехват fetch
    window.fetch = function(req, init) {
        if (typeof req === 'string' && req.includes('/setUserInvolvementStatus')) {
            console.log('MTS Fixer: Перехвачен запрос активности');
            init = init || {};
            init.body = 'isFocused=true&isSoundEnabled=true&isVideoEnabled=true';
            return originalFetch(req, init);
        }
        return originalFetch.apply(window, arguments);
    };

    // Запускаем интервал для поиска кнопок
    intervalId = setInterval(function() {
        // Ищем кнопку "Подтверждаю"
        let acceptButton = Array.from(document.querySelectorAll('button')).find(button => {
            return button.textContent && button.textContent.trim() === 'Подтверждаю';
        });
        
        if (acceptButton) {
            acceptButton.click();
            console.log('MTS Fixer: Кнопка "Подтверждаю" нажата');
        }

        // Ищем кнопку "Закрыть"
        let closeButton = Array.from(document.querySelectorAll('button')).find(button => {
            return button.textContent && button.textContent.trim() === 'Закрыть';
        });
        
        if (closeButton) {
            closeButton.click();
            console.log('MTS Fixer: Кнопка "Закрыть" нажата');
        }
    }, 5000);

    console.log('MTS Fixer: Активен и работает');

})();