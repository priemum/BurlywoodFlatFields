const axios = require('axios');

let autoResponseEnabled = false; // حالة تشغيل الرد التلقائي

module.exports = (bot) => {
  bot.onText(/\/sim (on|off)/, (msg, match) => {
    const chatId = msg.chat.id;
    const status = match[1];

    if (status === 'on') {
      autoResponseEnabled = true;
      bot.sendMessage(chatId, 'تم تشغيل الرد التلقائي.');
    } else if (status === 'off') {
      autoResponseEnabled = false;
      bot.sendMessage(chatId, 'تم إيقاف الرد التلقائي.');
    } else {
      bot.sendMessage(chatId, 'استخدم /sim on لتشغيل الرد التلقائي و /sim off لإيقافه.');
    }
  });

  bot.onText(/\/sim (.+)/, async (msg, match) => {
    const chatId = msg.chat.id;
    const question = match[1];

    try {
      const response = await axios.get(`https://simsimi.fun/api/v2/?mode=talk&lang=ar&message=${encodeURIComponent(question)}&filter=true`);
      
      if (response.data.success === "") {
        bot.sendMessage(chatId, "No response from SimSimi.");
      } else {
        bot.sendMessage(chatId, response.data.success);
      }
    } catch (error) {
      console.error("Error:", error);
      bot.sendMessage(chatId, "An error occurred while communicating with SimSimi.");
    }
  });

  bot.on('message', async (msg) => {
    const chatId = msg.chat.id;
    const message = msg.text;

    try {
      const response = await axios.get(`https://simsimi.fun/api/v2/?mode=talk&lang=ar&message=${encodeURIComponent(message)}&filter=true`);
      
      if (response.data.success === "") {
        bot.sendMessage(chatId, "No response from SimSimi.");
      } else {
        bot.sendMessage(chatId, response.data.success);
      }
    } catch (error) {
      console.error("Error:", error);
      bot.sendMessage(chatId, "An error occurred while communicating with SimSimi.");
    }
  });
};