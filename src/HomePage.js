import React from 'react';
import Header from './Header';
import MoviesList from './MoviesList';

const HomePage = () => {
  return (
    <div className="home-page">
      <Header />
      <MoviesList title="Movies" />
      <MoviesList title="My List" />
      <MoviesList title="Trending Now" />
    </div>
  );
};

export default HomePage;
