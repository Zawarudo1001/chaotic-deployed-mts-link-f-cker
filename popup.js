document.addEventListener('DOMContentLoaded', function() {
    const statusText = document.getElementById('statusText');

    statusText.textContent = '● Расширение активно';
    statusText.className = 'status on';
    
    // Проверяем, открыта ли страница MTS Link
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        if (tabs[0]) {
            if (tabs[0].url.includes('mts-link.ru')) {
                statusText.textContent = '● Активно на MTS Link';
            } else {
                statusText.textContent = '● Откройте MTS Link';
            }
        }
    });
});