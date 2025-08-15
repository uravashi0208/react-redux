import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  selectCartItems,
  selectTotalAmount,
  selectTotalQuantity,
  removeFromCart,
  increaseQuantity,
  decreaseQuantity,
  clearCart
} from '../store/slices/cartSlice';

const Cart = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector(selectCartItems);
  const totalAmount = useSelector(selectTotalAmount);
  const totalQuantity = useSelector(selectTotalQuantity);

  const handleRemoveFromCart = (id) => {
    dispatch(removeFromCart(id));
  };

  const handleIncreaseQuantity = (id) => {
    dispatch(increaseQuantity(id));
  };

  const handleDecreaseQuantity = (id) => {
    dispatch(decreaseQuantity(id));
  };

  const handleClearCart = () => {
    if (window.confirm('Are you sure you want to clear your cart?')) {
      dispatch(clearCart());
    }
  };

  const handleCheckout = () => {
    alert('Checkout feature would be implemented here. This is a portfolio demo!');
  };

  if (cartItems.length === 0) {
    return (
      <div className="cart-container">
        <div className="empty-cart">
          <h2>Your cart is empty</h2>
          <p>Add some products to get started!</p>
          <Link 
            to="/products" 
            className="btn" 
            style={{ 
              display: 'inline-block', 
              textDecoration: 'none',
              marginTop: '1.5rem',
              width: 'auto',
              padding: '12px 24px'
            }}
          >
            Shop Now
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-container">
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        marginBottom: '2rem'
      }}>
        <h1>Shopping Cart ({totalQuantity} items)</h1>
        <button
          onClick={handleClearCart}
          className="btn btn-danger"
          style={{ width: 'auto', padding: '10px 20px' }}
        >
          Clear Cart
        </button>
      </div>

      <div>
        {cartItems.map(item => (
          <div key={item.id} className="cart-item">
            <img
              src={item.image}
              alt={item.title}
              className="cart-item-image"
              onError={(e) => {
                // Prevent infinite error loops
                if (e.target.src.includes('placeholder')) return;
                
                // Use furniture placeholder images
                const placeholderImages = [
                  'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=80&h=80&fit=crop&auto=format',
                  'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=80&h=80&fit=crop&auto=format',
                  'https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?w=80&h=80&fit=crop&auto=format'
                ];
                const randomIndex = Math.floor(Math.random() * placeholderImages.length);
                e.target.src = placeholderImages[randomIndex];
                e.target.classList.add('placeholder');
              }}
            />
            
            <div className="cart-item-details">
              <h3 className="cart-item-title">{item.title}</h3>
              <p className="cart-item-price">${item.price}</p>
              
              <div className="quantity-controls">
                <button
                  onClick={() => handleDecreaseQuantity(item.id)}
                  className="quantity-btn"
                  disabled={item.quantity <= 1}
                >
                  -
                </button>
                <span className="quantity">{item.quantity}</span>
                <button
                  onClick={() => handleIncreaseQuantity(item.id)}
                  className="quantity-btn"
                >
                  +
                </button>
              </div>
              
              <div style={{ 
                fontWeight: 'bold', 
                color: '#007bff',
                marginTop: '0.5rem'
              }}>
                Subtotal: ${item.totalPrice.toFixed(2)}
              </div>
            </div>

            <button
              onClick={() => handleRemoveFromCart(item.id)}
              className="remove-btn"
              title="Remove from cart"
            >
              ×
            </button>
          </div>
        ))}
      </div>

      <div className="cart-summary">
        <div className="cart-total">
          Total: ${totalAmount.toFixed(2)}
        </div>
        
        <div style={{ 
          display: 'flex', 
          gap: '1rem',
          justifyContent: 'flex-end',
          flexWrap: 'wrap'
        }}>
          <Link
            to="/products"
            className="btn btn-secondary"
            style={{ 
              textDecoration: 'none',
              display: 'inline-block',
              width: 'auto',
              padding: '12px 24px'
            }}
          >
            Continue Shopping
          </Link>
          
          <button
            onClick={handleCheckout}
            className="btn btn-success"
            style={{ 
              width: 'auto',
              padding: '16px 32px',
              fontSize: '1.1rem',
              fontWeight: '700'
            }}
          >
            Checkout Now →
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;