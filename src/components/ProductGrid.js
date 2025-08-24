import { Box } from '@mui/material';
import ProductCard from './ProductCard';

const ProductGrid = ({ products, onAddToCart }) => {
  return (
    <Box sx={{ display: 'flex', flexWrap: 'wrap', mx: -1.5 }}>
      {products.map((product) => (
        <Box 
          key={product.id} 
          sx={{ 
            width: { xs: '100%', sm: '50%', md: '25%' }, 
            px: 1.5, 
            mb: 3 
          }}
        >
          <ProductCard product={product} onAddToCart={onAddToCart} />
        </Box>
      ))}
    </Box>
  );
};

export default ProductGrid;