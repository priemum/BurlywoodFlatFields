const axios = require('axios');

module.exports = (bot) => {
    bot.onText(/\/hadith (.+) page (\d+)/, async (msg, match) => {
        const searchTerm = match[1];
        const page = match[2];
        
        try {
            const response = await axios.get(`https://dorar-hadith-api-production.up.railway.app/v1/site/hadith/search?value=${encodeURIComponent(searchTerm)}&page=${page}`);
            const data = response.data;
            
            const hadithData = data.data;

            let responseText = '';

            hadithData.forEach((hadith) => {
                responseText += `الحديث: ${hadith.hadith}\n`;
                responseText += `الراوي: ${hadith.rawi}\n`;
                responseText += `المحدث: ${hadith.mohdith}\n`;
                responseText += `رقم المحدث: ${hadith.mohdithId}\n`;
                responseText += `الكتاب: ${hadith.book}\n`;
                responseText += `رقم الكتاب: ${hadith.bookId}\n`;
                responseText += `درجة الصحة: ${hadith.grade}\n`;
                responseText += `توضيح درجة الصحة: ${hadith.explainGrade}\n`;
                responseText += `تخريج الحديث في كتب أخرى: ${hadith.takhrij}\n\n`;
            });

            bot.sendMessage(msg.chat.id, responseText);
        } catch (error) {
            console.error('Error fetching hadith:', error);
            bot.sendMessage(msg.chat.id, 'حدث خطأ أثناء جلب الأحاديث، يرجى المحاولة مرة أخرى.');
        }
    });
};