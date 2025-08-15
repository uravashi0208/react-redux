import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { 
  selectProductsByCategory, 
  selectCategories,
  selectSelectedCategory,
  setSelectedCategory 
} from '../store/slices/productSlice';
import ProductCard from './ProductCard';

const ProductList = () => {
  const dispatch = useDispatch();
  const products = useSelector(selectProductsByCategory);
  const categories = useSelector(selectCategories);
  const selectedCategory = useSelector(selectSelectedCategory);

  const handleCategoryChange = (category) => {
    dispatch(setSelectedCategory(category));
  };

  return (
    <div className="container">
      <section style={{ padding: '2rem 0' }}>
        <div className="section-header">
          <h1 className="section-title">Products</h1>
          <p className="section-subtitle">
            Explore our curated selection of premium products, tailored to suit every need and taste. From essentials to indulgences, find your perfect fit.
          </p>
        </div>
        
        <div className="category-filters">
          {categories.map(category => (
            <button
              key={category}
              onClick={() => handleCategoryChange(category)}
              className={`category-btn ${selectedCategory === category ? 'active' : ''}`}
            >
              {category}
            </button>
          ))}
        </div>

        <div style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          marginBottom: '2rem'
        }}>
          <p style={{ 
            color: 'var(--text-light)',
            fontSize: '1rem',
            fontWeight: '500'
          }}>
            Showing {products.length} product{products.length !== 1 ? 's' : ''}
            {selectedCategory !== 'all' && ` in ${selectedCategory}`}
          </p>
        </div>

        {products.length > 0 ? (
          <div className="products-grid">
            {products.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div style={{ 
            textAlign: 'center', 
            padding: '4rem 2rem',
            background: 'var(--bg-primary)',
            borderRadius: 'var(--border-radius-lg)',
            boxShadow: 'var(--shadow-lg)',
            border: '1px solid rgba(255, 255, 255, 0.2)'
          }}>
            <h2 style={{ 
              color: 'var(--text-secondary)',
              fontSize: '1.8rem',
              fontWeight: '600',
              marginBottom: '1rem'
            }}>
              No products found
            </h2>
            <p style={{ 
              color: 'var(--text-light)',
              fontSize: '1.1rem'
            }}>
              Try selecting a different category
            </p>
          </div>
        )}
      </section>
    </div>
  );
};

export default ProductList;