const products = [
  {
    id: 1,
    name: '富士蘋果',
    icon: '🍎',
    tag: '熱銷',
    description: '口感香甜，果肉細緻，適合日常食用。',
    price: 120,
  },
  {
    id: 2,
    name: '哈密瓜蘋果',
    icon: '🍏',
    tag: '推薦',
    description: '帶有自然香氣，酸甜平衡，清爽可口。',
    price: 150,
  },
  {
    id: 3,
    name: '青蘋果',
    icon: '🍐',
    tag: '新鮮',
    description: '脆口清爽，吃起來帶有淡淡果酸。',
    price: 130,
  },
];

const cart = {};

const productGrid = document.querySelector('#product-grid');
const cartItems = document.querySelector('#cart-items');
const cartCount = document.querySelector('#cart-count');
const subtotalEl = document.querySelector('#subtotal');
const shippingEl = document.querySelector('#shipping');
const totalEl = document.querySelector('#total');
const checkoutBtn = document.querySelector('#checkout-btn');

function renderProducts() {
  productGrid.innerHTML = products
    .map(
      (product) => `
        <article class="product-card">
          <div class="product-top">
            <div class="product-icon">${product.icon}</div>
            <span class="tag">${product.tag}</span>
          </div>
          <h3>${product.name}</h3>
          <p>${product.description}</p>
          <div class="product-meta">
            <div class="product-price">NT$ ${product.price}<span> / 盒</span></div>
            <button class="add-btn" data-id="${product.id}">加入購物車</button>
          </div>
        </article>
      `
    )
    .join('');

  document.querySelectorAll('.add-btn').forEach((button) => {
    button.addEventListener('click', () => {
      const productId = Number(button.dataset.id);
      const product = products.find((item) => item.id === productId);
      if (!product) return;

      cart[productId] = (cart[productId] || 0) + 1;
      updateCart();
    });
  });
}

function updateCart() {
  const selectedProducts = Object.entries(cart).map(([id, quantity]) => {
    const product = products.find((item) => item.id === Number(id));
    return { product, quantity };
  });

  const totalItems = selectedProducts.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = selectedProducts.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );
  const shipping = subtotal > 0 ? 80 : 0;
  const total = subtotal + shipping;

  cartCount.textContent = `${totalItems} 件`;
  subtotalEl.textContent = `NT$ ${subtotal}`;
  shippingEl.textContent = `NT$ ${shipping}`;
  totalEl.textContent = `NT$ ${total}`;

  if (selectedProducts.length === 0) {
    cartItems.innerHTML = '<div class="cart-empty">目前購物車是空的，快去挑選新鮮蘋果吧！</div>';
    return;
  }

  cartItems.innerHTML = selectedProducts
    .map(
      ({ product, quantity }) => `
        <div class="cart-item">
          <div class="cart-item-info">
            <div class="cart-item-icon">${product.icon}</div>
            <div class="cart-item-name">
              <strong>${product.name}</strong>
              <span class="cart-item-price">數量：${quantity}</span>
            </div>
          </div>
          <div class="cart-item-price"><strong>NT$ ${product.price * quantity}</strong></div>
        </div>
      `
    )
    .join('');
}

checkoutBtn.addEventListener('click', () => {
  const totalItems = Object.values(cart).reduce((sum, quantity) => sum + quantity, 0);

  if (totalItems === 0) {
    alert('購物車還是空的，先加入幾盒蘋果吧！');
    return;
  }

  alert(`感謝購買！你已選購 ${totalItems} 件蘋果，總金額為 NT$ ${document.querySelector('#total').textContent.replace('NT$ ', '')}。`);
});

document.querySelector('[data-scroll="#order"]').addEventListener('click', () => {
  document.querySelector('#order').scrollIntoView({ behavior: 'smooth' });
});

renderProducts();
updateCart();
