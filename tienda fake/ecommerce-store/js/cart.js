export let cart = [];

export function addToCart(product) {
  const existing = cart.find(item => item.id === product.id);
  if (existing) {
    existing.quantity += product.quantity;
  } else {
    cart.push(product);
  }
  saveCart();
  updateCartDisplay();
}

export function loadCart() {
  const saved = JSON.parse(localStorage.getItem('cart')) || [];
  cart = saved;
  updateCartDisplay();
}

function saveCart() {
  localStorage.setItem('cart', JSON.stringify(cart));
}

function updateCartDisplay() {
  const count = document.getElementById('cart-count');
  const items = document.getElementById('cart-items');
  const totalElement = document.getElementById('cart-total');

  if (count) count.textContent = cart.reduce((sum, i) => sum + i.quantity, 0);

  if (items) {
    items.innerHTML = cart.map(item => `
      <div class="bg-white p-4 rounded-lg shadow flex justify-between items-center">
        <span>${item.title}</span>
        <span>€${item.price.toFixed(2)} x${item.quantity}</span>
      </div>
    `).join('');
  }

  if (totalElement) {
    const total = cart.reduce((sum, i) => sum + i.price * i.quantity, 0);
    totalElement.textContent = total.toFixed(2);
  }
}
