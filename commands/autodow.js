const axios = require('axios');

module.exports = async (bot) => {
    bot.on('message', async (msg) => {
        if (msg.text) {
            const regex = /((http|https):\/\/[^\s]+)/g;
            const urls = msg.text.match(regex);
            if (urls && urls.length > 0) {
                for (const url of urls) {
                    try {
                        const apiKey = 'gYXBEkFF';
                        const apiUrl = `https://nguyenmanh.name.vn/api/autolink?url=${url}&apikey=${apiKey}`;
                        const response = await axios.get(apiUrl);
                        const linkData = response.data.result;

                        if (linkData.thumbnail) {
                            const keyboard = {
                                inline_keyboard: [
                                    [
                                        { text: 'جودة عالية', callback_data: 'high_quality' },
                                        { text: 'جودة منخفضة', callback_data: 'low_quality' },
                                        { text: 'الموسيقى', callback_data: 'music' }
                                    ]
                                ]
                            };
                            const caption = `
                                **عنوان الفيديو:**
                                - ${linkData.desc}
                                
                                **رابط:**
                                - ${url}
                            `;
                            bot.sendPhoto(msg.chat.id, linkData.thumbnail, {
                                caption: caption,
                                parse_mode: 'Markdown',
                                reply_markup: keyboard
                            });
                        }
                    } catch (error) {
                        console.error('Error fetching link info:', error);
                        bot.sendMessage(msg.chat.id, 'حدث خطأ أثناء جلب معلومات الرابط.');
                    }
                }
            }
        }
    });

    bot.on('callback_query', async (callbackQuery) => {
        const chatId = callbackQuery.message.chat.id;
        const choice = callbackQuery.data;

        try {
            const apiKey = 'gYXBEkFF';
            const apiUrl = `https://nguyenmanh.name.vn/api/autolink?url=${callbackQuery.message.caption}&apikey=${apiKey}`;
            const response = await axios.get(apiUrl);
            const linkData = response.data.result;

            let mediaUrl = '';
            if (choice === 'high_quality' && linkData.video && linkData.video.hd) {
                mediaUrl = linkData.video.hd;
                bot.sendVideo(chatId, mediaUrl);
            } else if (choice === 'low_quality' && linkData.video && linkData.video.sd) {
                mediaUrl = linkData.video.sd;
                bot.sendVideo(chatId, mediaUrl);
            } else if (choice === 'music' && linkData.music && linkData.music.play_url) {
                mediaUrl = linkData.music.play_url;
                bot.sendAudio(chatId, mediaUrl);
            } else {
                bot.sendMessage(chatId, 'تعذر العثور على المحتوى المطلوب.');
            }
        } catch (error) {
            console.error('Error fetching link info:', error);
            bot.sendMessage(chatId, 'حدث خطأ أثناء جلب معلومات الرابط.');
        }
    });
};