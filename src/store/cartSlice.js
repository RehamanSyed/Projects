// redux/cartSlice.js
import { createSlice } from "@reduxjs/toolkit";

// Load initial state from localStorage (if it exists)
const loadCartFromLocalStorage = () => {
  if (typeof window !== "undefined") {
    const savedCart = localStorage.getItem("cart");
    const savedProducts = localStorage.getItem("products");

    return {
      items: savedCart ? JSON.parse(savedCart) : [],
      products: savedProducts ? JSON.parse(savedProducts) : [],
    };
  }
  return { items: [], products: [] };
};

// Save cart and products to localStorage
const saveToLocalStorage = (state) => {
  if (typeof window !== "undefined") {
    localStorage.setItem("cart", JSON.stringify(state.items));
    localStorage.setItem("products", JSON.stringify(state.products));
  }
};

// Initial state for the cart
const initialState = loadCartFromLocalStorage();

// Create the cart slice
const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setProducts: (state, action) => {
      state.products = action.payload;
      saveToLocalStorage(state); // Persist products to localStorage
    },
    addToCart: (state, action) => {
      const product = action.payload;
      const existingItem = state.items.find((i) => i.id === product.id);

      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.items.push({ ...product, quantity: 1 });
      }

      // Decrease stock after adding to cart
      state.products = state.products.map((item) =>
        item.id === product.id
          ? { ...item, availableStock: item.availableStock - 1 }
          : item
      );

      saveToLocalStorage(state); // Persist to localStorage
    },
    removeFromCart: (state, action) => {
      const cartItem = state.items.find((f) => f.id === action.payload.id);

      if (cartItem) {
        state.items = state.items.filter((f) => f.id !== action.payload.id);
        // Increase stock after removing from cart
        state.products = state.products.map((item) =>
          item.id === cartItem.id
            ? {
                ...item,
                availableStock: item.availableStock + cartItem.quantity,
              }
            : item
        );
      }

      saveToLocalStorage(state); // Persist to localStorage
    },
    incrementQuantity: (state, action) => {
      const cartItem = state.items.find((f) => f.id === action.payload.id);
      cartItem.quantity += 1;

      // Decrease stock after increment
      state.products = state.products.map((item) =>
        item.id === cartItem.id
          ? { ...item, availableStock: item.availableStock - 1 }
          : item
      );

      saveToLocalStorage(state); // Persist to localStorage
    },
    decrementQuantity: (state, action) => {
      const cartItem = state.items.find((f) => f.id === action.payload.id);
      cartItem.quantity -= 1;

      // Increase stock after decrement
      state.products = state.products.map((item) =>
        item.id === cartItem.id
          ? { ...item, availableStock: item.availableStock + 1 }
          : item
      );

      saveToLocalStorage(state); // Persist to localStorage
    },
    clearCart: (state) => {
      state.items = [];
      saveToLocalStorage(state); // Persist to localStorage
    },
  },
});

export const {
  setProducts,
  addToCart,
  removeFromCart,
  incrementQuantity,
  decrementQuantity,
  clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;
