import React from 'react';
// imports the MoviesList component
import MoviesList from './MoviesList';

// HomePage component that renders multiple lists of movies
const HomePage = ({ onAddToCart, onRemoveFromCart, cart }) => {

  return (
    <div className="home-page">
      {/* Renders the MoviesList component with the title Movies and passes the onAddToCart and 
      onRemoveFromCart functions and the current cart state as props 
      it does this for all three sections*/}
      <MoviesList title="Movies" onAddToCart={onAddToCart} onRemoveFromCart={onRemoveFromCart} cart={cart} />
    </div>
  );
};

export default HomePage;
