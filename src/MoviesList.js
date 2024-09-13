import React from 'react';

const MoviesList = ({ title }) => {
  return (
    <div className="movies-section">
      <h2>{title}</h2>
      <div className="movies-grid">
        {Array(10)
          .fill()
          .map((_, i) => (
            <div key={i} className="movie-card">
              <span>Movie {i + 1}</span>
            </div>
          ))}
      </div>
    </div>
  );
};

export default MoviesList;
