import React from 'react';

const Header = () => {
  return (
    <header className="header">
      <div className="logo">EZTechMovie</div>
      <nav className="navbar">
        <a href="/">Home</a>
        <a href="/login">Login</a>
      </nav>
    </header>
  );
};

export default Header;
