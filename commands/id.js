module.exports = (bot) => {
    bot.onText(/\/ايدي/, async (msg) => {
        const chatId = msg.chat.id;
        const userId = msg.from.id;

        try {
            let targetUserId = userId;
            if (msg.reply_to_message && msg.reply_to_message.from) {
                targetUserId = msg.reply_to_message.from.id;
            }

            const userInfo = await bot.getChat(targetUserId);
            const username = userInfo.username ? userInfo.username : '';
            const userDesc = `المستخدم: ${userInfo.first_name} ${userInfo.last_name ? userInfo.last_name : ''}`;

            const bio = userInfo.bio ? `\nالنبذة الشخصية: ${userInfo.bio}` : '';
            const userDescWithBio = `${userDesc}${bio}`;

            let status = '';
            if (userInfo.is_admin) {
                status = 'مشرف';
            } else {
                const chatMember = await bot.getChatMember(chatId, targetUserId);
                if (chatMember.status === 'creator') {
                    status = 'المالك';
                } else {
                    status = 'عضو';
                }
            }
            const userDescWithStatus = `${userDescWithBio}\nالحالة: ${status}`;

            const replyMarkup = JSON.stringify({
                inline_keyboard: [
                    [{ text: username, url: `https://t.me/${username}` }]
                ]
            });

            const photo = await bot.getUserProfilePhotos(targetUserId, 0, 1);
            if (photo.total_count > 0) {
                const fileId = photo.photos[0][0].file_id;
                bot.sendPhoto(chatId, fileId, { caption: userDescWithStatus, reply_markup: replyMarkup });
            } else {
                bot.sendMessage(chatId, userDescWithStatus, { reply_markup: replyMarkup });
            }
            
        } catch (error) {
            console.error("Error fetching user info:", error);
            bot.sendMessage(chatId, "حدث خطأ أثناء جلب معلومات المستخدم.");
        }
    });
};