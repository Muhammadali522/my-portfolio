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
})();
