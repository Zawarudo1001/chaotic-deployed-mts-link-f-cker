(function() {
    console.log('Hello from mts fixer');
    
    var originalFetch = window.fetch;
    window.fetch = function(req, init) {
        if (req.includes('/setUserInvolvementStatus')) {
            init.body = 'isFocused=true&isSoundEnabled=true&isVideoEnabled=true';
            return originalFetch(req, init);
        }
        return originalFetch.apply(window, arguments);
    };

    setInterval(function () {
        let acceptButton =  Array.from(document.querySelectorAll('button')).find(button => button.textContent.trim() === 'Подтверждаю');
        if (acceptButton) {
            acceptButton.click();
            console.log('Activity button clicked');
        }

        let closetButton =  Array.from(document.querySelectorAll('button')).find(button => button.textContent.trim() === 'Закрыть');
        if (closetButton) {
            closetButton.click();
            console.log('Close button clicked');
        }
    }, 5000);
})();