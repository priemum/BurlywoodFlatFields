const axios = require('axios');

module.exports = (bot) => {
  bot.onText(/\/فيلم (.+)/, async (msg, match) => {
    const chatId = msg.chat.id;
    const [_, searchQuery] = match;

    // Validate input
    if (!searchQuery) {
      return bot.sendMessage(chatId, 'يرجى إدخال اسم فيلم');
    }

    const API_KEY = '890d685742fa1316f2288b6c4c8243d5';
    const url = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&language=ar&query=${searchQuery}`;

    try {
      const res = await axios.get(url);

      if (res.data.total_results > 0) {
        const movie = res.data.results[0];
        const title = movie.title;
        const released = movie.release_date;
        const year = released.substring(0, 4);
        const language = movie.original_language;
        const overview = movie.overview;
        const rating = movie.vote_average;
        const poster = `https://image.tmdb.org/t/p/w500/${movie.poster_path}`;
        const genres = movie.genre_ids;
        const popularity = movie.popularity;
        const voteCount = movie.vote_count;

        const caption = `*🎥 العنوان:* ${title}\n---\n*تاريخ الصدور:* ${released}\n*عام:* ${year}\n*اللغة:* ${language}\n*التقييم:* ${rating}\n*التصنيفات:* ${genres}\n*الشهرة:* ${popularity}\n*عدد التصويتات:* ${voteCount}\n*نظرة عامة:* ${overview}`;

        bot.sendPhoto(chatId, poster, {
          caption: caption,
          parse_mode: 'Markdown'
        });
      } else {
        bot.sendMessage(chatId, 'عذرًا، لم يتم العثور على نتائج. يرجى التحقق من كتابة الاسم بشكل صحيح');
      }
    } catch (err) {
      console.error(err);
      bot.sendMessage(chatId, 'حدث خطأ أثناء جلب معلومات الفيلم.');
    }
  });
};