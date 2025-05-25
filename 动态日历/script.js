// 当前显示的月份和年份
let currentDate = new Date();
let currentYear = currentDate.getFullYear();
let currentMonth = currentDate.getMonth();
let isWeekView = true; // 初始设置为周视图

// 生日数据 (格式: '月-日': '姓名')
const birthdays = {
    '1-15': '张三',
    '3-8': '李四',
    '5-20': '王五',
    '8-3': '赵六',
    '10-1': '小明',
    '12-25': '小红'
};

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

// 农历节日数据
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

// 特定年月日的节日 (格式: '年-月-日': '节日名称')
const specialFestivals = {
    '2023-10-24': '程序员节',
    '2024-2-10': '除夕',
    '2025-1-29': '公司周年庆',
    '2025-5-20': '网络情人节',
    '2025-1-1': '双十一'
};

// 初始化日历
function initCalendar() {
    document.body.classList.add('week-view');
    document.getElementById('toggle-view').textContent = "月视图";
    
    updateCalendarTitle();
    showCurrentWeek();
    
    document.getElementById('prev-month').addEventListener('click', () => changeMonth('prev'));
    document.getElementById('next-month').addEventListener('click', () => changeMonth('next'));
    document.getElementById('today').addEventListener('click', goToToday);
    document.getElementById('toggle-view').addEventListener('click', toggleView);
}

function goToToday() {
    const today = new Date();
    if (currentYear !== today.getFullYear() || currentMonth !== today.getMonth()) {
        currentYear = today.getFullYear();
        currentMonth = today.getMonth();
        updateCalendarTitle();
        if (!isWeekView) {
            renderCalendarWithAnimation('fade');
        }
    }
    if (isWeekView) {
        const currentIndicator = document.querySelector('.week-indicator');
        if (!currentIndicator || !isCurrentWeekDisplayed(today)) {
            showCurrentWeekWithAnimation();
        }
    }
}

function isCurrentWeekDisplayed(today) {
    const currentIndicator = document.querySelector('.week-indicator');
    if (!currentIndicator) return false;
    
    const todayStr = formatDate(today);
    const indicatorText = currentIndicator.textContent;
    const [startStr, endStr] = indicatorText.split(' 至 ');
    
    const startDate = parseIndicatorDate(startStr);
    const endDate = parseIndicatorDate(endStr);
    
    return today >= startDate && today <= endDate;
}

function parseIndicatorDate(dateStr) {
    const [month, day] = dateStr.replace('月', '').replace('日', '').split(' ').map(Number);
    const today = new Date();
    return new Date(today.getFullYear(), month - 1, day);
}

function updateCalendarTitle() {
    const monthNames = ['一月', '二月', '三月', '四月', '五月', '六月', 
                       '七月', '八月', '九月', '十月', '十一月', '十二月'];
    document.getElementById('current-year-month').textContent = `${currentYear}年 ${monthNames[currentMonth]}`;
}

function changeMonth(direction) {
    if (isWeekView) return;
    renderCalendarWithAnimation(direction);
}

function toggleView() {
    const container = document.querySelector('.calendar-container');
    const daysContainer = document.getElementById('calendar-days');
    
    daysContainer.classList.add('view-switch-animation');
    container.style.overflow = 'hidden';
    
    setTimeout(() => {
        isWeekView = !isWeekView;
        const btn = document.getElementById('toggle-view');
        btn.textContent = isWeekView ? "月视图" : "周视图";
        
        if (isWeekView) {
            document.body.classList.add('week-view');
            showCurrentWeekWithAnimation();
        } else {
            document.body.classList.remove('week-view');
            const indicator = document.querySelector('.week-indicator');
            if (indicator) indicator.remove();
            renderCalendarWithAnimation('fade');
        }
        
        setTimeout(() => {
            daysContainer.classList.remove('view-switch-animation');
            container.style.overflow = '';
        }, 300);
    }, 300);
}

function showCurrentWeekWithAnimation() {
    const daysContainer = document.getElementById('calendar-days');
    daysContainer.classList.add('pre-animate');
    
    setTimeout(() => {
        daysContainer.innerHTML = '';
        
        const oldIndicator = document.querySelector('.week-indicator');
        if (oldIndicator) oldIndicator.remove();
        
        const today = new Date();
        const currentDay = today.getDay();
        const startDate = new Date(today);
        startDate.setDate(today.getDate() - currentDay);
        
        const weekIndicator = document.createElement('div');
        weekIndicator.className = 'week-indicator';
        const endDate = new Date(startDate);
        endDate.setDate(startDate.getDate() + 6);
        weekIndicator.textContent = `${formatDate(startDate)} 至 ${formatDate(endDate)}`;
        daysContainer.parentNode.insertBefore(weekIndicator, daysContainer);
        
        for (let i = 0; i < 7; i++) {
            const date = new Date(startDate);
            date.setDate(startDate.getDate() + i);
            
            const dayElement = createDayElement(
                date.getDate(),
                date.getFullYear(),
                date.getMonth(),
                today.getFullYear(),
                today.getMonth(),
                today.getDate(),
                false
            );
            dayElement.classList.add('day-animate');
            daysContainer.appendChild(dayElement);
        }
        
        void daysContainer.offsetWidth;
        daysContainer.classList.remove('pre-animate');
        daysContainer.querySelectorAll('.day').forEach(day => {
            day.classList.remove('day-animate');
        });
        
        const container = document.querySelector('.calendar-container');
        container.style.height = 'auto';
    }, 10);
}

function showCurrentWeek() {
    const daysContainer = document.getElementById('calendar-days');
    daysContainer.innerHTML = '';
    
    const oldIndicator = document.querySelector('.week-indicator');
    if (oldIndicator) oldIndicator.remove();
    
    const today = new Date();
    const currentDay = today.getDay();
    const startDate = new Date(today);
    startDate.setDate(today.getDate() - currentDay);
    
    const weekIndicator = document.createElement('div');
    weekIndicator.className = 'week-indicator';
    const endDate = new Date(startDate);
    endDate.setDate(startDate.getDate() + 6);
    weekIndicator.textContent = `${formatDate(startDate)} 至 ${formatDate(endDate)}`;
    daysContainer.parentNode.insertBefore(weekIndicator, daysContainer);
    
    for (let i = 0; i < 7; i++) {
        const date = new Date(startDate);
        date.setDate(startDate.getDate() + i);
        
        const dayElement = createDayElement(
            date.getDate(),
            date.getFullYear(),
            date.getMonth(),
            today.getFullYear(),
            today.getMonth(),
            today.getDate(),
            false
        );
        daysContainer.appendChild(dayElement);
    }
    
    const container = document.querySelector('.calendar-container');
    container.style.height = 'auto';
}

function formatDate(date) {
    const month = date.getMonth() + 1;
    const day = date.getDate();
    return `${month}月${day}日`;
}

function renderCalendarWithAnimation(direction) {
    if (isWeekView) return;
    
    const daysElement = document.getElementById('calendar-days');
    
    if (direction !== 'fade') {
        daysElement.classList.add(direction === 'next' ? 'slide-out-left' : 'slide-out-right');
    } else {
        daysElement.classList.add('fade-out');
    }
    
    setTimeout(() => {
        if (direction === 'next') {
            currentMonth++;
            if (currentMonth > 11) {
                currentMonth = 0;
                currentYear++;
            }
        } else if (direction === 'prev') {
            currentMonth--;
            if (currentMonth < 0) {
                currentMonth = 11;
                currentYear--;
            }
        }
        
        updateCalendarTitle();
        renderCalendar();
        
        daysElement.classList.remove('slide-out-left', 'slide-out-right', 'fade-out');
        
        if (direction !== 'fade') {
            daysElement.classList.add(direction === 'next' ? 'slide-in-right' : 'slide-in-left');
        } else {
            daysElement.classList.add('fade-in');
        }
        
        setTimeout(() => {
            daysElement.classList.remove('slide-in-left', 'slide-in-right', 'fade-in');
        }, 400);
    }, 400);
}

function renderCalendar() {
    if (isWeekView) {
        showCurrentWeekWithAnimation();
        return;
    }
    
    const daysContainer = document.getElementById('calendar-days');
    daysContainer.classList.add('pre-animate');
    
    setTimeout(() => {
        daysContainer.innerHTML = '';
        
        const firstDay = new Date(currentYear, currentMonth, 1).getDay();
        const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
        
        const today = new Date();
        const todayYear = today.getFullYear();
        const todayMonth = today.getMonth();
        const todayDate = today.getDate();
        
        const prevMonthDays = new Date(currentYear, currentMonth, 0).getDate();
        for (let i = firstDay - 1; i >= 0; i--) {
            const dayElement = createDayElement(
                prevMonthDays - i,
                currentMonth === 0 ? currentYear - 1 : currentYear,
                currentMonth === 0 ? 11 : currentMonth - 1,
                todayYear,
                todayMonth,
                todayDate,
                true
            );
            dayElement.classList.add('day-animate');
            daysContainer.appendChild(dayElement);
        }
        
        for (let i = 1; i <= daysInMonth; i++) {
            const dayElement = createDayElement(
                i,
                currentYear,
                currentMonth,
                todayYear,
                todayMonth,
                todayDate,
                false
            );
            dayElement.classList.add('day-animate');
            daysContainer.appendChild(dayElement);
        }
        
        const remainingCells = firstDay + daysInMonth;
        const nextMonthDays = remainingCells % 7 === 0 ? 0 : 7 - (remainingCells % 7);
        
        for (let i = 1; i <= nextMonthDays; i++) {
            const dayElement = createDayElement(
                i,
                currentMonth === 11 ? currentYear + 1 : currentYear,
                currentMonth === 11 ? 0 : currentMonth + 1,
                todayYear,
                todayMonth,
                todayDate,
                true
            );
            dayElement.classList.add('day-animate');
            daysContainer.appendChild(dayElement);
        }
        
        void daysContainer.offsetWidth;
        daysContainer.classList.remove('pre-animate');
        daysContainer.querySelectorAll('.day').forEach(day => {
            day.classList.remove('day-animate');
        });
        
        const container = document.querySelector('.calendar-container');
        const headerHeight = document.querySelector('.calendar-header').offsetHeight;
        const weekdaysHeight = document.querySelector('.weekdays').offsetHeight;
        const dayElementHeight = 90;
        const padding = 110;
        const rows = Math.ceil((firstDay + daysInMonth) / 7);
        const newHeight = headerHeight + weekdaysHeight + (rows * dayElementHeight) + padding;
        container.style.height = `${newHeight}px`;
    }, 10);
}

function createDayElement(day, year, month, todayYear, todayMonth, todayDate, isOtherMonth) {
    const dayElement = document.createElement('div');
    dayElement.className = 'day';
    
    if (isOtherMonth) {
        dayElement.classList.add('other-month');
    }
    
    const isToday = year === todayYear && month === todayMonth && day === todayDate;
    if (isToday) {
        dayElement.classList.add('today');
    }
    
    const solarDateElement = document.createElement('div');
    solarDateElement.className = 'solar-date';
    solarDateElement.textContent = day;
    dayElement.appendChild(solarDateElement);
    
    // 检查生日
    const birthdayKey = `${month + 1}-${day}`;
    if (birthdays[birthdayKey]) {
        const birthdayElement = document.createElement('div');
        birthdayElement.className = 'birthday';
        birthdayElement.textContent = `🎂${birthdays[birthdayKey]}`;
        dayElement.appendChild(birthdayElement);
    }
    
    const lunarInfo = calendar.solar2lunar(year, month + 1, day);
    const festivalKey = `${month + 1}-${day}`;
    const lunarFestivalKey = `${lunarInfo.lMonth}-${lunarInfo.lDay}`;
    const specialFestivalKey = `${year}-${month + 1}-${day}`;
    
    let displayText = '';
    
    // 检查特定年月日的节日（优先级最高）
    if (specialFestivals[specialFestivalKey]) {
        displayText = specialFestivals[specialFestivalKey];
    }
    // 检查公历节日
    else if (festivals[festivalKey]) {
        displayText = festivals[festivalKey];
    }
    // 检查农历节日
    else if (lunarFestivals[lunarFestivalKey]) {
        displayText = lunarFestivals[lunarFestivalKey];
    }
    // 检查节气
    else if (lunarInfo.term) {
        displayText = lunarInfo.term;
    }
    
    const infoElement = document.createElement('div');
    if (displayText) {
        infoElement.className = 'festival';
        infoElement.textContent = displayText;
        
        // 如果是特定节日，添加特殊样式
        if (specialFestivals[specialFestivalKey]) {
            infoElement.classList.add('special-festival');
        }
    } else {
        infoElement.className = 'lunar-date';
        const lunarMonthNames = ['正', '二', '三', '四', '五', '六', '七', '八', '九', '十', '冬', '腊'];
        const lunarMonthName = lunarMonthNames[lunarInfo.lMonth - 1] || lunarInfo.lMonth;
        infoElement.textContent = lunarInfo.lDay === 1 ? lunarMonthName + '月' : lunarInfo.lunarDayCn;
    }
    dayElement.appendChild(infoElement);
    
    return dayElement;
}

document.addEventListener('DOMContentLoaded', initCalendar);