const axios = require('axios');

module.exports = (bot) => {
    bot.onText(/\/مسلسل (.+)/, async (msg, match) => {
        const chatId = msg.chat.id;
        const searchQuery = match[1];
        const API_KEY = '890d685742fa1316f2288b6c4c8243d5';

        const url = `https://api.themoviedb.org/3/search/tv?api_key=${API_KEY}&language=ar&query=${searchQuery}`;

        try {
            const res = await axios.get(url);

            if (res.data.total_results > 0) {
                const series = res.data.results[0];
                const title = series.name;
                const title1 = series.original_name;
                const released = series.first_air_date;
                const year = released.substring(0, 4);
                const countries = series.origin_country;
                const language = series.original_language;
                const overview = series.overview;
                const rating = series.vote_average;
                const poster = series.poster_path;

                const imageUrl = `https://image.tmdb.org/t/p/w500/${poster}`;
                const caption = `🎥 العنوان: ${title} العنوان باللغه الاصليه: \n${title1}\n---\nتاريخ الصدور: ${released}\nعام: ${year}\nالدولة: ${countries}\nاللغة: ${language}\nنظرة عامة: ${overview}\nالتقييم: ${rating}`;

                bot.sendPhoto(chatId, imageUrl, { caption });
            } else {
                bot.sendMessage(chatId, 'عذرًا، لم يتم العثور على نتائج.');
            }
        } catch (err) {
            console.error(err);
            bot.sendMessage(chatId, 'حدث خطأ أثناء جلب معلومات المسلسل.');
        }
    });
};