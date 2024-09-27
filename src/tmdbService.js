const API_KEY = '14bc2bdcf2c90a459f3f631ed94345df'; 
const BASE_URL = 'https://api.themoviedb.org/3';

export const fetchPopularMovies = async () => {
  try {
    const allMovies = [];

    // Loop through pages 1 to 10
    for (let page = 1; page <= 10; page++) {
      
      const response = await fetch(`${BASE_URL}/discover/movie?page=${page}&api_key=${API_KEY}&include_adult=false&include_video=false&language=en-US&sort_by=popularity.desc`, {
        headers: {
          'Content-Type': 'application/json;charset=utf-8',
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      
      // Accumulate the movies from each page
      allMovies.push(...data.results);
    }

    return allMovies;
  } catch (error) {
    console.error('Error fetching movies:', error);
    return [];
  }
};

