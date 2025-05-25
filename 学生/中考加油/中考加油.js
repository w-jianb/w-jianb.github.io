// 设置2025年中考日期 (6月15日)
const examDate = new Date(2025, 5, 15); // 月份是0-11，所以5代表6月

// 更新倒计时
function updateCountdown() {
    const now = new Date();
    const diff = examDate - now;
    
    // 计算天数、小时、分钟
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    
    // 更新显示
    document.getElementById('days').textContent = days.toString().padStart(3, '0');
    document.getElementById('hours').textContent = hours.toString().padStart(2, '0');
    document.getElementById('minutes').textContent = minutes.toString().padStart(2, '0');
}

// 励志语录
const quotes = [
    "初中三年磨一剑，中考场上试锋芒！",
    "今日拼搏努力，明日金榜题名！",
    "中考不是终点，而是新起点！",
    "拼一个春夏秋冬，换一生无怨无悔！",
    "此刻打盹，你将做梦；此刻学习，你将圆梦！",
    "没有等出来的辉煌，只有拼出来的美丽！",
    "十年寒窗磨一剑，今朝出鞘试锋芒！",
    "不为失败找借口，要为成功找方法！",
    "今日不肯埋头，明日何以抬头！",
    "中考路上，我注定要成为王者！",
    "每天进步一点点，中考成功一大步！",
    "青春没有彩排，中考不容错过！"
];

// 获取随机语录
function getRandomQuote() {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    return quotes[randomIndex];
}

// 科目切换功能
function setupSubjectTabs() {
    const tabButtons = document.querySelectorAll('.tab-button');
    const subjectContents = document.querySelectorAll('.subject-content');
    
    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            // 移除所有active类
            tabButtons.forEach(btn => btn.classList.remove('active'));
            // 添加active类到当前按钮
            button.classList.add('active');
            
            // 隐藏所有内容
            subjectContents.forEach(content => content.classList.add('hidden'));
            // 显示对应内容
            const subjectId = button.getAttribute('data-subject');
            document.getElementById(subjectId).classList.remove('hidden');
        });
    });
}

// 初始化
document.addEventListener('DOMContentLoaded', () => {
    updateCountdown();
    setInterval(updateCountdown, 60000); // 每分钟更新一次
    
    // 设置随机语录
    document.getElementById('quote').textContent = getRandomQuote();
    
    // 点击换语录
    document.getElementById('new-quote').addEventListener('click', function() {
        document.getElementById('quote').textContent = getRandomQuote();
    });
    
    // 设置科目标签页
    setupSubjectTabs();
});