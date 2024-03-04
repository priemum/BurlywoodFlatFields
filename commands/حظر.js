// restrictedAccessCommand.js

module.exports = (bot) => {
    // Command to restrict bot usage to admins only
    bot.onText(/\/restrict/, (msg) => {
        const chatId = msg.chat.id;
        if (msg.from.id === msg.chat.id && (msg.chat.type === 'group' || msg.chat.type === 'supergroup')) {
            bot.sendMessage(chatId, 'تم تقييد استخدام البوت للمشرفين فقط.');
        } else {
            bot.sendMessage(chatId, 'هذا الأمر يمكن استخدامه فقط من المجموعة أو المجموعة الفائقة.');
        }
    });

    // Command to allow all users to use the bot
    bot.onText(/\/unrestrict/, (msg) => {
        const chatId = msg.chat.id;
        if (msg.from.id === msg.chat.id && (msg.chat.type === 'group' || msg.chat.type === 'supergroup')) {
            bot.sendMessage(chatId, 'تم السماح لجميع المستخدمين باستخدام البوت.');
        } else {
            bot.sendMessage(chatId, 'هذا الأمر يمكن استخدامه فقط من المجموعة أو المجموعة الفائقة.');
        }
    });

    // Function to check if a user is an admin
    function isAdmin(member) {
        return member.status === "administrator" || member.status === "creator";
    }

    // Main functionality of the bot
    bot.on('message', (msg) => {
        const chatId = msg.chat.id;
        const userId = msg.from.id;
        if (msg.text && (msg.chat.type === 'group' || msg.chat.type === 'supergroup')) {
            bot.getChatAdministrators(chatId).then((admins) => {
                const isAdminUser = admins.some(admin => admin.user.id === userId);
                if (isAdminUser) {
                    bot.sendMessage(chatId, 'أنت مشرف، يمكنك استخدام البوت.');
                } else {
                    bot.sendMessage(chatId, 'عذرا، يمكن استخدام البوت فقط من قبل المشرفين.');
                }
            }).catch((error) => {
                console.error('Error fetching chat administrators:', error);
                bot.sendMessage(chatId, 'حدث خطأ أثناء جلب المشرفين.');
            });
        }
    });
};