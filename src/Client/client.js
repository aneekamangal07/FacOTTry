export function getMovieData(routeName, callback) {
  fetch(
    `https://api.themoviedb.org/3/discover/${routeName}?api_key=${
      import.meta.env.VITE_API_KEY
    }`
  )
    .then((res) => res.json())
    .then((data) => callback(data.results));
}

// console.log(import.meta.env.VITE_API_KEY);

export const CLIENT_API = {
  getMovieData: getMovieData,
};
