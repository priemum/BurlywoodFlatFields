module.exports = (bot) => {
    bot.onText(/\/humanadmins/, async (msg) => {
        const chatId = msg.chat.id;

        try {
            // الحصول على قائمة المشرفين
            const admins = await bot.getChatAdministrators(chatId);

            // تصفية المشرفين البشر الحقيقيين (غير البوتات)
            const humanAdmins = admins.filter(admin => !admin.user.is_bot);

            // تكوين رسالة المعلومات
            let message = `مشرفين البشر الحقيقيين في المجموعة:\n\n`;

            humanAdmins.forEach((admin, index) => {
                message += `${index + 1}. ${admin.user.first_name} ${admin.user.last_name ? admin.user.last_name : ''} (@${admin.user.username})\n`;
            });

            // إرسال معلومات المشرفين البشر الحقيقيين
            bot.sendMessage(chatId, message);
        } catch (error) {
            console.error("Error fetching human admins info:", error);
            bot.sendMessage(chatId, "حدث خطأ أثناء جلب معلومات المشرفين البشر الحقيقيين.");
        }
    });
};