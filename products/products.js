// Elements
const productContainer = document.querySelector('.products');

// Fetch products from API
const fetchProducts = async () => {
  const res = await fetch('https://fakestoreapi.com/products');
  const products = await res.json();
  return products;
};

// Render product
const renderProduct = (product) => {
  const markup = `
    <div class="product">
      <div><img class="product__img" src=${product.image} alt=${product.title} /></div>
      <div>
      <span class="product__category">(${product.category})</span>
      <h3 class="heading-tertiary product__title">
      ${product.title}
      </h3>
      <p class="product__price">$${product.price}</p>
      <p className="product__description">${product.description}</p>
      </div>
    </div>
  `;

  productContainer.insertAdjacentHTML('beforeend', markup);
};

// Init Function
const init = async () => {
  let products = JSON.parse(localStorage.getItem('products'));

  if (!products || !products.length) {
    products = await fetchProducts();
    localStorage.setItem('products', JSON.stringify(products));
  }

  products.forEach(renderProduct);
};

init();
