module.exports = (bot) => {
    bot.onText(/\/leave/, (msg) => {
        const chatId = msg.chat.id;
        bot.sendMessage(chatId, 'وداعًا! سأغادر المجموعة الآن.')
            .then(() => {
                bot.leaveChat(chatId);
            })
            .catch((error) => {
                console.error('حدث خطأ أثناء محاولة مغادرة المجموعة:', error);
            });
    });
};