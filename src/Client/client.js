export function fetchMovies(url, callback) {
  fetch(url)
    .then((res) => {
      if (!res.ok) {
        throw new Error("Network response was not ok");
      }
      return res.json();
    })
    .then((data) => callback(data.results))
    .catch((error) => {
      console.error("Error fetching movies:", error);
    });
}

export function getAllMovies(value, callback) {
  const apiKey = import.meta.env.VITE_API_KEY;
  const url = `https://api.themoviedb.org/3/discover/${value}?api_key=${apiKey}`;
  fetchMovies(url, callback);
}

export function getMoviesByGenre(genreId, callback) {
  const apiKey = import.meta.env.VITE_API_KEY;
  const url = `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&with_genres=${genreId}`;
  fetchMovies(url, callback);
}

export function getTrendingMovies(callback) {
  const apiKey = import.meta.env.VITE_API_KEY;
  const url = `https://api.themoviedb.org/3/trending/movie/week?api_key=${apiKey}`;
  fetchMovies(url, callback);
}

export const CLIENT_API = {
  getAllMovies: getAllMovies,
  getMoviesByGenre: getMoviesByGenre,
  getTrendingMovies: getTrendingMovies,
};

// console.log(import.meta.env.VITE_API_KEY);

// export const CLIENT_API = {
//   getMovieData: getMovieData,
// };
// ("https://api.themoviedb.org/3/discover/movie?api_key={api_key}&with_genres=35");
