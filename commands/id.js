module.exports = (bot) => {
    bot.onText(/\/ايدي/, async (msg) => {
        const chatId = msg.chat.id;
        const userId = msg.from.id;
        
        try {
            const userInfo = await bot.getChat(userId);
            const firstName = userInfo.first_name;
            const lastName = userInfo.last_name ? userInfo.last_name : '';
            const username = userInfo.username ? `(@${userInfo.username})` : '';
            const userDesc = `المستخدم: ${firstName} ${lastName}\nالمعرّف: ${username}`;

            const bio = userInfo.bio ? `\nالنبذة الشخصية: ${userInfo.bio}` : '';
            const userDescWithBio = `${userDesc}${bio}`;

            let status = '';
            if (userInfo.is_admin) {
                status = 'مشرف';
            } else {
                const chatMember = await bot.getChatMember(chatId, userId);
                if (chatMember.status === 'creator') {
                    status = 'المالك';
                } else {
                    status = 'عضو';
                }
            }
            const userDescWithStatus = `${userDescWithBio}\nالحالة: ${status}`;

            const photo = await bot.getUserProfilePhotos(userId, 0, 1);
            if (photo.total_count > 0) {
                const fileId = photo.photos[0][0].file_id;
                bot.sendPhoto(chatId, fileId, { caption: userDescWithStatus });
            } else {
                bot.sendMessage(chatId, "لا يوجد صورة للمستخدم.\n" + userDescWithStatus);
            }
        } catch (error) {
            console.error("Error fetching user photo:", error);
            bot.sendMessage(chatId, "حدث خطأ أثناء جلب صورة المستخدم.");
        }
    });

    // Event listener for replying to a message
    bot.on('message', async (msg) => {
        if (msg.reply_to_message) {
            const repliedUserId = msg.reply_to_message.from.id;
            try {
                const userInfo = await bot.getChat(repliedUserId);
                const firstName = userInfo.first_name;
                const lastName = userInfo.last_name ? userInfo.last_name : '';
                const username = userInfo.username ? `(@${userInfo.username})` : '';
                const userDesc = `المستخدم: ${firstName} ${lastName}\nالمعرّف: ${username}`;

                const bio = userInfo.bio ? `\nالنبذة الشخصية: ${userInfo.bio}` : '';
                const userDescWithBio = `${userDesc}${bio}`;

                let status = '';
                if (userInfo.is_admin) {
                    status = 'مشرف';
                } else {
                    const chatMember = await bot.getChatMember(msg.chat.id, repliedUserId);
                    if (chatMember.status === 'creator') {
                        status = 'المالك';
                    } else {
                        status = 'عضو';
                    }
                }
                const userDescWithStatus = `${userDescWithBio}\nالحالة: ${status}`;

                const photo = await bot.getUserProfilePhotos(repliedUserId, 0, 1);
                if (photo.total_count > 0) {
                    const fileId = photo.photos[0][0].file_id;
                    bot.sendPhoto(msg.chat.id, fileId, { caption: userDescWithStatus });
                } else {
                    bot.sendMessage(msg.chat.id, "لا يوجد صورة للمستخدم.\n" + userDescWithStatus);
                }
            } catch (error) {
                console.error("Error fetching user information:", error);
                bot.sendMessage(msg.chat.id, "حدث خطأ أثناء جلب معلومات المستخدم.");
            }
        }
    });
};