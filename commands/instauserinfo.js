const axios = require('axios');

module.exports = (bot) => {
    bot.onText(/^\/انستا (.+)/, async (msg, match) => {
        const username = match[1];
        const apiUrl = `https://api-samir.onrender.com/stalk/insta?username=${username}`;

        try {
            const response = await axios.get(apiUrl);
            const userInfo = response.data.user_info;

            const id = userInfo.id;
            const userUsername = userInfo.username;
            const fullName = userInfo.full_name || 'غير متوفر';
            const biography = userInfo.biography || 'غير متوفر';
            const externalUrl = userInfo.external_url || 'غير متوفر';
            const isPrivate = userInfo.is_private ? 'خاص' : 'عام';
            const isVerified = userInfo.is_verified ? 'موثق' : 'غير موثق';
            const profilePicUrl = userInfo.profile_pic_url;
            const postsCount = userInfo.posts;
            const followersCount = userInfo.followers;
            const followingCount = userInfo.following;

            const userInformation = `
            الرقم التعريفي للمستخدم: ${id}
            اسم المستخدم: ${userUsername}
            الاسم الكامل: ${fullName}
            السيرة الذاتية: ${biography}
            الرابط الخارجي: ${externalUrl}
            حالة الحساب: ${isPrivate}
            التحقق من الحساب: ${isVerified}
            عدد المنشورات: ${postsCount}
            عدد المتابعين: ${followersCount}
            عدد المتابعين له: ${followingCount}
            `;

            bot.sendPhoto(msg.chat.id, profilePicUrl, { caption: userInformation });
        } catch (error) {
            console.error('حدث خطأ أثناء جلب معلومات مستخدم انستغرام:', error);
            bot.sendMessage(msg.chat.id, 'حدث خطأ أثناء جلب معلومات مستخدم انستغرام. الرجاء المحاولة مرة أخرى لاحقًا.');
        }
    });
};