// calculateAge.js
module.exports = (bot) => {
    bot.onText(/^\/عمر (\d{4})\/(\d{1,2})\/(\d{1,2})/, async (msg, match) => {
        const year = parseInt(match[1], 10);
        const month = parseInt(match[2], 10);
        const day = parseInt(match[3], 10);

        const birthDate = new Date(year, month - 1, day); // Month is zero-based
        const currentDate = new Date();
        const diff = currentDate - birthDate;

        const millisecondsInSecond = 1000;
        const secondsInMinute = 60;
        const minutesInHour = 60;
        const hoursInDay = 24;
        const daysInMonth = 30; // Assuming every month has 30 days
        const monthsInYear = 12;

        const years = Math.floor(diff / (millisecondsInSecond * secondsInMinute * minutesInHour * hoursInDay * daysInMonth * monthsInYear));
        const remainingMonths = Math.floor((diff % (millisecondsInSecond * secondsInMinute * minutesInHour * hoursInDay * daysInMonth * monthsInYear)) / (millisecondsInSecond * secondsInMinute * minutesInHour * hoursInDay * daysInMonth));
        const remainingWeeks = Math.floor((diff % (millisecondsInSecond * secondsInMinute * minutesInHour * hoursInDay * daysInMonth)) / (millisecondsInSecond * secondsInMinute * minutesInHour * hoursInDay * 7));
        const remainingDays = Math.floor((diff % (millisecondsInSecond * secondsInMinute * minutesInHour * hoursInDay)) / (millisecondsInSecond * secondsInMinute * minutesInHour * hoursInDay));
        const remainingHours = Math.floor((diff % (millisecondsInSecond * secondsInMinute * minutesInHour * hoursInDay)) / (millisecondsInSecond * secondsInMinute * minutesInHour));
        const remainingMinutes = Math.floor((diff % (millisecondsInSecond * secondsInMinute * minutesInHour)) / (millisecondsInSecond * secondsInMinute));
        const remainingSeconds = Math.floor((diff % (millisecondsInSecond * secondsInMinute)) / millisecondsInSecond);

        const response = `
🕰️ عمرك بالتفصيل:
${years} سنة، و${remainingMonths} شهر، و${remainingWeeks} أسبوع، و${remainingDays} يوم، و${remainingHours} ساعة، و${remainingMinutes} دقيقة، و${remainingSeconds} ثانية.
        `;

        bot.sendMessage(msg.chat.id, response);
    });
};