// App.js
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import HomePage from './HomePage';
import LoginPage from './LoginPage';
import CartPage from './CartPage';
import AddUser from './AddUser';
import Header from './Header'; // Import the shared Header component
import './App.css';

const App = () => {
  const [cart, setCart] = useState([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem('cart')) || [];
    setCart(storedCart);
  }, []);

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

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

  // Handle login
  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  // Handle logout
  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('isAuthenticated'); // Clear authentication on logout
  };

  return (
    <Router>
      <div>
        {/* Include the shared header component with appropriate props */}
        <Header
          cartLength={cart.length}
          isAuthenticated={isAuthenticated}
          onLogout={handleLogout}
        />
        <Routes>
          <Route
            path="/"
            element={
              <HomePage
                onAddToCart={handleAddToCart}
                onRemoveFromCart={handleRemoveFromCart}
                cart={cart}
              />
            }
          />
          <Route path="/login" element={<LoginPage onLogin={handleLogin} />} />
          <Route path="/add-user" element={<AddUser />} />
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
                <Navigate to="/login" /> // Redirect unauthenticated users to login
              )
            }
          />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
