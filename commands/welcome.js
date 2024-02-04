// startCommand.js
module.exports = (bot) => {
    bot.onText(/\/start/, (msg) => {
        const chatId = msg.chat.id;
        bot.sendMessage(chatId, 'مرحبا بك! أنا بوت الترحيب.');
    });
};
