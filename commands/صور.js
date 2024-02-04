const axios = require('axios');
const cloudscraper = require('cloudscraper');
const fs = require('fs');
const request = require('request');
const google = require('googlethis');

module.exports = (bot) => {
  bot.onText(/\/صور (.+)/, async (msg, match) => {
    const chatId = msg.chat.id;
    const [_, searchQuery] = match;

    // Validate input
    if (!searchQuery) {
      return bot.sendMessage(chatId, 'يرجى إدخال نص للبحث عن الصور');
    }

    try {
      const result = await googleImageSearch(searchQuery);

      if (result.length > 0) {
        const images = result.slice(0, 6); // Displaying up to 6 images

        let callback = function () {
          for (let i = 0; i < images.length; i++) {
            const imagePath = __dirname + `image-${i}.jpg`;
            fs.unlinkSync(imagePath); // Delete previous image if exists
          }
        };

        sendImagesWithCaption(chatId, images, callback);
      } else {
        bot.sendMessage(chatId, '⚠️ لم يتم العثور على أي نتائج لبحث الصور.');
      }
    } catch (err) {
      console.error(err);
      bot.sendMessage(chatId, 'حدث خطأ أثناء جلب نتائج البحث عن الصور.');
    }
  });
};

async function googleImageSearch(query) {
  try {
    const result = await google.image(query, { safe: false });
    return result;
  } catch (error) {
    throw error;
  }
}

function sendImagesWithCaption(chatId, images, callback) {
  for (let i = 0; i < images.length; i++) {
    const imageUrl = encodeURIComponent(images[i].url);

    let callbackFunction = function () {
      return bot.sendPhoto(chatId, fs.createReadStream(__dirname + `image-${i}.jpg`), {
        caption: `صورة رقم ${i + 1}`
      }, () => {
        if (i === images.length - 1) {
          callback(); // Delete images after sending the last one
        }
      });
    };

    request(imageUrl).pipe(fs.createWriteStream(__dirname + `image-${i}.jpg`)).on("close", callbackFunction);
  }
}