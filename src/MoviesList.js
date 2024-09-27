import React, { useState, useRef, useEffect } from "react";
import { useLocalStorage } from "@uidotdev/usehooks";
import cartIcon from "./assets/cart.png";
import removeIcon from "./assets/remove.png";
import "./Movies.css";

const IMG_BASE_URL = "https://image.tmdb.org/t/p/w220_and_h330_face";

function MoviesList({ cart, onAddToCart, onRemoveFromCart }) {
  // Receive cart, onAddToCart, onRemoveFromCart as props
  const [movies] = useLocalStorage("movies", []);
  const [filteredMovies, setFilteredMovies] = useState([]);

  ///
  const emptySearch = useRef(false);
  useEffect(() => {
    // Fetch and store movies in localStorage
    async function setEmptySearch() {
      if (!emptySearch.current) {
        // ensures the initial search only happens once (react runs twice in dev-mode)
        emptySearch.current = true;
        setFilteredMovies(movies);
      }
    }
    setEmptySearch();
  }, [movies]);

  ///

  // Helper function to check if the movie is in the cart
  const isInCart = (movieTitle) => {
    return cart.some((item) => item.name === movieTitle);
  };

  const [input, setInput] = useState("");
  const handleInputChange = (event) => {
    const value = event.target.value; // capture the input value
    setInput(value); // update the input state

    // If the input value is empty, show all movies
    if (value === "") {
      setFilteredMovies(movies); // reset to full list
    } else {
      // Filter movies based on the current input
      const filtered = movies.filter((movie) =>
        movie.title.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredMovies(filtered); // set the filtered results
    }
  };

  return (
    <div className="movies-grid">
      <h1>Movies Page</h1>
      <form>
        <p>
          Search:{" "}
          <input type="text" value={input} onChange={handleInputChange} />
        </p>
      </form>
      <ul className="movies-list">
        {Array.isArray(movies) && movies.length > 0 ? (
          filteredMovies.map((movie, index) => (
            <li
              key={movie.index}
              className="movies-card"
              style={{ zIndex: index }}
            >
              <h2 className="movies-title">{movie.title}</h2>{" "}
              {/* Title on top */}
              <img
                className="movies-image"
                src={`${IMG_BASE_URL}${movie.poster_path}`}
                alt="movie_poster"
              />
              <p className="movies-rating">Rating: {movie.vote_average}</p>{" "}
              {/* Rating at the bottom */}
              <button
                onClick={() => {
                  if (isInCart(movie.title)) {
                    // Remove from cart if already in the cart
                    onRemoveFromCart(movie.title);
                  } else {
                    // Add to cart if not in the cart
                    onAddToCart(movie);
                  }
                }}
              >
                <img
                  style={{ width: 40, height: 40 }}
                  src={isInCart(movie.title) ? removeIcon : cartIcon}
                  alt={
                    isInCart(movie.title) ? "Remove from Cart" : "Add to Cart"
                  }
                />
              </button>
            </li>
          ))
        ) : (
          <p>No movies found. Please search for movies in the search bar.</p>
        )}
      </ul>
    </div>
  );
}

export default MoviesList;
