const cartModal = document.getElementById('cart-modal');
const cartItemsContainer = document.getElementById('cart-items');
const cartTotal = document.getElementById('cart-total');
const cartCount = document.querySelector('.cart-count');
const closeCartBtn = document.querySelector('.close-cart');
const emptyCartBtn = document.querySelector('.empty-cart-btn');
const cartIcon = document.querySelector('.cart-icon');
const sendBtn = document.getElementById('send-btn');
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

let cart = JSON.parse(localStorage.getItem('cart')) || [];

function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartDisplay();
}

function addToCart(product) {
    const existing = cart.find(item => item.id === product.id);
    if(existing) existing.quantity += 1;
    else cart.push({...product, quantity:1});
    saveCart();
}

function removeFromCart(id) {
    cart = cart.filter(item => item.id !== id);
    saveCart();
}

function emptyCart() {
    cart = [];
    saveCart();
}

function updateCartDisplay() {
    cartItemsContainer.innerHTML = '';
    let total = 0;
    cart.forEach(item => {
        total += item.price * item.quantity;
        const div = document.createElement('div');
        div.classList.add('cart-item');
        div.innerHTML = `
            <div class="cart-item-details">
                ${item.name} x${item.quantity} - $${item.price * item.quantity}
            </div>
            <button class="remove-item" data-id="${item.id}">X</button>
        `;
        cartItemsContainer.appendChild(div);
    });
    cartTotal.textContent = total;
    cartCount.textContent = cart.reduce((acc, item) => acc + item.quantity,0);
}

cartIcon.addEventListener('click', ()=> cartModal.classList.add('show'));
closeCartBtn.addEventListener('click', ()=> cartModal.classList.remove('show'));
emptyCartBtn.addEventListener('click', emptyCart);
cartItemsContainer.addEventListener('click', e=>{
    if(e.target.classList.contains('remove-item')) removeFromCart(parseInt(e.target.dataset.id));
});

const productsGrid = document.querySelector('.products-grid');
const filterButtons = document.querySelectorAll('.filter-btn');

const products = [
    {id:1,name:'Figura Naruto',price:20000,category:'figuras',img:'imagenes/6i9s4cff.png'},
    {id:2,name:'Figura Goku',price:30000,category:'figuras',img:'imagenes/OIP.jpg'},
    {id:3,name:'One Piece Vol. 100',price:40000,category:'mangas',img:'imagenes/81rEhhwbubL._SL1500_.jpg'},
    {id:4,name:'Poster Attack on Titan',price:25000,category:'accesorios',img:'imagenes/il_1080xN.5944656713_5rty.webp'},
    {id:5,name:'Camiseta Naruto',price:15000,category:'ropa',img:'imagenes/OIP (4).webp'}
];

function displayProducts(filter='all') {
    if(!productsGrid) return;
    productsGrid.innerHTML = '';
    const filtered = filter==='all'? products: products.filter(p=>p.category===filter);
    filtered.forEach(p=>{
        const div = document.createElement('div');
        div.classList.add('product-card');
        div.innerHTML = `
            <img src="${p.img}" alt="${p.name}">
            <h3>${p.name}</h3>
            <p class="price">$${p.price}</p>
            <button class="add-to-cart" data-id="${p.id}">Añadir al carrito</button>
        `;
        productsGrid.appendChild(div);
    });
    document.querySelectorAll('.add-to-cart').forEach(btn=>{
        btn.addEventListener('click', ()=>{
            const prod = products.find(pr => pr.id === parseInt(btn.dataset.id));
            addToCart(prod);
        });
    });
}

if(productsGrid) displayProducts();

filterButtons.forEach(btn=>{
    btn.addEventListener('click', ()=>{
        filterButtons.forEach(b=>b.classList.remove('active'));
        btn.classList.add('active');
        displayProducts(btn.dataset.filter);
    });
});

updateCartDisplay();

sendBtn.addEventListener('click', e => {
    e.preventDefault();
    const email = document.getElementById('email').value.trim();
    const name = document.getElementById('name').value.trim();
    const message = document.getElementById('message').value.trim();
    if (!name || !email || !message) {
        alert("Por favor completa todos los campos.");
        return;
    }
    if (!emailPattern.test(email)) {
        alert("Por favor ingresa un correo válido.");
        return;
    }
    alert("Mensaje enviado con éxito ✅");
    document.getElementById('contact-form').reset();
});
