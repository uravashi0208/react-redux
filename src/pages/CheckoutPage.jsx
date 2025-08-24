import React, { useState } from 'react';
import {
  Container,
  Typography,
  Box,
  Paper,
  Button,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Avatar,
  Divider,
  TextField,
  Grid,
  FormControlLabel,
  Checkbox,
  CircularProgress,
  Card,
  CardContent,
  Stepper,
  Step,
  StepLabel
} from '@mui/material';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import PaymentIcon from '@mui/icons-material/Payment';
import Header from '../components/Header';
import Cart from '../components/Cart';
import { staggerContainer, fadeIn, slideUp } from '../utils/animations';

const CheckoutPage = ({ cartItems = [], onClearCart }) => {
  const navigate = useNavigate();
  const [isProcessing, setIsProcessing] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [activeStep, setActiveStep] = useState(0);
  const [cartOpen, setCartOpen] = useState(false);

  const handleCartOpen = () => {
    setCartOpen(true);
  };

  const handleCartClose = () => {
    setCartOpen(false);
  };
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    zipCode: '',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    saveInfo: false
  });

  const totalPrice = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  const shippingCost = 5.99;
  const tax = totalPrice * 0.08;
  const finalTotal = totalPrice + shippingCost + tax;

  const steps = ['Order Summary', 'Shipping & Payment', 'Confirmation'];

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleNext = () => {
    setActiveStep((prevStep) => prevStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevStep) => prevStep - 1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsProcessing(true);
    
    // Simulate processing
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsProcessing(false);
    setShowSuccess(true);
    setActiveStep(2);
    
    // Clear cart after successful order
    setTimeout(() => {
      if (onClearCart) {
        onClearCart();
      }
      navigate('/');
    }, 3000);
  };

  if (cartItems.length === 0 && !showSuccess) {
    return (
      <>
        <Header cartItems={cartItems} onCartOpen={handleCartOpen} />
        <Cart 
          open={cartOpen} 
          onClose={handleCartClose} 
          cartItems={cartItems} 
          onClearCart={onClearCart}
        />
        <Container maxWidth="lg" sx={{ py: 8, mt: 8 }}>
          <motion.div
            variants={fadeIn}
            initial="hidden"
            animate="visible"
          >
            <Box sx={{ textAlign: 'center', py: 8 }}>
              <ShoppingCartIcon sx={{ fontSize: 80, color: 'primary.light', mb: 2 }} />
              <Typography variant="h4" gutterBottom sx={{ fontWeight: 700, color: 'primary.main' }}>
                Your cart is empty
              </Typography>
              <Typography variant="body1" color="text.secondary" sx={{ mb: 3, maxWidth: 400, mx: 'auto' }}>
                Looks like you haven't added any plants to your cart yet. Browse our collection and find your perfect plant!
              </Typography>
              <Button 
                variant="contained" 
                color="primary"
                onClick={() => navigate('/')}
                size="large"
                sx={{
                  px: 4,
                  py: 1.5,
                  fontSize: '1.1rem',
                  fontWeight: 600,
                  boxShadow: '0 6px 20px rgba(58, 143, 94, 0.3)',
                  '&:hover': {
                    boxShadow: '0 8px 25px rgba(58, 143, 94, 0.4)',
                    transform: 'translateY(-2px)'
                  }
                }}
              >
                Continue Shopping
              </Button>
            </Box>
          </motion.div>
        </Container>
      </>
    );
  }

  return (
    <>
      <Header cartItems={cartItems} onCartOpen={handleCartOpen} />
      <Cart 
        open={cartOpen} 
        onClose={handleCartClose} 
        cartItems={cartItems} 
        onClearCart={onClearCart}
      />
      <Container maxWidth="lg" sx={{ py: 8, mt: 8 }}>
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
      >
        <Button
          startIcon={<ArrowBackIcon />}
          onClick={() => navigate(-1)}
          sx={{ 
            mb: 4,
            color: 'primary.main',
            '&:hover': {
              backgroundColor: 'primary.50'
            }
          }}
        >
          Back to Cart
        </Button>

        {/* Stepper */}
        <Paper sx={{ p: 3, mb: 4, backgroundColor: 'primary.50' }}>
          <Stepper activeStep={activeStep} alternativeLabel>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
        </Paper>

        {activeStep === 0 && (
          <motion.div variants={slideUp}>
            <Grid container spacing={4}>
              {/* Order Summary */}
              <Grid item xs={12} md={6}>
                <Paper sx={{ p: 3, backgroundColor: 'white', borderRadius: 3, boxShadow: '0 8px 32px rgba(0,0,0,0.1)' }}>
                  <Typography variant="h5" gutterBottom sx={{ fontWeight: 700, color: 'primary.main', mb: 3 }}>
                    Order Summary
                  </Typography>
                  
                  <List>
                    {cartItems.map((item, index) => (
                      <React.Fragment key={item.id}>
                        <ListItem sx={{ px: 0, py: 2 }}>
                          <ListItemAvatar>
                            <Avatar 
                              src={item.image} 
                              alt={item.name}
                              sx={{ 
                                width: 70, 
                                height: 70, 
                                borderRadius: 2,
                                boxShadow: '0 4px 12px rgba(0,0,0,0.15)'
                              }}
                            />
                          </ListItemAvatar>
                          <ListItemText
                            primary={
                              <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                                {item.name}
                              </Typography>
                            }
                            secondary={
                              <Box>
                                <Typography variant="body2" color="primary.main" sx={{ fontWeight: 600 }}>
                                  ${item.price.toFixed(2)} × {item.quantity}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                  ${(item.price * item.quantity).toFixed(2)}
                                </Typography>
                              </Box>
                            }
                          />
                        </ListItem>
                        {index < cartItems.length - 1 && <Divider />}
                      </React.Fragment>
                    ))}
                  </List>

                  <Divider sx={{ my: 3 }} />

                  <Box sx={{ mb: 2 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1.5 }}>
                      <Typography variant="body1">Subtotal:</Typography>
                      <Typography variant="body1" sx={{ fontWeight: 600 }}>${totalPrice.toFixed(2)}</Typography>
                    </Box>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1.5 }}>
                      <Typography variant="body1">Shipping:</Typography>
                      <Typography variant="body1" sx={{ fontWeight: 600 }}>${shippingCost.toFixed(2)}</Typography>
                    </Box>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1.5 }}>
                      <Typography variant="body1">Tax:</Typography>
                      <Typography variant="body1" sx={{ fontWeight: 600 }}>${tax.toFixed(2)}</Typography>
                    </Box>
                    <Divider sx={{ my: 2 }} />
                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                      <Typography variant="h6" sx={{ fontWeight: 700 }}>
                        Total:
                      </Typography>
                      <Typography variant="h6" color="primary.main" sx={{ fontWeight: 700 }}>
                        ${finalTotal.toFixed(2)}
                      </Typography>
                    </Box>
                  </Box>
                </Paper>
              </Grid>

              {/* Continue to Checkout */}
              <Grid item xs={12} md={6}>
                <Card sx={{ 
                  p: 4, 
                  backgroundColor: 'primary.50', 
                  borderRadius: 3,
                  textAlign: 'center',
                  boxShadow: '0 8px 32px rgba(58, 143, 94, 0.15)'
                }}>
                  <CardContent>
                    <LocalShippingIcon sx={{ fontSize: 60, color: 'primary.main', mb: 2 }} />
                    <Typography variant="h5" gutterBottom sx={{ fontWeight: 700, color: 'primary.main' }}>
                      Ready to Checkout?
                    </Typography>
                    <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
                      Proceed to enter your shipping and payment information to complete your order.
                    </Typography>
                    <Button
                      variant="contained"
                      color="primary"
                      size="large"
                      onClick={handleNext}
                      sx={{
                        px: 4,
                        py: 1.5,
                        fontSize: '1.1rem',
                        fontWeight: 700,
                        boxShadow: '0 6px 20px rgba(58, 143, 94, 0.3)',
                        background: 'linear-gradient(135deg, #3a8f5e 0%, #2e7d52 100%)',
                        '&:hover': {
                          boxShadow: '0 8px 25px rgba(58, 143, 94, 0.4)',
                          transform: 'translateY(-2px)',
                          background: 'linear-gradient(135deg, #2e7d52 0%, #256a45 100%)'
                        }
                      }}
                    >
                      Continue to Payment
                    </Button>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </motion.div>
        )}

        {activeStep === 1 && (
          <motion.div variants={slideUp}>
            <Paper sx={{ p: 4, backgroundColor: 'white', borderRadius: 3, boxShadow: '0 8px 32px rgba(0,0,0,0.1)' }}>
              <Box sx={{ textAlign: 'center', mb: 4 }}>
                <PaymentIcon sx={{ fontSize: 50, color: 'primary.main', mb: 1 }} />
                <Typography variant="h5" gutterBottom sx={{ fontWeight: 700, color: 'primary.main' }}>
                  Shipping & Payment Information
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  Please fill in your details to complete your order
                </Typography>
              </Box>

              <form onSubmit={handleSubmit}>
                <Grid container spacing={3}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      required
                      fullWidth
                      label="First Name"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      variant="outlined"
                      sx={{ mb: 2 }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      required
                      fullWidth
                      label="Last Name"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      variant="outlined"
                      sx={{ mb: 2 }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      required
                      fullWidth
                      label="Email"
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      variant="outlined"
                      sx={{ mb: 2 }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      required
                      fullWidth
                      label="Phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      variant="outlined"
                      sx={{ mb: 2 }}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      label="Address"
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      variant="outlined"
                      sx={{ mb: 2 }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      required
                      fullWidth
                      label="City"
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                      variant="outlined"
                      sx={{ mb: 2 }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      required
                      fullWidth
                      label="ZIP Code"
                      name="zipCode"
                      value={formData.zipCode}
                      onChange={handleInputChange}
                      variant="outlined"
                      sx={{ mb: 2 }}
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <Divider sx={{ my: 3 }} />
                    <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, color: 'primary.main' }}>
                      Payment Information
                    </Typography>
                  </Grid>

                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      label="Card Number"
                      placeholder="1234 5678 9012 3456"
                      name="cardNumber"
                      value={formData.cardNumber}
                      onChange={handleInputChange}
                      variant="outlined"
                      sx={{ mb: 2 }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      required
                      fullWidth
                      label="Expiry Date"
                      placeholder="MM/YY"
                      name="expiryDate"
                      value={formData.expiryDate}
                      onChange={handleInputChange}
                      variant="outlined"
                      sx={{ mb: 2 }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      required
                      fullWidth
                      label="CVV"
                      placeholder="123"
                      name="cvv"
                      value={formData.cvv}
                      onChange={handleInputChange}
                      variant="outlined"
                      sx={{ mb: 2 }}
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          name="saveInfo"
                          checked={formData.saveInfo}
                          onChange={handleInputChange}
                          color="primary"
                        />
                      }
                      label="Save payment information for next time"
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <Box sx={{ display: 'flex', gap: 2, justifyContent: 'space-between', mt: 4 }}>
                      <Button
                        onClick={handleBack}
                        variant="outlined"
                        size="large"
                        sx={{ px: 4 }}
                      >
                        Back
                      </Button>
                      <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        size="large"
                        disabled={isProcessing}
                        sx={{
                          px: 4,
                          fontWeight: 700,
                          fontSize: '1.1rem',
                          boxShadow: '0 6px 25px rgba(58, 143, 94, 0.4)',
                          background: 'linear-gradient(135deg, #3a8f5e 0%, #2e7d52 100%)',
                          '&:hover': {
                            boxShadow: '0 8px 30px rgba(58, 143, 94, 0.5)',
                            transform: 'translateY(-2px)',
                            background: 'linear-gradient(135deg, #2e7d52 0%, #256a45 100%)'
                          }
                        }}
                      >
                        {isProcessing ? (
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <CircularProgress size={20} sx={{ color: 'white' }} />
                            Processing...
                          </Box>
                        ) : (
                          `Place Order - $${finalTotal.toFixed(2)}`
                        )}
                      </Button>
                    </Box>
                  </Grid>
                </Grid>
              </form>
            </Paper>
          </motion.div>
        )}

        {activeStep === 2 && (
          <motion.div variants={fadeIn}>
            <Paper sx={{ 
              p: 6, 
              textAlign: 'center', 
              backgroundColor: 'success.50',
              borderRadius: 3,
              boxShadow: '0 8px 32px rgba(76, 175, 80, 0.2)'
            }}>
              <CheckCircleIcon sx={{ fontSize: 80, color: 'success.main', mb: 3 }} />
              <Typography variant="h4" gutterBottom sx={{ fontWeight: 700, color: 'success.main' }}>
                Order Successful!
              </Typography>
              <Typography variant="h6" color="text.secondary" sx={{ mb: 3, maxWidth: 500, mx: 'auto' }}>
                Thank you for your order. You will receive a confirmation email shortly.
              </Typography>
              <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
                Order Total: <strong>${finalTotal.toFixed(2)}</strong>
              </Typography>
              <CircularProgress 
                size={40} 
                thickness={4} 
                sx={{ color: 'success.main', mb: 3 }} 
              />
              <Typography variant="body2" color="text.secondary">
                Redirecting to home page...
              </Typography>
            </Paper>
          </motion.div>
        )}
      </motion.div>
    </Container>
    </>
  );
};

export default CheckoutPage;
