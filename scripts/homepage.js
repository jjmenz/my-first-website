const galleryGrid = document.querySelector('.gallery-grid');

let isDown = false;
let startX;
let scrollleft;

galleryGrid.addEventListener('mousedown', (e) => {
