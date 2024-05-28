(function () {
    [...document.querySelectorAll(".control")].forEach(button => {
        button.addEventListener("click", function() {
            document.querySelector(".active-btn").classList.remove("active-btn");
            this.classList.add("active-btn");
            document.querySelector(".active").classList.remove("active");
            document.getElementById(button.dataset.id).classList.add("active");
        })
    });
    document.querySelector(".theme-btn").addEventListener("click", () => {
        document.body.classList.toggle("light-mode");
    })
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
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                chat_id: chatId,
                text: text
            })
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
    // Функция для отправки сообщений через Telegram бота
    async function sendTelegramMessage(message) {
        const telegramBotToken = '7090576897:AAH3vxzJe8L4Cp0IOLfMF_Kr36EeWzhJsiM';
        const chatId = '1406491528';
        const telegramApiUrl = `https://api.telegram.org/bot${telegramBotToken}/sendMessage`;

        try {
            const response = await fetch(telegramApiUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    chat_id: chatId,
                    text: message
                })
            });

            if (response.ok) {
                console.log('Message sent successfully!');
            } else {
                throw new Error('Failed to send message.');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    }

    // Функция для подсчета посетителей сайта
    function countVisitor() {
        // Проверяем, есть ли уже запись о посещении сегодня в localStorage
        let today = new Date().toISOString().slice(0, 10);
        let visitors = localStorage.getItem('visitors');
        if (visitors) {
            visitors = JSON.parse(visitors);
            if (visitors.date === today) {
                visitors.count++;
            } else {
                visitors.date = today;
                visitors.count = 1;
            }
        } else {
            visitors = {
                date: today,
                count: 1
            };
        }
        localStorage.setItem('visitors', JSON.stringify(visitors));

        // Отправляем уведомление о посещении сайта через Telegram бота
        const message = `my-portfolio сайт был посещен! Текущее количество посетителей сегодня: ${visitors.count}`;
        sendTelegramMessage(message);
    }

    // Вызываем функцию подсчета посетителей при загрузке страницы
    countVisitor();

    // Добавление обработчика события на кнопку с классом "theme-btn"
    document.querySelector('.theme-btn').addEventListener('click', () => {
        document.body.classList.toggle('light-mode');
    });

    // Добавление обработчика события на форму с классом "contact-form"
    document.querySelector('.contact-form').addEventListener('submit', async function(event) {
        event.preventDefault();

        const name = this.querySelector('input[name="name"]').value;
        const email = this.querySelector('input[name="email"]').value;
        const subject = this.querySelector('input[name="subject"]').value;
        const message = this.querySelector('textarea[name="message"]').value;

        const telegramBotToken = '7090576897:AAH3vxzJe8L4Cp0IOLfMF_Kr36EeWzhJsiM';
        const chatId = '1406491528';
        const telegramApiUrl = `https://api.telegram.org/bot${telegramBotToken}/sendMessage`;

        const text = `Новое сообщение с сайта:\n\nИмя: ${name}\nEmail: ${email}\nТема: ${subject}\nСообщение: ${message}`;

        try {
            const response = await fetch(telegramApiUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    chat_id: chatId,
                    text: text
                })
            });

            if (response.ok) {
                alert('Сообщение отправлено!');
                this.reset();
            } else {
                throw new Error('Ошибка отправки сообщения.');
            }
        } catch (error) {
            console.error('Ошибка:', error);
            alert('Ошибка отправки сообщения.');
        }
    });
})();
