import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectTotalQuantity } from '../store/slices/cartSlice';

const Header = () => {
  const location = useLocation();
  const totalQuantity = useSelector(selectTotalQuantity);

  return (
    <header className="header">
      <div className="container">
        <div className="header-content">
          <Link to="/" className="logo">
            Furnixar
          </Link>
          
          <nav>
            <ul className="nav">
              <li>
                <Link 
                  to="/" 
                  className={`nav-link ${location.pathname === '/' ? 'active' : ''}`}
                >
                  Home
                </Link>
              </li>
              <li>
                <Link 
                  to="/products" 
                  className={`nav-link ${location.pathname === '/products' ? 'active' : ''}`}
                >
                  Products
                </Link>
              </li>
            </ul>
          </nav>

          <Link to="/cart" className="cart-icon">
            Cart
            {totalQuantity > 0 && (
              <span className="cart-count">{totalQuantity}</span>
            )}
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;