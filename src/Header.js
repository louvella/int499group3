import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Header = ({ cartLength, isAuthenticated, onLogout }) => {
  const navigate = useNavigate();

  // function to handle the cart button click
  const handleCartClick = () => {
    // navigates to the Cart Page
    navigate('/cart'); 
    window.dispatchEvent(new Event('storage')); 
  };

  return (
    <header className="header">
      <div className="logo">EZTechMovie</div>
      <nav className="navbar">
        <Link to="/">Home</Link>
        <button className="navbar button" onClick={handleCartClick}>Cart ({cartLength})</button>
        {isAuthenticated ? (
          // authenticated users are shown the Logout button
          <button className="navbar button" onClick={onLogout}>Logout</button>
        ) : (
          // users who are not authenticated are shown the login link
          <Link to="/login">Login</Link>
        )}
      </nav>
    </header>
  );
};

export default Header;
