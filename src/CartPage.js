import React, { useEffect, useState } from 'react';
import { Link, Route, Routes, useLocation } from 'react-router-dom';
import About from './About';
import Subscription from './Subscription';
import Checkout from './Checkout';

const CartPage = ({ cart, onRemoveFromCart, onClearCart }) => {
  // retrieves the selected subscription from local storage
  const [selectedSubscription, setSelectedSubscription] = useState(null);
  const location = useLocation();

  // loads the selected subscription from local storage
  const loadSubscriptionFromLocalStorage = () => {
    const storedSubscription = JSON.parse(localStorage.getItem('selectedSubscription'));
    setSelectedSubscription(storedSubscription || null);
  };

  // loads the subscription plan every each time the "My Cart" button is pressed
  useEffect(() => {
    loadSubscriptionFromLocalStorage();
  }, [location]); 

  // Calculates total price
  const cartTotal = cart.reduce((total, item) => total + item.price, 0);
  const subscriptionTotal = selectedSubscription ? selectedSubscription.price : 0;
  const totalPrice = cartTotal + subscriptionTotal;

  return (
    <div className="cart-page">
      <nav className="cart-submenu">
        <Link to="/cart">My Cart</Link>
        <Link to="/cart/subscription">Subscription</Link>
        <Link to="/cart/checkout">Checkout</Link>
        <Link to="/cart/about">About</Link>
      </nav>
      <Routes>
        <Route
          path="/"
          element={
            <div className="cart-page">
              <h2>Shopping Cart</h2>
              {cart.length === 0 && !selectedSubscription ? (
                <p>Your cart is empty.</p>
              ) : (
                <>
                  <ul>
                    {cart.map((item, index) => (
                      <li key={index}>
                        {item.name} - ${item.price.toFixed(2)}
                        <button className="button" onClick={() => onRemoveFromCart(item.name)}>Remove</button>
                      </li>
                    ))}
                    {selectedSubscription && (
                      <li>
                        {selectedSubscription.service} - ${selectedSubscription.price.toFixed(2)}
                        
                      </li>
                    )}
                  </ul>
                  <h3>Total: ${totalPrice.toFixed(2)}</h3>
                  <button className="button" onClick={onClearCart}>Clear Cart</button>
                </>
              )}
            </div>
          }
        />
        <Route path="subscription" element={<Subscription />} />
        <Route path="checkout" element={<Checkout />} />
        <Route path="about" element={<About />} />
      </Routes>
    </div>
  );
};

export default CartPage;
