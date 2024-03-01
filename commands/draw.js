const axios = require('axios');

module.exports = (bot) => {
  bot.onText(/^\/draw(?:\s+help)?$/, (msg) => {
    const chatId = msg.chat.id;
    const helpMessage = "مرحبًا بك في أمر الرسم، يُرجى اختيار رقم الستايل المفضل:\n1. سينمائي\n2. فوتوغرافي\n3. أنيمي\n4. مانغا\n5. فن رقمي\n6. بيكسل آرت\n7. فن الخيال\n8. نيون بانك\n9. نموذج ثلاثي الأبعاد";
    bot.sendMessage(chatId, helpMessage);
  });

  bot.onText(/^\/draw (.+) (\d+)$/, async (msg, match) => {
    const chatId = msg.chat.id;
    const query = match[1];
    const styleChoice = parseInt(match[2]);
    
    if (isNaN(styleChoice) || styleChoice < 1 || styleChoice > 9) {
      return bot.sendMessage(chatId, "يرجى اختيار رقم صالح بين 1 و 9.");
    }
    
    try {
      const drawUrl = `https://ai-tools.replit.app/pixart?prompt=${query}&styles=${styleChoice}`;
      const response = await axios.get(drawUrl, { responseType: "arraybuffer" });
      const imageBuffer = Buffer.from(response.data);

      bot.sendPhoto(chatId, imageBuffer, { caption: `${query}` });
    } catch (error) {
      console.error(error);
      bot.sendMessage(chatId, "حدث خطأ أثناء معالجة الطلب.");
    }
  });
};