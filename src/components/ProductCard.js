import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, selectCartItemById } from '../store/slices/cartSlice';

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();
  const cartItem = useSelector(state => selectCartItemById(state, product.id));

  const handleAddToCart = () => {
    dispatch(addToCart(product));
  };

  // Generate random rating and badge for demo purposes
  const rating = Math.floor(Math.random() * 2) + 4; // 4-5 stars
  const reviewCount = Math.floor(Math.random() * 2000) + 100; // 100-2100 reviews
  
  // Random badge assignment
  const badges = ['Hot Sale', 'NEW', '10% OFF', null, null]; // null means no badge
  const randomBadge = badges[Math.floor(Math.random() * badges.length)];
  
  const getBadgeStyle = (badge) => {
    switch(badge) {
      case 'Hot Sale':
        return { background: '#dc3545', color: 'white' };
      case 'NEW':
        return { background: '#28a745', color: 'white' };
      case '10% OFF':
        return { background: '#ff6b35', color: 'white' };
      default:
        return null;
    }
  };

  return (
    <div className="product-card">
      <div className="product-image-container">
        {randomBadge && (
          <span className="product-badge" style={getBadgeStyle(randomBadge)}>
            {randomBadge}
          </span>
        )}
        <img
          src={product.image}
          alt={product.title}
          className="product-image"
          onError={(e) => {
            // Prevent infinite error loops
            if (e.target.src.includes('placeholder')) return;
            
            // Use a reliable placeholder service with furniture images
            const placeholderImages = [
              'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=300&fit=crop&auto=format',
              'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400&h=300&fit=crop&auto=format',
              'https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?w=400&h=300&fit=crop&auto=format',
              'https://images.unsplash.com/photo-1586105251261-72a756497a11?w=400&h=300&fit=crop&auto=format',
              'https://images.unsplash.com/photo-1549497538-303791108f95?w=400&h=300&fit=crop&auto=format'
            ];
            const randomIndex = Math.floor(Math.random() * placeholderImages.length);
            e.target.src = placeholderImages[randomIndex];
            e.target.classList.add('placeholder');
          }}
        />
        <div className="product-overlay">
          <button className="quick-action-btn">♡</button>
          <button className="quick-action-btn">👁</button>
        </div>
      </div>
      
      <div className="product-content">
        <h3 className="product-title">{product.title}</h3>
        
        <div className="product-rating">
          <span className="stars">
            {'★'.repeat(rating)}{'☆'.repeat(5-rating)}
          </span>
          <span>({reviewCount.toLocaleString()})</span>
        </div>
        
        <div className="product-price">${product.price}</div>
        
        <button
          onClick={handleAddToCart}
          className={`btn ${cartItem ? 'btn-success' : ''}`}
        >
          {cartItem ? `In Cart (${cartItem.quantity})` : 'Add to Cart'}
        </button>
      </div>
    </div>
  );
};

export default ProductCard;