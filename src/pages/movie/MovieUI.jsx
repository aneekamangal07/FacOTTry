import { useEffect, useState } from "react";
import Slider3 from "../../components/Slider3";
import Hero from "../../components/Hero";
import Navbar from "../../components/Navbar";
import { navbarIcons } from "../../data/db";
import LeftNavBar from "../../components/LeftNavBar";
import { CLIENT_API } from "../../Client/client";

const Movie = () => {
  const [slides, setSlides] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [selectedMovie, setSelectedMovie] = useState(slides[0]);
  const [isToggled, setIsToggled] = useState(false);

  const handleChange = () => {
    setIsToggled(!isToggled);
  };

  useEffect(() => {
    setSelectedMovie(slides[0]);
  }, [slides]);
  useEffect(() => {
    CLIENT_API.getMovieData("movie", (movieData) => {
      setSlides(movieData);
    });
  }, []);
  console.log("selected index: ", selectedIndex);

  return (
    <div className="w-full flex flex-col relative items-start justify-center">
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

export default Movie;
