module.exports = (bot) => {
    bot.onText(/صفحة ([\d]*)$/, (msg, match) => {
        const chatId = msg.chat.id;
        const text = match[1];

        if (/^\d+$/.test(text)) {
            let num = parseInt(text) + 2;
            let newcount = num.toString().padStart(4, '0');

            bot.sendPhoto(chatId, "https://ia600701.us.archive.org/BookReader/BookReaderImages.php?zip=/17/items/quran_shubah/quran_shubah_jp2.zip&file=quran_shubah_jp2/quran_shubah_" + newcount + ".jp2&id=quran_shubah&scale=2&rotate=0", {
                parse_mode: "Markdown",
                caption: `
القرآن الكريم برواية شعبة
الصفحة التي فيها السند ${text}
                `,
                reply_markup: JSON.stringify({
                    inline_keyboard: [
                        [{ text: 'المطور 🇸🇦', url: "https://t.me/N_o_o_2r" }]
                    ]
                })
            });
        }
    });
};