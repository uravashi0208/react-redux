import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [],
  totalAmount: 0,
  totalQuantity: 0,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const newItem = action.payload;
      const existingItem = state.items.find(item => item.id === newItem.id);
      
      if (!existingItem) {
        state.items.push({
          ...newItem,
          quantity: 1,
          totalPrice: newItem.price,
        });
      } else {
        existingItem.quantity++;
        existingItem.totalPrice = existingItem.totalPrice + newItem.price;
      }
      
      state.totalQuantity++;
      state.totalAmount = state.totalAmount + newItem.price;
    },
    removeFromCart: (state, action) => {
      const id = action.payload;
      const existingItem = state.items.find(item => item.id === id);
      
      if (existingItem) {
        state.totalQuantity = state.totalQuantity - existingItem.quantity;
        state.totalAmount = state.totalAmount - existingItem.totalPrice;
        state.items = state.items.filter(item => item.id !== id);
      }
    },
    increaseQuantity: (state, action) => {
      const id = action.payload;
      const existingItem = state.items.find(item => item.id === id);
      
      if (existingItem) {
        existingItem.quantity++;
        existingItem.totalPrice = existingItem.totalPrice + existingItem.price;
        state.totalQuantity++;
        state.totalAmount = state.totalAmount + existingItem.price;
      }
    },
    decreaseQuantity: (state, action) => {
      const id = action.payload;
      const existingItem = state.items.find(item => item.id === id);
      
      if (existingItem && existingItem.quantity > 1) {
        existingItem.quantity--;
        existingItem.totalPrice = existingItem.totalPrice - existingItem.price;
        state.totalQuantity--;
        state.totalAmount = state.totalAmount - existingItem.price;
      }
    },
    clearCart: (state) => {
      state.items = [];
      state.totalAmount = 0;
      state.totalQuantity = 0;
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  increaseQuantity,
  decreaseQuantity,
  clearCart,
} = cartSlice.actions;

// Selectors
export const selectCartItems = (state) => state.cart.items;
export const selectTotalQuantity = (state) => state.cart.totalQuantity;
export const selectTotalAmount = (state) => state.cart.totalAmount;
export const selectCartItemById = (state, id) =>
  state.cart.items.find(item => item.id === id);

export default cartSlice.reducer;