import React, { useState } from 'react';
import { Box } from '@mui/material';
import { motion } from 'framer-motion';
import Header from './Header';
import HeroBanner from './HeroBanner';
import Features from './Features';
import Categories from './Categories';
import FeaturedProducts from './FeaturedProducts';
import HelpSection from './HelpSection';
import CTASection from './CTASection';
import Cart from './Cart';
import { staggerContainer } from '../utils/animations';

const HomePage = () => {
  const [cartOpen, setCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);

  const handleCartOpen = () => {
    setCartOpen(true);
  };

  const handleCartClose = () => {
    setCartOpen(false);
  };

  const handleAddToCart = (product) => {
    setCartItems(prevItems => {
      const existingItem = prevItems.find(item => item.id === product.id);
      
      if (existingItem) {
        return prevItems.map(item => 
          item.id === product.id 
            ? { ...item, quantity: item.quantity + 1 } 
            : item
        );
      } else {
        return [...prevItems, { ...product, quantity: 1 }];
      }
    });
    
    // Commenting out the line that opens the cart
    // setCartOpen(true);
  };

  const handleRemoveFromCart = (productId) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== productId));
  };

  const handleUpdateQuantity = (productId, quantity) => {
    setCartItems(prevItems => 
      prevItems.map(item => 
        item.id === productId 
          ? { ...item, quantity } 
          : item
      )
    );
  };

  return (
    <Box component={motion.div}
      variants={staggerContainer}
      initial="hidden"
      animate="visible"
    >
      <Header cartItems={cartItems} onCartOpen={handleCartOpen} />
      <HeroBanner />
      <Features />
      <Categories />
      <FeaturedProducts onAddToCart={handleAddToCart} />
      <HelpSection />
      <CTASection />
      <Cart 
        open={cartOpen} 
        onClose={handleCartClose} 
        cartItems={cartItems}
        onRemove={handleRemoveFromCart}
        onUpdateQuantity={handleUpdateQuantity}
      />
    </Box>
  );
};

export default HomePage;
