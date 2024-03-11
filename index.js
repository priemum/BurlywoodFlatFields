const TelegramBot = require('node-telegram-bot-api');
const fs = require('fs');

const botToken = '5938843430:AAHtP05uCN8oze5Od790CVG_k0tjJ-UYIgU';
const bot = new TelegramBot(botToken, { polling: true });

// تحميل الأوامر من ملفات مجلد الأوامر
const commandsFolder = './commands/';

fs.readdirSync(commandsFolder).forEach(file => {
    const command = require(`./commands/${file}`);
    command(bot);
});
