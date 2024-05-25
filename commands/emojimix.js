const axios = require('axios');

async function generateEmojimix(emoji1, emoji2) {
    try {
        const { data: response } = await axios.get("https://goatbotserver.onrender.com/taoanhdep/emojimix", {
            params: {
                emoji1,
                emoji2
            },
            responseType: "stream"
        });
        response.path = `emojimix${Date.now()}.png`;
        return response;
    } catch (e) {
        return null;
    }
}

module.exports = (bot) => {
    bot.onText(/\/emojimix (.+)/, async (msg, match) => {
        const chatId = msg.chat.id;
        const args = match[1].split(' ');

        if (args.length < 2) {
            bot.sendMessage(chatId, 'Please provide two emojis. Example: /emojimix 🤣 🥰');
            return;
        }

        const emoji1 = args[0];
        const emoji2 = args[1];

        const readStream = [];
        const generate1 = await generateEmojimix(emoji1, emoji2);
        const generate2 = await generateEmojimix(emoji2, emoji1);

        if (generate1) readStream.push(generate1);
        if (generate2) readStream.push(generate2);

        if (readStream.length === 0) {
            bot.sendMessage(chatId, `Sorry, emoji ${emoji1} and ${emoji2} can't be mixed.`);
            return;
        }

        readStream.forEach(stream => {
            bot.sendPhoto(chatId, stream);
        });

        bot.sendMessage(chatId, `Emoji ${emoji1} and ${emoji2} mix ${readStream.length} images.`);
    });
};