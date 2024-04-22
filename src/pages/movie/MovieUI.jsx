import { useEffect, useState } from "react";
import Slider3 from "../../components/Slider3";
import Hero from "../../components/Hero";
import Navbar from "../../components/Navbar";
import { navbarIcons } from "../../data/db";
import LeftNavBar from "../../components/LeftNavBar";
import { CLIENT_API } from "../../Client/client";

const Movie = () => {
  const [slides, setSlides] = useState([]);
  const [comedyMovies, setComedyMovies] = useState([]);
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [isToggled, setIsToggled] = useState(false);

  const handleChange = () => {
    setIsToggled(!isToggled);
  };

  useEffect(() => {
    setSelectedMovie(slides[0]);
  }, [slides]);

  useEffect(() => {
    CLIENT_API.getAllMovies("movie", (movieData) => {
      setSlides(movieData);
    });

    CLIENT_API.getMoviesByGenre(35, (comedyData) => {
      setComedyMovies(comedyData);
      console.log(comedyData);
    });

    CLIENT_API.getTrendingMovies((trendingData) => {
      setTrendingMovies(trendingData);
    });
  }, []);

  console.log("selected index: ", selectedIndex);
  const renderSlider = (slides, title) => {
    return (
      <Slider3
        slides={slides}
        selectedIndex={selectedIndex}
        setSelectedIndex={setSelectedIndex}
        setSelectedMovie={setSelectedMovie}
        title={title}
      />
    );
  };
  return (
    <div className="w-full flex flex-col relative items-start justify-center bg-black">
      <button
        onClick={handleChange}
        className={`h-10 w-10 ${
          isToggled ? "bg-[#e04cf3]" : "bg-[#ff0b0b]"
        } justify-center items-center cursor-pointer rounded-full absolute top-0 left-0 z-20`}
      >
        {isToggled ? (
          <div className="z-10 w-32 h-full bg-gradient-to-b from-black to-transparent absolute left-0 top-0">
            <LeftNavBar
              slides={navbarIcons}
              selectedIndex={selectedIndex}
              setSelectedIndex={setSelectedIndex}
              isToggled={isToggled}
            />
          </div>
        ) : (
          <Navbar
            selectedIndex={selectedIndex}
            setSelectedIndex={setSelectedIndex}
            isToggled={isToggled}
          />
        )}
      </button>
      <div className="flex flex-col space-y-8">
        <Hero
          movie={selectedMovie}
          selectedIndex={selectedIndex}
          setSelectedIndex={setSelectedIndex}
        />
        <div className="flex flex-col items-center space-y-8">
          {slides.length > 0 && renderSlider(slides, "Movies")}
          {comedyMovies.length > 0 &&
            renderSlider(comedyMovies, "Comedy Movies")}
          {trendingMovies.length > 0 &&
            renderSlider(trendingMovies, "Trending Movies")}
        </div>
      </div>
    </div>
  );
};

export default Movie;
