import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="header">
      <div className="logo">EZTechMovie</div>
      <nav className="navbar">
      <Link to="/">Home</Link> {/* Ensure using Link for SPA navigation */}
        <Link to="/cart">Cart</Link> {/* Add link to Cart page */}
        <Link to="/login">Login</Link>
      </nav>
    </header>
  );
};

export default Header;
