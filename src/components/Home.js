import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectAllProducts } from '../store/slices/productSlice';
import ProductCard from './ProductCard';

const Home = () => {
  const allProducts = useSelector(selectAllProducts);
  const featuredProducts = allProducts.slice(0, 6); // Show first 6 products as featured

  return (
    <div>
      <section className="hero-section">
        <div className="container">
          <div className="hero-content">
            <h1 className="hero-title">
              Brand-New Arrival Alert<br />
              Your Next Favorite is Here!
            </h1>
            <p className="hero-subtitle">
              Discover the latest must-have arrivals! Elevate your style with our newest collection of trendsetting items. Find your perfect fit with our diverse product.
            </p>
            <Link 
              to="/products" 
              className="btn" 
              style={{ 
                display: 'inline-block', 
                textDecoration: 'none',
                width: 'auto',
                padding: '12px 24px',
                fontSize: '0.875rem',
                fontWeight: '600'
              }}
            >
              Shop Now
            </Link>
          </div>
        </div>
      </section>

      <div className="container">
        <section style={{ padding: '3rem 0' }}>
          <div className="section-header">
            <h2 className="section-title">New Products</h2>
            <p className="section-subtitle">
              Be the first to experience innovation with our latest arrivals. Stay ahead of the curve and discover what's new in style, technology, and more.
            </p>
          </div>
          <div className="products-grid">
            {featuredProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          
          <div style={{ textAlign: 'center', marginTop: '2rem' }}>
            <Link 
              to="/products" 
              className="btn btn-outline" 
              style={{ 
                display: 'inline-block', 
                textDecoration: 'none',
                width: 'auto',
                padding: '12px 24px'
              }}
            >
              All Products
            </Link>
          </div>
        </section>

        <section className="features-section">
          <div className="section-header">
            <h2 className="section-title">Why Choose Us</h2>
            <p className="section-subtitle">
              Choose us for unparalleled quality, exceptional service, and a commitment to your satisfaction. Join countless others who rely on us for reliability.
            </p>
          </div>
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">🚚</div>
              <h3 style={{ 
                fontSize: '1.125rem',
                fontWeight: '600', 
                marginBottom: '0.5rem',
                color: 'var(--text-primary)'
              }}>
                Free Shipping
              </h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>
                Enjoy free shipping on all orders, making your shopping experience even more convenient.
              </p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">↩️</div>
              <h3 style={{ 
                fontSize: '1.125rem',
                fontWeight: '600', 
                marginBottom: '0.5rem',
                color: 'var(--text-primary)'
              }}>
                Easy Returns
              </h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>
                Experience hassle-free returns with our easy-to-use return policy.
              </p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🔒</div>
              <h3 style={{ 
                fontSize: '1.125rem',
                fontWeight: '600', 
                marginBottom: '0.5rem',
                color: 'var(--text-primary)'
              }}>
                Secure Payment
              </h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>
                Shop with confidence using our secure payment options.
              </p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">💬</div>
              <h3 style={{ 
                fontSize: '1.125rem',
                fontWeight: '600', 
                marginBottom: '0.5rem',
                color: 'var(--text-primary)'
              }}>
                Customer Support
              </h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>
                Our dedicated customer support team is here to assist you.
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Home;