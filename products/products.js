///////////////////////////////////////////////////////
// Elements
const productContainer = document.querySelector('.products');

/////////////////////////////////////////////////////
// Fetch products from API
const fetchProducts = async () => {
  const res = await fetch('https://fakestoreapi.com/products');
  const products = await res.json();
  return products;
};

/////////////////////////////////////////////////////
// Render product
const renderProduct = (product) => {
  const markup = `
    <div class="product">
      <div>
        <img class="product__img" src=${product.image} alt=${product.title} />
      </div>
      <div>
        <span class="product__category">(${product.category})</span>
        <h3 class="heading-tertiary product__title">
          ${product.title}
        </h3>
        <p class="product__price">$${product.price}</p>
        <p class="product__description">${product.description}</p>
        <button class="btn btn__add-to-cart">Add to cart</button>
      </div>
    </div>
  `;

  productContainer.insertAdjacentHTML('beforeend', markup);
};

/////////////////////////////////////////////////////
// Add to Cart
const addToCart = () => {
  document.querySelectorAll('.btn__add-to-cart').forEach((btn, i) =>
    btn.addEventListener('click', (e) => {
      const selectedProduct = JSON.parse(localStorage.getItem('products'))[i];

      const cart = JSON.parse(localStorage.getItem('cart')) || [];

      const index = cart.findIndex((pr) => pr.id === selectedProduct.id);

      if (index !== -1) return;

      const date = `${
        new Date().getMonth() + 1
      }/${new Date().getDate()}/${new Date().getFullYear()}`;

      const cartData = {
        ...selectedProduct,
        quantity: 1,
        date,
      };

      cart.push(cartData);
      localStorage.setItem('cart', JSON.stringify(cart));
    })
  );
};

/////////////////////////////////////////////////////
// Show Notification
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
        'linear-gradient(to right, var(--primary-color), var(--primary-color-light))',
    },
  }).showToast();
};

/////////////////////////////////////////////////////
// Init Function
const init = async () => {
  let products = JSON.parse(localStorage.getItem('products'));

  if (!products || !products.length) {
    products = await fetchProducts();
    localStorage.setItem('products', JSON.stringify(products));
  }

  products.forEach(renderProduct);
  addToCart();
};

init();
