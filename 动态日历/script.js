// 当前显示的月份和年份
let currentDate = new Date();
let currentYear = currentDate.getFullYear();
let currentMonth = currentDate.getMonth();

// 节日数据
const festivals = {
    '1-1': '元旦',
    '2-14': '情人节',
    '3-8': '妇女节',
    '3-12': '植树节',
    '5-1': '劳动节',
    '5-4': '青年节',
    '6-1': '儿童节',
    '7-1': '建党节',
    '8-1': '建军节',
    '9-10': '教师节',
    '10-1': '国庆节',
    '12-25': '圣诞节'
};

// 农历节日数据（格式：农历月-农历日）
const lunarFestivals = {
    '1-1': '春节',
    '1-15': '元宵节',
    '5-5': '端午节',
    '7-7': '七夕节',
    '8-15': '中秋节',
    '9-9': '重阳节',
    '12-8': '腊八节',
    '12-23': '小年'
};

// 初始化日历
function initCalendar() {
    updateCalendarTitle();
    renderCalendar();
    
    // 添加事件监听器
    document.getElementById('prev-month').addEventListener('click', () => {
        currentMonth--;
        if (currentMonth < 0) {
            currentMonth = 11;
            currentYear--;
        }
        updateCalendarTitle();
        renderCalendar();
    });
    
    document.getElementById('next-month').addEventListener('click', () => {
        currentMonth++;
        if (currentMonth > 11) {
            currentMonth = 0;
            currentYear++;
        }
        updateCalendarTitle();
        renderCalendar();
    });
    
    document.getElementById('today').addEventListener('click', () => {
        const today = new Date();
        currentYear = today.getFullYear();
        currentMonth = today.getMonth();
        updateCalendarTitle();
        renderCalendar();
    });
}

// 更新日历标题
function updateCalendarTitle() {
    const monthNames = ['一月', '二月', '三月', '四月', '五月', '六月', 
                       '七月', '八月', '九月', '十月', '十一月', '十二月'];
    document.getElementById('current-year-month').textContent = `${currentYear}年 ${monthNames[currentMonth]}`;
}

// 渲染日历
function renderCalendar() {
    const daysContainer = document.getElementById('calendar-days');
    daysContainer.innerHTML = '';
    
    // 获取当月第一天是星期几
    const firstDay = new Date(currentYear, currentMonth, 1).getDay();
    
    // 获取当月天数
    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
    
    // 获取当前日期用于比较
    const today = new Date();
    const todayYear = today.getFullYear();
    const todayMonth = today.getMonth();
    const todayDate = today.getDate();
    
    // 添加上个月的剩余天数
    for (let i = 0; i < firstDay; i++) {
        const dayElement = document.createElement('div');
        dayElement.className = 'day empty';
        daysContainer.appendChild(dayElement);
    }
    
    // 添加当月天数
    for (let i = 1; i <= daysInMonth; i++) {
        const dayElement = document.createElement('div');
        dayElement.className = 'day';

        // 检查是否是今天
        if (currentYear === todayYear && currentMonth === todayMonth && i === todayDate) {
            dayElement.classList.add('today', 'tday'); // 添加 'tday' 类名
        }

        // 公历日期
        const solarDateElement = document.createElement('div');
        solarDateElement.className = 'solar-date';
        solarDateElement.textContent = i;
        dayElement.appendChild(solarDateElement);
        
        // 农历日期
        const lunarInfo = calendar.solar2lunar(currentYear, currentMonth + 1, i);
        const lunarDateElement = document.createElement('div');
        lunarDateElement.className = 'lunar-date';
        
        let lunarText = '';
        if (lunarInfo.lDay === 1) {
            lunarText = lunarInfo.lMonth + '月';
        } else {
            lunarText = lunarInfo.lunarDayCn;
        }
        lunarDateElement.textContent = lunarText;
        dayElement.appendChild(lunarDateElement);
        
        // 节日信息
        const festivalKey = `${currentMonth + 1}-${i}`;
        const lunarFestivalKey = `${lunarInfo.lMonth}-${lunarInfo.lDay}`;
        
        let festivalText = '';
        
        // 检查公历节日
        if (festivals[festivalKey]) {
            festivalText = festivals[festivalKey];
        }
        
        // 检查农历节日
        if (lunarFestivals[lunarFestivalKey]) {
            festivalText = lunarFestivals[lunarFestivalKey];
        }
        
        // 检查节气
        if (lunarInfo.term) {
            festivalText = lunarInfo.term;
        }
        
        if (festivalText) {
            const festivalElement = document.createElement('div');
            festivalElement.className = 'festival';
            festivalElement.textContent = festivalText;
            dayElement.appendChild(festivalElement);
        }
        
        daysContainer.appendChild(dayElement);
    }
    
    // 计算需要添加的下个月天数并添加
    const totalCells = firstDay + daysInMonth;
    const remainingCells = totalCells % 7;
    const nextMonthDays = remainingCells === 0 ? 0 : 7 - remainingCells;
    
    for (let i = 1; i <= nextMonthDays; i++) {
        const dayElement = document.createElement('div');
        dayElement.className = 'day empty';
        daysContainer.appendChild(dayElement);
    }
}

// 页面加载完成后初始化日历
document.addEventListener('DOMContentLoaded', initCalendar);