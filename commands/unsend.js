// deleteMessageCommand.js
module.exports = (bot) => {
    bot.onText(/\/مسح/, (msg) => {
        const chatId = msg.chat.id;
        const messageId = msg.reply_to_message.message_id;

        if (messageId) {
            bot.deleteMessage(chatId, messageId);
        } else {
            bot.sendMessage(chatId, 'يجب عليك الرد على رسالة بوت لحذفها.');
        }
    });
};