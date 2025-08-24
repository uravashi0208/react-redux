import React from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { store, persistor } from './app/store';
import theme from './theme';
import HomePage from './components/HomePage';
import ShopCategoryPage from './pages/ShopCategoryPage.jsx';
import CheckoutPage from './features/checkout/CheckoutPage';

function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/store" element={<ShopCategoryPage />} />
              <Route path="/product-category/:slug" element={<ShopCategoryPage />} />
              <Route path="/checkout" element={<CheckoutPage />} />
            </Routes>
          </BrowserRouter>
        </ThemeProvider>
      </PersistGate>
    </Provider>
  );
}

export default App;
