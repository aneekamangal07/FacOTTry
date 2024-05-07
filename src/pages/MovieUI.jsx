import { useEffect, useState } from "react";
import Hero from "../components/Hero";
import Navbar from "../components/Navbar";
import LeftNavBar from "../components/LeftNavBar";
import { CLIENT_API } from "../Client/client";
import RenderSlider from "../components/RenderSlider";

const Movie = () => {
  const [slides, setSlides] = useState([]);
  const [comedyMovies, setComedyMovies] = useState([]);
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [isToggled, setIsToggled] = useState(false);

  useEffect(() => {
    setSelectedMovie(slides[0]);
  }, [slides]);

  useEffect(() => {
    CLIENT_API.getAllMovies("movie", (movieData) => {
      setSlides(movieData);
    });

    CLIENT_API.getMoviesByGenre(35, (comedyData) => {
      setComedyMovies(comedyData);
      // console.log(comedyData);
    });

    CLIENT_API.getTrendingMovies((trendingData) => {
      setTrendingMovies(trendingData);
    });
  }, []);

  console.log("selected index: ", selectedIndex);

  console.log("isToggled: ", isToggled);
  return (
    <div className="font-poppins w-full flex flex-col relative items-start justify-center bg-[#0F1014]">
      {/* toggle button */}
      <label className="inline-flex items-center cursor-pointer z-[100] absolute right-0 top-0 p-2">
        <input
          type="checkbox"
          value={isToggled}
          className="sr-only peer"
          onChange={(e) => setIsToggled(e.target.checked)}
        />
        <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
      </label>
      {isToggled ? (
        <Navbar
          selectedIndex={selectedIndex}
          setSelectedIndex={setSelectedIndex}
          isToggled={isToggled}
        />
      ) : (
        <div className="z-10 w-32 h-full bg-gradient-to-r from-[#0F1014] to-transparent absolute left-0 top-0">
          <LeftNavBar
            selectedIndex={selectedIndex}
            setSelectedIndex={setSelectedIndex}
            isToggled={isToggled}
          />
        </div>
      )}
      <div className="flex flex-col space-y-8">
        <Hero
          movie={selectedMovie}
          selectedIndex={selectedIndex}
          setSelectedIndex={setSelectedIndex}
        />
        <div className="flex flex-col items-center space-y-8 z-10 ">
          {slides.length > 0 &&
            RenderSlider(
              slides,
              selectedIndex,
              setSelectedIndex,
              setSelectedMovie,
              "Movies"
            )}
          {comedyMovies.length > 0 &&
            RenderSlider(
              comedyMovies,
              selectedIndex,
              setSelectedIndex,
              setSelectedMovie,
              "Comedy Movies"
            )}
          {trendingMovies.length > 0 &&
            RenderSlider(
              trendingMovies,
              selectedIndex,
              setSelectedIndex,
              setSelectedMovie,
              "Trending Movies"
            )}
        </div>
      </div>
    </div>
  );
};

export default Movie;
