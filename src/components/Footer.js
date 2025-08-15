import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-section">
            <h3 className="footer-logo">Furnixar</h3>
            <p className="footer-description">
              Furnixar is a modern e-commerce platform designed to help you create an impressive online store. 
              Built with React and Redux for optimal performance.
            </p>
            <div className="social-links">
              <a href="#" className="social-link">📘</a>
              <a href="#" className="social-link">📷</a>
              <a href="#" className="social-link">🐦</a>
              <a href="#" className="social-link">💼</a>
            </div>
          </div>
          
          <div className="footer-section">
            <h4 className="footer-title">Shop</h4>
            <ul className="footer-links">
              <li><Link to="/products" className="footer-link">All Products</Link></li>
              <li><Link to="/cart" className="footer-link">Cart</Link></li>
              <li><a href="#" className="footer-link">Checkout</a></li>
              <li><a href="#" className="footer-link">Wishlist</a></li>
            </ul>
          </div>
          
          <div className="footer-section">
            <h4 className="footer-title">Customer Service</h4>
            <ul className="footer-links">
              <li><a href="#" className="footer-link">FAQs</a></li>
              <li><a href="#" className="footer-link">Contact Us</a></li>
              <li><a href="#" className="footer-link">Return Policy</a></li>
              <li><a href="#" className="footer-link">Terms & Conditions</a></li>
            </ul>
          </div>
          
          <div className="footer-section">
            <h4 className="footer-title">Newsletter</h4>
            <p className="newsletter-text">
              Stay in the loop with exclusive offers and updates. Subscribe to our newsletter.
            </p>
            <div className="newsletter-form">
              <input 
                type="email" 
                placeholder="Enter your email" 
                className="newsletter-input"
              />
              <button className="newsletter-btn">Subscribe</button>
            </div>
          </div>
        </div>
        
        <div className="footer-bottom">
          <p className="copyright">
            © 2025 Furnixar. Develop with ❤️ by Redux Team
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;