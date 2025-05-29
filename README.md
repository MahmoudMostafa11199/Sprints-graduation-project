# Sprints Graduation Project

### (Shopping Cart & Order Management System)

## Overview

This is a web-based shopping cart and order management system developed as part of the Sprints Graduation Project. The application allows users to:

- Register and log in
- Browse and add products to their cart
- Modify quantities and view total cost
- Place orders and view past order history

## Live Demo

Check out the live version here: [Sprints Store on Vercel](https://e-commerce-store-sprints.vercel.app/)

## Video Demo

Check out the Video version here: [View Video on Google Drive](https://drive.google.com/drive/folders/1ggkdi0PaiNFyPwOwvr4kJI109B_3zeXI?usp=sharing)

## Features

- User registration with validation
- Login system using cookies with 1-day expiration
- Product listing with "Add to Cart" functionality
- Dynamic quantity controls and total price calculation in cart
- Order placement system with automatic order history tracking
- View all past orders with details (ID, date,user, total, status)
- Responsive UI and friendly messages (Toastify + Empty State handling)

## Technologies Used

- HTML5 & CSS3
- JavaScript (Vanilla JS)
- Toastify for notifications
- localStorage & sessionStorage for data persistence
- Browser Cookies for user session handling
- Vercel for deployment

## Folder Structure

```
📦project-root
├── 📁 auth/ # Registration & Login pages
│ ├── auth.html
│ ├── auth.css
│ ├── auth.js
│ └── register.html
│
├── 📁 carts/ # Shopping cart page
│ ├── cart.html
│ ├── cart.css
│ └── cart.js
│
├── 📁 orders/ # Order history page
│ ├── orders.html
│ ├── orders.css
│ └── orders.js
│
├── 📁 products/ # Product listing page
│ ├── products.html
│ ├── products.css
│ └── products.js
│
├── 📁 assets/ # Images, icons, and styles
│ ├── imgs/
│ ├── css/ # Shared CSS files (e.g., al.min.css)
│ └── js/ # Shared JavaScript files (e.g., authGuard.js)
│
├── index.html # Home page
└── README.md
```

## How to Run

1. Clone the repository:

   ```bash
   git clone https://github.com/MahmoudMostafa11199/Sprints-graduation-project.git
   ```

2. Open the Project Folder:

   ```bash
   cd Sprints-graduation-project
   ```

3. Open index.html directly in your browser, or use a live server extension in VS Code.

## How the App Works

1. **User Registration & Login:**

   - New users can register with a name, email, username, and password.
   - Login is handled using browser cookies that expire after 1 day.
   - Pages are protected — users can't access products, cart, or orders unless logged in.

2. **Products Page:**

   - Users can browse products pulled from an external API.
   - Each product has an "Add to Cart" button.
   - Products are stored in the cart using `localStorage`.

3. **Cart Page:**

   - Users can:
     - Increase/decrease quantity
     - See live total price updates
     - Remove items from the cart
     - Click "Place Order" to confirm their cart
   - Once an order is placed, the cart is cleared and the data is saved into `orders`.

4. **Orders Page:**

   - Displays all previous orders the user has placed.
   - Each order shows:
     - Order ID
     - Username
     - Date
     - Number of items
     - Total price

5. **Session Handling:**
   - Login status is checked using cookies on every page.
   - If no valid login cookie is found, the user is redirected to the login page.

## Upcoming Features

The project is still evolving, and the following enhancements are currently in progress and will be added soon:

- Product details button on the Orders page for more in-depth information about each order item.
- Admin (Supervisor) features allowing:
  - Adding new products
  - Editing existing products
  - Deleting products
  - Viewing sold products statistics and reports

These features will be deployed as soon as development is complete.
