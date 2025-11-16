// 高考日期设置 (6月7日9点)
const gaokaoDate = new Date();
gaokaoDate.setMonth(5); // 6月 (0-11)
gaokaoDate.setDate(7);
gaokaoDate.setHours(9, 0, 0, 0); // 设置为9点

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
    const milliseconds = Math.floor((diff % 1000));
    
    document.getElementById('days').textContent = days.toString().padStart(2, '0');
    document.getElementById('hours').textContent = hours.toString().padStart(2, '0');
    document.getElementById('minutes').textContent = minutes.toString().padStart(2, '0');
    document.getElementById('seconds').textContent = seconds.toString().padStart(2, '0');
    document.getElementById('milliseconds').textContent = milliseconds.toString().padStart(3, '0');
}

// 更新底部年份
function updateFooterYear() {
    const currentYear = new Date().getFullYear();
    document.getElementById('footer-text').textContent = `© ${currentYear + 1}届 高考加油 | 祝所有考生金榜题名！`;
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
    "今日不肯埋头，明日何以抬头。",
    "青衿志远，翰墨生香。今朝执笔如执剑，且将才思铸辉煌。",
    "像登山者丈量云的高度，你笔下的答案正攀向属于自己的峰顶。",
    "风会记住每一页翻动的声响，连同你指尖未凉的梦想。",
    "笔尖划破晨曦的薄雾，每一道墨痕都是未来的刻度。",
    {
        type: 'poem',
        content: `《致高考的你》

笔锋划过纸页的沙沙声，
是六月最清澈的誓言。
那些熬过的夜、翻皱的书，
终将化作考卷上翩跹的蝶。

不必数倒计时的刻度，
星辰早已为赶路人引路。
若紧张是掌心的汗，
就把它捏成勇气的盐。

考题或许如群山巍峨，
但你的目光比峰顶更灼热。
当合上笔盖的刹那，
会有侠客收剑入鞘的洒脱。`
    }
];

// 随机获取励志名言
function getRandomQuote() {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    const quote = quotes[randomIndex];
    
    if (typeof quote === 'object' && quote.type === 'poem') {
        return quote.content;
    }
    return quote;
}

// 初始化
updateCountdown();
updateFooterYear();
setInterval(updateCountdown, 10); // 每10毫秒更新一次，使毫秒显示更流畅

// 点击换一句鼓励
document.getElementById('new-quote').addEventListener('click', function() {
    const quoteElement = document.getElementById('quote');
    const quote = getRandomQuote();
    
    if (typeof quotes.find(q => q.content === quote) === 'object') {
        quoteElement.style.whiteSpace = 'pre-line';
    } else {
        quoteElement.style.whiteSpace = 'normal';
    }
    
    quoteElement.textContent = quote;
});
