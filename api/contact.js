export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ ok: false, error: 'Method not allowed' });
  }

  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;

  if (!token || !chatId) {
    console.error('Telegram environment variables are missing');
    return res.status(500).json({ ok: false, error: 'Server is not configured' });
  }

  try {
    const body = typeof req.body === 'string' ? JSON.parse(req.body) : (req.body || {});
    const name = String(body.name || '').trim().slice(0, 80);
    const email = String(body.email || '').trim().slice(0, 120);
    const subject = String(body.subject || '').trim().slice(0, 120);
    const message = String(body.message || '').trim().slice(0, 2000);

    if (!name || !email || !message) {
      return res.status(400).json({ ok: false, error: 'Name, email and message are required' });
    }

    const text = [
      '📨 New portfolio message',
      '',
      `Name: ${name}`,
      `Email: ${email}`,
      `Subject: ${subject || '—'}`,
      '',
      message
    ].join('\n');

    const telegramResponse = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: chatId,
        text,
        disable_web_page_preview: true
      })
    });

    const telegramData = await telegramResponse.json().catch(() => ({}));

    if (!telegramResponse.ok || !telegramData.ok) {
      console.error('Telegram API error', telegramData);
      return res.status(502).json({ ok: false, error: 'Telegram delivery failed' });
    }

    return res.status(200).json({ ok: true });
  } catch (error) {
    console.error('Contact API error', error);
    return res.status(500).json({ ok: false, error: 'Internal server error' });
  }
}
