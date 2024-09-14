// HomePage.js
import React from 'react';
import Header from './Header';
import MoviesList from './MoviesList';

const HomePage = ({ onAddToCart, onRemoveFromCart, cart }) => {
  return (
    <div className="home-page">
      <Header />
      <MoviesList title="Movies" onAddToCart={onAddToCart} onRemoveFromCart={onRemoveFromCart} cart={cart} />
      <MoviesList title="My List" onAddToCart={onAddToCart} onRemoveFromCart={onRemoveFromCart} cart={cart} />
      <MoviesList title="Trending Now" onAddToCart={onAddToCart} onRemoveFromCart={onRemoveFromCart} cart={cart} />
    </div>
  );
};

export default HomePage;
