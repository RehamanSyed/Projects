# E-Commerce Cart System with React, Redux, and Next.js

This project demonstrates an e-commerce cart system built with **Next.js**, **React**, **Redux**, and **localStorage**. The system allows users to browse products, add them to the cart, and manage quantities with dynamic stock updates. It also includes tiered discounts based on the cart's total value and features such as a cart summary modal and order confirmation.

## Table of Contents
1. [Overview](#overview)
2. [Features](#features)
3. [Project Flow](#project-flow)
4. [Design System](#design-system)
5. [Installation](#installation)
6. [Technologies Used](#technologies-used)
7. [How to Run Locally](#how-to-run-locally)

---

## Overview

This project simulates an online shopping experience where users can view products, add them to the cart, and checkout with a discount system. The cart persists across page reloads using **localStorage**, and product stock is updated dynamically as items are added or removed. The page uses **Next.js** for server-side rendering, which ensures fast initial loading and SEO-friendly content.

---

## Features

1. **Product Selection Interface:**
   - Displays a grid of products with **name**, **image**, **price**, **category**, and **available stock**.
   - 20 mock products with varying stock levels, prices, and categories.
   - Each product card has an "Add to Cart" button that allows users to select the quantity of that item.

2. **Dynamic Stock Management:**
   - Real-time stock updates: When a product is added to the cart, the available stock for that product decreases across the UI.
   - Quantity limits: Users cannot add more items than are currently available in stock. If a product runs out of stock, the "Add to Cart" button is disabled.

3. **Total Price Calculation with Tiered Discounts:**
   - A dynamic running total of the items in the cart.
   - **Tiered discounts**:
     - 5% discount for totals above **SAR 50**.
     - 10% discount for totals above **SAR 100**.
     - 15% discount for totals above **SAR 200**.
   - Displays both the original total and discounted total dynamically.

4. **Order Summary and Confirmation Modal:**
   - A **View Cart** button opens a modal summarizing the items in the cart, their quantities, and prices.
   - The modal shows the original total, applied discount, and final total.
   - Includes a "Confirm Order" button that resets the cart and stock after order confirmation.

5. **Responsive Design:**
   - Fully responsive design for both desktop and mobile devices.
   - The product grid and cart components are styled to adapt seamlessly to different screen sizes.

---

## Project Flow

### 1. **Server-Side Data Fetching with `getServerSideProps`**

The application uses **Next.js**'s `getServerSideProps` for server-side data fetching. This allows the products to be fetched and displayed on the server before the page is rendered, improving the initial page load time and ensuring SEO optimization.

**Data Flow:**
- The product data is fetched from a mock API (or a static JSON file) on the server side.
- The fetched data is passed to the component as props via `getServerSideProps`.
- On the client side, the data is **hydrated** and used to display the products and manage cart state.

### 2. **State Management with Redux**

The cart state and available product stock are managed using **Redux Toolkit**. A **Redux slice** is created to handle the cart logic:

- `items`: Stores the list of products added to the cart, including their quantity.
- `products`: Holds the list of all products with their stock levels, which are updated in real-time when items are added or removed from the cart.

**Reducers/Actions:**
- **`setProducts`**: Sets the initial product data fetched from the server.
- **`addToCart`**: Adds a product to the cart and updates stock availability.
- **`incrementQuantity`**: Increases the quantity of a product in the cart and updates stock.
- **`decrementQuantity`**: Decreases the quantity of a product in the cart and updates stock.
- **`removeFromCart`**: Removes a product from the cart and restores the stock.
- **`clearCart`**: Clears the cart, resetting product quantities and stock levels.

**LocalStorage Persistence:**
- The cart is stored in **localStorage**, allowing the cart data to persist even after a page reload.

### 3. **Dynamic UI Updates**

The UI updates dynamically as items are added to or removed from the cart:
- The **"Add to Cart"** button changes to "Out of Stock" when the product's stock is depleted.
- The cart’s **total price** is recalculated each time an item is added or removed.
- **Discounts** are applied based on the total cart value, and both original and discounted totals are displayed.

### 4. **Cart Modal and Order Confirmation**

A **cart modal** is shown when the user clicks the "View Cart" button. This modal displays:
- The list of items in the cart with their quantities, prices, and discounted prices.
- The original total, the applied discount, and the final total.

The modal also includes a **"Confirm Order"** button that, when clicked, clears the cart and updates the available stock for each product.

---

## Design System

### 1. **Product Card UI**

Each product is displayed in a **card format**:
- **Image**: Displays the product image.
- **Title**: Name of the product.
- **Price**: The product price.
- **Stock Level**: Displays the available stock or "Out of Stock" when unavailable.
- **Add to Cart Button**: When clicked, adds the product to the cart and updates the UI accordingly.

**Styling:** The product cards use a responsive grid layout (`flexbox` or `CSS grid`) that adapts based on screen size. The cards include:
- **Hover effects**: To make them interactive.
- **Box shadows** and **rounded corners**: For a modern look.

### 2. **Cart Modal UI**

The cart modal is a **responsive popup** that shows the following:
- **Cart Summary**: Displays a list of items with product details, quantity, and pricing.
- **Original Total & Discounted Total**: Shows both the original total and the discounted price.
- **Confirm Order Button**: Clears the cart and shows a confirmation message.

**Styling:** The modal uses a fixed position on the screen, with a smooth animation when opened or closed. It is fully responsive and ensures a seamless experience on both desktop and mobile screens.

### 3. **Responsive Design**

The design is mobile-first and responsive across all devices:
- **CSS Flexbox/Grid**: Used for the product grid layout and cart components to ensure responsiveness.
- **Media Queries**: Ensure that the product grid adapts to various screen sizes.

---

## Installation

To run the project locally, follow these steps:

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/ecommerce-cart-system.git

2. Navigate to the project directory:

    cd ecommerce-cart-system

3. Install dependencies:
 
    npm install

 4. Run the development server:

    npm run dev