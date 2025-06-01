// 当前显示的周（固定为当前周）
const currentWeekStart = new Date();
currentWeekStart.setDate(currentWeekStart.getDate() - currentWeekStart.getDay());
const currentYear = currentWeekStart.getFullYear();
const currentMonth = currentWeekStart.getMonth();

// 生日数据
const birthdays = {
    '1-1': 'chh',
    '2-2': '樟脑丸',
    '6-10': '海棠',
    '11-17': '网建博'
};

// 节日数据（完整保留）
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

// 农历节日数据（完整保留）
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
    showCurrentWeek();
    updateCategoryContent();
    
    // 分类标签点击事件
    document.querySelectorAll('.category-tab').forEach(tab => {
        tab.addEventListener('click', function() {
            document.querySelectorAll('.category-tab').forEach(t => t.classList.remove('active'));
            document.querySelectorAll('.category-content').forEach(c => c.classList.remove('active'));
            this.classList.add('active');
            const tabId = this.getAttribute('data-tab');
            document.getElementById(`${tabId}-content`).classList.add('active');
        });
    });
    
    // 查看更多按钮事件
    // document.getElementById('view-more').addEventListener('click', function() {
    //     alert('查看更多功能即将实现');
    // });
}

function updateCalendarTitle() {
    const monthNames = ['1月', '2月', '3月', '4月', '5月', '6月', 
                       '7月', '8月', '9月', '10月', '11月', '12月'];
    const dayNames = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'];
    
    const titleElement = document.getElementById('current-year-month');
    titleElement.innerHTML = `
        <span class="year">📅 ${currentYear}</span>
        <span class="month-day-week">${monthNames[currentMonth]}${currentWeekStart.getDate()}日 ${dayNames[currentWeekStart.getDay()]}</span>
    `;
    
    // 恢复完整节日显示（包括儿童节）
    const today = new Date();
    const todayKey = `${today.getMonth() + 1}-${today.getDate()}`;
    const lunarInfo = calendar.solar2lunar(today.getFullYear(), today.getMonth() + 1, today.getDate());
    const lunarFestivalKey = `${lunarInfo.lMonth}-${lunarInfo.lDay}`;
}

// 获取星座
function getConstellation(month, day) {
    const dates = [20, 19, 21, 20, 21, 22, 23, 23, 23, 24, 22, 22];
    const constellations = [
        '摩羯座', '水瓶座', '双鱼座', '白羊座', '金牛座', '双子座',
        '巨蟹座', '狮子座', '处女座', '天秤座', '天蝎座', '射手座', '摩羯座'
    ];
    const constellation = day < dates[month - 1] ? constellations[month - 1] : constellations[month];
    
    // 星座详细信息
    const constellationDetails = {
        '白羊座': { date: '3.21-4.19', element: '火', luckyColor: '红色', luckyNumber: '7', desc: '充满活力，行动力强' },
        '金牛座': { date: '4.20-5.20', element: '土', luckyColor: '绿色', luckyNumber: '6', desc: '稳重务实，追求稳定' },
        '双子座': { date: '5.21-6.21', element: '风', luckyColor: '黄色', luckyNumber: '5', desc: '聪明灵活，善于沟通' },
        '巨蟹座': { date: '6.22-7.22', element: '水', luckyColor: '银色', luckyNumber: '2', desc: '情感丰富，家庭为重' },
        '狮子座': { date: '7.23-8.22', element: '火', luckyColor: '金色', luckyNumber: '1', desc: '自信热情，领导力强' },
        '处女座': { date: '8.23-9.22', element: '土', luckyColor: '灰色', luckyNumber: '5', desc: '细致完美，分析力强' },
        '天秤座': { date: '9.23-10.23', element: '风', luckyColor: '粉色', luckyNumber: '6', desc: '追求平衡，优雅和谐' },
        '天蝎座': { date: '10.24-11.21', element: '水', luckyColor: '深红色', luckyNumber: '9', desc: '神秘敏锐，意志坚定' },
        '射手座': { date: '11.22-12.21', element: '火', luckyColor: '紫色', luckyNumber: '3', desc: '乐观自由，热爱冒险' },
        '摩羯座': { date: '12.22-1.19', element: '土', luckyColor: '褐色', luckyNumber: '8', desc: '务实稳重，目标明确' },
        '水瓶座': { date: '1.20-2.18', element: '风', luckyColor: '蓝色', luckyNumber: '4', desc: '创新独立，思想前卫' },
        '双鱼座': { date: '2.19-3.20', element: '水', luckyColor: '海绿色', luckyNumber: '7', desc: '敏感浪漫，富有同情心' }
    };
    
    // 今日运势
    const fortunes = [
        "今日整体运势不错，适合处理重要事务",
        "可能会有意外收获，保持开放心态",
        "注意人际关系，避免不必要的争执",
        "适合学习新技能或开始新计划",
        "财运较佳，但需谨慎投资",
        "健康方面需要注意，适当休息"
    ];
    const todayFortune = fortunes[Math.floor(Math.random() * fortunes.length)];
    
    const detail = constellationDetails[constellation];
    return `
        <strong>${constellation} (${detail.date})</strong><br>
        元素: ${detail.element} | 幸运色: ${detail.luckyColor} | 幸运数字: ${detail.luckyNumber}<br>
        特点: ${detail.desc}<br>
        <span style="color:#FFD700">今日运势: ${todayFortune}</span>
    `;
}

// 辅助函数：生成伪随机数组（确保相同种子产生相同结果）
function pseudoRandomArray(array, seed, count) {
    const result = [];
    const length = array.length;
    for (let i = 0; i < count; i++) {
        const index = (seed * (i + 1)) % length;
        if (!result.includes(array[index])) {
            result.push(array[index]);
        } else {
            // 如果重复，选择下一个
            const nextIndex = (index + 1) % length;
            result.push(array[nextIndex]);
        }
    }
    return result;
}

// 获取生肖冲煞
function getChineseZodiacConflict(dayMod) {
    const zodiacs = ['鼠', '牛', '虎', '兔', '龙', '蛇', '马', '羊', '猴', '鸡', '狗', '猪'];
    const conflictIndex = (dayMod + 6) % 12;
    return `冲${zodiacs[conflictIndex]}`;
}

// 获取宜忌数据
function getAuspiciousData(lunarInfo) {
    // 更全面的宜忌活动
    const allGoodActivities = [
        '祭祀', '祈福', '求嗣', '开光', '出行', '解除', '搬家', 
        '结婚', '纳采', '开业', '交易', '立券', '安床', '修造', 
        '动土', '栽种', '纳畜', '安葬', '破土', '入殓', '除服', 
        '成服', '移柩', '入宅', '赴任', '会亲友', '进人口', '沐浴', 
        '修坟', '立碑', '启攒', '求医', '治病', '安门', '纳财', 
        '上梁', '竖柱', '经络', '开市', '订盟', '嫁娶', '冠笄'
    ];
    
    const allBadActivities = [
        '安葬', '破土', '伐木', '作梁', '开仓', '诉讼', '求医', 
        '远行', '词讼', '造桥', '作灶', '行丧', '出火', '乘船', 
        '开渠', '穿井', '掘土', '造船', '筑堤', '分居', '安门', 
        '动土', '上梁', '合寿木', '入宅', '安香', '出师', '安床', 
        '开仓', '出货财', '修造', '竖柱', '盖屋', '纳畜', '置产', 
        '破屋', '坏垣', '解除', '求医', '栽种', '斋醮', '开市'
    ];
    
    // 根据农历日期生成更稳定的宜忌列表
    const dayMod = (lunarInfo.lMonth + lunarInfo.lDay) % 10;
    const goodCount = 5 + (dayMod % 3);
    const badCount = 3 + (dayMod % 2);
    
    // 随机选择宜忌活动，但确保每次相同日期结果相同
    const seed = lunarInfo.lYear * 10000 + lunarInfo.lMonth * 100 + lunarInfo.lDay;
    const randomGood = pseudoRandomArray(allGoodActivities, seed, goodCount);
    const randomBad = pseudoRandomArray(allBadActivities, seed + 1, badCount);
    
    // 添加传统黄历术语
    const traditionalTerms = {
        good: ['吉神方位: 西北', `冲: ${getChineseZodiacConflict(lunarInfo.lDay%12)}`, '胎神占方: 房床碓外正北'],
        bad: ['凶煞方位: 西南', '彭祖百忌: 戊不受田', '五行: 大驿土']
    };
    
    return {
        good: [...randomGood, ...traditionalTerms.good],
        bad: [...randomBad, ...traditionalTerms.bad]
    };
}

function updateCategoryContent() {
    const today = new Date();
    const todayKey = `${today.getMonth() + 1}-${today.getDate()}`;
    const lunarInfo = calendar.solar2lunar(today.getFullYear(), today.getMonth() + 1, today.getDate());
    
    // 节日内容
    const festivalContent = document.getElementById('festival-content');
    let festivalText = '';
    
    if (festivals[todayKey]) { 
        festivalText += `📌 公历节日: <strong>${festivals[todayKey]}</strong><br>`;
    }
    
    const lunarFestivalKey = `${lunarInfo.lMonth}-${lunarInfo.lDay}`;
    if (lunarFestivals[lunarFestivalKey]) {
        festivalText += `🏮 农历节日: <strong>${lunarFestivals[lunarFestivalKey]}</strong><br>`;
    }
    
    if (lunarInfo.term) {
        festivalText += `🌿 节气: <strong>${lunarInfo.term}</strong><br>`;
    }
    
    // 添加生日信息
    if (birthdays[todayKey]) {
        festivalText += `🎂 生日: <strong>${birthdays[todayKey]}</strong>`;
    }
    
    festivalContent.innerHTML = festivalText || '今天没有特殊节日';

    // 星座内容
    const constellationContent = document.getElementById('constellation-content');
    const constellation = getConstellation(today.getMonth() + 1, today.getDate());
    constellationContent.innerHTML = `
        <div style="line-height:1.5;font-size:13px;">
            ${constellation}
        </div>
    `;
    
    // 宜忌内容
    const auspiciousContent = document.getElementById('auspicious-content');
    const auspiciousData = getAuspiciousData(lunarInfo);
    auspiciousContent.innerHTML = `
        <div style="margin-bottom:8px;">
            <span style="color:#4CAF50;font-weight:bold;">宜:</span> 
            ${auspiciousData.good.join(' · ')}
        </div>
        <div>
            <span style="color:#F44336;font-weight:bold;">忌:</span> 
            ${auspiciousData.bad.join(' · ')}
        </div>
    `;
}

// 显示当前周（保持原样）
function showCurrentWeek() {
    const daysContainer = document.getElementById('calendar-days');
    daysContainer.innerHTML = '';
    const today = new Date();
    
    for (let i = 0; i < 7; i++) {
        const date = new Date(currentWeekStart);
        date.setDate(currentWeekStart.getDate() + i);
        daysContainer.appendChild(createDayElement(
            date.getDate(),
            date.getFullYear(),
            date.getMonth(),
            today.getFullYear(),
            today.getMonth(),
            today.getDate()
        ));
    }
}

// 创建日期元素（保持原样，显示所有节日和节气）
function createDayElement(day, year, month, todayYear, todayMonth, todayDate) {
    const dayElement = document.createElement('div');
    dayElement.className = 'day';
    
    if (year === todayYear && month === todayMonth && day === todayDate) {
        dayElement.classList.add('today');
    }
    
    // 阳历日期
    const solarDateElement = document.createElement('div');
    solarDateElement.className = 'solar-date';
    solarDateElement.textContent = day;
    dayElement.appendChild(solarDateElement);
    
    // 农历信息
    const lunarInfo = calendar.solar2lunar(year, month + 1, day);
    const festivalKey = `${month + 1}-${day}`;
    const lunarFestivalKey = `${lunarInfo.lMonth}-${lunarInfo.lDay}`;
    
    let displayText = '';
    if (festivals[festivalKey]) {
        displayText = festivals[festivalKey];  // 显示所有公历节日
    }
    else if (lunarFestivals[lunarFestivalKey]) {
        displayText = lunarFestivals[lunarFestivalKey];  // 显示所有农历节日
    }
    else if (lunarInfo.term) {
        displayText = lunarInfo.term;  // 显示节气
    }
    
    if (displayText) {
        const infoElement = document.createElement('div');
        infoElement.className = 'festival';
        infoElement.textContent = displayText;
        dayElement.appendChild(infoElement);
    } else {
        const infoElement = document.createElement('div');
        infoElement.className = 'lunar-date';
        const lunarMonthNames = ['正', '二', '三', '四', '五', '六', '七', '八', '九', '十', '冬', '腊'];
        const lunarMonthName = lunarMonthNames[lunarInfo.lMonth - 1] || lunarInfo.lMonth;
        infoElement.textContent = lunarInfo.lDay === 1 ? lunarMonthName + '月' : lunarInfo.lunarDayCn;
        dayElement.appendChild(infoElement);
    }
    
    // 生日提醒
    const birthdayKey = `${month + 1}-${day}`;
    if (birthdays[birthdayKey]) {
        const birthdayElement = document.createElement('div');
        birthdayElement.className = 'birthday';
        birthdayElement.innerHTML = `
            <span class="birthday-name">${birthdays[birthdayKey]}</span>
            <span class="birthday-cake"></span>
        `;
        dayElement.appendChild(birthdayElement);
    }
    
    return dayElement;
}

document.addEventListener('DOMContentLoaded', initCalendar);