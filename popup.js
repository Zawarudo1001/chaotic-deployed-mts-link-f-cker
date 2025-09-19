document.addEventListener('DOMContentLoaded', function() {
    const statusText = document.getElementById('statusText');

    // Проверяем статус расширения
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        if (tabs[0] && tabs[0].url.includes('mts-link.ru')) {
            chrome.tabs.sendMessage(
                tabs[0].id,
                {type: 'GET_STATUS'},
                function(response) {
                    if (response && response.enabled !== undefined) {
                        updateStatus(response.enabled);
                    } else {
                        statusText.textContent = '● Расширение активно';
                        statusText.className = 'status on';
                    }
                }
            );
        } else {
            statusText.textContent = '● Откройте MTS Link';
            statusText.className = 'status on';
        }
    });

    // Обновление статуса
    function updateStatus(isEnabled) {
        if (isEnabled) {
            statusText.textContent = '● Расширение активно';
            statusText.className = 'status on';
        } else {
            statusText.textContent = '● Расширение неактивно';
            statusText.className = 'status off';
        }
    }
});