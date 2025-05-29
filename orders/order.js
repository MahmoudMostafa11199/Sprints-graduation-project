///////////////////////////////////////////////////////
// DOM Element
const orderContainer = document.querySelector('.orders');

///////////////////////////////////////////////////////
// Load orders items from localStorage (if available)
const orders = JSON.parse(localStorage.getItem('orders')) || [];

///////////////////////////////////////////////////////
// Render order item
const renderOrder = (order, i) => {
  const markup = `
        <div class="order-item" data-id=${order.id}>
          <div class="order-item__header">
            <h4 class="order-item__id">Order #${i + 1}</h4>
            <time class="order-item__date" datetime="${order.date}"
              ><span class="order-item__label">Order Date: </span>${
                order.date
              }</time
            >
          </div>

          <hr class="order-item__divider" />

          <div class="order-item__body">
            <p class="order-item__user">
              <span class=""order-item__label">User: </span>${order.user}</p>
            <p class="order-item__items">
              <span class=""order-item__label">Items: </span>${
                order.items.length
              }</p>
            <p class="order-item__price">
              <span class=""order-item__label">Total price: </span>
              <span class="price">$${order.totalPrice.toFixed(2)}</span>
            </p>
            <p class="order-item__quantity">
            <span class=""order-item__label">Order status: </span>${
              order.status
            }</p>
              <button class="btn order-item__details-btn">View Details</button>
          </div>
        </div>
  `;

  orderContainer.insertAdjacentHTML('beforeend', markup);
};

///////////////////////////////////////////////////////
// Initialize: render all orders or show (no-orders) message
const init = () => {
  if (!orders.length) {
    orderContainer.innerHTML = `
      <div class="no-order">
        <p class="no-order__text">You haven't placed any orders yet.</p>
        <p class="no-order__text">Your past orders will appear here once you've completed a checkout.</p>
        <a href="../carts/cart.html" class="btn no-order__btn">Go to My Cart</a>
      </div>
      `;
    return;
  }

  orders.forEach(renderOrder);
};

init();
