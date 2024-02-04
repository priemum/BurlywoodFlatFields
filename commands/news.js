const axios = require('axios');
const fs = require('fs');
const request = require('request');

module.exports = (bot) => {
  bot.onText(/\/الأخبار (.+)/, async (msg, match) => {
    const chatId = msg.chat.id;
    const [_, searchQuery] = match;

    const API_KEY = '7146dc59f3934b3e95c49d213ae59618';
    let pageSize = 5;

    // Validate input
    if (!searchQuery) {
      return bot.sendMessage(chatId, 'هذه الطريقه خاطئه في البحث عن الاخبار استخدام اخبار اسم الخبر وعدد الاخبار التي تبحث عنها مثل الاخبار لندن 2.');
    }

    const url = `https://newsapi.org/v2/everything?q=${searchQuery}&pageSize=${pageSize}&apiKey=${API_KEY}`;

    try {
      const res = await axios.get(url);

      if (res.data.totalResults > 0) {
        const articles = res.data.articles;

        for (const article of articles) {
          const title = article.title;
          const source = article.source.name;
          const publishedAt = article.publishedAt;
          const description = article.description;
          const url = article.url;
          const urlToImage = article.urlToImage;

          if (urlToImage) {
            const callback = function() {
              bot.sendPhoto(chatId, fs.createReadStream(__dirname + `/cache/${title}.jpg`), {
                caption: `عنوان: ${title}\nالمصدر: ${source}\nنشرت في: ${publishedAt}\nالوصف: ${description}\nرابط المقالة الأخبارية الكاملة: ${url}`
              }, () => fs.unlinkSync(__dirname + `/cache/${title}.jpg`));
            };
            request(urlToImage).pipe(fs.createWriteStream(__dirname + `/cache/${title}.jpg`)).on('close', callback);
          } else {
            bot.sendMessage(chatId, `عنوان: ${title}\nالوصف: ${description}\nرابط المقالة: ${url}`);
          }
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