///////////////////////////////////////////////////////
// Element
const orderContainer = document.querySelector('.orders');

///////////////////////////////////////////////////////
// Load cart items from localStorage (if available)
const cart = JSON.parse(localStorage.getItem('cart')) || [];

///////////////////////////////////////////////////////
// Render order item
const renderOrder = (order) => {
  const markup = `
        <div class="order" data-id=${order.id}>
          <button class="btn order__btn-delete" onclick="deleteOrder(${
            order.id
          })">X</button>
          <div class="order__header">
            <p class="order__id">Order #${order.id}</p>
            <time class="order__date" datetime="${order.date}"
              >Order Date: ${order.date}</time
            >
          </div>

          <hr class="order__divider" />

          <div class="order__item">
            <div class="order__item-details">
              <img
                class="order__img"
                src=${order.image}
                alt="${order.title}"
              />
              <div>
                <h4 class="order__title">${order.title}</h4>
                <p class="order__price">
                  Price: <span class="price">$${order.price}</span>
                </p>
                <p class="order__quantity">Quantity: ${order.quantity}</p>
              </div>
            </div>

            <div class="order__controls">
              <div class="order__quantity-controls">
                <button class="btn order__btn-increase">&plus;</button>
                <span class="order__quantity-number">${order.quantity}</span>
                <button class="btn order__btn-decrease">&minus;</button>
              </div>
              <p class="order__total-price">Total Price: $<span class="value">${(
                order.price * order.quantity
              ).toFixed(2)}</span></p>
            </div>
          </div>
        </div>
  `;

  orderContainer.insertAdjacentHTML('beforeend', markup);
};

///////////////////////////////////////////////////////
// Update quantity of a specific order
const updateQuantity = (order, op) => {
  const index = cart.findIndex((cr) => cr.id == order.dataset.id);

  if (index === -1) return;

  switch (op) {
    case '+':
      cart[index].quantity++;
      break;

    case '-':
      cart[index].quantity > 1 && cart[index].quantity--;
      break;
  }

  saveToLocalStorage();

  // Update UI values
  order.querySelector(
    '.order__quantity'
  ).textContent = `Quantity: ${cart[index].quantity}`;

  order.querySelector('.order__quantity-number').textContent =
    cart[index].quantity;

  order.querySelector('.order__total-price .value').textContent = (
    cart[index].quantity * cart[index].price
  ).toFixed(2);
};

///////////////////////////////////////////////////////
// Handle increase / decrease quantity buttons
orderContainer.addEventListener('click', (e) => {
  if (e.target.classList.contains('order__btn-increase')) {
    const orderItem = e.target.closest('.order');
    updateQuantity(orderItem, '+');
  }

  if (e.target.classList.contains('order__btn-decrease')) {
    const orderItem = e.target.closest('.order');
    updateQuantity(orderItem, '-');
  }
});

///////////////////////////////////////////////////////
// Save changes to localStorage
const saveToLocalStorage = () => {
  localStorage.setItem('cart', JSON.stringify(cart));
};

///////////////////////////////////////////////////////
// Delete order
const deleteOrder = (id) => {
  const index = cart.findIndex((cr) => cr.id === id);

  if (index !== -1) {
    cart.splice(index, 1);
    saveToLocalStorage();
    showNotification('Successfully Delete');
    clear();
    init();
  }
};

///////////////////////////////////////////////////////
// Clear order Element
const clear = () => {
  orderContainer.innerHTML = '';
};

///////////////////////////////////////////////////////
// Initialize: render all orders or show empty message
const init = () => {
  if (!cart.length) {
    orderContainer.innerHTML = `
      <div class="no-order">
        <p class="no-order__text">No orders yet. Go to Products and add some items to your cart!</p>
        <a href="../products/products.html" class="btn no-order__btn">Go to Products</a>
      </div>
      `;
    return;
  }
  cart.forEach(renderOrder);
};

init();

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
