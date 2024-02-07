// groupInfoCommand.js
module.exports = (bot) => {
    bot.onText(/\/groupinfo/, (msg) => {
        const chatId = msg.chat.id;

        bot.getChat(chatId).then((chat) => {
            bot.getChatMembersCount(chatId).then((count) => {
                const groupInfo = `
                معلومات المجموعة:
                - اسم المجموعة: ${chat.title}
                - معرف المجموعة: ${chat.id}
                - نوع المجموعة: ${chat.type}
                - عدد الأعضاء: ${count}
                - يمكن للأعضاء دعوة الآخرين: ${chat.can_invite_users ? 'نعم' : 'لا'}
                - معرف المالك: ${chat.owner ? chat.owner.id : 'غير معروف'}
                - الرابط الدائم للمجموعة: ${chat.invite_link ? chat.invite_link : 'غير متاح'}
                `;

                bot.sendMessage(chatId, groupInfo);
            }).catch((error) => {
                console.error('Error getting group members count:', error);
            });
        }).catch((error) => {
            console.error('Error getting group info:', error);
        });
    });
};