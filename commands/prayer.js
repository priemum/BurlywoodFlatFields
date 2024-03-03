// prayerCommand.js
const axios = require('axios');
const moment = require('moment');

module.exports = (bot) => {
    bot.onText(/\/صلاة/, async (msg) => {
        const chatId = msg.chat.id;
        const [command, city, countryCode] = msg.text.split(' ');

        const url = `https://api.aladhan.com/v1/timingsByCity?city=${city}&country=${countryCode}&method=1`;

        try {
            const response = await axios.get(url);
            const data = response.data.data;
            const timings = data.timings;
            const date = data.date.readable;
            const hijriDate = data.date.hijri.date;
            const weekday = data.date.hijri.weekday.ar;
            const month = data.date.hijri.month.ar;

            const fajrTime = moment(timings.Fajr, 'HH:mm').format('hh:mm A');
            const sunriseTime = moment(timings.Sunrise, 'HH:mm').format('hh:mm A');
            const dhuhrTime = moment(timings.Dhuhr, 'HH:mm').format('hh:mm A');
            const asrTime = moment(timings.Asr, 'HH:mm').format('hh:mm A');
            const maghribTime = moment(timings.Maghrib, 'HH:mm').format('hh:mm A');
            const ishaTime = moment(timings.Isha, 'HH:mm').format('hh:mm A');

            const prayerTimesMessage = `🕌 مواقيت الصلاة في ${city}:\nتاريخ اليوم🗓️:${date}\n---\nالفجر: ${fajrTime}\nشروق الشمس: ${sunriseTime}\nالظهر: ${dhuhrTime}\nالعصر: ${asrTime}\nالمغرب: ${maghribTime}\nالعشاء: ${ishaTime}\nاليوم:${weekday}\nالتاريخ الهجري:${hijriDate}\nشهر الهجري: ${month}`;

            bot.sendMessage(chatId, prayerTimesMessage);
        } catch (error) {
            console.error(error);
            bot.sendMessage(chatId, `حدث خطا اثناء البحث عن مواقيت الصلاة  ${city}, ${countryCode}`);
        }
    });
};
