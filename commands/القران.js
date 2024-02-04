const axios = require('axios');
const fs = require('fs');

module.exports = (bot) => {
  bot.onText(/\/القران (.+)/, async (msg, match) => {
    const chatId = msg.chat.id;
    const [_, surahNumber] = match;

    if (!surahNumber) {
      return bot.sendMessage(chatId, 'يرجى إدخال رقم السورة. مثال: الايات 2');
    }

    const url = `https://api.alquran.cloud/v1/ayah/${surahNumber}/ar.alafasy`;

    try {
      const res = await axios.get(url);
      const verseData = res.data.data;
      const audioUrl = verseData.audio;

      const downloadPath = __dirname + 'verse.mp3';

      const writer = fs.createWriteStream(downloadPath);
      const response = await axios({
        url: audioUrl,
        method: 'GET',
        responseType: 'stream'
      });

      response.data.pipe(writer);

      writer.on('finish', () => {
        writer.close();
        const voiceStream = fs.createReadStream(downloadPath);
        
        const verseDetails = {
          text: verseData.text,
          edition: {
            identifier: verseData.edition.identifier,
            language: verseData.edition.language,
            name: verseData.edition.name,
            englishName: verseData.edition.englishName,
            format: verseData.edition.format,
            type: verseData.edition.type,
            direction: verseData.edition.direction
          },
          surah: {
            number: verseData.surah.number,
            name: verseData.surah.name,
            englishName: verseData.surah.englishName,
            englishNameTranslation: verseData.surah.englishNameTranslation,
            numberOfAyahs: verseData.surah.numberOfAyahs,
            revelationType: verseData.surah.revelationType
          },
          numberInSurah: verseData.numberInSurah,
          juz: verseData.juz,
          manzil: verseData.manzil,
          page: verseData.page,
          ruku: verseData.ruku,
          hizbQuarter: verseData.hizbQuarter,
          sajda: verseData.sajda
        };

        let message = `ها هي سورة رقم ${verseData.surah.number} من القرآن الكريم بشكل صوتي:\n\n${verseData.text}\n\nتفاصيل الآية:
النص: ${verseDetails.text}
المصحف: ${verseDetails.edition.name}
اسم السورة: ${verseDetails.surah.name}
الترجمة الإنجليزية لاسم السورة: ${verseDetails.surah.englishNameTranslation}
عدد الآيات في السورة: ${verseDetails.surah.numberOfAyahs}
نوع الوحي: ${verseDetails.surah.revelationType}
رقم الآية في السورة: ${verseDetails.numberInSurah}
الجزء: ${verseDetails.juz}
المنزل: ${verseDetails.manzil}
الصفحة: ${verseDetails.page}
الركعة: ${verseDetails.ruku}
الحزب الربع: ${verseDetails.hizbQuarter}
سجدة السهو: ${verseDetails.sajda ? 'نعم' : 'لا'}`;

        bot.sendVoice(chatId, voiceStream, {
          caption: message
        }).then(() => fs.unlinkSync(downloadPath));
      });
    } catch (err) {
      console.error(err);
      bot.sendMessage(chatId, 'حدث خطأ أثناء جلب السورة.');
    }
  });
};