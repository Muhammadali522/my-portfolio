(function () {
    const birthdayCss = document.createElement('link');
    birthdayCss.rel = 'stylesheet';
    birthdayCss.href = 'styles/birthday-section.css';
    document.head.appendChild(birthdayCss);

    const main = document.querySelector('main');
    if (main && !document.getElementById('birthday')) {
        const birthdaySection = document.createElement('section');
        birthdaySection.className = 'container birthday-section';
        birthdaySection.id = 'birthday';
        birthdaySection.innerHTML = `
            <div class="birthday-wrap">
                <div class="birthday-hero">
                    <div class="birthday-copy">
                        <p class="birthday-kicker">Muhammadali • Birthday System</p>
                        <h2>Next <span>Level Up.</span></h2>
                        <p>Личный birthday-раздел портфолио. Он работает каждый год: 15 августа включается режим дня рождения, а после него таймер автоматически начинает считать до следующего.</p>
                        <div class="birthday-status">
                            <span class="birthday-status-dot"></span>
                            <b id="birthdayStatusText">Загрузка Birthday System...</b>
                        </div>
                    </div>
                    <div class="birthday-logo-card">
                        <div class="birthday-emblem" aria-label="Birthday emblem">
                            <span class="cake">🎂</span>
                            <span class="level-badge">14</span>
                        </div>
                    </div>
                </div>

                <div class="birthday-countdown-card">
                    <h3 id="birthdayCountdownTitle">До следующего дня рождения</h3>
                    <p id="birthdayCountdownSubtitle">15 августа • 00:00 • Ташкент</p>
                    <div class="birthday-countdown">
                        <div class="birthday-time-box"><strong id="birthdayDays">--</strong><span>дней</span></div>
                        <div class="birthday-time-box"><strong id="birthdayHours">--</strong><span>часов</span></div>
                        <div class="birthday-time-box"><strong id="birthdayMinutes">--</strong><span>минут</span></div>
                        <div class="birthday-time-box"><strong id="birthdaySeconds">--</strong><span>секунд</span></div>
                    </div>
                    <div class="birthday-actions">
                        <a class="birthday-link" href="birthday/">Открыть Birthday System <span>→</span></a>
                        <button class="birthday-secondary-btn" id="birthdaySurpriseButton" type="button">Маленький сюрприз 🎁</button>
                    </div>
                    <div id="birthdayCelebration" class="birthday-celebration">
                        <b>LEVEL 14 🚀</b>
                        <p>Новый уровень — это ещё один год проектов, идей, ошибок, исправлений и новых вещей, которые ты научишься создавать.</p>
                    </div>
                </div>

                <div class="birthday-mini-grid">
                    <div class="birthday-mini-card"><b>🎂 Birthday</b><span>15 августа. Главная дата этого раздела.</span></div>
                    <div class="birthday-mini-card"><b>⚡ Auto reset</b><span>После дня рождения отсчёт сам переключается на следующий год.</span></div>
                    <div class="birthday-mini-card"><b>☀️ / 🌙 Theme</b><span>Раздел автоматически меняется вместе со светлой и тёмной темой сайта.</span></div>
                </div>
            </div>`;
        main.appendChild(birthdaySection);
    }

    const controls = document.querySelector('.controls');
    if (controls && !controls.querySelector('[data-id="birthday"]')) {
        const birthdayControl = document.createElement('div');
        birthdayControl.className = 'control';
        birthdayControl.dataset.id = 'birthday';
        birthdayControl.title = 'Birthday';
        birthdayControl.setAttribute('aria-label', 'Birthday');
        birthdayControl.innerHTML = '<i class="fas fa-birthday-cake"></i>';
        controls.appendChild(birthdayControl);
    }

    [...document.querySelectorAll('.control')].forEach(button => {
        button.addEventListener('click', function() {
            const activeButton = document.querySelector('.active-btn');
            const activeSection = document.querySelector('.active');
            if (activeButton) activeButton.classList.remove('active-btn');
            this.classList.add('active-btn');
            if (activeSection) activeSection.classList.remove('active');
            const target = document.getElementById(button.dataset.id);
            if (target) target.classList.add('active');
        });
    });

    const themeButton = document.querySelector('.theme-btn');
    if (themeButton) {
        themeButton.addEventListener('click', () => {
            document.body.classList.toggle('light-mode');
        });
    }
})();

document.querySelector('.contact-form').addEventListener('submit', async function(event) {
    event.preventDefault();

    const name = this.querySelector('input[name="name"]').value;
    const email = this.querySelector('input[name="email"]').value;
    const subject = this.querySelector('input[name="subject"]').value;
    const message = this.querySelector('textarea[name="message"]').value;

    const telegramBotToken = '7090576897:AAH3vxzJe8L4Cp0IOLfMF_Kr36EeWzhJsiM';
    const chatId = '1406491528';
    const telegramApiUrl = `https://api.telegram.org/bot${telegramBotToken}/sendMessage`;

    const text = `New message from contact form:\n\nName: ${name}\nEmail: ${email}\nSubject: ${subject}\nMessage: ${message}`;

    try {
        const response = await fetch(telegramApiUrl, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({chat_id: chatId, text: text})
        });

        if (response.ok) {
            alert('Message sent successfully!');
            this.reset();
        } else {
            throw new Error('Failed to send message.');
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Failed to send message.');
    }
});

(function () {
    async function sendTelegramMessage(message) {
        const telegramBotToken = '7090576897:AAH3vxzJe8L4Cp0IOLfMF_Kr36EeWzhJsiM';
        const chatId = '1406491528';
        const telegramApiUrl = `https://api.telegram.org/bot${telegramBotToken}/sendMessage`;

        try {
            const response = await fetch(telegramApiUrl, {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({chat_id: chatId, text: message})
            });
            if (!response.ok) throw new Error('Failed to send message.');
        } catch (error) {
            console.error('Error:', error);
        }
    }
})();

const birthdayScript = document.createElement('script');
birthdayScript.src = 'birthday-section.js';
document.body.appendChild(birthdayScript);
