/**
 * 农历计算工具
 * 精简自 https://github.com/jjonline/calendar.js
 */
const calendar = {
    // 农历1900-2100的闰月信息
    lunarInfo: [
        0x04bd8, 0x04ae0, 0x0a570, 0x054d5, 0x0d260, 0x0d950, 0x16554, 0x056a0, 0x09ad0, 0x055d2,
        0x04ae0, 0x0a5b6, 0x0a4d0, 0x0d250, 0x1d255, 0x0b540, 0x0d6a0, 0x0ada2, 0x095b0, 0x14977,
        0x04970, 0x0a4b0, 0x0b4b5, 0x06a50, 0x06d40, 0x1ab54, 0x02b60, 0x09570, 0x052f2, 0x04970,
        0x06566, 0x0d4a0, 0x0ea50, 0x06e95, 0x05ad0, 0x02b60, 0x186e3, 0x092e0, 0x1c8d7, 0x0c950,
        0x0d4a0, 0x1d8a6, 0x0b550, 0x056a0, 0x1a5b4, 0x025d0, 0x092d0, 0x0d2b2, 0x0a950, 0x0b557,
        0x06ca0, 0x0b550, 0x15355, 0x04da0, 0x0a5d0, 0x14573, 0x052d0, 0x0a9a8, 0x0e950, 0x06aa0,
        0x0aea6, 0x0ab50, 0x04b60, 0x0aae4, 0x0a570, 0x05260, 0x0f263, 0x0d950, 0x05b57, 0x056a0,
        0x096d0, 0x04dd5, 0x04ad0, 0x0a4d0, 0x0d4d4, 0x0d250, 0x0d558, 0x0b540, 0x0b5a0, 0x195a6,
        0x095b0, 0x049b0, 0x0a974, 0x0a4b0, 0x0b27a, 0x06a50, 0x06d40, 0x0af46, 0x0ab60, 0x09570,
        0x04af5, 0x04970, 0x064b0, 0x074a3, 0x0ea50, 0x06b58, 0x055c0, 0x0ab60, 0x096d5, 0x092e0,
        0x0c960, 0x0d954, 0x0d4a0, 0x0da50, 0x07552, 0x056a0, 0x0abb7, 0x025d0, 0x092d0, 0x0cab5,
        0x0a950, 0x0b4a0, 0x0baa4, 0x0ad50, 0x055d9, 0x04ba0, 0x0a5b0, 0x15176, 0x052b0, 0x0a930,
        0x07954, 0x06aa0, 0x0ad50, 0x05b52, 0x04b60, 0x0a6e6, 0x0a4e0, 0x0d260, 0x0ea65, 0x0d530,
        0x05aa0, 0x076a3, 0x096d0, 0x04bd7, 0x04ad0, 0x0a4d0, 0x1d0b6, 0x0d250, 0x0d520, 0x0dd45,
        0x0b5a0, 0x056d0, 0x055b2, 0x049b0, 0x0a577, 0x0a4b0, 0x0aa50, 0x1b255, 0x06d20, 0x0ada0
    ],
    
    // 节气信息
    solarTerm: [
        "小寒", "大寒", "立春", "雨水", "惊蛰", "春分", 
        "清明", "谷雨", "立夏", "小满", "芒种", "夏至", 
        "小暑", "大暑", "立秋", "处暑", "白露", "秋分", 
        "寒露", "霜降", "立冬", "小雪", "大雪", "冬至"
    ],
    
    // 节气计算基数
    sTermInfo: [
        0, 21208, 42467, 63836, 85337, 107014,
        128867, 150921, 173149, 195551, 218072, 240693,
        263343, 285989, 308563, 331033, 353350, 375494,
        397447, 419210, 440795, 462224, 483532, 504758
    ],
    
    // 农历月份中文表示
    lunarMonthCn: [
        "正", "二", "三", "四", "五", "六", "七", "八", "九", "十", "冬", "腊"
    ],
    
    // 农历日中文表示
    lunarDayCn: [
        "初一", "初二", "初三", "初四", "初五", "初六", "初七", "初八", "初九", "初十",
        "十一", "十二", "十三", "十四", "十五", "十六", "十七", "十八", "十九", "二十",
        "廿一", "廿二", "廿三", "廿四", "廿五", "廿六", "廿七", "廿八", "廿九", "三十"
    ],
    
    // 公历转农历
    solar2lunar: function(y, m, d) {
        // 参数范围1900.1.31~2100.12.31
        if (y < 1900 || y > 2100) return -1;
        if (y == 1900 && m == 1 && d < 31) return -1;
        
        // 计算与1900年1月31日相差的天数
        let offset = this.dateDiff(new Date(y, m - 1, d), new Date(1900, 0, 31));
        
        let i, temp = 0;
        for (i = 1900; i < 2101 && offset > 0; i++) {
            temp = this.lYearDays(i);
            offset -= temp;
        }
        if (offset < 0) {
            offset += temp;
            i--;
        }
        
        // 农历年
        const year = i;
        
        // 闰哪个月
        const leap = this.leapMonth(i);
        let isLeap = false;
        
        // 计算月份
        for (i = 1; i < 13 && offset > 0; i++) {
            // 闰月
            if (leap > 0 && i == (leap + 1) && !isLeap) {
                --i;
                isLeap = true;
                temp = this.leapDays(year);
            } else {
                temp = this.monthDays(year, i);
            }
            
            // 解除闰月
            if (isLeap && i == (leap + 1)) isLeap = false;
            
            offset -= temp;
        }
        
        if (offset == 0 && leap > 0 && i == leap + 1) {
            if (isLeap) {
                isLeap = false;
            } else {
                isLeap = true;
                --i;
            }
        }
        if (offset < 0) {
            offset += temp;
            --i;
        }
        
        // 农历月
        const month = i;
        // 农历日
        const day = offset + 1;
        
        // 计算节气
        const term = this.getTerm(y, m, d);
        
        return {
            lYear: year,
            lMonth: month,
            lDay: day,
            isLeap: isLeap,
            lunarMonthCn: this.lunarMonthCn[month - 1] + '月',
            lunarDayCn: this.lunarDayCn[day - 1],
            term: term
        };
    },
    
    // 返回农历y年的总天数
    lYearDays: function(y) {
        let i, sum = 348;
        for (i = 0x8000; i > 0x8; i >>= 1) {
            sum += (this.lunarInfo[y - 1900] & i) ? 1 : 0;
        }
        return (sum + this.leapDays(y));
    },
    
    // 返回农历y年闰月的天数
    leapDays: function(y) {
        if (this.leapMonth(y)) {
            return ((this.lunarInfo[y - 1900] & 0x10000) ? 30 : 29);
        }
        return 0;
    },
    
    // 返回农历y年闰哪个月 1-12 , 没闰返回0
    leapMonth: function(y) {
        return (this.lunarInfo[y - 1900] & 0xf);
    },
    
    // 返回农历y年m月的总天数
    monthDays: function(y, m) {
        return ((this.lunarInfo[y - 1900] & (0x10000 >> m)) ? 30 : 29);
    },
    
    // 计算两个日期相差的天数
    dateDiff: function(date1, date2) {
        return Math.floor((date1 - date2) / (24 * 60 * 60 * 1000));
    },
    
    // 获取节气
    getTerm: function(y, m, d) {
        const date = new Date(y, m - 1, d);
        const yTerm = this.calcTerm(y, m * 2 - 2);
        const yTerm2 = this.calcTerm(y, m * 2 - 1);
        
        const termDate = new Date(1900, 0, 6, 2, 5);
        termDate.setFullYear(y);
        termDate.setMonth(Math.floor((m * 2 - 2) / 2));
        termDate.setDate(yTerm);
        
        const termDate2 = new Date(1900, 0, 6, 2, 5);
        termDate2.setFullYear(y);
        termDate2.setMonth(Math.floor((m * 2 - 1) / 2));
        termDate2.setDate(yTerm2);
        
        if (date.getTime() === termDate.getTime()) {
            return this.solarTerm[m * 2 - 2];
        } else if (date.getTime() === termDate2.getTime()) {
            return this.solarTerm[m * 2 - 1];
        }
        return '';
    },
    
    // 计算节气
    calcTerm: function(y, n) {
        const date = new Date(1900, 0, 6, 2, 5);
        let temp = 0;
        let term = 0;
        
        if (y < 1900 || y > 2100) return -1;
        if (n < 0 || n > 23) return -1;
        
        temp = (y - 1900) * 0.2422 + this.sTermInfo[n];
        term = Math.floor(temp) - Math.floor((y - 1900) / 4);
        
        return term;
    }
};
