const axios = require("axios");
const fs = require("fs-extra");

module.exports = (bot) => {
  bot.onText(/\/quranimage (.+)/, async (msg, match) => {
    const chatId = msg.chat.id;
    const [_, pageNumber] = match;

    if (!pageNumber) {
      return bot.sendMessage(chatId, '⚠️ الرجاء إدخال رقم الصفحة');
    }

    try {
      const response = await axios({
        url: `https://ayah.nawafdev.com/api/quran/images/${pageNumber}`,
        method: "GET",
        responseType: "arraybuffer"
      });

      fs.writeFileSync(__dirname + "quran.jpg", Buffer.from(response.data));

      return bot.sendPhoto(chatId, fs.createReadStream(__dirname + "quran.jpg"));
    } catch (err) {
      console.log(err);
      return bot.sendMessage(chatId, `❗ حدث خطأ، يرجى المحاولة مرة أخرى في وقت لاحق:\n${err.response?.data?.message || err.message}`);
    }
  });
};
