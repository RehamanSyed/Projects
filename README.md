# E-Commerce Cart System with React, Redux, and Next.js

This project implements a fully-functional **E-commerce Cart System** using **Next.js**, **React**, **Redux**, and **localStorage**. Users can browse products, add them to the cart, manage quantities, and apply tiered discounts. The cart persists across page reloads using **localStorage**, ensuring a seamless user experience.

## Approach

### 1. **Server-Side Rendering (SSR) with Next.js**
- **`getServerSideProps`** is used to fetch product data from the server during page load.
- **SSR** ensures fast page load times and **SEO optimization** by pre-rendering the product list and cart data.
- On the client side, the fetched data is **hydrated** to ensure consistency between the server-rendered and client-rendered content.

### 2. **State Management with Redux**
- **Redux** manages the global state of the cart and product stock.
  - **Cart State** stores the list of products added to the cart along with quantities.
  - **Products State** holds product data (e.g., stock levels) and updates dynamically as items are added or removed from the cart.
  
  **Key Actions/Reducers**:
  - `setProducts`: Initializes the product data in the Redux store.
  - `addToCart`: Adds a product to the cart and updates stock levels.
  - `incrementQuantity` & `decrementQuantity`: Adjust product quantities in the cart.
  - `removeFromCart`: Removes an item from the cart and restores stock.
  - `clearCart`: Clears the cart and resets stock levels.

### 3. **Persistent Cart with localStorage**
- The cart data is stored in **localStorage**, ensuring persistence across page reloads.
- On page load, the cart is retrieved from **localStorage** and restored in Redux state.
- Any changes made to the cart are reflected in **localStorage** to persist data across sessions.

### 4. **Dynamic UI Updates**
- The product UI updates dynamically:
  - The **"Add to Cart"** button is disabled when an item is out of stock.
  - The **cart total** is recalculated whenever items are added or removed.
  - **Tiered discounts** are applied based on the total cart value:
    - 5% off for totals over **SAR 50**.
    - 10% off for totals over **SAR 100**.
    - 15% off for totals over **SAR 200**.

### 5. **Responsive Design**
- **Mobile-first design** using **CSS Flexbox** and **CSS Grid** to ensure the layout is responsive across all devices.
- The product grid and cart components adapt seamlessly for desktop and mobile views.

### 6. **Cart Modal and Order Confirmation**
- The **View Cart** button opens a **cart summary modal** displaying:
  - Items in the cart with their quantities and prices.
  - The original total and discounted total.
  - A **"Confirm Order"** button that resets the cart and updates product stock, simulating order completion.

--

## Features

- **Product Selection**: Displays 20 mock products with name, image, price, and stock level.
- **Dynamic Stock Management**: Updates stock levels in real-time as products are added/removed from the cart.
- **Tiered Discounts**: Discounts are automatically applied based on the total cart value.
- **Cart Modal**: View cart summary and confirm the order.
- **Responsive Design**: Mobile-first layout using **SCSS**  for responsive product grids and cart components.


## Technologies Used

- **Next.js** : For server-side rendering (SSR) and SEO optimization.
- **React** : For building UI components.
- **React-query, ReduxToolkit**: For state management of the cart and product data.
- **localStorage**: For persisting cart data across page reloads.
- **SCSS**: For responsive design and layout.

--

## Installation

To run the project locally, follow these steps:

1. Clone the repository:

   ```bash
   git clone https://github.com/RehamanSyed/kinzway-task.git

2. Navigate to the project directory:

     ```bash
    cd kinzway-task

3. Install dependencies:
 
     ```bash
    npm install

 4. Run the development server:

     ```bash
    npm run dev


