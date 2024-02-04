const axios = require('axios');

module.exports = (bot) => {
    bot.onText(/بوت/, async (msg) => {
        const chatId = msg.chat.id;
        const command = msg.text.split(' ')[0];
        const question = msg.text.substring(command.length + 1);

        if (!question) {
            bot.sendMessage(chatId, '*اكتب سؤال إذا ممكن*');
            return;
        }

        const url = `https://f33589e3-f232-4848-afd2-6d119eef05b7-00-3p2d0cs44nf2z.worf.replit.dev/ask?question=${question}`;

        try {
            const response = await axios.get(url);
            const content = response.data.content;

            bot.sendMessage(chatId, `${content}`, { parse_mode: 'Markdown' });
        } catch (error) {
            console.error(error);
            bot.sendMessage(chatId, `*حدث خطأ أثناء البحث عن ${question}*`, { parse_mode: 'Markdown' });
        }
    });
};