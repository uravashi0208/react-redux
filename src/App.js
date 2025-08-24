import React, { useState } from 'react';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import theme from './theme';
import HomePage from './components/HomePage';
import ShopCategoryPage from './pages/ShopCategoryPage.jsx';
import CheckoutPage from './pages/CheckoutPage';
import useLocalStorage from './hooks/useLocalStorage';

function App() {
  const [cartItems, setCartItems] = useLocalStorage('cartItems', []);

  const handleClearCart = () => {
    setCartItems([]);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage cartItems={cartItems} setCartItems={setCartItems} />} />
          <Route path="/store" element={<ShopCategoryPage />} />
          <Route path="/product-category/:slug" element={<ShopCategoryPage />} />
          <Route path="/checkout" element={<CheckoutPage cartItems={cartItems} onClearCart={handleClearCart} />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
