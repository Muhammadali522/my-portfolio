(function () {
  const BIRTHDAY_MONTH = 7; // August, zero-based
  const BIRTHDAY_DAY = 15;
  const TASHKENT_OFFSET_MS = 5 * 60 * 60 * 1000;

  function tashkentParts() {
    const shifted = new Date(Date.now() + TASHKENT_OFFSET_MS);
    return {
      year: shifted.getUTCFullYear(),
      month: shifted.getUTCMonth(),
      day: shifted.getUTCDate(),
      hour: shifted.getUTCHours(),
      minute: shifted.getUTCMinutes(),
      second: shifted.getUTCSeconds()
    };
  }

  function targetUtcMs(year) {
    // 00:00 in Tashkent (UTC+5) = 19:00 UTC on the previous calendar day.
    return Date.UTC(year, BIRTHDAY_MONTH, BIRTHDAY_DAY, 0, 0, 0) - TASHKENT_OFFSET_MS;
  }

  function isBirthdayNow(parts) {
    return parts.month === BIRTHDAY_MONTH && parts.day === BIRTHDAY_DAY;
  }

  function nextBirthdayYear(parts) {
    if (parts.month < BIRTHDAY_MONTH) return parts.year;
    if (parts.month === BIRTHDAY_MONTH && parts.day < BIRTHDAY_DAY) return parts.year;
    return parts.year + 1;
  }

  function pad(value) {
    return String(value).padStart(2, '0');
  }

  function updateBirthdayCountdown() {
    const days = document.getElementById('birthdayDays');
    const hours = document.getElementById('birthdayHours');
    const minutes = document.getElementById('birthdayMinutes');
    const seconds = document.getElementById('birthdaySeconds');
    const title = document.getElementById('birthdayCountdownTitle');
    const subtitle = document.getElementById('birthdayCountdownSubtitle');
    const celebration = document.getElementById('birthdayCelebration');
    const statusText = document.getElementById('birthdayStatusText');

    if (!days || !hours || !minutes || !seconds) return;

    const parts = tashkentParts();

    if (isBirthdayNow(parts)) {
      days.textContent = '00';
      hours.textContent = '00';
      minutes.textContent = '00';
      seconds.textContent = '00';
      title.textContent = 'Сегодня день рождения! 🎉';
      subtitle.textContent = 'Birthday System активирован на весь день по времени Ташкента.';
      statusText.textContent = 'LEVEL UP • Birthday mode online';
      celebration.classList.add('show');
      return;
    }

    celebration.classList.remove('show');
    const year = nextBirthdayYear(parts);
    const target = targetUtcMs(year);
    const diff = Math.max(0, target - Date.now());

    const totalSeconds = Math.floor(diff / 1000);
    const d = Math.floor(totalSeconds / 86400);
    const h = Math.floor((totalSeconds % 86400) / 3600);
    const m = Math.floor((totalSeconds % 3600) / 60);
    const s = totalSeconds % 60;

    days.textContent = String(d);
    hours.textContent = pad(h);
    minutes.textContent = pad(m);
    seconds.textContent = pad(s);
    title.textContent = 'До следующего дня рождения';
    subtitle.textContent = `15 августа ${year} • 00:00 • Ташкент`;
    statusText.textContent = `Следующий LEVEL UP: 15.08.${year}`;
  }

  function initBirthdaySection() {
    updateBirthdayCountdown();
    setInterval(updateBirthdayCountdown, 1000);

    const surprise = document.getElementById('birthdaySurpriseButton');
    if (surprise) {
      surprise.addEventListener('click', function () {
        const panel = document.getElementById('birthdayCelebration');
        if (!panel) return;
        panel.classList.toggle('show');
      });
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initBirthdaySection);
  } else {
    initBirthdaySection();
  }
})();
