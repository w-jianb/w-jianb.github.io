// 高考日期设置 (6月7日)
const gaokaoDate = new Date();
gaokaoDate.setMonth(5); // 6月 (0-11)
gaokaoDate.setDate(7);
gaokaoDate.setHours(0, 0, 0, 0);

// 如果今年高考已过，设置为明年高考
if (gaokaoDate < new Date()) {
    gaokaoDate.setFullYear(gaokaoDate.getFullYear() + 1);
}

// 倒计时更新函数
function updateCountdown() {
    const now = new Date();
    const diff = gaokaoDate - now;
    
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);
    
    document.getElementById('days').textContent = days.toString().padStart(2, '0');
    document.getElementById('hours').textContent = hours.toString().padStart(2, '0');
    document.getElementById('minutes').textContent = minutes.toString().padStart(2, '0');
    document.getElementById('seconds').textContent = seconds.toString().padStart(2, '0');
}

// 励志名言库
const quotes = [
    "天道酬勤，曾经的每一分付出，必将收到百倍回报。",
    "十年寒窗磨一剑，今朝出鞘试锋芒。",
    "高考不是终点，而是新生活的起点。",
    "今日拼搏努力，他朝谁与争锋。",
    "不苦不累，高三无味；不拼不搏，等于白活。",
    "拼一个春夏秋冬，赢一个无悔人生。",
    "此刻打盹，你将做梦；此刻学习，你将圆梦。",
    "没有等出来的辉煌，只有拼出来的美丽。",
    "高考的路上，我注定要成为王者。",
    "不为失败找借口，要为成功找方法。",
    "十年磨剑为一搏，六月试锋现真我。",
    "今日不肯埋头，明日何以抬头。"
];

// 随机获取励志名言
function getRandomQuote() {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    return quotes[randomIndex];
}

// 初始化
updateCountdown();
setInterval(updateCountdown, 1000);

// 点击换一句鼓励
document.getElementById('new-quote').addEventListener('click', function() {
    document.getElementById('quote').textContent = getRandomQuote();
});