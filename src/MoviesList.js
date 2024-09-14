import React from 'react';
import cartIcon from './assets/cart.png'; // Assuming the cart image is in the assets folder
import removeIcon from './assets/remove.png'; // Assuming the remove image is in the assets folder

const MoviesList = ({ title, onAddToCart, onRemoveFromCart, cart }) => {
  return (
    <div className="movies-section">
      <h2>{title}</h2>
      <div className="movies-grid">
        {Array(10)
          .fill()
          .map((_, i) => {
            const movieName = `Movie ${i + 1}`;
            const isInCart = cart.includes(movieName); // Check if the movie is already in the cart
            return (
              <div key={i} className="movie-card">
                <span>{movieName}</span>
                <button
                  className="cart-button"
                  onClick={() => {
                    if (isInCart) {
                      onRemoveFromCart(movieName); // Remove from cart if already in
                    } else {
                      onAddToCart(movieName); // Add to cart if not in
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
