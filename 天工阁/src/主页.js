document.addEventListener('DOMContentLoaded', function() {
    var entryTitle = document.getElementById('entryTitle');
    var animationPlaying = false;

    entryTitle.addEventListener('mouseenter', function() {
        if (!animationPlaying) {
            entryTitle.style.animation = 'none'; // 清除现有动画
            entryTitle.offsetHeight; // 触发重绘
            entryTitle.style.animation = 'jump 0.5s ease forwards'; // 重新启动动画
            animationPlaying = true;
        }
    });

    entryTitle.addEventListener('animationend', function() {
        animationPlaying = false; // 动画结束时重置标志
    });
});
