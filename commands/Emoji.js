const axios = require('axios');

module.exports = (bot) => {
    bot.onText(/\/emoji (.+)/, async (msg, match) => {
        const chatId = msg.chat.id;
        const emoji = match[1];

        try {
            const response = await axios.get(`https://www.emojiall.com/ar/emoji/${encodeURIComponent(emoji)}#google_vignette`);
            const description = response.data.match(/"description": "(.*?)"/)[1].replace(/&amp;|amp;|quot;/g, '');
            
            bot.sendMessage(chatId, `المعنى الخاص ب ${emoji}: ${description}`);
        } catch (error) {
            bot.sendMessage(chatId, `عذرًا، لم يتم العثور على معنى ${emoji}`);
        }
    });
};