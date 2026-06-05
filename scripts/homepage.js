const galleryGrid = document.querySelector('.gallery-grid');

let isDown = false;
let startX;
let scrollleft;

galleryGrid.addEventListener('mousedown', (e) => {
    isDown = true;
    startX = e.pageX - galleryGrid.offsetLeft;
    scrollLeft = galleryGrid.scrollLeft;
});

galleryGrid.addEventListener('mouseleave', () => {
    isDown = false;
});

galleryGrid.addEventListener('mouseup', () => {
    isDown = false;
});

galleryGrid.addEventListener('mousemove', (e) => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - galleryGrid.offsetLeft;
    const walk = (x - startX) * 2;
    galleryGrid.scrollLeft = scrollLeft - walk;
}); 

let bagCount = 0;

const bagButton = document.querySelector('[aria-label="Shopping Bag"]');
const addToBagButtons = document.querySelectorAll('.suite-card button, .room-card button');

addToBagButtons.forEach(button => {
    button.addEventListener('click', () => {
        bagCount++;
        bagButton.textContent = '🛍 ${bagCount}';
    });
});

const navLinks = document.querySelectorAll('.nav-links a');

navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        const href = link.getAttribute('href');
        if (href.startsWith('#')) {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }
        }
    });
});