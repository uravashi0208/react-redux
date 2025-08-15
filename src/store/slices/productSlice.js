import { createSlice } from '@reduxjs/toolkit';
import { sampleProducts } from '../../data/sampleData';

const initialState = {
  products: sampleProducts,
  loading: false,
  error: null,
  selectedCategory: 'all',
};

const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    setSelectedCategory: (state, action) => {
      state.selectedCategory = action.payload;
    },
    addProduct: (state, action) => {
      state.products.push(action.payload);
    },
    updateProduct: (state, action) => {
      const index = state.products.findIndex(product => product.id === action.payload.id);
      if (index !== -1) {
        state.products[index] = action.payload;
      }
    },
    deleteProduct: (state, action) => {
      state.products = state.products.filter(product => product.id !== action.payload);
    },
  },
});

export const {
  setLoading,
  setError,
  setSelectedCategory,
  addProduct,
  updateProduct,
  deleteProduct,
} = productSlice.actions;

// Selectors
export const selectAllProducts = (state) => state.products.products;
export const selectProductsByCategory = (state) => {
  const { products, selectedCategory } = state.products;
  if (selectedCategory === 'all') {
    return products;
  }
  return products.filter(product => product.category === selectedCategory);
};
export const selectProductById = (state, productId) =>
  state.products.products.find(product => product.id === productId);
export const selectCategories = (state) => {
  const categories = state.products.products.map(product => product.category);
  return ['all', ...new Set(categories)];
};
export const selectLoading = (state) => state.products.loading;
export const selectError = (state) => state.products.error;
export const selectSelectedCategory = (state) => state.products.selectedCategory;

export default productSlice.reducer;