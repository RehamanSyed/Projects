// redux/cartSlice.js
import { createSlice } from "@reduxjs/toolkit";

// Load initial state from localStorage (if it exists)
const loadCartFromLocalStorage = () => {
  if (typeof window !== "undefined") {
    const savedCart = localStorage.getItem("cart");
    return savedCart ? JSON.parse(savedCart) : [];
  }
  return [];
};

// Initial state for the cart
const initialState = {
  items: loadCartFromLocalStorage(), // Array of cart items
  products: [],
};

// Create the cart slice
const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setProducts: (state, action) => {
      // Set initial products (with available stock)
      state.products = action.payload;
    },
    addToCart: (state, action) => {
      const product = action.payload;
      const existingItem = state.items.find((i) => i.id === product.id);

      // Prevent adding more than available stock
      if (existingItem) {
        if (existingItem.quantity < product.availableStock) {
          existingItem.quantity += 1;

          // Decrease stock after adding to cart
          state.products = state.products.map((item) =>
            item.id === product.id
              ? { ...item, availableStock: item.availableStock - 1 }
              : item
          );
        }
      } else {
        if (product.availableStock > 0) {
          state.items.push({ ...product, quantity: 1 });
          // Decrease stock after adding to cart

          state.products = state.products.map((item) =>
            item.id === product.id
              ? { ...item, availableStock: item.availableStock - 1 }
              : item
          );
        }
      }

      if (typeof window !== "undefined") {
        localStorage.setItem("cart", JSON.stringify(state.items));
      }
    },
    incrementQuantity: (state, action) => {
      const item = state.items.find((f) => f.id === action.payload.id);
      if (item) {
        const product = state.products.find((f) => f.id === item.id);

        // Prevent incrementing if stock is exhausted
        if (item.quantity < product.availableStock) {
          item.quantity += 1;

          // Decrease stock after increment
          state.products = state.products.map((product) =>
            product.id === item.id
              ? { ...product, availableStock: product.availableStock - 1 }
              : product
          );
        }
      }
      if (typeof window !== "undefined") {
        localStorage.setItem("cart", JSON.stringify(state.items));
      }
    },
    decrementQuantity: (state, action) => {
      const item = state.items.find((f) => f.id === action.payload.id);
      if (item && item.quantity > 1) {
        item.quantity -= 1;

        state.products = state.products.map((product) =>
          product.id === item.id
            ? { ...product, availableStock: product.availableStock + 1 }
            : product
        );
      }
      if (typeof window !== "undefined") {
        localStorage.setItem("cart", JSON.stringify(state.items));
      }
    },
    removeFromCart: (state, action) => {
      const product = state.items.find((f) => f.id === action.payload.id);

      if (product) {
        state.items = state.items.filter((f) => f.id !== action.payload.id);

        state.products = state.products.map((item) =>
          item.id === product.id
            ? {
                ...item,
                availableStock: item.availableStock + product.quantity,
              }
            : item
        );
      }
      if (typeof window !== "undefined") {
        localStorage.setItem("cart", JSON.stringify(state.items));
      }
    },
    clearCart: (state) => {
      state.items.forEach((item) => {
        const product = state.products.find((prod) => prod.id === item.id);
        if (product) {
          product.availableStock += item.quantity;
        }
      });
      state.items = [];
      if (typeof window !== "undefined") {
        localStorage.removeItem("cart");
      }
    },
  },
});

export const {
  setProducts,
  addToCart,
  removeFromCart,
  incrementQuantity,
  decrementQuantity,
} = cartSlice.actions;

export default cartSlice.reducer;
