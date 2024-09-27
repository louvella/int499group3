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
    // makes sure the login status is verified when the app initially renders
    handleLogin();
  }, []);

  const havefetched = useRef(false);
  useEffect(() => {
    async function fetchAndSetMovies() {
      if (!havefetched.current) {
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
    // function to set authentication status after successful login through Google OAuth and writes isAuthenticated key to localstorage
    setIsAuthenticated(true);
    localStorage.setItem('isAuthenticated', JSON.stringify(true));
  };

  const handleLogin = () => {
    // function to checks if the user is already authenticated from local storage
    const storedAuthStatus = JSON.parse(localStorage.getItem('isAuthenticated')) || false;
    if (storedAuthStatus === false){
      console.log("User is logged out")
    }
  };

  const handleLogout = () => {
    // function to handle user logout and clears authentication status
    setIsAuthenticated(false);
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('creditCardInfo');
  };

  const handleCreditCardSave = (creditCardInfo) => {
    localStorage.setItem('creditCardInfo', JSON.stringify(creditCardInfo));
  };

 const calculatePrice = (movie) => {
  const averageRating = movie.vote_average.toString().replace('.', ''); // composes a price for each movie that's based on the numbers used for voting_average
  const firstTwoDigits = parseInt(averageRating.slice(0, 2), 10); 
  return 1 + (firstTwoDigits / 100); 
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
            // Logout button linked to Google OAuth logout functionality
            onLogout={handleLogout} 
          />
          <Routes>

            <Route
              path="/login"
              element={<GoogleLogin onLoginSuccess={handleLoginSuccess} />}
            />
            
            {/* all routes that need authentication are wrapped with PrivateRoute */}
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
    // Code that wraps app with GoogleOAuthProvider - google oAuth functionality
    <GoogleOAuthProvider clientId="76771103106-4kgp7eu5vnhnrvqp1ig5pqktjm7j3dsa.apps.googleusercontent.com" onScriptLoadSuccess={() => setLoaded(true)}>
      {loaded && <App />}
    </GoogleOAuthProvider>
  )
}

export default Root;
