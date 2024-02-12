const axios = require('axios');

module.exports = (bot) => {
    bot.onText(/\/ويكيبيديا (.+)/, async (msg, match) => {
        const query = match[1]; // البحث
        
        try {
            const response = await axios.get(`https://ar.wikipedia.org/api/rest_v1/page/summary/${query}`);
            
            if (response.data.originalimage && response.data.originalimage.source) {
                const imageUrl = response.data.originalimage.source;
                const definition = `📖 العنوان بـ '${query}':\n\n` +
                                  `💡 الطابع الزمني: \n  ${response.data.timestamp}\n\n` +
                                  `💡 الوصف: \n  ${response.data.description || 'لا شيء'}\n\n` +
                                  `💡 المعلومات: \n  ${response.data.extract || 'لا شيء'}\n\n` +
                                  `المصدر: [ويكيبيديا](https://ar.wikipedia.org)`;
                
                bot.sendPhoto(msg.chat.id, imageUrl, { caption: definition, parse_mode: 'Markdown' });
            } else {
                bot.sendMessage(msg.chat.id, "لم يتم العثور على معلومات الصورة للمصطلح المُقدَّم.");
            }
        } catch (error) {
            console.error("حدث خطأ أثناء جلب بيانات ويكيبيديا:", error);
            bot.sendMessage(msg.chat.id, "حدث خطأ أثناء جلب بيانات ويكيبيديا.");
        }
    });
};