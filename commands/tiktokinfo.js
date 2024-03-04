const axios = require('axios');

module.exports = async (bot) => {
    bot.onText(/\/tiktokinfo (.+)/, async (msg, match) => {
        const query = match[1];
        const apiKey = 'gYXBEkFF';
        const apiUrl = `https://nguyenmanh.name.vn/api/tikInfo?query=${query}&apikey=${apiKey}`;

        try {
            const response = await axios.get(apiUrl);
            const userData = response.data.result;
            
            const message = `
                **معلومات المستخدم:**
                - المعرف: ${userData.uniqueId}
                - الاسم: ${userData.nickname}
                - الوصف: ${userData.signature}
                - تم التحقق: ${userData.verified ? 'نعم' : 'لا'}
                - حساب خاص: ${userData.privateAccount ? 'نعم' : 'لا'}
                - مشاركات خاصة: ${userData.privateItem ? 'نعم' : 'لا'}
                - عدد المتابعين: ${userData.followerCount}
                - عدد المتابعين: ${userData.followingCount}
                - عدد الإعجابات: ${userData.heartCount}
                - عدد الفيديوهات: ${userData.videoCount}
                - عدد الإعجابات: ${userData.diggCount}
                - [صورة المستخدم](${userData.avatar})
            `;
            
            bot.sendPhoto(msg.chat.id, userData.avatar, { caption: message, parse_mode: 'Markdown' });
        } catch (error) {
            console.error('Error fetching TikTok user info:', error);
            bot.sendMessage(msg.chat.id, 'حدث خطأ أثناء جلب معلومات المستخدم.');
        }
    });
};