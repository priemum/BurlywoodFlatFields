const { GoogleGenerativeAI } = require("@google/generative-ai");

module.exports = (bot) => {
    bot.onText(/\/بوت (.+)/, async (msg, match) => {
        const chatId = msg.chat.id;
        const searchQuery = match[1]; // النص المراد البحث عنه

        const genAI = new GoogleGenerativeAI("AIzaSyBPSwOnCrFxOmHd1-CCJKa05gQauguJseU");
        const model = genAI.getGenerativeModel({ model: "gemini-pro"});

        try {
            const result = await model.generateContent(searchQuery);
            const response = await result.response;
            const text = response.text();
            bot.sendMessage(chatId, text);
        } catch (error) {
            console.error("حدث خطأ أثناء توليد المحتوى:", error);
            bot.sendMessage(chatId, "حدث خطأ أثناء محاولة توليد المحتوى. الرجاء المحاولة مرة أخرى لاحقًا.");
        }
    });
};