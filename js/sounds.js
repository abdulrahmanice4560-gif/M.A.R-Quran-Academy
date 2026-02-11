// Sound Effects [web:1]
const sounds = {
    click: new Audio('sounds/click.mp3'), // Azan beep
    hover: new Audio('sounds/hover.mp3'),  // Soft chime
    load: new Audio('sounds/page-load.mp3') // Quran recitation intro
};

const canPlay = () => window.soundEnabled !== false;

document.querySelectorAll('.nav-link, .btn').forEach(el => {
    el.addEventListener('mouseenter', () => {
        if (canPlay()) sounds.hover.play().catch(() => {});
    });
    el.addEventListener('click', () => {
        if (canPlay()) sounds.click.play().catch(() => {});
    });
});

window.addEventListener('load', () => {
    if (canPlay()) sounds.load.play().catch(() => {});
});
