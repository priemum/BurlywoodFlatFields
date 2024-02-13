const axios = require('axios');
const fs = require('fs');
const request = require('request');

module.exports = (bot) => {
  bot.onText(/\/لعبة (.+)/, async (msg, match) => {
    const chatId = msg.chat.id;
    const API_KEY = '53d2da2b2a9c573d7bef152adcb5bd70fe9b61ac';
    const searchQuery = match[1];

    // Validate input
    if (!searchQuery) {
      bot.sendMessage(chatId, 'يرجى إدخال اسم اللعبة');
      return;
    }

    const url = `http://www.gamespot.com/api/games/?api_key=${API_KEY}&format=json&filter=name:${searchQuery}`;

    try {
      const res = await axios.get(url);

      if (res.data.results.length > 0) {
        const game = res.data.results[0];
        const title = game.name;
        const deck = game.deck;
        const shortTranslateUrl = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=auto&tl=ar&dt=t&q=${encodeURI(deck)}`;
        const shortTranslationRes = await axios.get(shortTranslateUrl);
        const translatedShortText = shortTranslationRes.data[0].map(arr => arr[0]).join(' ');
        const translatedShortDeck = translatedShortText.trim();

        const description = game.description;
        const longTranslateUrl = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=auto&tl=ar&dt=t&q=${encodeURI(description)}`;
        const longTranslationRes = await axios.get(longTranslateUrl);
        const translatedLongText = longTranslationRes.data[0].map(arr => arr[0]).join(' ');
        const translatedLongDescription = translatedLongText.trim();

        const genres = game.genres.map(genre => genre.name).join(', ');
        const themes = game.themes.map(theme => theme.name).join(', ');
        const franchises = game.franchises.map(franchise => franchise.name).join(', ');
        const releaseDate = game.release_date;

        const photoUrl = game.image.original;

        bot.sendPhoto(chatId, photoUrl, {
          caption: `🎮 العنوان: ${title}\n---\nتاريخ الإصدار: ${releaseDate}\nموجز: ${translatedShortDeck}\nالوصف: ${translatedLongDescription}\nالأنواع: ${genres}\nالموضوعات: ${themes}\nالسلاسل: ${franchises}`
        });
      } else {
        bot.sendMessage(chatId, 'عذرًا، لم يتم العثور على نتائج.');
      }
    } catch (err) {
      console.error(err);
      bot.sendMessage(chatId, 'حدث خطأ أثناء جلب معلومات اللعبة.');
    }
  });
};
