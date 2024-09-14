import React from 'react';
import { Link, Route, Routes } from 'react-router-dom';
import About from './About'; 
import Subscription from './Subscription'; 
import Checkout from './Checkout'; 

const CartPage = ({ cart, onRemoveFromCart, onClearCart }) => {
  return (
    <div className="cart-page">
      <nav className="cart-submenu">
        <Link to="/cart">My Cart</Link>
        <Link to="/cart/subscription">Subscription</Link>
        <Link to="/cart/about">About</Link>
        <Link to="/cart/checkout">Checkout</Link>
      </nav>
      <Routes>
        <Route
          path="/"
          element={
            <div>
              <h2>Shopping Cart</h2>
              {cart.length === 0 ? (
                <p>Your cart is empty.</p>
              ) : (
                <ul>
                  {cart.map((item, index) => (
                    <li key={index}>
                      {item}
                      <button className="cart-button" onClick={() => onRemoveFromCart(item)}>Remove</button>
                    </li>
                  ))}
                </ul>
              )}
              {cart.length > 0 && (
                <button className="cart-button" onClick={onClearCart}>Clear Cart</button>
              )}
            </div>
          }
        />
        <Route path="subscription" element={<Subscription />} />
        <Route path="about" element={<About />} />
        <Route path="checkout" element={<Checkout />} />
      </Routes>
    </div>
  );
};

export default CartPage;
