import { addToCart, loadCart } from './cart.js';

document.addEventListener('DOMContentLoaded', () => {
  loadCart();

  const products = [
    { id: '1', title: 'Camiseta Azul', price: 19.99, image: 'https://picsum.photos/300/200?random=1' },
    { id: '2', title: 'Pantalón Negro', price: 34.99, image: 'https://picsum.photos/300/200?random=2' },
    { id: '3', title: 'Zapatillas Deportivas', price: 59.99, image: 'https://picsum.photos/300/200?random=3' },
  ];

  const productsContainer = document.getElementById('products');

  products.forEach(product => {
    const productCard = document.createElement('div');
    productCard.className = 'bg-white p-4 rounded-xl shadow hover:shadow-lg transition';
    productCard.innerHTML = `
      <img src="${product.image}" alt="${product.title}" class="rounded-lg mb-4">
      <h3 class="text-lg font-semibold mb-2">${product.title}</h3>
      <p class="text-gray-700 mb-2">€${product.price.toFixed(2)}</p>
      <input type="number" id="quantity-${product.id}" value="1" min="1" class="border rounded px-2 py-1 w-20 text-center mb-3">
      <button class="add-to-cart bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700" 
              data-id="${product.id}" 
              data-title="${product.title}" 
              data-price="${product.price}">
        Añadir al carrito
      </button>
    `;
    productsContainer.appendChild(productCard);
  });

  document.querySelectorAll('.add-to-cart').forEach(button => {
    button.addEventListener('click', () => {
      const id = button.dataset.id;
      const title = button.dataset.title;
      const price = parseFloat(button.dataset.price);
      const quantity = parseInt(document.getElementById(`quantity-${id}`).value, 10) || 1;
      addToCart({ id, title, price, quantity });
    });
  });
});
