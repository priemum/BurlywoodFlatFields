module.exports = (bot) => {
    bot.onText(/\/تفعيل/, (msg) => {
        const chatId = msg.chat.id;
        bot.sendMessage(chatId, 'تم تفعيل البوت في المجموعة.');
    });
};