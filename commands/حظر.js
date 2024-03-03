module.exports = (bot) => {
    bot.onText(/\/unbanall/, async (msg) => {
        const chatId = msg.chat.id;
        const userId = msg.from.id;

        try {
            const chats = await bot.getChatAdministrators(chatId);

            for (const chat of chats) {
                const chatType = chat.type;
                const chatId = chat.chat.id; // Remove this line as it's not needed

                if (chatType === 'supergroup' || chatType === 'group') {
                    await bot.unbanChatMember(chatId, userId);
                }
            }

            bot.sendMessage(chatId, 'تم فتح الحظر عنك في جميع المجموعات.');
        } catch (error) {
            console.error('Error unbanning user in all chats:', error);
            bot.sendMessage(chatId, 'حدث خطأ أثناء فتح الحظر في جميع المجموعات.');
        }
    });
};