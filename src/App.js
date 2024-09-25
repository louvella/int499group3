import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import HomePage from './HomePage';
import CartPage from './CartPage';
import CreditCardForm from './CreditCardForm';
import Header from './Header'; // Import the shared Header component
import './App.css';
import { GoogleOAuthProvider } from '@react-oauth/google';
import GoogleLogin from './GoogleLogin';

const App = () => {
  const [cart, setCart] = useState([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem('cart')) || [];
    //const storedCreditCardInfo = JSON.parse(localStorage.getItem('creditCardInfo')) || null;
    const storedAuthStatus = JSON.parse(localStorage.getItem('isAuthenticated')) || false;
    
    setCart(storedCart);
    setIsAuthenticated(storedAuthStatus); // Load auth status from localStorage
  }, []);

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  const handleLoginSuccess = () => {
    setIsAuthenticated(true);
    localStorage.setItem('isAuthenticated', JSON.stringify(true)); // Store auth status
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('creditCardInfo');
  };

  const handleCreditCardSave = (creditCardInfo) => {
    // This function is passed to CreditCardForm as a prop
    localStorage.setItem('creditCardInfo', JSON.stringify(creditCardInfo));
  };

  // Calculate price based on movie number
  const calculatePrice = (movie) => {
    const movieNumber = parseInt(movie.split(' ')[1], 10); // Extract movie number
    return 1 + movieNumber * 0.10; // Price formula: $1.00 + movieNumber * $0.10
  };

  // Add an item to the cart with price
  const handleAddToCart = (movie) => {
    setCart((prevCart) => {
      if (prevCart.find((item) => item.name === movie)) return prevCart;
      const newItem = { name: movie, price: calculatePrice(movie) };
      return [...prevCart, newItem];
    });
  };

  // Remove an item from the cart
  const handleRemoveFromCart = (movie) => {
    setCart((prevCart) => prevCart.filter((item) => item.name !== movie));
  };

  // Clear all items from the cart
  const handleClearCart = () => {
    setCart([]);
  };

  return (
    <GoogleOAuthProvider clientId="76771103106-4kgp7eu5vnhnrvqp1ig5pqktjm7j3dsa.apps.googleusercontent.com">
      <Router>
        <div>
          {/* Include the shared header component with appropriate props */}
          <Header
            cartLength={cart.length}
            isAuthenticated={isAuthenticated}
            onLogout={handleLogout}
          />
          <Routes>
            {/* If not authenticated, redirect to login page */}
            <Route
              path="/"
              element={
                isAuthenticated ? (
                  <HomePage
                    onAddToCart={handleAddToCart}
                    onRemoveFromCart={handleRemoveFromCart}
                    cart={cart}
                  />
                ) : (
                  <Navigate to="/login" />
                )
              }
            />
            <Route
              path="/login"
              element={<GoogleLogin onLoginSuccess={handleLoginSuccess} />}
            />
            <Route
              path="/credit-card"
              element={
                isAuthenticated ? (
                  <CreditCardForm onSave={handleCreditCardSave} /> // Pass the function here
                ) : (
                  <Navigate to="/login" />
                )
              }
            />
            <Route
              path="/cart/*"
              element={
                isAuthenticated ? (
                  <CartPage
                    cart={cart}
                    onRemoveFromCart={handleRemoveFromCart}
                    onClearCart={handleClearCart}
                  />
                ) : (
                  <Navigate to="/login" />
                )
              }
            />
          </Routes>
        </div>
      </Router>
    </GoogleOAuthProvider>
  );
};

export default App;
