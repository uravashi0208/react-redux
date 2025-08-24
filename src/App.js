import React from 'react';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import theme from './theme';
import HomePage from './components/HomePage';
import ShopCategoryPage from './pages/ShopCategoryPage.jsx';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/store" element={<ShopCategoryPage />} />
          <Route path="/product-category/:slug" element={<ShopCategoryPage />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;