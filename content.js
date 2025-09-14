(function() {
    'use strict';

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
        let acceptButton = Array.from(document.querySelectorAll('button')).find(button => button.textContent.trim() === 'Подтверждаю');
        if (acceptButton) {
            acceptButton.click();
            console.log('Activity button clicked');
        }

        let closetButton = Array.from(document.querySelectorAll('button')).find(button => button.textContent.trim() === 'Закрыть');
        if (closetButton) {
            closetButton.click();
            console.log('Close button clicked');
        }
    }, 5000);

    // Делаем функцию доступной глобально для вызова из popup
    window.createTestAlert = function() {
        // Код функции такой же как в popup.js
        const overlay = document.createElement('div');
        overlay.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0,0,0,0.8);
            z-index: 10000;
            display: flex;
            justify-content: center;
            align-items: center;
            font-family: Arial, sans-serif;
        `;

        const modal = document.createElement('div');
        modal.style.cssText = `
            background: #2d2d2d;
            padding: 30px;
            border-radius: 15px;
            text-align: center;
            box-shadow: 0 10px 30px rgba(0,0,0,0.5);
            min-width: 300px;
            border: 2px solid #00ff88;
            color: white;
        `;

        const title = document.createElement('h3');
        title.textContent = 'Тестовое уведомление';
        title.style.margin = '0 0 15px 0';
        title.style.color = '#00ff88';

        const message = document.createElement('p');
        message.textContent = 'Это тестовый алёрт от MTS Link Fixer';
        message.style.margin = '0 0 20px 0';
        message.style.opacity = '0.9';

        const buttonContainer = document.createElement('div');
        buttonContainer.style.display = 'flex';
        buttonContainer.style.gap = '10px';
        buttonContainer.style.justifyContent = 'center';

        const confirmBtn = document.createElement('button');
        confirmBtn.textContent = 'Подтверждаю';
        confirmBtn.style.cssText = `
            padding: 12px 24px;
            background: #00ff88;
            color: #1a1a1a;
            border: none;
            border-radius: 6px;
            cursor: pointer;
            font-weight: bold;
            transition: all 0.3s ease;
        `;

        const closeBtn = document.createElement('button');
        closeBtn.textContent = 'Закрыть';
        closeBtn.style.cssText = `
            padding: 12px 24px;
            background: #007bff;
            color: white;
            border: none;
            border-radius: 6px;
            cursor: pointer;
            font-weight: bold;
            transition: all 0.3s ease;
            display: none;
        `;

        confirmBtn.addEventListener('click', function() {
            confirmBtn.style.display = 'none';
            closeBtn.style.display = 'block';
            message.textContent = 'Действие подтверждено! Можно закрыть алёрт';
            message.style.color = '#00ff88';
        });

        closeBtn.addEventListener('click', function() {
            document.body.removeChild(overlay);
        });

        buttonContainer.appendChild(confirmBtn);
        buttonContainer.appendChild(closeBtn);
        
        modal.appendChild(title);
        modal.appendChild(message);
        modal.appendChild(buttonContainer);
        
        overlay.appendChild(modal);
        document.body.appendChild(overlay);

        overlay.addEventListener('click', function(e) {
            if (e.target === overlay) {
                document.body.removeChild(overlay);
            }
        });
    };

})();