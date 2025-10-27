/* app.js - funcionalidad: galería, selección, carrito (localStorage), mini-cart, toasts */

/* ---------------------------
   Datos de ejemplo del producto
   --------------------------- */
   const product = {
    id: "urban-001",
    title: "Zapatillas Urban Street",
    price: 59.99,
    images: [
      "../img/zapatilla-1.jpg",
      "../img/zapatilla-2.jpg",
      "../img/zapatilla-3.jpg"
    ],
    thumbs: [
      "../img/zapatilla-1-thumb.jpg",
      "../img/zapatilla-2-thumb.jpg",
      "../img/zapatilla-3-thumb.jpg"
    ],
    brand: "Nike Sportswear"
  };
  
  /* ---------------------------
     Utilidades
     --------------------------- */
  const $ = (sel) => document.querySelector(sel);
  const $$ = (sel) => document.querySelectorAll(sel);
  
  function formatPrice(n) {
    return n.toLocaleString('es-ES', { style: 'currency', currency: 'EUR' });
  }
  
  /* ---------------------------
     Inicialización galería
     --------------------------- */
  function initGallery(){
    const mainImg = $('#product-img');
    const thumbs = document.querySelectorAll('.thumb');
  
    // Si product.images disponibles, sincroniza srcs
    if(product.images && product.images.length){
      mainImg.src = product.images[0];
      const thumbBtns = Array.from(thumbs);
      thumbBtns.forEach((btn, i) => {
        if(product.thumbs && product.thumbs[i]) {
          const img = btn.querySelector('img');
          img.src = product.thumbs[i];
        }
        btn.dataset.src = product.images[i] || product.images[0];
        btn.addEventListener('click', (e) => {
          mainImg.src = btn.dataset.src;
          thumbBtns.forEach(t=>t.classList.remove('active'));
          btn.classList.add('active');
        });
      });
    }
  
    // prev/next
    let idx = 0;
    $('#prev').addEventListener('click', () => {
      idx = (idx - 1 + product.images.length) % product.images.length;
      mainImg.src = product.images[idx];
    });
    $('#next').addEventListener('click', () => {
      idx = (idx + 1) % product.images.length;
      mainImg.src = product.images[idx];
    });
  }
  
  /* ---------------------------
     Color selection
     --------------------------- */
  function initColorOptions(){
    const colorBtns = document.querySelectorAll('.color.choice');
    colorBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        colorBtns.forEach(b => b.classList.remove('selected'));
        btn.classList.add('selected');
      });
    });
  }
  
  /* ---------------------------
     Carrito: almacenamiento local
     --------------------------- */
  const CART_KEY = "miTienda_cart_v1";
  
  function readCart(){
    try {
      const raw = localStorage.getItem(CART_KEY);
      return raw ? JSON.parse(raw) : [];
    } catch(e){
      return [];
    }
  }
  function writeCart(cart){
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
    updateCartCount();
    renderMiniCart();
  }
  
  function addToCart(item){
    const cart = readCart();
    // merge by id + size + color
    const existing = cart.find(ci => ci.id===item.id && ci.size===item.size && ci.color===item.color);
    if(existing){
      existing.qty += item.qty;
    } else {
      cart.push(item);
    }
    writeCart(cart);
  }
  
  /* ---------------------------
     Render mini cart
     --------------------------- */
  function updateCartCount(){
    const cart = readCart();
    const totalQty = cart.reduce((s,i)=>s+i.qty,0);
    $('#cart-count').textContent = totalQty;
  }
  
  function renderMiniCart(){
    const container = $('#cart-items');
    const totalEl = $('#cart-total');
    const cart = readCart();
    container.innerHTML = '';
    let total = 0;
    if(cart.length === 0){
      container.innerHTML = '<p style="color:var(--muted)">Tu cesta está vacía.</p>';
    } else {
      cart.forEach(ci => {
        total += ci.qty * ci.price;
        const div = document.createElement('div');
        div.className = 'cart-item';
        div.innerHTML = `
          <img src="${ci.image}" alt="${ci.title}">
          <div style="flex:1">
            <div style="font-weight:600">${ci.title}</div>
            <div style="color:var(--muted);font-size:0.95rem">${ci.size} · ${ci.color}</div>
            <div style="margin-top:6px;font-weight:700">${formatPrice(ci.price)} x ${ci.qty}</div>
          </div>
          <div style="display:flex;flex-direction:column;gap:8px;align-items:center">
            <button class="cart-remove" data-key="${ci.key}" aria-label="Eliminar">✕</button>
          </div>
        `;
        container.appendChild(div);
      });
    }
    totalEl.textContent = formatPrice(total);
  
    // remove handlers
    container.querySelectorAll('.cart-remove').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const key = btn.dataset.key;
        let cart = readCart();
        cart = cart.filter(ci => ci.key !== key);
        writeCart(cart);
        showToast('Artículo eliminado del carrito');
      });
    });
  }
  
  /* ---------------------------
     Mini cart open/close
     --------------------------- */
  function initMiniCart(){
    const mini = $('#mini-cart');
    const cartBtn = $('#cart-button');
    const closeBtn = $('#cart-close');
    cartBtn.addEventListener('click', () => {
      const hidden = mini.getAttribute('aria-hidden') === 'true';
      mini.setAttribute('aria-hidden', hidden ? 'false' : 'true');
      renderMiniCart();
    });
    closeBtn.addEventListener('click', () => mini.setAttribute('aria-hidden','true'));
  }
  
  /* ---------------------------
     Toast
     --------------------------- */
  function showToast(text, ms = 2000){
    const t = $('#toast');
    t.textContent = text;
    t.classList.add('show');
    setTimeout(()=> t.classList.remove('show'), ms);
  }
  
  /* ---------------------------
     Form submit: añadir al carrito
     --------------------------- */
  function initForm(){
    $('#product-form').addEventListener('submit', (e) => {
      e.preventDefault();
      const size = $('#size').value;
      if(!size){
        showToast('Selecciona una talla');
        return;
      }
      const qty = Math.max(1, parseInt($('#quantity').value || '1'));
      const colorBtn = document.querySelector('.color.choice.selected');
      const color = colorBtn ? colorBtn.dataset.color : 'Default';
      const item = {
        key: `${product.id}_${size}_${color}`,
        id: product.id,
        title: product.title,
        price: product.price,
        qty,
        size,
        color,
        image: product.images[0]
      };
      addToCart(item);
      showToast('Añadido a la cesta');
    });
  
    // Comprar ahora (simulado)
    $('#buy-now').addEventListener('click', (e) => {
      e.preventDefault();
      $('#product-form').dispatchEvent(new Event('submit'));
      // ir a checkout (simulación)
      showToast('Preparando proceso de pago…', 1200);
      // Abre mini cart para revisar
      $('#mini-cart').setAttribute('aria-hidden','false');
    });
  }
  
  /* ---------------------------
     Inicialización principal
     --------------------------- */
  function boot(){
    // populate price
    $('#product-price').textContent = formatPrice(product.price);
    // thumblist srcs (si no añadiste manualmente)
    const thumbs = document.querySelectorAll('.thumb img');
    thumbs.forEach((img, i) => {
      if(product.thumbs[i]) img.src = product.thumbs[i];
    });
  
    initGallery();
    initColorOptions();
    initMiniCart();
    initForm();
    updateCartCount();
    renderMiniCart();
  
    // Accessibility: close mini cart on Esc
    document.addEventListener('keydown', (ev) => {
      if(ev.key === 'Escape') $('#mini-cart').setAttribute('aria-hidden','true');
    });
  }
  
  document.addEventListener('DOMContentLoaded', boot);
  