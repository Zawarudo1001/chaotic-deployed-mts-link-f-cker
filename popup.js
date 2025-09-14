document.addEventListener('DOMContentLoaded', function() {
    const toggleSwitch = document.getElementById('toggleSwitch');
    const statusText = document.getElementById('statusText');

    // Загрузка текущего статуса
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        chrome.tabs.sendMessage(
            tabs[0].id,
            {type: 'GET_STATUS'},
            function(response) {
                if (response && response.enabled !== undefined) {
                    toggleSwitch.checked = response.enabled;
                    updateStatus(response.enabled);
                }
            }
        );
    });

    // Обновление статуса
    function updateStatus(isEnabled) {
        if (isEnabled) {
            statusText.textContent = '● Активен';
            statusText.className = 'status on';
        } else {
            statusText.textContent = '● Неактивен';
            statusText.className = 'status off';
        }
    }

    // Обработчик переключателя
    toggleSwitch.addEventListener('change', function() {
        const isEnabled = this.checked;
        updateStatus(isEnabled);
        
        // Отправляем сообщение в content script
        chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
            chrome.tabs.sendMessage(
                tabs[0].id,
                {
                    type: 'TOGGLE_EXTENSION',
                    enabled: isEnabled
                },
                function(response) {
                    if (response && response.success) {
                        console.log('Статус изменен:', isEnabled ? 'Включено' : 'Выключено');
                    }
                }
            );
        });
        
        // Сохраняем в storage
        chrome.storage.local.set({ mtsFixerEnabled: isEnabled });
    });


});