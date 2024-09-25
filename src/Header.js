// Header.js
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Header = ({ cartLength, isAuthenticated, onLogout }) => {
  const navigate = useNavigate();

  const handleCartClick = () => {
    navigate('/login');
    window.dispatchEvent(new Event('storage'));
  };
  
  const handleLoginClick = () => {
    navigate('/cart');
    window.dispatchEvent(new Event('storage'));
  };

  return (
    <header className="header">
      <div className="logo">EZTechMovie</div>
      <nav className="navbar">
        <Link to="/">Home</Link>
        <button className="navbar button" onClick={handleCartClick}>
          Cart ({cartLength})
        </button>
        {isAuthenticated ? (
          <button className="navbar button" onClick={onLogout}>
            Logout
          </button>
        ) : (
          <button className="navbar button" onClick={handleLoginClick}>
          Login
        </button>
        )}
      </nav>
    </header>
  );
};

export default Header;
