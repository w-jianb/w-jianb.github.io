// script.js
// 初始化粒子背景
// 初始化粒子背景
particlesJS("particles-js", {
    particles: {
        number: { 
            value: 80,  // 减少粒子数量以获得更好的性能
            density: { 
                enable: true, 
                value_area: 800 
            } 
        },
        color: { value: "#00c9ff" },
        shape: { type: "circle" },
        opacity: { 
            value: 0.5, 
            random: true 
        },
        size: { 
            value: 3, 
            random: true 
        },
        line_linked: {
            enable: true,
            distance: 150,
            color: "#00c9ff",
            opacity: 0.2,
            width: 1
        },
        move: {
            enable: true,
            speed: 2,
            direction: "none",
            random: false,  // 关闭随机移动
            straight: false,
            out_mode: "bounce",  // 改为反弹模式
            attract: {  // 添加吸引配置
                enable: true,
                rotateX: 600,
                rotateY: 1200
            }
        }
    },
    interactivity: {
        detect_on: "window",
        events: {
            onhover: {
                enable: true,
                mode: "grab",  // 改为抓取模式
                distance: 200
            },
            onclick: {
                enable: true,
                mode: "push",
                particles_nb: 4
            }
        },
        modes: {
            grab: {
                distance: 200,
                line_linked: {
                    opacity: 1
                }
            },
            push: { particles_nb: 1 }
        }
    },
    retina_detect: true
});

document.addEventListener('DOMContentLoaded', function() {
    const navLinks = document.querySelector('.nav-links');
    const links = document.querySelectorAll('.nav-link');
    const hoverLine = document.createElement('div');
    hoverLine.className = 'nav-hover-line';
    navLinks.appendChild(hoverLine);
    
    // 跟踪当前状态
    let isHovering = false;
    let currentTarget = null;
    
    // 初始化横线位置
    const activeLink = document.querySelector('.nav-link.active');
    if (activeLink) {
        updateHoverLine(activeLink, true);
        currentTarget = activeLink;
    }
    
    // 鼠标在导航栏上移动时
    navLinks.addEventListener('mousemove', function(e) {
        isHovering = true;
        const closestLink = findClosestLink(e.clientX);
        if (closestLink && closestLink !== currentTarget) {
            currentTarget = closestLink;
            updateHoverLine(closestLink);
        }
    });
    
    // 鼠标离开导航栏时
    navLinks.addEventListener('mouseleave', function() {
        isHovering = false;
        const activeLink = document.querySelector('.nav-link.active');
        if (activeLink && currentTarget !== activeLink) {
            currentTarget = activeLink;
            // 添加一个小的延迟确保过渡效果可见
            setTimeout(() => {
                updateHoverLine(activeLink);
            }, 50);
        }
    });
    
    // 点击链接时
    links.forEach(link => {
        link.addEventListener('click', function() {
            links.forEach(l => l.classList.remove('active'));
            this.classList.add('active');
            currentTarget = this;
            updateHoverLine(this, true);
        });
    });
    
    // 找到距离鼠标最近的链接
    function findClosestLink(mouseX) {
        let closestLink = null;
        let smallestDistance = Infinity;
        
        links.forEach(link => {
            const rect = link.getBoundingClientRect();
            const linkCenter = rect.left + rect.width / 2;
            const distance = Math.abs(mouseX - linkCenter);
            
            if (distance < smallestDistance) {
                smallestDistance = distance;
                closestLink = link;
            }
        });
        
        return closestLink;
    }
    
    // 更新横线位置
    function updateHoverLine(element, immediate = false) {
        const rect = element.getBoundingClientRect();
        const navRect = navLinks.getBoundingClientRect();
        
        if (immediate) {
            hoverLine.style.transition = 'none';
        } else {
            hoverLine.style.transition = 'all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
        }
        
        hoverLine.style.width = `${rect.width}px`;
        hoverLine.style.left = `${rect.left - navRect.left}px`;
        
        // 强制重绘以确保过渡效果
        if (immediate) {
            void hoverLine.offsetWidth; // 触发重绘
            hoverLine.style.transition = 'all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
        }
    }
    
    // 窗口大小改变时重新计算位置
    window.addEventListener('resize', function() {
        const target = isHovering ? currentTarget : document.querySelector('.nav-link.active');
        if (target) {
            updateHoverLine(target, true);
        }
    });
});

// 页面切换功能
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        
        // 更新活动导航链接
        document.querySelectorAll('.nav-link').forEach(navLink => {
            navLink.classList.remove('active');
        });
        this.classList.add('active');
        
        // 显示对应页面
        const pageId = this.getAttribute('data-page');
        document.querySelectorAll('.page').forEach(page => {
            page.classList.remove('active');
        });
        document.getElementById(pageId).classList.add('active');
        
        // 关闭移动菜单
        document.querySelector('.mobile-menu').style.display = 'none';
    });
});

// 新增的按钮点击事件监听器
document.querySelector('.cta-button.outline').addEventListener('click', function(e) {
    e.preventDefault();
    
    // 更新活动导航链接
    document.querySelectorAll('.nav-link').forEach(navLink => {
        navLink.classList.remove('active');
        if (navLink.getAttribute('data-page') === this.getAttribute('data-page')) {
            navLink.classList.add('active');
        }
    });
    
    // 显示对应页面
    const pageId = this.getAttribute('data-page');
    document.querySelectorAll('.page').forEach(page => {
        page.classList.remove('active');
    });
    document.getElementById(pageId).classList.add('active');
    
    // 关闭移动菜单
    document.querySelector('.mobile-menu').style.display = 'none';
});

// 移动菜单切换
document.querySelector('.mobile-menu-btn').addEventListener('click', function() {
    const menu = document.querySelector('.mobile-menu');
    if (menu.style.display === 'flex') {
        menu.style.display = 'none';
    } else {
        menu.style.display = 'flex';
    }
});

// 移动菜单链接点击
document.querySelectorAll('.mobile-menu a').forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        
        // 更新活动状态
        document.querySelectorAll('.mobile-menu a').forEach(menuLink => {
            menuLink.classList.remove('active');
        });
        this.classList.add('active');
        
        // 显示对应页面
        const pageId = this.getAttribute('data-page');
        document.querySelectorAll('.page').forEach(page => {
            page.classList.remove('active');
        });
        document.getElementById(pageId).classList.add('active');
        
        // 关闭移动菜单
        document.querySelector('.mobile-menu').style.display = 'none';
    });
});

// 页脚链接点击
document.querySelectorAll('.footer-links a').forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        
        const pageId = this.getAttribute('data-page');
        if (pageId) {
            // 更新活动导航链接
            document.querySelectorAll('.nav-link').forEach(navLink => {
                navLink.classList.remove('active');
                if (navLink.getAttribute('data-page') === pageId) {
                    navLink.classList.add('active');
                }
            });
            
            // 显示对应页面
            document.querySelectorAll('.page').forEach(page => {
                page.classList.remove('active');
            });
            document.getElementById(pageId).classList.add('active');
            
            // 滚动到顶部
            window.scrollTo(0, 0);
        }
    });
});

// 统计各页面项目数量并更新首页显示
function updateStats() {
    // 统计游戏攻略数量
    const gamesCount = document.querySelectorAll('#games .card').length;
    // 统计实用工具数量
    const toolsCount = document.querySelectorAll('#tools .tool-card').length;
    
    // 更新首页统计数字
    document.querySelectorAll('.stat-value')[0].textContent = gamesCount.toLocaleString();
    document.querySelectorAll('.stat-value')[1].textContent = toolsCount.toLocaleString();
}

// 复制游戏攻略页面的前三个卡片到首页
function copyTopGameCards() {
    const gamesPage = document.getElementById('games');
    const homePage = document.getElementById('home');
    
    if (gamesPage && homePage) {
        const gameCards = gamesPage.querySelectorAll('.card');
        const homeCardsContainer = homePage.querySelector('.cards-container');
        
        // 清空首页现有的卡片
        homeCardsContainer.innerHTML = '';
        
        // 复制前三个卡片（如果存在）
        const cardsToCopy = Math.min(3, gameCards.length);
        for (let i = 0; i < cardsToCopy; i++) {
            const cardClone = gameCards[i].cloneNode(true);
            homeCardsContainer.appendChild(cardClone);
        }
    }
}

// 绑定所有交互事件
function bindAllEvents() {
    // 卡片悬停效果
    document.querySelectorAll('.card, .tool-card, .post, .team-member').forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.zIndex = '10';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.zIndex = '1';
        });
    });
    
    // 按钮悬停效果
    document.querySelectorAll('.cta-button').forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-3px)';
            this.style.boxShadow = '0 10px 20px rgba(0, 201, 255, 0.4)';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = 'none';
        });
    });
    
    // 筛选选项点击
    document.querySelectorAll('.filter-option').forEach(option => {
        option.addEventListener('click', function() {
            document.querySelectorAll('.filter-option').forEach(opt => {
                opt.classList.remove('active');
            });
            this.classList.add('active');
        });
    });
    // 搜索功能
    const searchInput = document.querySelector('.search-bar input');
    const searchIcon = document.querySelector('.search-bar i');
    
    function performSearch() {
        const searchTerm = searchInput.value.trim().toLowerCase();
        
        if (searchTerm === '') {
            // 如果搜索框为空，显示所有内容
            document.querySelectorAll('.card, .tool-card, .post').forEach(item => {
                item.style.display = '';
            });
            return;
        }
        
        // 在所有页面中搜索
        document.querySelectorAll('.card, .tool-card, .post').forEach(item => {
            const title = item.querySelector('h3')?.textContent.toLowerCase() || '';
            const content = item.querySelector('p')?.textContent.toLowerCase() || '';
            
            if (title.includes(searchTerm) || content.includes(searchTerm)) {
                item.style.display = '';
            } else {
                item.style.display = 'none';
            }
        });
    }
    
    // 点击搜索图标触发搜索
    searchIcon.addEventListener('click', performSearch);
    
    // 按回车键触发搜索
    searchInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            performSearch();
        }
    });
}

// 计算并显示时间差的函数
function updateDaysAgo() {
    const now = new Date();
    document.querySelectorAll('.days-ago').forEach(element => {
        const dateStr = element.getAttribute('data-date');
        if (!dateStr) return;
        
        // 确保日期格式正确
        const dateParts = dateStr.split('-');
        if (dateParts.length !== 3) return;
        
        // 创建日期对象（注意月份是0-based）
        const postDate = new Date(dateParts[0], dateParts[1] - 1, dateParts[2]);
        if (isNaN(postDate.getTime())) return; // 检查日期是否有效
        
        const diffTime = Math.abs(now - postDate);
        const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
        
        let timeText;
        if (diffDays === 0) {
            timeText = "今天";
        } else if (diffDays === 1) {
            timeText = "昨天";
        } else if (diffDays < 30) {
            timeText = `${diffDays}天前`;
        } else {
            // 超过一个月显示具体日期
            const year = postDate.getFullYear();
            const month = String(postDate.getMonth() + 1).padStart(2, '0');
            const day = String(postDate.getDate()).padStart(2, '0');
            timeText = `${year}年${month}月${day}日`;
        }
        
        element.innerHTML = `<i class="far fa-clock"></i> ${timeText}`;
    });
}

// 修改copyTopGameCards函数，确保复制时保留日期属性
function copyTopGameCards() {
    const gamesPage = document.getElementById('games');
    const homePage = document.getElementById('home');
    
    if (gamesPage && homePage) {
        const gameCards = gamesPage.querySelectorAll('.card');
        const homeCardsContainer = homePage.querySelector('.cards-container');
        
        // 清空首页现有的卡片
        homeCardsContainer.innerHTML = '';
        
        // 复制前三个卡片（如果存在）
        const cardsToCopy = Math.min(3, gameCards.length);
        for (let i = 0; i < cardsToCopy; i++) {
            const cardClone = gameCards[i].cloneNode(true);
            homeCardsContainer.appendChild(cardClone);
        }
        
        // 更新复制后的卡片日期显示
        updateDaysAgo();
    }
}

// 在DOMContentLoaded中添加updateDaysAgo调用
document.addEventListener('DOMContentLoaded', function() {
    updateStats();
    copyTopGameCards();
    bindAllEvents();
    updateDaysAgo(); // 新增这行
});

// 在DOMContentLoaded事件监听器中添加以下代码
document.addEventListener('DOMContentLoaded', function() {
    updateStats();
    copyTopGameCards();
    bindAllEvents();
    updateDaysAgo();
    
    // 添加游戏分类筛选功能
    const gameFilterOptions = document.querySelectorAll('#games .filter-option');
    gameFilterOptions.forEach(option => {
        option.addEventListener('click', function() {
            const filterValue = this.textContent.trim();
            filterGameCards(filterValue);
        });
    });
    
    // 添加工具分类筛选功能
    const toolCategoryCards = document.querySelectorAll('#tools .category-card');
    toolCategoryCards.forEach(card => {
        card.addEventListener('click', function() {
            const category = this.querySelector('h4').textContent.trim();
            filterToolCards(category);
        });
    });
});

// 游戏卡片筛选函数
function filterGameCards(filterValue) {
    const gameCards = document.querySelectorAll('#games .card');
    
    gameCards.forEach(card => {
        const cardTag = card.querySelector('.card-tag').textContent.trim();
        const shouldShow = filterValue === '全部' || 
                          filterValue === '热门' && cardTag === '热门' ||
                          filterValue === '最新' && cardTag === '更新' ||
                          filterValue === 'PC游戏' && cardTag !== '更新' && cardTag !== '新赛季' ||
                          filterValue === '主机游戏' && cardTag === '新赛季' ||
                          filterValue === '手机游戏' && cardTag === '更新';
        
        card.style.display = shouldShow ? 'block' : 'none';
    });
}

// 工具卡片筛选函数
function filterToolCards(category) {
    const toolCards = document.querySelectorAll('#tools .tool-card');
    
    toolCards.forEach(card => {
        const toolTitle = card.querySelector('h3').textContent.trim();
        const shouldShow = category === '全部' || 
                         (category === '性能优化' && toolTitle.includes('性能')) ||
                         (category === '网络加速' && toolTitle.includes('连接')) ||
                         (category === '社交交流' && toolTitle.includes('语音')) ||
                         (category === '数据分析' && toolTitle.includes('数据')) ||
                         (category === '截图录像' && toolTitle.includes('录制')) ||
                         (category === '系统工具' && toolTitle.includes('宏'));
        
        card.style.display = shouldShow ? 'flex' : 'none';
    });
}

// 页面加载时执行
document.addEventListener('DOMContentLoaded', function() {
    updateStats();
    copyTopGameCards();
    bindAllEvents();
});