// notification.js
module.exports = (bot) => {
    bot.onText(/^\/start/, (msg) => {
        const rembo = '2141802128'; // ايديك
        const chatId = msg.chat.id;
        const userId = msg.from.id;
        const name = msg.from.first_name;
        const username = msg.from.username;

        if (userId !== rembo) {
            bot.sendMessage(rembo, `
🔱¦ دخل شخص للبوت
🤸¦  اسمه » [${name}](tg://user?id=${userId}) •
🎗¦ معرفه » [${username}](tg://user?id=${userId}) •
💳¦ ايديه » [${userId}](tg://user?id=${userId}) •
`, {
                parse_mode: "Markdown",
                disable_web_page_preview: true
            });
        }
    });
};