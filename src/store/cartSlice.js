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
      const existingItem = state.items.find((i) => i.id === action.payload.id);

      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.items.push({ ...action.payload, quantity: 1 });
      }

      const updatedProducts = state.products.map((item) =>
        item.id === action.payload.id
          ? { ...item, availableStock: item.availableStock - 1 }
          : item
      );
      state.products = updatedProducts;

      if (typeof window !== "undefined") {
        localStorage.setItem("cart", JSON.stringify(state.items));
      }
    },
    incrementQuantity: (state, action) => {
      const item = state.items.find(
        (cartItem) => cartItem.id === action.payload.id
      );
      if (item) {
        item.quantity += 1;
      }
      if (typeof window !== "undefined") {
        localStorage.setItem("cart", JSON.stringify(state.items));
      }
    },
    decrementQuantity: (state, action) => {
      const item = state.items.find(
        (cartItem) => cartItem.id === action.payload.id
      );
      if (item && item.quantity > 1) {
        item.quantity -= 1;
      }
      if (typeof window !== "undefined") {
        localStorage.setItem("cart", JSON.stringify(state.items));
      }
    },
    removeFromCart: (state, action) => {
      
      const product = state.items.find((item) => item.id === action.payload.id);

      if (product) {
        state.items = state.items.filter(
          (item) => item.id !== action.payload.id
        );
        const updatedProducts = state.products.map((item) =>
          item.id === product.id
            ? { ...item, availableStock: item.availableStock + 1 }
            : item
        );
        state.products = updatedProducts;
      }
      if (typeof window !== "undefined") {
        localStorage.setItem("cart", JSON.stringify(state.items));
      }
    },
    clearCart: (state) => {
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
