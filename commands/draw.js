const axios = require('axios');

module.exports = (bot) => {
  bot.onText(/^\/draw(?:\s+help)?$/, (msg) => {
    const chatId = msg.chat.id;
    const helpMessage = "يمكنك استخدام الأمر `/draw` مع النص المراد رسمه متبوعًا برقم الستايل المفضل:\n1. سينمائي\n2. فوتوغرافي\n3. أنيمي\n4. مانغا\n5. فن رقمي\n6. بيكسل آرت\n7. فن الخيال\n8. نيون بانك\n9. نموذج ثلاثي الأبعاد";
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
      const translatedInput = await translateText(query, "en");
      const prompt = encodeURI(translatedInput.trim());

      const drawUrl = `https://ai-tools.replit.app/pixart?prompt=${prompt}&styles=${styleChoice}`;
      const response = await axios.get(drawUrl, { responseType: "arraybuffer" });
      const imageBuffer = Buffer.from(response.data);

      bot.sendPhoto(chatId, imageBuffer, { caption: `${query}` });
    } catch (error) {
      console.error(error);
      bot.sendMessage(chatId, "حدث خطأ أثناء معالجة الطلب.");
    }
  });
};

async function translateText(text, targetLanguage) {
  const translationUrl = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=auto&tl=${targetLanguage}&dt=t&q=${encodeURI(text)}`;
  const translationRes = await axios.get(translationUrl);
  const translatedText = translationRes.data[0].map(arr => arr[0]).join(' ');
  return translatedText.trim();
}