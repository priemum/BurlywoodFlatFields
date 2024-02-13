const axios = require('axios');
const fs = require('fs');
const request = require('request');

module.exports = (bot) => {
  bot.onText(/\/الاخبار (.+)/, async (msg, match) => {
    const chatId = msg.chat.id;
    const API_KEY = '7146dc59f3934b3e95c49d213ae59618';
    const args = match[1].split(' ');
    let searchQuery = args.slice(0, -1).join(' '); // Get the search query from args, ignoring the last argument (the page size)
    let pageSize = args[args.length - 1] || 5; // Get the page size from the last argument, defaulting to 5 if not provided

    // Validate input
    if (!searchQuery) {
      bot.sendMessage(chatId, 'هذه الطريقه خاطئه في البحث عن الاخبار استخدام اخبار اسم الخبر وعدد الاخبار التي تبحث عنها مثل الاخبار لندن 2.');
      return;
    }

    const url = `https://newsapi.org/v2/everything?q=${searchQuery}&pageSize=${pageSize}&apiKey=${API_KEY}`;

    try {
      const res = await axios.get(url);

      if (res.data.totalResults > 0) {
        const articles = res.data.articles;
        let messages = [];

        for (const article of articles) {
          const title = article.title;
          const source = article.source.name;
          const publishedAt = article.publishedAt;
          const description = article.description;
          const url = article.url;
          const urlToImage = article.urlToImage;

          if (urlToImage) {
            try {
              const response = await axios.get(urlToImage, { responseType: 'stream' });

              bot.sendPhoto(chatId, response.data, {
                caption: `عنوان: ${title}\nالمصدر: ${source}\nنشرت في: ${publishedAt}\nالوصف: ${description}\nرابط المقالة الأخبارية الكاملة: ${url}`
              });
            } catch (error) {
              console.error("Error sending photo:", error);
            }
          } else {
            messages.push(`عنوان: ${title}\nالمصدر: ${source}\nنشرت في: ${publishedAt}\nالوصف: ${description}\nرابط المقالة الأخبارية الكاملة: ${url}`);
          }
        }

        if (messages.length > 0) {
          bot.sendMessage(chatId, messages.join('\n\n'));
        }
      } else {
        bot.sendMessage(chatId, 'عذرًا، لم يتم العثور على نتائج.');
      }
    } catch (err) {
      console.error(err);
      bot.sendMessage(chatId, 'حدث خطأ أثناء جلب معلومات الأخبار.');
    }
  });
};