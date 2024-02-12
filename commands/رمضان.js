const fs = require('fs');
const axios = require ('axios');
        const request = require ('request');
       // const fs = require ('fs-extra');

const azkar = JSON.parse(fs.readFileSync('azkar.json', 'utf8'));

module.exports = (bot) => {
    bot.onText(/\/رمضان/, (msg) => {
        const chatId = msg.chat.id;

        const link = [
            "https://i.postimg.cc/wMc52Zmc/inbound4291013221920849440.jpg",
            "https://i.postimg.cc/kMLKQChm/inbound3981762536113776467.jpg",
            "https://i.postimg.cc/tC4xhT97/inbound1357973682346224501.jpg",
            "https://i.postimg.cc/tC4xhT97/inbound1357973682346224501.jpg",
            "https://i.postimg.cc/cHrsxrYt/inbound8743574342214100791.jpg",
            "https://i.postimg.cc/nVS39Mmc/inbound7622588715503574825.jpg",
            "https://i.postimg.cc/Gtpr793m/inbound406747061170760436.jpg",
            "https://i.postimg.cc/HkFwT7FF/inbound3305805231281390149.jpg",
            "https://i.postimg.cc/HL4VFcmw/inbound4158459734415107473.jpg",
            "https://i.postimg.cc/CMZfxKsg/inbound5686120868266423982.jpg",
            "https://i.postimg.cc/RFJV4W5p/inbound4754674593154456208.jpg",
            "https://i.postimg.cc/XYNjXH6C/inbound9114260755506479471.jpg",
            "https://i.postimg.cc/4dcZjjVr/inbound3075581209921098210.jpg",
        ];

        const randomAzkar = azkar[Math.floor(Math.random() * azkar.length)];
        const endDate = new Date("April 1, 2024 18:00:00").getTime();
        const startDate = Date.now();
        const t = endDate - startDate;
        const seconds = Math.floor((t / 1000) % 60);
        const minutes = Math.floor((t / 1000 / 60) % 60);
        const hours = Math.floor((t / (1000 * 60 * 60)) % 24);
        const days = Math.floor(t / (1000 * 60 * 60 * 24));

        const chosenLink = link[Math.floor(Math.random() * link.length)];

        bot.sendPhoto(
            chatId,
            chosenLink,
            {
                caption: `🌙 الوقت المتبقي حتى رمضان 🌙\n» ${days} يوم ${hours} ساعة ${minutes} دقيقة ${seconds} ثانية«\nالأذكار: ${randomAzkar.zekr}`
            }
        );
    });
};