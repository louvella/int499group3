import React, { useState, useEffect, useRef } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './HomePage';
import CartPage from './CartPage';
import CreditCardForm from './CreditCardForm';
import Header from './Header';
import './App.css';
import { GoogleOAuthProvider } from '@react-oauth/google';
import GoogleLogin from './GoogleLogin';
import PrivateRoute from './PrivateRoute'; //  
import PaidPage from './Paid'; 
import { fetchPopularMovies } from './tmdbService';
import { useLocalStorage } from "@uidotdev/usehooks";


const App = () => {
  const [cart, setCart] = useState([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [movies, setMovies] = useLocalStorage("movies", []);

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem('cart')) || [];
    const storedAuthStatus = JSON.parse(localStorage.getItem('isAuthenticated')) || false;
    
    setCart(storedCart);
    setIsAuthenticated(storedAuthStatus);
    handleLogin();
  }, []);

  const havefetched = useRef(false);
  useEffect(() => {
    // Fetch and store movies in localStorage
    async function fetchAndSetMovies() {
      if (!havefetched.current) {
        // ensures the fetch only happens once (react runs twice in dev-mode)
        havefetched.current = true;
        const fetchedMovies = await fetchPopularMovies();
        setMovies(fetchedMovies);
      }
    }
    fetchAndSetMovies();
  }, [setMovies]);


  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  const handleLoginSuccess = () => {
    setIsAuthenticated(true);
    localStorage.setItem('isAuthenticated', JSON.stringify(true));
  };

  const handleLogin = () => {
    const storedAuthStatus = JSON.parse(localStorage.getItem('isAuthenticated')) || false;
    if (storedAuthStatus === false){
      console.log("User is logged out")
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('creditCardInfo');
  };

  const handleCreditCardSave = (creditCardInfo) => {
    localStorage.setItem('creditCardInfo', JSON.stringify(creditCardInfo));
  };

 const calculatePrice = (movie) => {
  const averageRating = movie.vote_average.toString().replace('.', ''); // removes the decimal point from the average rating string to simulate a price
  const firstTwoDigits = parseInt(averageRating.slice(0, 2), 10); // gets the first two digits which are trated as the cents
  return 1 + (firstTwoDigits / 100); // $1 base plus the cents from aove to simulate a price
};



const handleAddToCart = (movie) => {
  setCart((prevCart) => {
    if (prevCart.find((item) => item.name === movie.title)) return prevCart;
    const newItem = { name: movie.title, price: calculatePrice(movie) };
    return [...prevCart, newItem];
  });
};


  const handleRemoveFromCart = (movie) => {
    setCart((prevCart) => prevCart.filter((item) => item.name !== movie));
  };

  const handleClearCart = () => {
    setCart([]);
  };


  return (
      <Router>
        <div>
          <Header
            cartLength={cart.length}
            isAuthenticated={isAuthenticated}
            onLogout={handleLogout}
          />
          <Routes>

            <Route
              path="/login"
              element={<GoogleLogin onLoginSuccess={handleLoginSuccess} />}
            />
            
            {/* Wrap routes that need authentication with PrivateRoute */}
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
                  <div className="homepage">
                    <h1>To use the app please login</h1>
                  </div>
                )
              }
            />
            <Route
              path="/credit-card"
              element={
                <PrivateRoute isAuthenticated={isAuthenticated}>
                  <CreditCardForm onSave={handleCreditCardSave} />
                </PrivateRoute>
              }
            />
            <Route
              path="/cart/*"
              element={
                <PrivateRoute isAuthenticated={isAuthenticated}>
                  <CartPage
                    cart={cart}
                    onRemoveFromCart={handleRemoveFromCart}
                    onClearCart={handleClearCart}
                  />
                </PrivateRoute>
              }
            />
            <Route
              path="/paid"
              element={
                <PrivateRoute isAuthenticated={isAuthenticated}>
                  <PaidPage
                    cart={cart}
                    onRemoveFromCart={handleRemoveFromCart}
                    onClearCart={handleClearCart}
                  />
                </PrivateRoute>
              }
            />
          </Routes>
        </div>
      </Router>
  );
};

const Root = () => {
  const [loaded, setLoaded] = useState(false)
  return (
    <GoogleOAuthProvider clientId="76771103106-4kgp7eu5vnhnrvqp1ig5pqktjm7j3dsa.apps.googleusercontent.com" onScriptLoadSuccess={() => setLoaded(true)}>
      {loaded && <App />}
    </GoogleOAuthProvider>
  )
}

export default Root;
