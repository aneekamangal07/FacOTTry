import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Slider3 from "../components/Slider3";
import LeftNavBar from "../components/LeftNavBar";
import { CLIENT_API } from "../Client/client";

const Home = () => {
  const [slides, setSlides] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [selectedMovie, setSelectedMovie] = useState(slides[0]);
  const [isToggled, setIsToggled] = useState(false);

  useEffect(() => {
    setSelectedMovie(slides[0]);
  }, [slides]);
  useEffect(() => {
    CLIENT_API.getAllMovies("movie", (movieData) => {
      setSlides(movieData);
    });
  }, []);
  //popular releases, top 10, popular shows, 2010 movies, romantic movies, comedy movies, trending movies, popular genres

  return (
    <div className="w-full flex flex-col relative items-start justify-center">
      {/* toggle state for left navbar and top navbar */}
      <label className="inline-flex items-center cursor-pointer z-[100] absolute right-0 top-0 p-4">
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
        <div className="z-10 w-32 bg-gradient-to-r from-[#0F1014] to-transparent absolute left-0 top-0">
          <LeftNavBar
            selectedIndex={selectedIndex}
            setSelectedIndex={setSelectedIndex}
            isToggled={isToggled}
          />
        </div>
      )}
      <Hero
        movie={selectedMovie}
        selectedIndex={selectedIndex}
        setSelectedIndex={setSelectedIndex}
      />

      <Slider3
        slides={slides}
        selectedIndex={selectedIndex}
        setSelectedIndex={setSelectedIndex}
        setSelectedMovie={setSelectedMovie}
      />
    </div>
  );
};

export default Home;
