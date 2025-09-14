document.addEventListener('DOMContentLoaded', function() {
    const testAlertBtn = document.getElementById('testAlertBtn');

    // Функция для создания тестового алёрта
    function createTestAlert() {
        // Создаем overlay
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

        // Создаем модальное окно
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

        // Заголовок
        const title = document.createElement('h3');
        title.textContent = 'Тестовое уведомление';
        title.style.margin = '0 0 15px 0';
        title.style.color = '#00ff88';

        // Текст сообщения
        const message = document.createElement('p');
        message.textContent = 'Это тестовый алёрт от MTS Link Fixer';
        message.style.margin = '0 0 20px 0';
        message.style.opacity = '0.9';

        // Контейнер для кнопок
        const buttonContainer = document.createElement('div');
        buttonContainer.style.display = 'flex';
        buttonContainer.style.gap = '10px';
        buttonContainer.style.justifyContent = 'center';

        // Кнопка подтверждения
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

        // Кнопка закрытия (изначально скрыта)
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

        // Обработчик кнопки подтверждения
        confirmBtn.addEventListener('click', function() {
            // Скрываем кнопку подтверждения
            confirmBtn.style.display = 'none';
            
            // Показываем кнопку закрытия
            closeBtn.style.display = 'block';
            
            // Меняем сообщение
            message.textContent = 'Действие подтверждено! Можно закрыть алёрт';
            message.style.color = '#00ff88';
            
            console.log('Тестовое действие подтверждено');
        });

        // Обработчик кнопки закрытия
        closeBtn.addEventListener('click', function() {
            // Удаляем алёрт
            document.body.removeChild(overlay);
            console.log('Тестовый алёрт закрыт');
        });

        // Добавляем hover эффекты
        confirmBtn.addEventListener('mouseover', () => {
            confirmBtn.style.background = '#00cc6a';
            confirmBtn.style.transform = 'translateY(-2px)';
        });
        
        confirmBtn.addEventListener('mouseout', () => {
            confirmBtn.style.background = '#00ff88';
            confirmBtn.style.transform = 'translateY(0)';
        });
        
        closeBtn.addEventListener('mouseover', () => {
            closeBtn.style.background = '#0056b3';
            closeBtn.style.transform = 'translateY(-2px)';
        });
        
        closeBtn.addEventListener('mouseout', () => {
            closeBtn.style.background = '#007bff';
            closeBtn.style.transform = 'translateY(0)';
        });

        // Собираем всё вместе
        buttonContainer.appendChild(confirmBtn);
        buttonContainer.appendChild(closeBtn);
        
        modal.appendChild(title);
        modal.appendChild(message);
        modal.appendChild(buttonContainer);
        
        overlay.appendChild(modal);
        document.body.appendChild(overlay);

        // Закрытие по клику на overlay
        overlay.addEventListener('click', function(e) {
            if (e.target === overlay) {
                document.body.removeChild(overlay);
            }
        });
    }

    // Обработчик кнопки тестового алёрта
    testAlertBtn.addEventListener('click', function() {
        // Закрываем popup
        window.close();
        
        // Ждем немного чтобы popup закрылся
        setTimeout(() => {
            // Отправляем сообщение в active tab для создания алёрта
            chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
                if (tabs[0]) {
                    chrome.scripting.executeScript({
                        target: {tabId: tabs[0].id},
                        function: createTestAlert
                    });
                }
            });
        }, 100);
    });

});