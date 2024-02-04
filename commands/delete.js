module.exports = (bot) => {
    bot.onText(/\/id/, async (msg) => {
        const chatId = msg.chat.id;
        const userId = msg.from.id;
        const userName = msg.from.username;
        const userBio = msg.from.bio || 'لا توجد نبذة متاحة.';

        // قم بجلب معلومات إضافية عن المستخدم
        const userFirstName = msg.from.first_name;
        const userLastName = msg.from.last_name || '';

        const message = `مرحبًا بك ${userFirstName} ${userLastName} (${userName})! 
        \nمعرف المستخدم: ${userId}
        \nالاسم الأول: ${userFirstName}
        \nالاسم الأخير: ${userLastName || 'غير متوفر'} 
        \nاسم المستخدم: ${userName}
        \nنبذة عن المستخدم: ${userBio}`;

        bot.sendMessage(chatId, message);
    });
};