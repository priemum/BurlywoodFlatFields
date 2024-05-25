const TelegramBot = require('node-telegram-bot-api');
const fs = require('fs');

const botToken = '6616314140:AAF2g3IEGxQQuLZyMgxBmSijAceHE7BCcGU';
const bot = new TelegramBot(botToken, { polling: true });

// تحميل الأوامر من ملفات مجلد الأوامر
const commandsFolder = './commands/';
       
fs.readdirSync(commandsFolder).forEach(file => {
    const command = require(`./commands/${file}`);
    command(bot);
});
