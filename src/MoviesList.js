import React from 'react';
// imports the add to cart icon
import cartIcon from './assets/cart.png'; 
// imports the remove from cart icon
import removeIcon from './assets/remove.png'; 

const MoviesList = ({ title, onAddToCart, onRemoveFromCart, cart }) => {
  return (
    <div className="movies-section">
      <h2>{title}</h2>
      <div className="movies-grid">
        {/* generates an array of 10 items as representative for movies */}
        {Array(10)
          .fill()
          .map((_, i) => {
            const movieName = `Movie ${i + 1}`;
            const isInCart = cart.some((item) => item.name === movieName); 
            return (
              <div key={i} className="movie-card">
                <span>{movieName}</span>
                <button
                  
                  onClick={() => {
                    if (isInCart) {
                      // removes from cart if its already in memory
                      onRemoveFromCart(movieName); 
                    } else {
                      // adds to cart if not in memory
                      onAddToCart(movieName); 
                    }
                  }}
                >
                  <img
                    src={isInCart ? removeIcon : cartIcon}
                    alt={isInCart ? 'Remove from Cart' : 'Add to Cart'}
                  />
                </button>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default MoviesList;
