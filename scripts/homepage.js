const galleryGrid = document.querySelector('.gallery-grid');

if (galleryGrid) {                       
    let isDown = false;
    let startX;
    let scrollLeft;                      

    galleryGrid.addEventListener('mousedown', (e) => {
        isDown = true;
        galleryGrid.classList.add('dragging');
        startX = e.pageX - galleryGrid.offsetLeft;
        scrollLeft = galleryGrid.scrollLeft;
    });

    galleryGrid.addEventListener('mouseleave', () => {
        isDown = false;
        galleryGrid.classList.remove('dragging');
    });

    galleryGrid.addEventListener('mouseup', () => {
        isDown = false;
        galleryGrid.classList.remove('dragging');
    });

    galleryGrid.addEventListener('mousemove', (e) => {
        if (!isDown) return;
        e.preventDefault();
        const x = e.pageX - galleryGrid.offsetLeft;
        const walk = (x - startX) * 2;
        galleryGrid.scrollLeft = scrollLeft - walk;
    });
}


const navToggle = document.querySelector('.nav-toggle');
const navLinksList = document.querySelector('.nav-links');

if (navToggle && navLinksList) {
    navToggle.addEventListener('click', () => {
        const isOpen = navLinksList.classList.toggle('open');
        navToggle.setAttribute('aria-expanded', isOpen);
    });
}


const CART_KEY = 'noosaCart';

function getCart() {
    return JSON.parse(localStorage.getItem(CART_KEY)) || [];
}

function saveCart(cart) {
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
}

function addToCart(item) {
    const cart = getCart();
    cart.push(item);
    saveCart(cart);
    updateBagCount();
}

if (localStorage.getItem('noosaSeeded') !== 'true') {
    saveCart([{
        id: 'willow',
        name: 'Canopy Suite (Willow)',
        image: '../images/willow-suite.jpg',
        date: '27th April',
        price: 80
    }]);
    localStorage.setItem('noosaSeeded', 'true');
}


const inPagesDir = window.location.pathname.includes('/pages/');
const checkoutUrl = inPagesDir ? 'checkout.html' : 'pages/checkout.html';

const bagButton = document.querySelector('[aria-label="Shopping Bag"]');
const bagCountEl = bagButton ? bagButton.querySelector('.bag-count') : null;

function updateBagCount() {
    if (!bagCountEl) return;
    const count = getCart().length;
    bagCountEl.textContent = count > 0 ? count : '';
}

if (bagButton) {
    updateBagCount();
    bagButton.addEventListener('click', () => {
        window.location.href = checkoutUrl;
    });
}

const addToBagButtons = document.querySelectorAll('.suite-card button, .room-card button');

addToBagButtons.forEach((button) => {
    button.addEventListener('click', () => {
        addToCart({
            id: button.dataset.id,
            name: button.dataset.name,
            image: button.dataset.image,
            date: button.dataset.date,
            price: Number(button.dataset.price)
        });

        const original = button.textContent;
        button.textContent = 'Added ✓';
        button.disabled = true;
        setTimeout(() => {
            button.textContent = original;
            button.disabled = false;
        }, 1200);
    });
});


const orderItemsEl = document.getElementById('order-items');
const cartTotalEl = document.getElementById('cart-total');

if (orderItemsEl) {
    const cart = getCart();

    if (cart.length === 0) {
        orderItemsEl.innerHTML = '<p>Your bag is empty.</p>';
    } else {
        orderItemsEl.innerHTML = cart.map((item) => `
            <article class="order-item">
                <img src="${item.image}" alt="${item.name}">
                <div class="order-info">
                    <p><strong>${item.name}</strong> - ${item.date}</p>
                    <p>$${item.price}</p>
                </div>
            </article>
        `).join('');
    }

    const total = cart.reduce((sum, item) => sum + item.price, 0);
    if (cartTotalEl) cartTotalEl.textContent = `$${total}`;
}


const confirmBtn = document.getElementById('confirm-payment');

if (confirmBtn) {
    confirmBtn.addEventListener('click', () => {
        window.location.href = 'confirmation.html';
    });
}


const stayItemsEl = document.getElementById('stay-items');

if (stayItemsEl) {
    const cart = getCart();

    stayItemsEl.innerHTML = cart.map((item) => `
        <article class="stay-item">
            <img src="${item.image}" alt="${item.name}">
            <p><strong>${item.name}</strong> - ${item.date}</p>
        </article>
    `).join('');
}


const navLinks = document.querySelectorAll('.nav-links a');

navLinks.forEach((link) => {
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
