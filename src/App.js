// App.js
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Link, Navigate } from 'react-router-dom';
import HomePage from './HomePage';
import LoginPage from './LoginPage';
import CartPage from './CartPage';
import AddUser from './AddUser';
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

  // Add a movie to the cart
  const handleAddToCart = (movie) => {
    setCart((prevCart) => {
      if (prevCart.includes(movie)) return prevCart;
      return [...prevCart, movie];
    });
  };

  // Remove a movie from the cart
  const handleRemoveFromCart = (movie) => {
    setCart((prevCart) => prevCart.filter((item) => item !== movie));
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
        <header className="header">
          <div className="logo">EZTechMovie</div>
          <nav className="navbar">
            <Link to="/">Home</Link>
            <Link to="/cart">Cart ({cart.length})</Link>
            {isAuthenticated ? (
              <button onClick={handleLogout}>Logout</button>
            ) : (
              <Link to="/login">Login</Link>
            )}
          </nav>
        </header>
        <Routes>
          {/* Pass cart, onAddToCart, and onRemoveFromCart to HomePage */}
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
