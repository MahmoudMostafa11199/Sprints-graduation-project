///////////////////////////////////////////////////////
// DOM Element
const cartContainer = document.querySelector('.carts');
const btnPlaceOrder = document.querySelector('.cart-summary__btn');
const cartSummaryContainer = document.querySelector('.cart-summary');
const cartSummarySubtotalEl = document.querySelector('.cart-summary__subtotal');
const cartSummaryTotalEl = document.querySelector('.cart-summary__total');
const cartSummaryShippingEl = document.querySelector('.cart-summary__shipping');

///////////////////////////////////////////////////////
// Load cart items from localStorage (if available)
const cart = JSON.parse(localStorage.getItem('cart')) || [];

///////////////////////////////////////////////////////
// Render cart item
const renderCart = (cart) => {
  const markup = `
        <div class="cart-item" data-id=${cart.id}>
          <button class="btn cart__btn-delete" onclick="deleteCart(${
            cart.id
          })">X</button>
          <div class="cart-item__header">
            <p class="cart-item__id">Item #${cart.id}</p>
            <time class="cart-item__date" datetime="${cart.date}"
              >Added: ${cart.date}</time
            >
          </div>

          <hr class="cart-item__divider" />

          <div class="cart-item__body">
            <div class="cart-item__details">
              <img
                class="cart-item__img"
                src=${cart.image}
                alt="${cart.title}"
              />
              <div>
                <h4 class="cart-item__title">${cart.title}</h4>
                <p class="cart-item__price">
                  Price: <span class="price">$${cart.price}</span>
                </p>
                <p class="cart-item__quantity">Quantity: ${cart.quantity}</p>
              </div>
            </div>

            <div class="cart-item__controls">
              <div class="cart-item__quantity-controls">
                <button class="btn btn__update-quantity cart-item__btn-increase">&plus;</button>
                <span class="cart-item__quantity-number">${cart.quantity}</span>
                <button class="btn btn__update-quantity cart-item__btn-decrease">&minus;</button>
              </div>
              <p class="cart-item__total-price">Total Price: $<span class="value">${(
                cart.price * cart.quantity
              ).toFixed(2)}</span></p>
            </div>
          </div>
        </div>
  `;

  cartContainer.insertAdjacentHTML('beforeend', markup);
};

///////////////////////////////////////////////////////
// Update quantity of a specific cart
const updateQuantity = (cartItem, op) => {
  const index = cart.findIndex((cr) => cr.id == cartItem.dataset.id);

  if (index === -1) return;

  switch (op) {
    case '+':
      cart[index].quantity++;
      break;

    case '-':
      cart[index].quantity > 1 && cart[index].quantity--;
      break;
  }

  saveToLocalStorage('cart', cart);

  // Update UI values
  cartItem.querySelector(
    '.cart-item__quantity'
  ).textContent = `Quantity: ${cart[index].quantity}`;

  cartItem.querySelector('.cart-item__quantity-number').textContent =
    cart[index].quantity;

  cartItem.querySelector('.cart-item__total-price .value').textContent = (
    cart[index].quantity * cart[index].price
  ).toFixed(2);

  updateUITotalPrice();
};

///////////////////////////////////////////////////////
// Handle increase / decrease quantity buttons
cartContainer.addEventListener('click', (e) => {
  if (e.target.classList.contains('cart-item__btn-increase')) {
    const cartItem = e.target.closest('.cart-item');
    updateQuantity(cartItem, '+');
  }

  if (e.target.classList.contains('cart-item__btn-decrease')) {
    const cartItem = e.target.closest('.cart-item');
    updateQuantity(cartItem, '-');
  }
});

///////////////////////////////////////////////////////
// Delete cart
const deleteCart = (id) => {
  const index = cart.findIndex((cr) => cr.id === id);

  if (index !== -1) {
    cart.splice(index, 1);
    saveToLocalStorage('cart', cart);
    showNotification('Successfully Delete');
    init();
  }
};

///////////////////////////////////////////////////////
// Place Order Functionlaity
const placedOrder = (e) => {
  if (!cart.length) return;

  const { totalPriceAfterShipping } = calcCartTotalPrice();

  const orders = JSON.parse(localStorage.getItem('orders')) || [];

  const cookies = document.cookie.split(';').map((c) => c.trim(''));
  const username = cookies.find((c) => c.startsWith('login=')).split('=')[1];

  const newOrder = {
    id: Date.now(),
    date: new Date().toLocaleDateString(),
    items: cart,
    totalPrice: totalPriceAfterShipping,
    user: username,
    status: 'Delivered',
  };

  orders.push(newOrder);

  saveToLocalStorage('orders', orders);
  cart.splice(0, cart.length);
  localStorage.removeItem('cart');
  init();

  showNotification('Order placed successfully');
};

///////////////////////////////////////////////////////
// Place Order button
btnPlaceOrder.addEventListener('click', placedOrder);

///////////////////////////////////////////////////////
// Update UI Quantity/Total-Price
const updateUITotalPrice = () => {
  const { totalPrice, totalPriceAfterShipping } = calcCartTotalPrice();

  cartSummarySubtotalEl.textContent = totalPrice;
  cartSummaryTotalEl.textContent = totalPriceAfterShipping;
};

///////////////////////////////////////////////////////
// Calculator Cart Total price after Shipping
const calcCartTotalPrice = () => {
  const totalPrice = cart
    .reduce((acc, cur) => acc + cur.price * cur.quantity, 0)
    .toFixed(2);

  const shipping = cartSummaryShippingEl.textContent;
  const totalPriceAfterShipping =
    shipping == 'Free' ? totalPrice : +totalPrice + +shipping;

  return { totalPrice, totalPriceAfterShipping };
};

///////////////////////////////////////////////////////
// Save changes to localStorage
const saveToLocalStorage = (item, data) => {
  localStorage.setItem(item, JSON.stringify(data));
};

///////////////////////////////////////////////////////
// Show notification
const showNotification = (message) => {
  Toastify({
    text: message,
    duration: 3000,
    close: true,
    gravity: 'top',
    position: 'center',
    stopOnFocus: true,
    style: {
      background:
        'linear-gradient(to right, var(--primary-color),var(--primary-color-light))',
    },
  }).showToast();
};

///////////////////////////////////////////////////////
// Initialize: render all carts or show (no carts) message
const init = () => {
  if (!cart.length) {
    cartContainer.innerHTML = `
      <div class="no-cart">
        <p class="no-cart__text">No carts yet. Go to Products and add some items to your cart!</p>
        <a href="../products/products.html" class="btn no-cart__btn">Go to Products</a>
      </div>
      `;
    cartSummaryContainer.innerHTML = '';
    return;
  }

  cartContainer.innerHTML = '';
  cart.forEach(renderCart);
  updateUITotalPrice();
};

init();
